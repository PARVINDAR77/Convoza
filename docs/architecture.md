# CONVOZA — System Architecture & Technical Specifications

> **Tagline:** Conversations. Connected.  
> **Platform Version:** 1.0.0-PROD  
> **Architecture Style:** API-First Modular Monolith with Asynchronous Transactional Workers  
> **Primary Cloud API:** Official Meta WhatsApp Business Platform (Graph API v20.0)

---

## 1. High-Level Architectural Topology

CONVOZA is engineered as a production-grade, API-first SaaS platform designed to support at least 1,000 concurrent authenticated virtual users with sub-500ms P95 latency. The architecture cleanly separates user-facing traffic (REST APIs, Next.js web applications, and Socket.IO WebSockets) from high-volume asynchronous messaging tasks (bulk campaigns, outbox processors, and delivery webhook reconciliation).

```mermaid
flowchart TD
    subgraph Clients["Edge & Client Tier"]
        Browser["End Users & Agents (Browser / Mobile)"]
        MetaCloudAPI["Meta WhatsApp Cloud API (Webhooks)"]
        PaymentGateway["Razorpay Webhook Dispatcher"]
    end

    subgraph ReverseProxy["Edge Ingress Tier"]
        Nginx["Nginx Reverse Proxy & Load Balancer\n- SSL Termination\n- Rate Limiting (100r/s API, 250r/s Webhooks)\n- WebSocket Upgrade Engine"]
    end

    subgraph WebApps["Next.js Presentation Tier"]
        Website["Marketing Website (:3000)\n- 15 Public Pages, Pricing Calculator"]
        Dashboard["Customer Dashboard (:3001)\n- 3-Column Inbox, Campaign Wizard, Builder"]
        Admin["Super Admin Console (:3002)\n- Platform Metrics, Tenant Suspension"]
    end

    subgraph CoreBackend["NestJS API Tier (:4000)"]
        NestAPI["NestJS Core API Cluster (Multi-Replica)\n- TenantGuard (Strict Tenant Isolation)\n- RolesGuard (RBAC)\n- Swagger / OpenAPI Engine\n- Socket.IO Gateway (/inbox)"]
    end

    subgraph Workers["Asynchronous Worker Cluster"]
        MessageWorker["Message Worker\n- Outbox Consumer (FOR UPDATE SKIP LOCKED)\n- Exponential Backoff Retries\n- Rate Limiter (50 msg/sec/num)"]
        CampaignWorker["Campaign Worker\n- Multi-Batch Slicer (50 contacts/batch)\n- Consent Suppression Filter"]
        WebhookWorker["Webhook Worker\n- Delivery Status Reconciliation\n- Auto-Rule Trigger Evaluator"]
    end

    subgraph Storage["Persistence & Isolation Tier"]
        Postgres[("PostgreSQL 16 Relational Database\n- Connection Pooling\n- Outbox Event Table\n- Encrypted Credentials (AES-256-GCM)")]
        Volume[("Persistent Storage Volume\n- Encrypted Nightly SQL Dumps")]
    end

    Browser -->|HTTP/HTTPS| Nginx
    MetaCloudAPI -->|POST /webhooks/meta/whatsapp| Nginx
    PaymentGateway -->|POST /webhooks/razorpay| Nginx

    Nginx -->|Route /| Website
    Nginx -->|Route /dashboard/| Dashboard
    Nginx -->|Route /admin/| Admin
    Nginx -->|Route /api/v1/| NestAPI
    Nginx -->|Route /inbox (WS)| NestAPI

    Website -->|REST API calls| NestAPI
    Dashboard -->|REST API calls| NestAPI
    Admin -->|REST API calls| NestAPI

    NestAPI -->|Prisma Connection Pool| Postgres
    NestAPI -.->|Transactionally Enqueues| Postgres
    
    Postgres -->|FOR UPDATE SKIP LOCKED| MessageWorker
    Postgres -->|FOR UPDATE SKIP LOCKED| CampaignWorker
    Postgres -->|FOR UPDATE SKIP LOCKED| WebhookWorker

    MessageWorker -->|Graph API POST /{id}/messages| MetaCloudAPI
    WebhookWorker -->|Status Receipts & Notes| Postgres
    Postgres -->|Nightly Automated Dump| Volume
```

---

## 2. Monorepo Structure

