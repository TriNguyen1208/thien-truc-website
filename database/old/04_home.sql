DROP TABLE IF EXISTS home.home_page CASCADE;
DROP TABLE IF EXISTS home.highlight_stats_about_us CASCADE;

CREATE SCHEMA IF NOT EXISTS home;

create table home.home_page (
	banner_images text[],
	banner_title varchar(100),
	banner_description varchar(300),
	aboutus_content text,
	aboutus_img text,
    banner_switch_time float,
	news_switch_time float,
	is_visible boolean
);

create table home.highlight_stats_about_us (
	id serial primary key,
	number_text varchar(10),
	label varchar(50)
);

insert into home.home_page (banner_images, banner_title, banner_description, aboutus_content, aboutus_img, banner_switch_time, news_switch_time, is_visible)
values
(
	ARRAY[
		'https://fpttelecom-online.com/wp-content/uploads/2021/11/ngang.webp',
		'https://fpttelecom.online/wp-content/uploads/2019/02/lap-mang-fpt-truyen-hinh-gia-hap-dan.jpg',
		'https://fptvungtau.com.vn/wp-content/uploads/2024/12/Tu-Van-Lap-Dat-Internet-FPT-1400x478.jpg'	
	],
	'Thi Công & Lắp Ráp Công Trình Điện Tử & Chuyên Nghiệp Toàn Quốc',
	'Công Ty Thiên Trúc cung cấp dịch vụ lắp ráp, thi công các thiết bị điện tử như màn hình LED, camera giám sát, bảng hiển thị... cho các công trình dân dụng và công nghiệp. Chúng tôi cam kết mang đến giải pháp kỹ thuật chất lượng, thi công đúng tiến độ và dịch vụ hậu mãi chuyên nghiệp.',
	'Được thành lập vào năm 2005, Công ty Thiên Trúc đã khẳng định vị thế là nhà cung cấp hàng đầu về giải pháp chiếu sáng LED trên khắp Việt Nam. Với hơn 15 năm kinh nghiệm, chúng tôi đã hoàn thành thành công hơn 500 dự án trên toàn quốc. Đội ngũ kỹ sư và kỹ thuật viên chiếu sáng được chứng nhận của chúng tôi cam kết cung cấp các giải pháp chiếu sáng tiết kiệm năng lượng, sáng tạo và chất lượng cao cho khách hàng thương mại, dân dụng và công nghiệp.',
	'https://vietnamcert.vn/wp-content/uploads/2018/11/cong-ty-thien-truc.jpg',
	'1.50',
	'2.00',
	true
);

insert into home.highlight_stats_about_us (number_text, label)
values 
	('15+', 'Năm Kinh Nghiệm'),
	('500+', 'Dự Án Hoàn Thành'),
	('50+', 'Nhân Viên Chuyên Nghiệp');
