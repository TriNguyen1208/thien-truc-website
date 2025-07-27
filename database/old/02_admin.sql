-- Tạo schema nếu chưa có
CREATE SCHEMA IF NOT EXISTS admin;

-- Xóa bảng cũ nếu tồn tại
DROP TABLE IF EXISTS admin.activity_logs CASCADE;
DROP TABLE IF EXISTS admin.accounts CASCADE;

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

-- Dữ liệu mẫu tài khoản
INSERT INTO admin.accounts (username, role, password, fullname, phone, email, position, description)
VALUES
('admin', 'admin', '$2b$10$1eJLS.ylyhn3qz.Ouk6BrOOCYtK9sw.ldI4PSEH9BzOgjv0lYRdg.', 'Đỗ Thanh Tùng', NULL, NULL, NULL, NULL),
('manager1', 'manager', '$2b$10$/wijgqAX2fSLYmCEGSyHJ.3l1VapCLga4w9CgGURr2XKC2dgXVz0S', 'Nguyễn Văn A', '0123456789', 'nguyenvana@gmail.com', 'Quản lý bán hàng', 'Phụ trách khu vực miền Bắc'),
('manager2', 'manager', '$2b$10$m4M/EuAd5zemr2XEniyP0edZKRFm7XPtHD1EP41gCxVd5.m39AFoe', 'Nguyễn Văn B', '0987654321', 'nguyenvanb@gmail.com', 'Chăm sóc khách hàng', 'Hoạt động 24/7 trên đường hotline'),
('manager3', 'manager', '$2b$10$mJFAgszx1.nxnRL0pSejMOiRiQsD1CdWgYEoWBn9Hw9vFtyGGg52m', 'Nguyễn Văn C', '0865132548', 'nguyenvanc@gmail.com', 'Kỹ thuật viên', 'Kiểm tra linh kiện, báo cáo lỗi');

-- Dữ liệu mẫu activity_logs
INSERT INTO admin.activity_logs (content, username, time)
VALUES
('Thêm sản phẩm mới: iPhone 15 Pro Max', 'manager1', '2025-07-01 08:00:00+07'),
('Xóa tin tức: Công trình kiến trúc mới tại Cao Lãnh - Đồng Tháp', 'manager2', '2025-07-03 08:25:00+07'),
('Thêm manager mới: manager4', 'admin', '2025-07-03 15:30:00+07'),
('Thêm phân loại dự án: Tây Nguyên', 'manager3', '2025-07-05 10:00:00+07'),
('Chỉnh sửa tin tức: Trung tâm thương mại Lotte Centre', 'manager1', '2025-07-06 11:51:00+07');