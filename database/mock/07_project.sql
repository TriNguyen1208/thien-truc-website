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
    ('KV0001', 'Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', '2025-07-20', '', 'fdsfsaf', TRUE),
    ('KV0001', 'Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm', 'Quận Hoàn Kiếm, Hà Nội', '2025-07-20', '', 'ẻwqrqwereqwr', TRUE),
    ('KV0001', 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', '2025-07-20', '', 'fdsfdsafasdf', TRUE),
    ('KV0001', 'Văn phòng HĐND & UBND quận Đống Đa', 'Quận Đống Đa, Hà Nội', '2025-07-20', '', 'fdsfdsafasdf', TRUE),
    ('KV0001', 'Tập đoàn Điện lực Việt Nam', 'Hà Nội', '2025-07-20', '', 'fdsfdsfasfd', FALSE),
    ('KV0001', 'Trường THPT chuyên Hà Nội-Amsterdam', 'Hà Nội', '2025-07-20', '', 'fdfdsafdasf', FALSE),
    ('KV0001', 'Ngân hàng Vietcombank Chi nhánh Thăng Long', 'Hà Nội', '2025-07-20', '', 'ytrytrytreyrty', FALSE),
    ('KV0001', 'Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ', 'Huyện Quế Võ, Bắc Ninh', '2025-07-20', '', 'fdfsafasdf', FALSE),
    ('KV0002', 'Bệnh viện Y học cổ truyền tỉnh Đắk Lắk', 'Đắk Lắk', '2025-07-20', '', 'fdfsafasdf', TRUE),
    ('KV0002', 'Sân vận động tỉnh Kon Tum.', 'Kon Tum', '2025-07-20', '', 'fdsfdsafasdf', TRUE),
    ('KV0002', 'Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum', 'Kon Tum', '2025-07-20', '', 'fdfdsfdasf', FALSE),
    ('KV0002', 'Ủy ban nhân dân xã Ka Đơn', 'Xã Ka Đơn, Lâm Đồng', '2025-07-20', '', 'fdfsafdasfsd', FALSE),
    ('KV0003', 'Liên đoàn Lao động quận Gò Vấp - TP.HCM', 'Quận Gò Vấp - TP.HCM', '2025-07-20', '', 'fdfsadfadsf', TRUE),
    ('KV0003', 'Liên đoàn Lao động quận Bình Thạnh - TP.HCM', 'Quận Bình Thạnh - TP.HCM', '2025-07-20', '', 'fdsfdsafadsf', TRUE),
    ('KV0003', 'Chi cục Quản trị, Ngân hàng Nhà nước Việt Nam Tại TP.HCM', 'TP.HCM', '2025-07-20', '', 'fdsfdsfdasfds', FALSE),
    ('KV0003', 'Học viện Cán bộ Tp. HCM', 'TP.HCM', '2025-07-20', '', 'rểqwrqwre', FALSE),
    ('KV0003', 'Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM', 'TP.HCM', '2025-07-20', '', 'bvcbvcbx', FALSE),
    ('KV0003', 'Trường Tiểu học Minh Đạo - TP.HCM', 'TP.HCM', '2025-07-20', '', 'ẻwqrqwrew', FALSE),
    ('KV0003', 'Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM', 'Q5 - TP.HCM', '2025-07-20', '', 'fdsfdsfasf', FALSE),
    ('KV0003', 'Trường Đại học Khoa học Tự nhiên - TP.HCM', 'TP.HCM', '2025-07-20', '', 'fwrewqrqerew', FALSE);


INSERT INTO project.project_contents(project_id, content)
values 
  ('DA0001', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0002', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0003', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0004', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0005', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0006', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0007', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0008', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0009', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0010', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0011', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0012', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0013', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0014', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0015', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0016', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0017', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0018', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0019', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E'),
  ('DA0020', '\u003Cp\u003Efdsfdsfasfds\u003C/p\u003E');