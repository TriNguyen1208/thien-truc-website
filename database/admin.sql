create table admin.accounts (
	username varchar(20) primary key,
	role varchar(10) check (role in ('admin','manager')),
	password text,
	fullname varchar(100),
	phone varchar(20),
	email varchar(100),
	position varchar(500),
	description varchar(500)
);

create table admin.activity_logs (
	id serial primary key,
	content text,
	username varchar(20) references admin.accounts(username),
	time timestamptz
);

ALTER TABLE admin.activity_logs
ALTER COLUMN time SET DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh');

insert into admin.accounts (username, role, password, fullname, phone, email, position, description)
values
('admin', 'admin', 'dothanhtung123', 'Đỗ Thanh Tùng', null, null, null, null),
('manager1', 'manager', 'passmanager1@', 'Nguyễn Văn A', '0123456789', 'nguyenvana@gmail.com', 'Quản lý bán hàng', 'Phụ trách khu vực miền Bắc'),
('manager2', 'manager', 'passmanager2@', 'Nguyễn Văn B', '0987654321', 'nguyenvanb@gmail.com', 'Chăm sóc khách hàng', 'Hoạt động 24/7 trên đường hotline'),
('manager3', 'manager', 'passmanager3@', 'Nguyễn Văn C', '0865132548', 'nguyenvanc@gmail.com', 'Kỹ thuật viên', 'Kiểm tra linh kiện, báo cáo lỗi');

insert into admin.activity_logs (content, username, time)
values
('Thêm sản phẩm mới: iPhone 15 Pro Max', 'manager1', '7/1/2025 08:00:00'),
('Xóa tin tức: Công trình kiến trúc mới tại Cao Lãnh - Đồng Tháp', 'manager2', '7/3/2025 08:25:00'),
('Thêm manager mới: manager4', 'admin', '7/3/2025 15:30:00'),
('Thêm phân loại dự án: Tây Nguyên', 'manager3', '7/5/2025 10:00:00'),
('Chỉnh sửa tin tức: Trung tâm thương mại Lotte Centre', 'manager1', '7/6/2025 11:51:00');