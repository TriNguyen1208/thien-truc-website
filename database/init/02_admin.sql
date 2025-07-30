CREATE SCHEMA about_us

-- Bảng tài khoản
CREATE TABLE admin.accounts (
	username VARCHAR(20) PRIMARY KEY,
	role VARCHAR(10) CHECK (role IN ('admin','manager')),
	password TEXT,
	fullname VARCHAR(100),
	phone VARCHAR(20),
	email VARCHAR(100),
	position VARCHAR(500),
	description VARCHAR(500)
);

-- Bảng log hoạt động
CREATE TABLE admin.activity_logs (
	id SERIAL PRIMARY KEY,
	content TEXT,
	username VARCHAR(20) REFERENCES admin.accounts(username),
	time TIMESTAMPTZ DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')
);

-- ✅ FUNCTION: Tự động giữ lại tối đa 100 dòng log mới nhất
CREATE OR REPLACE FUNCTION admin.trim_activity_logs()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM admin.activity_logs
    WHERE id NOT IN (
        SELECT id FROM admin.activity_logs
        ORDER BY time DESC
        LIMIT 1000
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ✅ TRIGGER: Gọi function trên sau mỗi lần insert
CREATE TRIGGER trg_trim_activity_logs
AFTER INSERT ON admin.activity_logs
FOR EACH STATEMENT
EXECUTE FUNCTION admin.trim_activity_logs();