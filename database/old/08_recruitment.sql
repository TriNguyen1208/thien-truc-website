DROP TABLE IF EXISTS recruitment.recruitment_page CASCADE;

CREATE SCHEMA IF NOT EXISTS recruitment;

create table recruitment.recruitment_page (
	banner_title varchar(100),
	banner_description varchar(300),
	culture_content text,
	culture_img_1 text,
	culture_img_2 text,
	culture_img_3 text,
	culture_img_4 text,
	is_visible boolean
);

insert into recruitment.recruitment_page
values (
	'Tuyển dụng tại Thiên Trúc',
	'Tham gia đội ngũ của chúng tôi và cùng nhau tạo ra những sản phẩm chất lượng cao cho mọi khách hàng',
	'Tại Thiên Trúc, chúng tôi tự hào xây dựng một văn hóa làm việc đổi mới, hiệu quả và hợp tác. Chúng tôi tin rằng những sản phẩm điện tử chất lượng cao được tạo ra từ một môi trường nơi mọi thành viên được phát huy tối đa năng lực của mình. Chúng tôi khuyến khích đổi mới, tư duy phản biện và sự xuất sắc trong mọi khía cạnh của công việc. Đội ngũ của chúng tôi được thúc đẩy bởi niềm đam mê chung trong việc tạo ra các giải pháp công nghệ tiên tiến, mang lại giá trị thực tiễn và trải nghiệm vượt trội cho người dùng. Chúng tôi cũng cam kết thúc đẩy sự đa dạng và hòa nhập, tin rằng những góc nhìn đa chiều giúp làm phong phú thêm quá trình phát triển sản phẩm và cho phép chúng tôi phục vụ tốt hơn nhu cầu đa dạng của khách hàng trên khắp thị trường.',
	'http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/2.jpg.aspx?width=529&height=375',
	'http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/13.jpg.aspx?width=542&height=400',
	'http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/3.jpg.aspx?width=572&height=391',
	'http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/4.jpg.aspx?width=570&height=473',
	true
);  