CREATE SCHEMA home

create table home.home_page (
	banner_title varchar(100),
	banner_description varchar(300),
	aboutus_content text,
	aboutus_img text,
	news_switch_time float
);

create table home.highlight_stats_about_us (
	id serial primary key,
	number_text varchar(10),
	label varchar(50)
);