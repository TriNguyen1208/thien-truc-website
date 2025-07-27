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