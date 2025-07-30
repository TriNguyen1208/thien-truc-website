CREATE SCHEMA product

-- TẠO SEQUENCE MỚI
CREATE SEQUENCE product.product_seq START 1;
CREATE SEQUENCE product.category_seq START 1;

-- TẠO BẢNG BANNER TRANG GIÁ
CREATE TABLE product.price_page (
    banner_title VARCHAR(200),
    banner_description VARCHAR(700)
);

-- HÀM TẠO ID CHO product_categories -> LS0001
CREATE OR REPLACE FUNCTION product.gen_category_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'LS' || LPAD(nextval('product.category_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- HÀM TẠO ID CHO products -> SP0001
CREATE OR REPLACE FUNCTION product.gen_product_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'SP' || LPAD(nextval('product.product_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TẠO BẢNG BANNER TRANG SẢN PHẨM
CREATE TABLE product.product_page (
    banner_title VARCHAR(200),
    banner_description VARCHAR(700)
);

-- TẠO BẢNG DANH MỤC SẢN PHẨM
CREATE TABLE product.product_categories (
    id TEXT PRIMARY KEY,
    name VARCHAR(300),
    item_count int
);

-- GẮN TRIGGER TẠO ID TỰ ĐỘNG CHO DANH MỤC
CREATE TRIGGER trg_category_id
    BEFORE INSERT ON product.product_categories
    FOR EACH ROW
    EXECUTE FUNCTION product.gen_category_id();

-- TẠO BẢNG SẢN PHẨM
CREATE TABLE product.products (
    id TEXT PRIMARY KEY,
    name VARCHAR(500),
    description TEXT,
    product_img TEXT,
    category_id TEXT REFERENCES product.product_categories(id),
    product_specifications TEXT,
    warranty_period INT,
    product_features TEXT[],
    highlight_features INT[],
    is_featured boolean
);

-- GẮN TRIGGER TẠO ID TỰ ĐỘNG CHO SẢN PHẨM
CREATE TRIGGER trg_product_id
    BEFORE INSERT ON product.products
    FOR EACH ROW
    EXECUTE FUNCTION product.gen_product_id();

-- TẠO BẢNG GIÁ SẢN PHẨM
CREATE TABLE product.product_prices (
    id SERIAL,
    product_id TEXT REFERENCES product.products(id),
    price FLOAT,
    note TEXT DEFAULT 'Mac dinh',
    PRIMARY KEY(id, product_id)
);