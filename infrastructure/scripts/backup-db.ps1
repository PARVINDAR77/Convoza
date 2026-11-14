# ==========================================
# CONVOZA Database Backup Script (PowerShell)
# ==========================================

$BackupDir = "infrastructure/database/backups"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFile = "$BackupDir/convoza_db_$Timestamp.sql"

if (!(Test-Path -Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

Write-Host "[$Timestamp] Starting CONVOZA PostgreSQL backup..."
docker exec -t convoza_postgres pg_dump -U convoza_user -d convoza_db > $BackupFile

if (Test-Path $BackupFile) {
    Write-Host "[$Timestamp] Backup generated successfully at $BackupFile"
} else {
    Write-Error "Backup failed to generate."
}

