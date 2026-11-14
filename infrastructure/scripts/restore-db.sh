#!/usr/bin/env bash
# ==========================================
# CONVOZA Database Restore Script
# Restores an encrypted PostgreSQL dump
# ==========================================

set -euo pipefail

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_encrypted_backup_file.enc>"
    exit 1
fi

ENCRYPTED_FILE="$1"
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY:-convoza_default_backup_key_2026}"
TEMP_RESTORE="/tmp/convoza_restore_$$.sql.gz"

echo "Decrypting backup file..."
openssl enc -d -aes-256-cbc -in "${ENCRYPTED_FILE}" -out "${TEMP_RESTORE}" -k "${ENCRYPTION_KEY}"

echo "Restoring database to convoza_postgres container..."
gunzip -c "${TEMP_RESTORE}" | docker exec -i convoza_postgres psql -U convoza_user -d convoza_db

rm -f "${TEMP_RESTORE}"
echo "Database restored successfully!"