CONVOZA is structured as a unified monorepo leveraging npm workspaces for package management and zero-runtime dependency bloat:

```
convoza/
├── apps/
│   ├── website/             # Next.js 14 marketing portal (15 complete pages)
│   ├── dashboard/           # Next.js 14 customer portal (WhatsApp green & navy UI)
│   ├── admin/               # Next.js 14 super admin control plane
│   └── api/                 # NestJS REST backend with OpenAPI/Swagger
├── workers/
│   ├── message-worker/      # Outbox processor for high-priority individual messages
│   ├── campaign-worker/     # High-throughput batch campaign dispatcher
│   └── webhook-worker/      # Ingestion and auto-reply trigger processor
├── packages/
│   ├── ui/                  # Reusable UI components & design system tokens
│   ├── shared-types/        # Canonical TypeScript models, DTOs & Enums
│   ├── validation/          # E.164 normalization & template validation schemas
│   └── configuration/       # AES-256-GCM crypto & environment constants
├── infrastructure/
│   ├── docker/              # Multi-stage production Dockerfiles
│   ├── nginx/               # Nginx reverse proxy configuration & rate limits
│   ├── database/            # Database initialization & migrations mirror
│   └── scripts/             # Encrypted backup & restore automation
├── docs/                    # Architectural & operational documentation
├── tests/                   # k6 load testing scripts & unit test suite
├── docker-compose.yml       # Local development multi-container environment
├── docker-compose.production.yml # High-availability production topology
└── README.md
```

---

## 3. Strict Multi-Tenancy & Data Isolation Model

CONVOZA enforces tenant safety at multiple architectural layers:

1. **Zero Trust for Client-Supplied Identifiers:**  
   The frontend never dictates tenant ownership. The `TenantGuard` extracts authenticated identity from verified JWT signatures and checks the database for active membership.
2. **Horizontal Privilege Escalation Prevention:**  
   Attempting to access another organization’s messages, contacts, campaigns, or credentials via modified URLs or headers is blocked with an immediate `403 Forbidden: Access denied` exception and recorded in the immutable `audit_logs` table.
3. **Database-Level Isolation:**  
   Every tenant-owned entity includes an indexed `organizationId` foreign key with cascade deletion safety. Unique constraints (e.g. `[organizationId, phone]`, `[organizationId, name, language]`) prevent cross-tenant collisions.
4. **Isolated Real-Time Channels:**  
   The Socket.IO WebSocket gateway authenticates clients before admitting connections. Each socket only joins rooms corresponding to active organization memberships (`org_<organizationId>`). Cross-tenant broadcasts are mathematically impossible.

---

## 4. Asynchronous Outbox Pattern & Worker Concurrency

To ensure that mass bulk campaigns never degrade dashboard response latency or shared inbox interactions, CONVOZA utilizes a PostgreSQL-backed **Transactional Outbox Queue** using row-level locking:

$$\text{Claim Query: } \text{SELECT id FROM outbox\_events WHERE status = 'PENDING' FOR UPDATE SKIP LOCKED LIMIT } N$$

- **Guaranteed Atomic Persistence:** Outbox jobs are inserted in the exact same database transaction as the message or campaign state change.
- **Worker Starvation & Crash Safety:** If a worker node crashes mid-execution, the locked job lock expires (`lockedAt + lockTimeout`), returning the task to the queue for retry.
- **Exponential Backoff:** Failed jobs retry with backoff formula:  
  $$\text{Delay}(n) = \min(60, 2^n \times 2) \text{ seconds}$$
- **Dead-Letter Queue:** After 5 failed attempts, jobs are flagged as `DEAD_LETTER` with detailed provider error strings logged.

---

## 5. WhatsApp Business Cloud API & Compliance

CONVOZA strictly integrates with the official **Meta WhatsApp Business Platform**:

- **Embedded Signup:** Allows end users to onboard numbers in under 2 minutes through Facebook Login for Business dialogs.
- **Permanent Access Tokens:** Stored exclusively encrypted using AES-256-GCM.
- **24-Hour Customer Window:** The platform tracks `customerWindowExpiresAt`. When closed, free-form text messages are programmatically disabled, and the UI forces selection of an approved Meta Template.
- **Consent Enforcement:** Contacts with `OPTED_OUT` consent status are automatically excluded from marketing broadcasts.

