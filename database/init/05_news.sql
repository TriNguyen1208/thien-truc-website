CREATE SCHEMA news

-- Tạo sequences trước
CREATE SEQUENCE news.news_category_seq START 1;
CREATE SEQUENCE news.news_seq START 1;

--- Function tạo id cho categories -----------------------------
CREATE OR REPLACE FUNCTION news.gen_category_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'LT' || LPAD(nextval('news.news_category_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--- Function tạo id cho news -----------------------------
CREATE OR REPLACE FUNCTION news.gen_news_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'TT' || LPAD(nextval('news.news_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------------------

CREATE TABLE news.news_page
(
    banner_title VARCHAR(100),
    banner_description VARCHAR(300)
);

--- Tạo bảng news_categories với id theo format "LT0000" -------------
CREATE TABLE news.news_categories
(
    id TEXT PRIMARY KEY,
    name VARCHAR(50),
    rgb_color CHAR(7),
    item_count INT
);

CREATE TRIGGER trg_news_category_id
    BEFORE INSERT ON news.news_categories
    FOR EACH ROW
    EXECUTE FUNCTION news.gen_category_id();

----------------------------------------------------------------------

--- Tạo bảng news với id theo format "TT0000" ------------------------
CREATE TABLE news.news
(
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES news.news_categories(id),
    title VARCHAR(100),
    is_published BOOLEAN,
    public_date DATE,
    measure_time INT,
    num_readers INT,
    main_img TEXT,
    main_content VARCHAR(200)
);

CREATE TRIGGER trg_news_id
    BEFORE INSERT ON news.news
    FOR EACH ROW
    EXECUTE FUNCTION news.gen_news_id();

----------------------------------------------------------------------

CREATE TABLE news.news_contents
(
    news_id TEXT PRIMARY KEY REFERENCES news.news(id),
    content TEXT
);

CREATE TABLE news.featured_news (
    news_id TEXT PRIMARY KEY REFERENCES news.news(id),
    sort INT
);