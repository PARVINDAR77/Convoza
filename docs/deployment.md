# CONVOZA — Production Deployment & DevOps Runbook

> **Target Environment:** Docker, Docker Compose, Nginx, PostgreSQL 16  
> **Topology:** Edge Load Balancer + Multi-Replica API + Asynchronous Workers + Persistent PostgreSQL  
> **High-Availability Target:** 99.9% Uptime, 1,000 Concurrent Authenticated Users

---

## 1. Production Architecture Overview

In production, CONVOZA isolates internal services from public ingress:

```
Internet (Port 80 / 443)
       │
       ▼
 ┌───────────────┐
 │  Nginx Edge   │  (SSL Termination, Gzip, Rate Limiter)
 └───────┬───────┘
         │
   Internal Docker Network (convoza_internal_net)
   ├── Next.js Website (:3000)
   ├── Next.js Dashboard (:3001)
   ├── Next.js Super Admin (:3002)
   ├── NestJS API Replicas (:4000) [Replicas: 2+]
   ├── Message Workers [Replicas: 2+]
   ├── Campaign Workers [Replicas: 2+]
   ├── Webhook Workers [Replicas: 2+]
   └── PostgreSQL 16 (Port 5432 - Not publicly exposed)
```

---

## 2. Server Preparation & Environment Configuration

### Step 1: Clone Repository
```bash
git clone https://github.com/convoza/convoza.git
cd convoza
```

### Step 2: Configure Production Secrets
Create a production `.env` file using `.env.example`:
```bash
cp .env.example .env.production
```

Ensure the following critical secrets are generated securely:
```ini
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://convoza_user:YOUR_STRONG_PASSWORD@postgres:5432/convoza_db?schema=public&connection_limit=30"

# Cryptographic Master Key (Must be exactly 32 bytes)
CREDENTIALS_ENCRYPTION_KEY="YOUR_32_BYTE_HEX_ENCRYPTION_KEY"

# Authentication Secrets
JWT_SECRET="YOUR_HIGH_ENTROPY_JWT_SECRET_KEY"
REFRESH_TOKEN_SECRET="YOUR_HIGH_ENTROPY_REFRESH_TOKEN_KEY"

# Meta WhatsApp Platform
META_APP_ID="1234567890"
META_APP_SECRET="YOUR_META_APP_SECRET"
META_WEBHOOK_VERIFY_TOKEN="YOUR_META_VERIFY_TOKEN"

# Razorpay Subscriptions
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="YOUR_RAZORPAY_SECRET"
RAZORPAY_WEBHOOK_SECRET="YOUR_RAZORPAY_WEBHOOK_SECRET"
```

---

## 3. Starting the Platform with Docker Compose

### 3.1 Launch Production Services
```bash
docker compose -f docker-compose.production.yml --env-file .env.production up -d --build
```

### 3.2 Run Database Migrations & Seeds
Once the PostgreSQL container is reported healthy:
```bash
docker compose -f docker-compose.production.yml exec api npx prisma migrate deploy
docker compose -f docker-compose.production.yml exec api npm run prisma:seed
```

### 3.3 Verify Container Health
```bash
docker compose -f docker-compose.production.yml ps
```
All containers should display status `Up (healthy)`.

---

## 4. Database Backup & Disaster Recovery

### Automated Encrypted Backup
The backup script dumps the database, compresses it with gzip, and encrypts it using AES-256-CBC:
```bash
chmod +x infrastructure/scripts/backup-db.sh
./infrastructure/scripts/backup-db.sh
```

To schedule nightly automated backups, add to crontab:
```cron
0 2 * * * /path/to/convoza/infrastructure/scripts/backup-db.sh >> /var/log/convoza_backup.log 2>&1
```

### Restoring Database from Backup
```bash
chmod +x infrastructure/scripts/restore-db.sh
./infrastructure/scripts/restore-db.sh /var/backups/convoza/convoza_db_20261114_020000.sql.gz.enc
```

---

## 5. Horizontal Scaling & High-Availability Adjustments

To scale NestJS API replicas or worker replicas under high campaign loads:
```bash
docker compose -f docker-compose.production.yml up -d --scale api=4 --scale message-worker=4 --scale campaign-worker=3
```

---

## 6. Zero-Downtime Rollback Procedure

If a deployed version causes unexpected errors:
1. Identify the previous stable git commit tag: `git checkout v1.0.0-stable`
2. Rebuild and restart containers:
   ```bash
   docker compose -f docker-compose.production.yml up -d --build --no-deps api
   ```
3. Re-verify healthcheck endpoint: `curl -f http://localhost:4000/api/v1/health`

