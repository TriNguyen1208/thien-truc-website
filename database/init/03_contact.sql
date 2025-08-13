CREATE SCHEMA contact

create table contact.contact_page (
	banner_title varchar(100),
	banner_description varchar(300)
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