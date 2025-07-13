drop table if exists project.project_page cascade;
drop table if exists project.project_regions cascade;
drop table if exists project.projects cascade;
drop table if exists project.project_contents cascade;

CREATE SCHEMA IF NOT EXISTS project;

create table project.project_page
(
	banner_title varchar(100),
	banner_description varchar(300)
);

create table project.project_regions
(
	id serial primary key,
	name varchar(50),
	rgb_color char(7),
	item_count int
);

create table project.projects
(
	id serial primary key,
	region_id int references project.project_regions(id),
	title varchar(100),
	province varchar(50),
	complete_time int,
	main_img text,
	main_content varchar(200),
	is_featured boolean
);

create table project.project_contents
(
	project_id int primary key references project.projects(id),
	content text
);

insert into project.project_page(banner_title, banner_description)
	values('Dự Án Của Thiên Trúc', 'Khám phá những công trình kiến trúc đẳng cấp và dự án xây dựng chất lượng cao, được thiết kế và thi công bởi đội ngũ chuyên gia Thiên Trúc.');
	
insert into project.project_regions(name, rgb_color, item_count)
	values ('Miền Bắc', '#FF3D30', 8),
		   ('Miền Trung', '#3B82F6', 4),
		   ('Miền Nam', '#AF52DE', 8);

insert into project.projects(region_id, title, province, complete_time, main_img, main_content, is_featured)
	values(1, 'Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', 2023, null, '', true),
		  (1, 'Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', 2023, null, '', true),
		  (1, 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', 2023, null, '', true),
		  (1, 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', 2023, null, '', true),
		  (1, 'Tập đoàn Điện lực Việt Nam', 'Hà Nội', 2023, null, '', false),
		  (1, 'Trường THPT chuyên Hà Nội-Amsterdam', 'Hà Nội', 2023, null, '', false),
		  (1, 'Ngân hàng Vietcombank Chi nhánh Thăng Long', 'Hà Nội', 2023, null, '', false),
		  (1, 'Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ', 'Huyện Quế Võ, Bắc Ninh', 2023, null, '', false),
		  (2, 'Bệnh viện Y học cổ truyền tỉnh Đắk Lắk', 'Đắk Lắk', 2023, null, '', true),
		  (2, 'Sân vận động tỉnh Kon Tum.', 'Kon Tum', 2023, null, '', true),
		  (2, 'Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum', 'Kon Tum', 2023, null, '', false),
		  (2, 'Ủy ban nhân dân xã Ka Đơn', 'Xã Ka Đơn, Lâm Đồng', 2023, null, '', false),
		  (3, 'Liên đoàn Lao động quận Gò Vấp - TP.HCM', 'Quận Gò Vấp - TP.HCM', 2023, null, '', true),
		  (3, 'Liên đoàn Lao động quận Bình Thạnh - TP.HCM', 'Quận Bình Thạnh - TP.HCM', 2023, null, '', true),
		  (3, 'Chi cục Quản trị, Ngân hàng Nhà nước Việt Nam Tại TP.HCM', 'TP.HCM', 2023, null, '', false),
		  (3, 'Học viện Cán bộ Tp. HCM', 'TP.HCM', 2023, null, '', false),
		  (3, 'Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM', 'TP.HCM', 2023, null, '', false),
		  (3, 'Trường Tiểu học Minh Đạo - TP.HCM', 'TP.HCM', 2023, null, '', false),
		  (3, 'Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM', 'Q5 - TP.HCM', 2023, null, '', false),
		  (3, 'Trường Đại học Khoa học Tự nhiên - TP.HCM', 'TP.HCM', 2023, null, '', false);

insert into project.project_contents(project_id, content)
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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

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

<h2>6. Nhúng video giới thiệu</h2>

<hr />

<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
'),
(20, '
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

<h2>6. Nhúng video giới thiệu</h2>

<hr />

<p style="text-align: right;">Ngày đăng: <strong>27/06/2025</strong></p>
');