#!/usr/bin/env bash
# ==========================================
# CONVOZA Database Backup Script
# Creates an encrypted PostgreSQL dump
# ==========================================

set -euo pipefail

BACKUP_DIR="/var/backups/convoza"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/convoza_db_${TIMESTAMP}.sql.gz"
ENCRYPTED_FILE="${BACKUP_FILE}.enc"
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY:-convoza_default_backup_key_2026}"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting CONVOZA PostgreSQL backup..."

# Dump and compress database
docker exec -t convoza_postgres pg_dump -U convoza_user -d convoza_db | gzip > "${BACKUP_FILE}"

# Encrypt using openssl aes-256-cbc
openssl enc -aes-256-cbc -salt -in "${BACKUP_FILE}" -out "${ENCRYPTED_FILE}" -k "${ENCRYPTION_KEY}"
rm -f "${BACKUP_FILE}"

echo "[$(date)] Backup completed successfully: ${ENCRYPTED_FILE}"

# Retention: Delete backups older than 30 days
find "${BACKUP_DIR}" -type f -name "*.enc" -mtime +30 -delete
echo "[$(date)] Retention policy applied. Backups older than 30 days cleaned."

