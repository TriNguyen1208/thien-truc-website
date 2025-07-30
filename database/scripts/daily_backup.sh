#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load .env
set -a
source "$SCRIPT_DIR/../../server/.env"
set +a

BACKUP_DIR="$SCRIPT_DIR/../backup"
mkdir -p "$BACKUP_DIR"

DATE=$(date +'%Y-%m-%d_%H%M')
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.backup"

# Sử dụng pg_dump từ đường dẫn tuyệt đối
PG_DUMP_CMD="/d/AlternativeDiskC/PostgreSQL/17/bin/pg_dump.exe"

echo "→ Dumping $DB_NAME to $BACKUP_FILE ..."
PGPASSWORD="$DB_PASSWORD" "$PG_DUMP_CMD" -U "$DB_USER" -F c -f "$BACKUP_FILE" "$DB_NAME" 2> "$BACKUP_DIR/backup_error.log"

# Cleanup
cd "$BACKUP_DIR" || exit
ls -1t backup_*.backup 2>/dev/null | tail -n +15 | xargs -d '\n' rm -f
