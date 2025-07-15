DROP TABLE IF EXISTS project.project_page CASCADE;
DROP TABLE IF EXISTS project.project_regions CASCADE;
DROP TABLE IF EXISTS project.projects CASCADE;
DROP TABLE IF EXISTS project.project_contents CASCADE;

-- Drop sequences if they exist
DROP SEQUENCE IF EXISTS project.project_region_seq CASCADE;
DROP SEQUENCE IF EXISTS project.project_seq CASCADE;

CREATE SCHEMA IF NOT EXISTS project;

-- Tạo sequences trước
CREATE SEQUENCE project.project_region_seq START 1;
CREATE SEQUENCE project.project_seq START 1;

--- Function tạo id cho project_regions -----------------------------
CREATE OR REPLACE FUNCTION project.gen_region_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'KV' || LPAD(nextval('project.project_region_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--- Function tạo id cho projects -----------------------------
CREATE OR REPLACE FUNCTION project.gen_project_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'DA' || LPAD(nextval('project.project_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------------------

CREATE TABLE project.project_page
(
    banner_title VARCHAR(100),
    banner_description VARCHAR(300)
);

--- Tạo bảng project_regions với id theo format "KV0000" -------------
CREATE TABLE project.project_regions
(
    id TEXT PRIMARY KEY,
    name VARCHAR(50),
    rgb_color CHAR(7),
    item_count INT
);

CREATE TRIGGER trg_project_region_id
    BEFORE INSERT ON project.project_regions
    FOR EACH ROW
    EXECUTE FUNCTION project.gen_region_id();

----------------------------------------------------------------------

--- Tạo bảng projects với id theo format "DA0000" ------------------------
CREATE TABLE project.projects
(
    id TEXT PRIMARY KEY,
    region_id TEXT REFERENCES project.project_regions(id),
    title VARCHAR(100),
    province VARCHAR(50),
    complete_time INT,
    main_img TEXT,
    main_content VARCHAR(200),
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TRIGGER trg_project_id
    BEFORE INSERT ON project.projects
    FOR EACH ROW
    EXECUTE FUNCTION project.gen_project_id();

----------------------------------------------------------------------

CREATE TABLE project.project_contents
(
    project_id TEXT PRIMARY KEY REFERENCES project.projects(id),
    content TEXT
);

-- Insert data
INSERT INTO project.project_page(banner_title, banner_description)
VALUES('Dự Án Của Thiên Trúc', 'Khám phá những công trình kiến trúc đẳng cấp và dự án xây dựng chất lượng cao, được thiết kế và thi công bởi đội ngũ chuyên gia Thiên Trúc.');

INSERT INTO project.project_regions(name, rgb_color, item_count)
VALUES 
    ('Miền Bắc', '#FF3D30', 8),
    ('Miền Trung', '#3B82F6', 4),
    ('Miền Nam', '#AF52DE', 8);

INSERT INTO project.projects(region_id, title, province, complete_time, main_img, main_content, is_featured)
VALUES
    ('KV0001', 'Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', 2023, NULL, '', TRUE),
    ('KV0001', 'Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', 2023, NULL, '', TRUE),
    ('KV0001', 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', 2023, NULL, '', TRUE),
    ('KV0001', 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', 2023, NULL, '', TRUE),
    ('KV0001', 'Tập đoàn Điện lực Việt Nam', 'Hà Nội', 2023, NULL, '', FALSE),
    ('KV0001', 'Trường THPT chuyên Hà Nội-Amsterdam', 'Hà Nội', 2023, NULL, '', FALSE),
    ('KV0001', 'Ngân hàng Vietcombank Chi nhánh Thăng Long', 'Hà Nội', 2023, NULL, '', FALSE),
    ('KV0001', 'Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ', 'Huyện Quế Võ, Bắc Ninh', 2023, NULL, '', FALSE),
    ('KV0002', 'Bệnh viện Y học cổ truyền tỉnh Đắk Lắk', 'Đắk Lắk', 2023, NULL, '', TRUE),
    ('KV0002', 'Sân vận động tỉnh Kon Tum.', 'Kon Tum', 2023, NULL, '', TRUE),
    ('KV0002', 'Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum', 'Kon Tum', 2023, NULL, '', FALSE),
    ('KV0002', 'Ủy ban nhân dân xã Ka Đơn', 'Xã Ka Đơn, Lâm Đồng', 2023, NULL, '', FALSE),
    ('KV0003', 'Liên đoàn Lao động quận Gò Vấp - TP.HCM', 'Quận Gò Vấp - TP.HCM', 2023, NULL, '', TRUE),
    ('KV0003', 'Liên đoàn Lao động quận Bình Thạnh - TP.HCM', 'Quận Bình Thạnh - TP.HCM', 2023, NULL, '', TRUE),
    ('KV0003', 'Chi cục Quản trị, Ngân hàng Nhà nước Việt Nam Tại TP.HCM', 'TP.HCM', 2023, NULL, '', FALSE),
    ('KV0003', 'Học viện Cán bộ Tp. HCM', 'TP.HCM', 2023, NULL, '', FALSE),
    ('KV0003', 'Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM', 'TP.HCM', 2023, NULL, '', FALSE),
    ('KV0003', 'Trường Tiểu học Minh Đạo - TP.HCM', 'TP.HCM', 2023, NULL, '', FALSE),
    ('KV0003', 'Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM', 'Q5 - TP.HCM', 2023, NULL, '', FALSE),
    ('KV0003', 'Trường Đại học Khoa học Tự nhiên - TP.HCM', 'TP.HCM', 2023, NULL, '', FALSE);


insert into project.project_contents(project_id, content)
values('DA0001', '
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
('DA0002', '
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
('DA0003', '
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
('DA0004', '
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
('DA0005', '
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
('DA0006', '
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
('DA0007', '
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
('DA0008', '
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
('DA0009', '
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
('DA0010', '
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
('DA0011', '
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
('DA0012', '
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
('DA0013', '
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
('DA0014', '
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
('DA0015', '
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
('DA0016', '
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
('DA0017', '
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
('DA0018', '
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
('DA0019', '
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
('DA0020', '
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