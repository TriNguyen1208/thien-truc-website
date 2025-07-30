CREATE SCHEMA project

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
    complete_time DATE,
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