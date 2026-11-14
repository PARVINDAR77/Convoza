# CONVOZA — REST API Reference Manual

> **API Version:** v1  
> **Base URL:** `http://localhost:4000/api/v1`  
> **Interactive OpenAPI / Swagger UI:** `http://localhost:4000/api/docs`  
> **Authentication:** Bearer Token (JWT) or API Key (`cvz_live_...`)  
> **Tenant Scoping Header:** `x-organization-id: <ORGANIZATION_UUID>`

---

## 1. Standard Response & Error Envelope

All API endpoints return a standardized JSON envelope:

### Success Response (HTTP 200 / 201)
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8,
    "timestamp": "2026-11-14T10:14:49.000Z"
  }
}
```

### Error Response (HTTP 4xx / 5xx)
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "The 24-hour customer service window is closed. Meta policy mandates an approved WhatsApp Template message.",
    "details": null
  },
  "meta": {
    "timestamp": "2026-11-14T10:14:49.000Z"
  }
}
```

---

## 2. API Endpoints Catalog

### 2.1 Authentication & Multi-Tenancy
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new user, organization, and 14-day trial |
| `POST` | `/auth/login` | Authenticate email/password, returns access & refresh tokens |
| `POST` | `/auth/refresh` | Rotate refresh token and retrieve new access token |
| `POST` | `/auth/logout` | Revoke active user session |
| `GET` | `/auth/me` | Retrieve authenticated profile and organization memberships |

### 2.2 Organizations & Team RBAC
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/organizations` | List all organizations user belongs to |
| `POST` | `/organizations` | Create an additional organization |
| `GET` | `/organizations/:id` | Get organization details, subscription, and assets |
| `PATCH` | `/organizations/:id` | Update organization name or branding |
| `GET` | `/organizations/:id/members` | List team members and active invitations |
| `POST` | `/organizations/:id/invitations` | Invite a new team member with specific role |
| `DELETE` | `/organizations/:id/members/:memberId` | Remove member from organization |

### 2.3 WhatsApp Business Platform Integration
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/whatsapp/accounts` | List connected WABA accounts and phone numbers |
| `POST` | `/whatsapp/manual/validate` | Test credentials directly with Meta Cloud API |
| `POST` | `/whatsapp/manual/connect` | Store WABA credentials encrypted (AES-256-GCM) |
| `POST` | `/whatsapp/embedded-signup/session` | Initiate Meta Embedded Signup session |
| `POST` | `/whatsapp/embedded-signup/callback` | Server-side OAuth token exchange for Embedded Signup |
| `POST` | `/whatsapp/accounts/:id/sync` | Reconcile quality rating and limits with Meta |
| `DELETE` | `/whatsapp/accounts/:id` | Disconnect WhatsApp account and erase credentials |

### 2.4 WhatsApp Message Templates
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/templates` | List message templates with category & status filters |
| `POST` | `/templates` | Create a new local draft template |
| `GET` | `/templates/:id` | Get template components, variables, and rejection reasons |
| `PATCH` | `/templates/:id` | Edit draft or rejected template |
| `DELETE` | `/templates/:id` | Delete local draft template |
| `POST` | `/templates/:id/submit` | Submit template to Meta for official review |
| `POST` | `/templates/sync` | Pull latest template statuses from Meta Graph API |

### 2.5 Contacts & Audience Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/contacts` | Paginated contacts list with search and tag filters |
| `POST` | `/contacts` | Create contact with E.164 normalization and consent log |
| `GET` | `/contacts/:id` | Get contact history, consent logs, and conversations |
| `PATCH` | `/contacts/:id` | Update contact details or consent status |
| `DELETE` | `/contacts/:id` | Delete contact |
| `POST` | `/contacts/import` | Bulk import CSV/JSON contacts with duplicate handling |
| `GET` | `/contacts/export` | Export contacts to CSV format |
| `GET` | `/contacts/tags` | List all contact tags |
| `GET` | `/contacts/lists` | List contact audience segments |

### 2.6 Individual WhatsApp Messages
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/messages/send` | Send individual message with 24h window validation |
| `GET` | `/messages` | List sent and received messages with filter parameters |
| `GET` | `/messages/:id` | Get message delivery timeline and status events |

### 2.7 Bulk WhatsApp Campaigns
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/campaigns` | List campaigns with status, sent, and read counters |
| `POST` | `/campaigns` | Create new campaign with audience & variable mappings |
| `GET` | `/campaigns/:id` | Get campaign details and recipient breakdown |
| `POST` | `/campaigns/:id/estimate` | Calculate audience size and excluded opt-outs |
| `POST` | `/campaigns/:id/start` | Enqueue campaign for execution by background worker |
| `POST` | `/campaigns/:id/pause` | Pause an actively running campaign |
| `POST` | `/campaigns/:id/resume` | Resume a paused campaign |
| `POST` | `/campaigns/:id/cancel` | Cancel campaign |
| `GET` | `/campaigns/:id/analytics` | Delivery, read, and reply rate breakdown |

### 2.8 Shared WhatsApp Team Inbox
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/inbox/conversations` | List conversations with status, assigned agent, and unread filter |
| `GET` | `/inbox/conversations/:id` | Get conversation details and 24h window expiry |
| `GET` | `/inbox/conversations/:id/messages` | Paginated message thread history |
| `POST` | `/inbox/conversations/:id/reply` | Send reply (verifies customer window or template) |
| `POST` | `/inbox/conversations/:id/assign` | Assign conversation to a specific agent |
| `POST` | `/inbox/conversations/:id/resolve` | Mark conversation resolved or reopen |
| `POST` | `/inbox/conversations/:id/notes` | Add private internal note visible only to team |

### 2.9 Automations & Rule Engine
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/automations` | List all automation rules |
| `POST` | `/automations` | Create rule (trigger, conditions, automated actions) |
| `GET` | `/automations/:id` | Get rule details and execution logs |
| `PATCH` | `/automations/:id` | Update rule parameters |
| `POST` | `/automations/:id/activate` | Enable automation rule |
| `POST` | `/automations/:id/deactivate` | Disable automation rule |
| `DELETE` | `/automations/:id` | Delete automation rule |

### 2.10 Subscriptions & Billing
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/billing/plans` | List active plans (Starter, Growth, Enterprise) |
| `GET` | `/billing/subscription` | Current plan, renewal date, and quotas |
| `POST` | `/billing/checkout` | Create Razorpay order for plan subscription |
| `POST` | `/billing/verify` | Verify Razorpay payment signature server-side |
| `GET` | `/billing/invoices` | List past invoices and receipts |
| `GET` | `/billing/usage` | Usage meters vs plan limits for current billing period |

### 2.11 Webhooks Ingestion
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/webhooks/meta/whatsapp` | Meta Webhook Verification challenge handler |
| `POST` | `/webhooks/meta/whatsapp` | Ingest delivery status updates and inbound messages |
| `POST` | `/webhooks/razorpay` | Ingest Razorpay payment and renewal events |

### 2.12 Super Admin Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/dashboard` | Platform MRR, total users, orgs, and queue health |
| `GET` | `/admin/organizations` | Search all registered organizations |
| `PATCH` | `/admin/organizations/:id/suspend` | Suspend tenant with reason |
| `PATCH` | `/admin/organizations/:id/restore` | Restore suspended tenant to active status |
| `GET` | `/admin/users` | Directory of all users across tenants |
| `GET` | `/admin/audit-logs` | Platform-wide security audit trail |
