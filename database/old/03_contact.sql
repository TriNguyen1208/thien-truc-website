DROP TABLE IF EXISTS contact.contact_page CASCADE;
DROP TABLE IF EXISTS contact.support_agents CASCADE;
DROP TABLE IF EXISTS contact.company_info CASCADE;

CREATE SCHEMA IF NOT EXISTS contact;

create table contact.contact_page (
	banner_title varchar(100),
	banner_description varchar(300),
	is_visible BOOLEAN
);

create table contact.support_agents (
	id SERIAL primary key,
	avatar_img text,
	name varchar(50),
	role varchar(50),
	phone_number varchar(20),
	facebook_url text
);

create table contact.company_info (
	company_email varchar(50),
	company_phone varchar(20)[],
	hotline varchar(20)[],
	office_address text[],
	main_office_id int,
	googlemaps_embed_url text,
	working_hours text[],
	fanpage_url text
);

insert into contact.contact_page (banner_title, banner_description, is_visible)
values (
	'Liên Hệ Với Thiên Trúc',
	'Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ ngay với đội ngũ của chúng tôi để được
tư vấn và giải đáp mọi thắc mắc.',
	false
);

insert into contact.support_agents (avatar_img, name, role, phone_number, facebook_url)
values (
	'https://d3pc1xvrcw35tl.cloudfront.net/ln/feedImages/686x514/fb131e239fda069da09a9b0663ba45dc_9j6qpaW_202410.jpg',
	'Nguyễn Văn 1',
	'Chủ Tịch',
	'0123456789',
	'https://www.facebook.com/thoriedgold790/'
), (
	'https://upload.wikimedia.org/wikipedia/commons/b/b7/Phamnhatvuong2024.jpg',
	'Nguyễn Văn 2',
	'Vai trò 2',
	'0378456215',
	'https://www.facebook.com/onguyenminhtri.559391'
), (
	'https://www.misa.com.vn/Portals/0/Upload2017/gmailcom/Images/the_anh_ctv2/77-tam-nhin-cua-jack-ma-da-dua-alibaba-tro-thanh.jpg',
	'Nguyễn Văn 3',
	'Vai trò 3',
	'0785623458',
	'https://www.facebook.com/tringuyen.0981'
), (
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtaZ1yfHlUF7cmsxqWX_yNfov6QrBFNX2cTg&s',
	'Nguyễn Văn 4',
	'Vai trò 4',
	'0987625558',
	'https://www.facebook.com/dvan.ha.2024'
);

insert into contact.company_info (company_email, company_phone, hotline, office_address, main_office_id, googlemaps_embed_url, working_hours, fanpage_url)
values (
	'thientruc@gmail.com',
	ARRAY['+84 (28) 3823-4567', '1400 6569'],
	ARRAY['1900 1234', '1400 5678'],
	ARRAY['{"id":1,
"address": "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam",
"googlemaps_url": "https://maps.app.goo.gl/cJbjVU9VCJkm97Qj6"
}'],
	1,
	'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4040.9932555436394!2d105.62270918007567!3d10.461761438301883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a65a95e9be225%3A0x4ef2b896694c8799!2zQ3R5IENQQ04gVGhpw6puIFRyw7pj!5e1!3m2!1svi!2s!4v1755096301817!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
	ARRAY['Thứ Hai - Thứ Sáu: 8:30 - 17:30', 'Thứ Bảy - Chủ Nhật: Đóng cửa'],
	'https://www.facebook.com/thientruc.vn/'
);