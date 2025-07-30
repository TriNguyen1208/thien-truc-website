-- Insert data
INSERT INTO news.news_page(banner_title, banner_description)
VALUES('Những Thông Tin Mới Nhất Về Thiên Trúc', 'Cập nhật liên tục các tin tức về hoạt động, dự án mới, xu hướng công nghệ LED và giải pháp chiếu sáng hiện đại do Thiên Trúc thực hiện');

INSERT INTO news.news_categories(name, rgb_color, item_count)
VALUES 
    ('Công Ty', '#059669', 9),
    ('Dự Án', '#FF3B30', 2),
    ('Sự kiện', '#A855F7', 2),
    ('Tuyển Dụng', '#A2845E', 2),
    ('Thành Tựu', '#F59E0B', 2),
    ('Sản phẩm', '#3B82F6', 2);

insert into news.news(category_id, title, is_published, public_date, measure_time, num_readers, main_img, main_content)
	values('LT0001', 'FPT vào Top 40 doanh nghiệp CNTT châu Á', true, '06/09/2008', 4, 122, null, 'FPT lần đầu vào Top 40 doanh nghiệp CNTT châu Á và là công ty công nghệ Việt Nam duy nhất trong danh sách này của Gartner.'),
		  ('LT0002', 'Dự án gần 1 tỷ USD của Vinhomes tại Hải Phòng đủ điều kiện huy động vốn', true, '06/09/2025', 4, 4321, null, ''),
		  ('LT0003', 'Dấu ấn Masterise Homes tại diễn đàn bất động sản hàng hiệu châu Á', true, '06/09/2024', 4, 2432, null, ''),
		  ('LT0004', 'Bão đơn xin việc AI', true, '06/09/2023', 4, 12354, null, ''),
		  ('LT0005', 'Thành tựu phát triển kinh tế - xã hội năm 2024 là rất ấn tượng và toàn diện', true, '06/09/2022', 4, 123, null, ''),
		  ('LT0006', 'Liên doanh Vinamilk và Kido ra mắt nước giải khát tươi', true, '06/09/2021', 4, 1987, null, ''),
		  ('LT0001', 'Doanh nghiệp thiệt hại lớn vẫn nỗ lực cứu trợ vùng bão lũ', true, '06/09/2020', 4, 1000, null, 'Dù cũng bị thiệt hại nặng nề, nhiều doanh nghiệp vẫn đang nỗ lực chung tay trợ giúp người dân vùng bão lụt bằng nhiều cách khác nhau.'),
		  ('LT0002', '8 dự án giao thông trọng điểm sẽ khởi công trong năm', true, '06/09/2019', 4, 962, null, ''),
		  ('LT0003', 'Sự kiện chăm sóc xe Hyundai hút nghìn người tham dự', true, '06/09/2018', 4, 2341, null, ''),
		  ('LT0004', 'VietinBank thu hút nhân tài để thúc đẩy chuyển đổi số', true, '06/09/2017', 4, 2843, null, ''),
		  ('LT0005', 'Agribank và 10 thành tựu nổi bật năm 2024', true, '06/09/2016', 4, 4512, null, ''),
		  ('LT0006', 'Audemars Piguet giới thiệu phiên bản Royal Oak kích thước 34 mm', true, '06/09/2015', 4, 8153, null, ''),
		  ('LT0001', 'Doanh nghiệp ngành gỗ đặt mục tiêu hoàn thiện chuỗi cung ứng', true, '06/09/2014', 4, 8547, null, 'Các doanh nghiệp nội thất Việt Nam đang thể hiện khả năng làm chủ chuỗi cung ứng khi sử dụng nguyên liệu bản địa, đầu tư thiết kế, sáng tạo và xây dựng thương hiệu.'),
		  ('LT0001', 'Doanh nghiệp xuất khẩu lao động chui bị phạt 360 triệu đồng', false, null, 4, null, null, ''),
		  ('LT0001', 'MobiFone vào top 50 doanh nghiệp sáng tạo, kinh doanh hiệu quả', false, null, 4, null, null, ''),
		  ('LT0001', 'Phó tổng giám đốc Vietnam Airlines: Hãng hàng không phải giữ slot bay dù khách giảm', false, null, 4, null, null, ''),
		  ('LT0001', 'Nhiều doanh nghiệp vận tải tăng giá cước', false, null, 4, null, null, ''),
		  ('LT0001', 'Hơn 100.000 xe kinh doanh vận tải lắp camera giám sát', false, null, 4, null, null, ''),
		  ('LT0001', 'Doanh nghiệp phụ trợ tìm cách tham gia chuỗi cung ứng', false, null, 4, null, null, '');

insert into news.featured_news (news_id, sort)
	values('TT0001', 1),
		  ('TT0002', 2),
		  ('TT0003', 3),
		  ('TT0004', 4);

insert into news.news_contents(news_id, content)
values('TT0001', '
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
('TT0002', '
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
('TT0003', '
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
('TT0004', '
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
('TT0005', '
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
('TT0006', '
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
('TT0007', '
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
('TT0008', '
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
('TT0009', '
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
('TT0010', '
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
('TT0011', '
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
('TT0012', '
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
('TT0013', '
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
('TT0014', '
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
('TT0015', '
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
('TT0016', '
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
('TT0017', '
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
('TT0018', '
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
('TT0019', '
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