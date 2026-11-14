# CONVOZA — Conversations. Connected.
### Complete WhatsApp Business Automation SaaS Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016-336791.svg)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748.svg)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Containers-Docker%20Compose-2496ED.svg)](https://www.docker.com/)
[![Meta Cloud API](https://img.shields.io/badge/Integration-Official%20Meta%20Cloud%20API%20v20.0-008069.svg)](https://developers.facebook.com/)

---

## 1. Product Overview

**CONVOZA** is an enterprise-grade, independent WhatsApp Business Automation SaaS platform. Built on the official **Meta WhatsApp Business Platform Cloud API**, CONVOZA allows businesses, agencies, and e-commerce leaders to broadcast high-throughput campaigns, manage shared team inboxes, design approved message templates, configure rule-based automations, and manage multi-tenant organizations with strict isolation.

### Key Value Pillars
- **Zero Scraping / Official Meta Cloud API:** 100% compliant with Meta business policies. No QR code browser scraping, no session hijacking, zero account ban risks.
- **Dual Onboarding Paths:** One-click **Meta Embedded Signup** wizard via Facebook Login for Business dialogs, plus an authorized **Manual WABA Credentials** connector.
- **Tenant-Safe Architecture:** Hardened tenant isolation via backend `TenantGuard`, preventing cross-tenant leakage and horizontal privilege escalation.
- **Asynchronous Outbox Engine:** PostgreSQL-backed transactional worker queues (`FOR UPDATE SKIP LOCKED`) process up to 50 messages/second per phone number without impacting web UI latency.
- **Capacity Validated:** Formally benchmarked for **1,000 concurrent authenticated virtual users** with sub-500ms P95 latency.

---

## 2. Technology Stack

- **Frontend Presentation:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Socket.IO Client.
- **Backend API:** NestJS (Modular Monolith), TypeScript, Swagger / OpenAPI, Passport JWT, Socket.IO Gateway, Helmet, Compression.
- **Database & Persistence:** PostgreSQL 16, Prisma ORM, Connection Pooling.
- **Asynchronous Processing:** Standalone Node.js workers claiming jobs via PostgreSQL row locking (`FOR UPDATE SKIP LOCKED`).
- **Edge Infrastructure:** Docker, Docker Compose, Nginx Reverse Proxy with SSL, Rate Limiting, and WebSocket upgrades.

---

## 3. Monorepo Structure

```
convoza/
│
├── apps/
│   ├── website/              # Public marketing site (15 complete pages) [:3000]
│   ├── dashboard/            # Customer portal (Dark navy & WhatsApp green UI) [:3001]
│   ├── admin/                # Super Admin portal (Platform metrics & tenant management) [:3002]
│   └── api/                  # NestJS central REST API & WebSocket server [:4000]
│
├── workers/
│   ├── message-worker/       # High-priority individual message outbox processor
│   ├── campaign-worker/      # High-throughput batch campaign slicer
│   └── webhook-worker/       # Meta delivery status and auto-reply trigger processor
│
├── packages/
│   ├── ui/                   # Shared UI primitives, design tokens, stat cards, badges
│   ├── shared-types/         # Canonical TypeScript definitions, enums, API models
│   ├── validation/           # E.164 normalization, contact validation, template rules
│   └── configuration/        # AES-256-GCM encryption & environment constants
│
├── infrastructure/
│   ├── docker/               # Production multi-stage Dockerfiles
│   ├── nginx/                # Production Nginx reverse proxy configuration
│   ├── database/             # Prisma schema mirror & migrations
│   └── scripts/              # Automated encrypted backup & restore utilities
│
├── docs/
│   ├── architecture.md       # High-level architecture, topology & data flow
│   ├── database.md           # ER diagram, table schemas, indexes & pooling
│   ├── api-reference.md      # Comprehensive REST API catalog
│   ├── meta-integration.md   # Meta Embedded Signup & Cloud API integration guide
│   ├── deployment.md         # Production Docker deployment runbook
│   ├── security.md           # AES-256-GCM encryption, RTR, RBAC, threat model
│   └── load-testing-report.md# k6 benchmark results for 1,000 concurrent VUs
│
├── tests/
│   ├── unit/                 # Security, crypto, and normalization unit tests
│   └── k6/                   # Distributed load-testing scripts
│
├── docker-compose.yml        # Development multi-container environment
├── docker-compose.production.yml # Multi-replica production stack
├── .env.example              # Environment variables template
└── README.md
```

---

## 4. Quickstart Guide

### 4.1 Prerequisites
- **Node.js:** v20.0.0 or higher
- **npm:** v10.0.0 or higher
- **Docker & Docker Compose:** Latest stable release
- **PostgreSQL 16:** (Installed locally or run via Docker)

### 4.2 Local Environment Setup
1. Clone repository and install dependencies:
   ```bash
   git clone https://github.com/convoza/convoza.git
   cd convoza
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Build shared packages:
   ```bash
   npm run build --workspace=@convoza/shared-types
   npm run build --workspace=@convoza/configuration
   npm run build --workspace=@convoza/validation
   npm run build --workspace=@convoza/ui
   ```

4. Generate Prisma Client and apply migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. Start the development servers:
   ```bash
   # Terminal 1: Backend API
   npm run dev:api

   # Terminal 2: Customer Dashboard
   npm run dev:dashboard

   # Terminal 3: Marketing Website
   npm run dev:website

   # Terminal 4: Background Message Worker
   npm run dev:message-worker
   ```

---

## 5. Docker Deployment

### 5.1 Development Stack
To start the entire platform (PostgreSQL, NestJS API, Workers, Website, Dashboard, Admin) with a single command:
```bash
docker compose up --build
```

### 5.2 Production Multi-Replica Deployment
```bash
docker compose -f docker-compose.production.yml --env-file .env.production up -d --build
```

---

## 6. Access Endpoints & Default Credentials

| Service | Port / URL | Description |
|---|---|---|
| **Marketing Website** | `http://localhost:3000` | 15 public pages, pricing, features, docs |
| **Customer Dashboard** | `http://localhost:3001` | Customer operations, campaigns, inbox, templates |
| **Super Admin Console**| `http://localhost:3002` | Platform health, tenant suspension, MRR metrics |
| **NestJS REST API**    | `http://localhost:4000/api/v1` | Core API endpoints |
| **OpenAPI / Swagger**  | `http://localhost:4000/api/docs` | Interactive API documentation |

### Default Seeded Accounts
- **Super Administrator:**  
  Email: `admin@convoza.io`  
  Password: `Admin@Convoza2026!`
- **Demo Organization Owner (Apex Global Retail):**  
  Email: `alex@apexretail.com`  
  Password: `Demo@Convoza2026!`

---

## 7. Testing & Verification

### 7.1 Run Unit Tests
Verifies AES-256-GCM token encryption, Meta HMAC SHA-256 signature verification, and E.164 phone normalization:
```bash
npm run test:unit
```

### 7.2 Run k6 Load Testing (1,000 Concurrent VUs)
```bash
npm run test:k6
```
*(Review `docs/load-testing-report.md` for full benchmark metrics, latency distributions, and throughput tables).*

---

## 8. License & Commercial Support

CONVOZA is licensed under proprietary commercial terms. For enterprise licensing, custom SLAs, or dedicated tech provider setup, visit [convoza.io](http://localhost:3000) or contact `enterprise@convoza.io`.

