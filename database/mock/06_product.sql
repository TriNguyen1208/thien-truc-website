-- DỮ LIỆU BANNER
INSERT INTO product.product_page (banner_title, banner_description) VALUES
('Sản Phẩm Điện Tử Của Thiên Trúc', 
 'Khám phá danh mục các thiết bị điện tử chất lượng cao do Thiên Trúc cung cấp và lắp đặt, chuyên dụng cho công trình dân dụng, thương mại và công nghiệp.');

INSERT INTO product.price_page (banner_title, banner_description) VALUES
('BẢNG GIÁ SẢN PHẨM', 
 'Giá cả minh bạch, dịch vụ chất lượng cao, cam kết uy tín');

-- DỮ LIỆU DANH MỤC
INSERT INTO product.product_categories (name, item_count) VALUES
('CABLE', 9), ('PHẦN MỀM DIỆT VIRUS', 7), ('MONITOR', 0), ('MAINBOARD', 2), ('CPU INTEL', 3), ('RAM', 2),
('HDD PC MÁY TÍNH', 0), ('HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA', 3), ('SSD', 0), ('HDD DI ĐỘNG', 0),
('CASE', 0), ('POWER', 4), ('USB', 0), ('KEYBOARD CÓ DÂY', 3), ('KEYBOARD KHÔNG DÂY', 3), ('MOUSE QUANG CÓ DÂY', 3),
('CAMERA XOAY, CỐ ĐỊNH', 7);

