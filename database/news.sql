drop table if exists news.news_page cascade;
drop table if exists news.news_categories cascade;
drop table if exists news.news cascade;
drop table if exists news.news_contents cascade;
drop table if exists news.featured_news cascade;

CREATE SCHEMA IF NOT EXISTS news;

create table news.news_page
(
	banner_title varchar(100),
	banner_description varchar(300)
);

create table news.news_categories
(
	id serial primary key,
	name varchar(50),
	rgb_color char(7),
	item_count int
);


create table news.news
(
	id serial primary key,
	category_id int references news.news_categories(id),
	title varchar(100),
	is_published boolean,
	public_date date,
	measure_time int,
	num_readers int,
	main_img text,
	main_content varchar(200)
);

create table news.news_contents
(
	news_id int primary key references news.news(id),
	content text
);

create table news.featured_news (
	news_id int primary key references news.news(id),
	sort int
);

insert into news.news_page(banner_title, banner_description)
	values('Những Thông Tin Mới Nhất Về Thiên Trúc', 'Cập nhật liên tục các tin tức về hoạt động, dự án mới, xu hướng công nghệ LED và giải pháp chiếu sáng hiện đại do Thiên Trúc thực hiện');
	
insert into news.news_categories(name, rgb_color, item_count)
	values ('Công Ty', '#059669', 9),
		   ('Dự Án', '#FF3B30', 2),
		   ('Sự kiện', '#A855F7', 2),
		   ('Tuyển Dụng', '#A2845E', 2),
		   ('Thành Tựu', '#F59E0B', 2),
		   ('Sản phẩm', '#3B82F6', 2);

insert into news.news(category_id, title, is_published, public_date, measure_time, num_readers, main_img, main_content)
	values(1, 'FPT vào Top 40 doanh nghiệp CNTT châu Á', true, '06/09/2008', 4, 122, null, 'FPT lần đầu vào Top 40 doanh nghiệp CNTT châu Á và là công ty công nghệ Việt Nam duy nhất trong danh sách này của Gartner.'),
		  (2, 'Dự án gần 1 tỷ USD của Vinhomes tại Hải Phòng đủ điều kiện huy động vốn', true, '06/09/2025', 4, 4321, null, ''),
		  (3, 'Dấu ấn Masterise Homes tại diễn đàn bất động sản hàng hiệu châu Á', true, '06/09/2024', 4, 2432, null, ''),
		  (4, 'Bão đơn xin việc AI', true, '06/09/2023', 4, 12354, null, ''),
		  (5, 'Thành tựu phát triển kinh tế - xã hội năm 2024 là rất ấn tượng và toàn diện', true, '06/09/2022', 4, 123, null, ''),
		  (6, 'Liên doanh Vinamilk và Kido ra mắt nước giải khát tươi', true, '06/09/2021', 4, 1987, null, ''),
		  (1, 'Doanh nghiệp thiệt hại lớn vẫn nỗ lực cứu trợ vùng bão lũ', true, '06/09/2020', 4, 1000, null, 'Dù cũng bị thiệt hại nặng nề, nhiều doanh nghiệp vẫn đang nỗ lực chung tay trợ giúp người dân vùng bão lụt bằng nhiều cách khác nhau.'),
		  (2, '8 dự án giao thông trọng điểm sẽ khởi công trong năm', true, '06/09/2019', 4, 962, null, ''),
		  (3, 'Sự kiện chăm sóc xe Hyundai hút nghìn người tham dự', true, '06/09/2018', 4, 2341, null, ''),
		  (4, 'VietinBank thu hút nhân tài để thúc đẩy chuyển đổi số', true, '06/09/2017', 4, 2843, null, ''),
		  (5, 'Agribank và 10 thành tựu nổi bật năm 2024', true, '06/09/2016', 4, 4512, null, ''),
		  (6, 'Audemars Piguet giới thiệu phiên bản Royal Oak kích thước 34 mm', true, '06/09/2015', 4, 8153, null, ''),
		  (1, 'Doanh nghiệp ngành gỗ đặt mục tiêu hoàn thiện chuỗi cung ứng', true, '06/09/2014', 4, 8547, null, 'Các doanh nghiệp nội thất Việt Nam đang thể hiện khả năng làm chủ chuỗi cung ứng khi sử dụng nguyên liệu bản địa, đầu tư thiết kế, sáng tạo và xây dựng thương hiệu.'),
		  (1, 'Doanh nghiệp xuất khẩu lao động chui bị phạt 360 triệu đồng', false, null, 4, null, null, ''),
		  (1, 'MobiFone vào top 50 doanh nghiệp sáng tạo, kinh doanh hiệu quả', false, null, 4, null, null, ''),
		  (1, 'Phó tổng giám đốc Vietnam Airlines: Hãng hàng không phải giữ slot bay dù khách giảm', false, null, 4, null, null, ''),
		  (1, 'Nhiều doanh nghiệp vận tải tăng giá cước', false, null, 4, null, null, ''),
		  (1, 'Hơn 100.000 xe kinh doanh vận tải lắp camera giám sát', false, null, 4, null, null, ''),
		  (1, 'Doanh nghiệp phụ trợ tìm cách tham gia chuỗi cung ứng', false, null, 4, null, null, '');

insert into news.featured_news (news_id, sort)
	values(1, 1),
		  (2, 2),
		  (3, 3),
		  (4, 4);

insert into news.news_contents(news_id, content)
values(1, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(2, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(3, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(4, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(5, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(6, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(7, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(8, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(9, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(10, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(11, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(12, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(13, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(14, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(15, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(16, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(17, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(18, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(19, '
<h1 style="text-align: center;">Thông báo tuyển dụng</h1>

<p>Chúng tôi đang <strong>tuyển dụng</strong> vị trí <em>Frontend Developer</em> làm việc tại 
  <span style="text-decoration: underline;">TP. Hồ Chí Minh</span>.
</p>

<h2>1. Yêu cầu công việc</h2>
<ul>
  <li>Thành thạo HTML, CSS, JavaScript.</li>
  <li>Có kinh nghiệm với React hoặc Vue là một lợi thế.</li>
  <li>Kỹ năng làm việc nhóm và giao tiếp tốt.</li>
</ul>

<h2>2. Quyền lợi</h2>
<ol>
  <li>Mức lương cạnh tranh.</li>
  <li>Thưởng theo dự án.</li>
  <li>Tham gia BHYT, BHXH đầy đủ.</li>
</ol>

<h2>3. Thời gian làm việc</h2>
<p style="text-align: justify;">
  Từ thứ 2 đến thứ 6, giờ hành chính (8h30 - 17h30). Làm việc online 2 ngày/tuần. Văn phòng có không gian mở, máy lạnh, khu vực giải trí.
</p>

<blockquote>
  “Làm việc là một phần của cuộc sống, hãy làm điều bạn yêu thích.” – HR Team
</blockquote>

<h2>4. Hình ảnh môi trường làm việc</h2>

<h2>5. Mẫu bảng lương</h2>
<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Tháng</th>
      <th>Lương cơ bản</th>
      <th>Thưởng</th>
      <th>Tổng thu nhập</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tháng 5</td>
      <td>15.000.000đ</td>
      <td>3.000.000đ</td>
      <td>18.000.000đ</td>
    </tr>
    <tr>
      <td>Tháng 6</td>
      <td>15.000.000đ</td>
      <td>5.000.000đ</td>
      <td>20.000.000đ</td>
    </tr>
  </tbody>
</table>
<hr />
<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
');