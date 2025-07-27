#!/bin/bash

# Load biến môi trường dạng KEY=VALUE (Node.js .env style)
set -a
source "$(dirname "$0")/../../server/.env"
set +a

# Biến đã được lấy ra từ .env
BACKUP_DIR="$(dirname "$0")/../backup"
DATE=$(date +'%Y-%m-%d_%H%M')
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.backup"

# Tạo backup
PG_DUMP_CMD=${PG_DUMP_PATH:-pg_dump}  # dùng biến nếu có, ngược lại mặc định là 'pg_dump'
PGPASSWORD="$DB_PASSWORD" "$PG_DUMP_CMD" -U "$DB_USER" -F c -f "$BACKUP_FILE" "$DB_NAME"

# Xóa backup cũ (chỉ giữ 14 file mới nhất)
cd "$BACKUP_DIR"
ls -1t backup_*.backup | tail -n +15 | xargs -d '\n' rm -f