-- INSERT CABLE (1)
INSERT INTO product.products (
    name, description, product_img, category_id,
    product_specifications, warranty_period,
    product_features, highlight_features, is_featured
) VALUES
('CABLE MẠNG STS CAT5E305IA(305m)', 'Thùng 305m, cat5', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', true),

('Cable COMMSCOPE (THÙNG 305M) Cat 5 (6-219590-2)', 'Thùng 305m, cat5', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('Cable LS (THÙNG 305M) Cat 6(UTP-G-C6G-E1VN-X 0.5X004P/BL', 'Thùng 305m, cat6', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 1.5M UGREEN(60820)', 'cáp hdmi dài 1,5 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 3M UGREEN(10108)', 'cáp hdmi dài 3 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 5M UGREEN(10109)', 'cáp hdmi dài 5 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 10m UGREEN(10110)', 'cáp hdmi dài 10 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 15m UGREEN(10111)', 'cáp hdmi dài 15 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false),

('CÁP HDMI 20m UGREEN(10112)', 'cáp hdmi dài 20 mét', NULL, 'LS0001',
 '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}',
 0, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0001', 780000),
('SP0002', 2650000),
('SP0003', 2915000),
('SP0004', 100000),
('SP0005', 120000),
('SP0006', 200000),
('SP0007', 450000),
('SP0008', 700000),
('SP0009', 1000000);


-- INSERT PHẦN MỀM DIỆT VIRUS (2)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('Kaspersky STANDARD (1PC)- Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('Kaspersky STANDARD 3pcs - Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Kaspersky Plus 1pc - Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Kaspersky Plus 3pcs - Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Kaspersky Plus 5PC - Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Bkav Pro (1PC) - Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Trend micro internet Security 3pc -  Bản quyền 01 năm', '', NULL, 'LS0002', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0010', 210000),
('SP0011', 350000),
('SP0012', 400000),
('SP0013', 650000),
('SP0014', 900000),
('SP0015', 240000),
('SP0016', 380000);



-- INSERT MONITOR (3)
-- NULL



-- INSERT MAINBOARD (4)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) values
('MAINBOARD GIGABYTE H510M H', 'Socket: LGA1200 Hỗ trợ Intel Core i9 processors / Intel Core i7 processors / Intel Core i5 processors
Cổng xuất hình: HDMI+VGA (CPU Intel đầu 10 sử dụng được cả 2 cổng, CPU Intel đầu 11 chỉ sử dụng được cổng HDMI)
Kích thước: Micro ATX
Khe cắm RAM: 2 khe (Tối đa 64 GB)', NULL, 'LS0004', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', true),

('GIGABYTE H610M - H V3', 'Socket: LGA1700 hỗ trợ CPU Intel thế hệ thứ 12, 13 và 14
Kích thước: Micro ATX
Khe cắm RAM: 2 khe (Tối đa 64GB)', NULL, 'LS0004', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0017', 1650000),
('SP0018', 1800000);



-- INSERT CPU INTEL (5)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('CPU Intel Core i5-10400- Box(SK1200)', 'SK1200, chạy với H410, H510', NULL, 'LS0005', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', true),
('CPU Intel Core i3-12100 - Box(SK1700)', 'SK1700, chạy với H610', NULL, 'LS0005', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', false),
('CPU Intel Core i5-12400- Box(SK1700)', 'SK1700, chạy với H610', NULL, 'LS0005', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0019', 3450000),
('SP0020', 3150000),
('SP0021', 3650000);


-- INSERT RAM (6)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('DDRAM IV 8GB(3200) - Lexar', '', NULL, 'LS0006', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', true),
('DDRAM IV 8Gb (2666) - KINGMAX', '', NULL, 'LS0006', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 36, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0022', 450000),
('SP0023', 660000);




-- INSERT HDD PC MÁY TÍNH (7)
-- NULL




-- INSERT HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA (😎
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('HDD Western 1TB - WD11PURZ', 'hoạt động 24/7', NULL, 'LS0008', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('HDD Western 2TB - WD23PURZ', 'hoạt động 24/7', NULL, 'LS0008', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('HDD Western 4TB - WD42PURU', 'hoạt động 24/7', NULL, 'LS0008', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0024', 1300000),
('SP0025', 1650000),
('SP0026', 2550000);




-- INSERT SSD (9)
-- NULL 

-- INSERT HDD DI ĐỘNG (10)
-- NULL
	
-- INSERT CASE (11)
-- NULL



-- INSERT POWER (12)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('NGUỒN 235W - eMASTER EV772BR', '', NULL, 'LS0012', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('NGUỒN 250W - eMASTER mini EM250W', '', NULL, 'LS0012', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('NGUỒN JETEK 350W ELITE V2', '', NULL, 'LS0012', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('NGUỒN JETEK 500W ELITE V2', '', NULL, 'LS0012', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0027', 245000),
('SP0028', 300000),
('SP0029', 450000),
('SP0030', 600000);


-- INSERT USB (13)
-- NULL


-- INSERT KEYBOARD (14)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('Keyboard A4Tech KK-3', 'USB', NULL, 'LS0014', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('Keyboard Dell 216(USB)', 'USB', NULL, 'LS0014', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12,'{}', '{}', false),
('Keyboard LOGITECH K120', 'USB', NULL, 'LS0014', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0031', 160000),
('SP0032', 200000),
('SP0033', 160000);



-- INSERT KEYBOARD KHÔNG DÂY (15)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('KEYBOARD COMBO LOGITECH MK235', 'Wireless, có phím số', NULL, 'LS0015', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('KEYBOARD COMBO LOGITECH MK240', 'Wireless, không phím số', NULL, 'LS0015', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('KVM SWITCH UGREEN 30357 (2PC dùng chung LCD + KB + M)', '2PC dùng chung LCD + KB + M)', NULL, 'LS0015', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0034', 530000),
('SP0035', 500000),
('SP0036', 400000);




-- INSERT MOUSE QUANG CÓ DÂY (16)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('MOUSE DELL MS116(USB)', 'USB', NULL, 'LS0016', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('Mouse LOGITECH B100', 'USB', NULL, 'LS0016', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Mouse A4Tech OP-330(USB)', 'USB', NULL, 'LS0016', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0037', 120000),
('SP0038', 80000),
('SP0039', 80000);




-- INSERT CAMERA XOAY, CỐ ĐỊNH (17)
INSERT INTO product.products (name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) VALUES
('CAMERA IMOU IPC-A32EP-L 3MP', 'Xoay 360, Không màu đêm, có míc, có loa', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', true),
('CAMERA IMOU IPC-A52EP-L 5MP', 'Xoay 360, Không màu đêm, có míc, có loa', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('CAMERA IMOU IPC-F32P-IMOU 3MP', 'Cố định, Không có màu đêm, có míc, không loa', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('CAMERA EZVIZ CS-C6N-3MP', 'Xoay 360, Không màu đêm, có míc, có loa', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('CAMERA EZVIZ CS-H6C-4MP', 'Xoay 360, Không màu đêm, có míc, có loa', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Thẻ nhớ Kingston 64Gb class 10', '', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false),
('Thẻ nhớ Kingston 128Gb class 10', '', NULL, 'LS0017', '{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}', 12, '{}', '{}', false);

INSERT INTO product.product_prices (product_id, price) VALUES
('SP0040', 400000),
('SP0041', 550000),
('SP0042', 600000),
('SP0043', 425000),
('SP0044', 600000),
('SP0045', 115000),
('SP0046', 200000);