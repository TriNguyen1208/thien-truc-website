--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: about_us; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA about_us;


ALTER SCHEMA about_us OWNER TO thientrucdb_user;

--
-- Name: admin; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA admin;


ALTER SCHEMA admin OWNER TO thientrucdb_user;

--
-- Name: contact; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA contact;


ALTER SCHEMA contact OWNER TO thientrucdb_user;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO thientrucdb_user;

--
-- Name: home; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA home;


ALTER SCHEMA home OWNER TO thientrucdb_user;

--
-- Name: news; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA news;


ALTER SCHEMA news OWNER TO thientrucdb_user;

--
-- Name: product; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA product;


ALTER SCHEMA product OWNER TO thientrucdb_user;

--
-- Name: project; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA project;


ALTER SCHEMA project OWNER TO thientrucdb_user;

--
-- Name: recruitment; Type: SCHEMA; Schema: -; Owner: thientrucdb_user
--

CREATE SCHEMA recruitment;


ALTER SCHEMA recruitment OWNER TO thientrucdb_user;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA extensions;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: trim_activity_logs(); Type: FUNCTION; Schema: admin; Owner: thientrucdb_user
--

CREATE FUNCTION admin.trim_activity_logs() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM admin.activity_logs
    WHERE id NOT IN (
        SELECT id FROM admin.activity_logs
        ORDER BY time DESC
        LIMIT 1000
    );
    RETURN NULL;
END;
$$;


ALTER FUNCTION admin.trim_activity_logs() OWNER TO thientrucdb_user;

--
-- Name: gen_category_id(); Type: FUNCTION; Schema: news; Owner: thientrucdb_user
--

CREATE FUNCTION news.gen_category_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'LT' || LPAD(nextval('news.news_category_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION news.gen_category_id() OWNER TO thientrucdb_user;

--
-- Name: gen_custom_id(); Type: FUNCTION; Schema: news; Owner: thientrucdb_user
--

CREATE FUNCTION news.gen_custom_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix TEXT := TG_ARGV[0]; -- Prefix: 'LT' hoặc 'TT'
    seq_name TEXT := TG_ARGV[1]; -- Tên sequence
    nextval_id BIGINT;
BEGIN
    IF NEW.id IS NULL THEN
        EXECUTE format('SELECT nextval(''%I'')', seq_name) INTO nextval_id;
        NEW.id := prefix || LPAD(nextval_id::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION news.gen_custom_id() OWNER TO thientrucdb_user;

--
-- Name: gen_news_id(); Type: FUNCTION; Schema: news; Owner: thientrucdb_user
--

CREATE FUNCTION news.gen_news_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'TT' || LPAD(nextval('news.news_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION news.gen_news_id() OWNER TO thientrucdb_user;

--
-- Name: gen_category_id(); Type: FUNCTION; Schema: product; Owner: thientrucdb_user
--

CREATE FUNCTION product.gen_category_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'LS' || LPAD(nextval('product.category_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION product.gen_category_id() OWNER TO thientrucdb_user;

--
-- Name: gen_product_id(); Type: FUNCTION; Schema: product; Owner: thientrucdb_user
--

CREATE FUNCTION product.gen_product_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'SP' || LPAD(nextval('product.product_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION product.gen_product_id() OWNER TO thientrucdb_user;

--
-- Name: gen_project_id(); Type: FUNCTION; Schema: project; Owner: thientrucdb_user
--

CREATE FUNCTION project.gen_project_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'DA' || LPAD(nextval('project.project_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION project.gen_project_id() OWNER TO thientrucdb_user;

--
-- Name: gen_region_id(); Type: FUNCTION; Schema: project; Owner: thientrucdb_user
--

CREATE FUNCTION project.gen_region_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := 'KV' || LPAD(nextval('project.project_region_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION project.gen_region_id() OWNER TO thientrucdb_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: about_us_page; Type: TABLE; Schema: about_us; Owner: thientrucdb_user
--

CREATE TABLE about_us.about_us_page (
    banner_title character varying(100),
    banner_description character varying(300),
    our_story_content text
);


ALTER TABLE about_us.about_us_page OWNER TO thientrucdb_user;

--
-- Name: company_services; Type: TABLE; Schema: about_us; Owner: thientrucdb_user
--

CREATE TABLE about_us.company_services (
    id integer NOT NULL,
    title character varying(50),
    description character varying(200),
    details text[]
);


ALTER TABLE about_us.company_services OWNER TO thientrucdb_user;

--
-- Name: company_services_id_seq; Type: SEQUENCE; Schema: about_us; Owner: thientrucdb_user
--

CREATE SEQUENCE about_us.company_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE about_us.company_services_id_seq OWNER TO thientrucdb_user;

--
-- Name: company_services_id_seq; Type: SEQUENCE OWNED BY; Schema: about_us; Owner: thientrucdb_user
--

ALTER SEQUENCE about_us.company_services_id_seq OWNED BY about_us.company_services.id;


--
-- Name: why_choose_us; Type: TABLE; Schema: about_us; Owner: thientrucdb_user
--

CREATE TABLE about_us.why_choose_us (
    id integer NOT NULL,
    title character varying(50),
    description character varying(200),
    details text[]
);


ALTER TABLE about_us.why_choose_us OWNER TO thientrucdb_user;

--
-- Name: why_choose_us_id_seq; Type: SEQUENCE; Schema: about_us; Owner: thientrucdb_user
--

CREATE SEQUENCE about_us.why_choose_us_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE about_us.why_choose_us_id_seq OWNER TO thientrucdb_user;

--
-- Name: why_choose_us_id_seq; Type: SEQUENCE OWNED BY; Schema: about_us; Owner: thientrucdb_user
--

ALTER SEQUENCE about_us.why_choose_us_id_seq OWNED BY about_us.why_choose_us.id;


--
-- Name: accounts; Type: TABLE; Schema: admin; Owner: thientrucdb_user
--

CREATE TABLE admin.accounts (
    username character varying(20) NOT NULL,
    role character varying(10),
    password text,
    fullname character varying(100),
    phone character varying(20),
    email character varying(100),
    "position" character varying(500),
    description character varying(500),
    CONSTRAINT accounts_role_check CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('manager'::character varying)::text])))
);


ALTER TABLE admin.accounts OWNER TO thientrucdb_user;

--
-- Name: activity_logs; Type: TABLE; Schema: admin; Owner: thientrucdb_user
--

CREATE TABLE admin.activity_logs (
    id integer NOT NULL,
    content text,
    username character varying(20),
    "time" timestamp with time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh'::text)
);


ALTER TABLE admin.activity_logs OWNER TO thientrucdb_user;

--
-- Name: activity_logs_id_seq; Type: SEQUENCE; Schema: admin; Owner: thientrucdb_user
--

CREATE SEQUENCE admin.activity_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE admin.activity_logs_id_seq OWNER TO thientrucdb_user;

--
-- Name: activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: thientrucdb_user
--

ALTER SEQUENCE admin.activity_logs_id_seq OWNED BY admin.activity_logs.id;


--
-- Name: company_info; Type: TABLE; Schema: contact; Owner: thientrucdb_user
--

CREATE TABLE contact.company_info (
    company_email character varying(50),
    company_phone character varying(20)[],
    office_address text[],
    main_office_id integer,
    googlemaps_embed_url text,
    working_hours text[],
    fanpage_url text
);


ALTER TABLE contact.company_info OWNER TO thientrucdb_user;

--
-- Name: contact_page; Type: TABLE; Schema: contact; Owner: thientrucdb_user
--

CREATE TABLE contact.contact_page (
    banner_title character varying(100),
    banner_description character varying(300)
);


ALTER TABLE contact.contact_page OWNER TO thientrucdb_user;

--
-- Name: support_agents; Type: TABLE; Schema: contact; Owner: thientrucdb_user
--

CREATE TABLE contact.support_agents (
    id integer NOT NULL,
    avatar_img text,
    name character varying(50),
    role character varying(50),
    phone_number character varying(20),
    facebook_url text
);


ALTER TABLE contact.support_agents OWNER TO thientrucdb_user;

--
-- Name: support_agents_id_seq; Type: SEQUENCE; Schema: contact; Owner: thientrucdb_user
--

CREATE SEQUENCE contact.support_agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE contact.support_agents_id_seq OWNER TO thientrucdb_user;

--
-- Name: support_agents_id_seq; Type: SEQUENCE OWNED BY; Schema: contact; Owner: thientrucdb_user
--

ALTER SEQUENCE contact.support_agents_id_seq OWNED BY contact.support_agents.id;


--
-- Name: highlight_stats_about_us; Type: TABLE; Schema: home; Owner: thientrucdb_user
--

CREATE TABLE home.highlight_stats_about_us (
    id integer NOT NULL,
    number_text character varying(10),
    label character varying(50)
);


ALTER TABLE home.highlight_stats_about_us OWNER TO thientrucdb_user;

--
-- Name: highlight_stats_about_us_id_seq; Type: SEQUENCE; Schema: home; Owner: thientrucdb_user
--

CREATE SEQUENCE home.highlight_stats_about_us_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE home.highlight_stats_about_us_id_seq OWNER TO thientrucdb_user;

--
-- Name: highlight_stats_about_us_id_seq; Type: SEQUENCE OWNED BY; Schema: home; Owner: thientrucdb_user
--

ALTER SEQUENCE home.highlight_stats_about_us_id_seq OWNED BY home.highlight_stats_about_us.id;


--
-- Name: home_page; Type: TABLE; Schema: home; Owner: thientrucdb_user
--

CREATE TABLE home.home_page (
    banner_title character varying(100),
    banner_description character varying(300),
    aboutus_content text,
    aboutus_img text,
    news_switch_time double precision
);


ALTER TABLE home.home_page OWNER TO thientrucdb_user;

--
-- Name: featured_news; Type: TABLE; Schema: news; Owner: thientrucdb_user
--

CREATE TABLE news.featured_news (
    news_id text NOT NULL,
    sort integer
);


ALTER TABLE news.featured_news OWNER TO thientrucdb_user;

--
-- Name: news; Type: TABLE; Schema: news; Owner: thientrucdb_user
--

CREATE TABLE news.news (
    id text NOT NULL,
    category_id text,
    title character varying(100),
    is_published boolean,
    public_date date,
    measure_time integer,
    num_readers integer,
    main_img text,
    main_content character varying(200)
);


ALTER TABLE news.news OWNER TO thientrucdb_user;

--
-- Name: news_categories; Type: TABLE; Schema: news; Owner: thientrucdb_user
--

CREATE TABLE news.news_categories (
    id text NOT NULL,
    name character varying(50),
    rgb_color character(7),
    item_count integer
);


ALTER TABLE news.news_categories OWNER TO thientrucdb_user;

--
-- Name: news_category_seq; Type: SEQUENCE; Schema: news; Owner: thientrucdb_user
--

CREATE SEQUENCE news.news_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE news.news_category_seq OWNER TO thientrucdb_user;

--
-- Name: news_contents; Type: TABLE; Schema: news; Owner: thientrucdb_user
--

CREATE TABLE news.news_contents (
    news_id text NOT NULL,
    content text
);


ALTER TABLE news.news_contents OWNER TO thientrucdb_user;

--
-- Name: news_page; Type: TABLE; Schema: news; Owner: thientrucdb_user
--

CREATE TABLE news.news_page (
    banner_title character varying(100),
    banner_description character varying(300)
);


ALTER TABLE news.news_page OWNER TO thientrucdb_user;

--
-- Name: news_seq; Type: SEQUENCE; Schema: news; Owner: thientrucdb_user
--

CREATE SEQUENCE news.news_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE news.news_seq OWNER TO thientrucdb_user;

--
-- Name: category_seq; Type: SEQUENCE; Schema: product; Owner: thientrucdb_user
--

CREATE SEQUENCE product.category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE product.category_seq OWNER TO thientrucdb_user;

--
-- Name: highlight_producs; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.highlight_producs (
    highlight_product_ids integer[]
);


ALTER TABLE product.highlight_producs OWNER TO thientrucdb_user;

--
-- Name: price_page; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.price_page (
    banner_title character varying(200),
    banner_description character varying(700)
);


ALTER TABLE product.price_page OWNER TO thientrucdb_user;

--
-- Name: product_categories; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.product_categories (
    id text NOT NULL,
    name character varying(300),
    item_count integer
);


ALTER TABLE product.product_categories OWNER TO thientrucdb_user;

--
-- Name: product_page; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.product_page (
    banner_title character varying(200),
    banner_description character varying(700)
);


ALTER TABLE product.product_page OWNER TO thientrucdb_user;

--
-- Name: product_prices; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.product_prices (
    id integer NOT NULL,
    product_id text NOT NULL,
    price double precision,
    note text DEFAULT 'Mac dinh'::text
);


ALTER TABLE product.product_prices OWNER TO thientrucdb_user;

--
-- Name: product_prices_id_seq; Type: SEQUENCE; Schema: product; Owner: thientrucdb_user
--

CREATE SEQUENCE product.product_prices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE product.product_prices_id_seq OWNER TO thientrucdb_user;

--
-- Name: product_prices_id_seq; Type: SEQUENCE OWNED BY; Schema: product; Owner: thientrucdb_user
--

ALTER SEQUENCE product.product_prices_id_seq OWNED BY product.product_prices.id;


--
-- Name: product_seq; Type: SEQUENCE; Schema: product; Owner: thientrucdb_user
--

CREATE SEQUENCE product.product_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE product.product_seq OWNER TO thientrucdb_user;

--
-- Name: products; Type: TABLE; Schema: product; Owner: thientrucdb_user
--

CREATE TABLE product.products (
    id text NOT NULL,
    name character varying(500),
    description text,
    product_img text,
    category_id text,
    product_specifications text,
    warranty_period integer,
    product_features text[],
    highlight_features integer[],
    is_featured boolean
);


ALTER TABLE product.products OWNER TO thientrucdb_user;

--
-- Name: project_contents; Type: TABLE; Schema: project; Owner: thientrucdb_user
--

CREATE TABLE project.project_contents (
    project_id text NOT NULL,
    content text
);


ALTER TABLE project.project_contents OWNER TO thientrucdb_user;

--
-- Name: project_page; Type: TABLE; Schema: project; Owner: thientrucdb_user
--

CREATE TABLE project.project_page (
    banner_title character varying(100),
    banner_description character varying(300)
);


ALTER TABLE project.project_page OWNER TO thientrucdb_user;

--
-- Name: project_region_seq; Type: SEQUENCE; Schema: project; Owner: thientrucdb_user
--

CREATE SEQUENCE project.project_region_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE project.project_region_seq OWNER TO thientrucdb_user;

--
-- Name: project_regions; Type: TABLE; Schema: project; Owner: thientrucdb_user
--

CREATE TABLE project.project_regions (
    id text NOT NULL,
    name character varying(50),
    rgb_color character(7),
    item_count integer
);


ALTER TABLE project.project_regions OWNER TO thientrucdb_user;

--
-- Name: project_seq; Type: SEQUENCE; Schema: project; Owner: thientrucdb_user
--

CREATE SEQUENCE project.project_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE project.project_seq OWNER TO thientrucdb_user;

--
-- Name: projects; Type: TABLE; Schema: project; Owner: thientrucdb_user
--

CREATE TABLE project.projects (
    id text NOT NULL,
    region_id text,
    title character varying(100),
    province character varying(50),
    complete_time date,
    main_img text,
    main_content character varying(200),
    is_featured boolean DEFAULT false
);


ALTER TABLE project.projects OWNER TO thientrucdb_user;

--
-- Name: recruitment_page; Type: TABLE; Schema: recruitment; Owner: thientrucdb_user
--

CREATE TABLE recruitment.recruitment_page (
    banner_title character varying(100),
    banner_description character varying(300),
    culture_content text,
    culture_img_1 text,
    culture_img_2 text,
    culture_img_3 text,
    culture_img_4 text
);


ALTER TABLE recruitment.recruitment_page OWNER TO thientrucdb_user;

--
-- Name: company_services id; Type: DEFAULT; Schema: about_us; Owner: thientrucdb_user
--

ALTER TABLE ONLY about_us.company_services ALTER COLUMN id SET DEFAULT nextval('about_us.company_services_id_seq'::regclass);


--
-- Name: why_choose_us id; Type: DEFAULT; Schema: about_us; Owner: thientrucdb_user
--

ALTER TABLE ONLY about_us.why_choose_us ALTER COLUMN id SET DEFAULT nextval('about_us.why_choose_us_id_seq'::regclass);


--
-- Name: activity_logs id; Type: DEFAULT; Schema: admin; Owner: thientrucdb_user
--

ALTER TABLE ONLY admin.activity_logs ALTER COLUMN id SET DEFAULT nextval('admin.activity_logs_id_seq'::regclass);


--
-- Name: support_agents id; Type: DEFAULT; Schema: contact; Owner: thientrucdb_user
--

ALTER TABLE ONLY contact.support_agents ALTER COLUMN id SET DEFAULT nextval('contact.support_agents_id_seq'::regclass);


--
-- Name: highlight_stats_about_us id; Type: DEFAULT; Schema: home; Owner: thientrucdb_user
--

ALTER TABLE ONLY home.highlight_stats_about_us ALTER COLUMN id SET DEFAULT nextval('home.highlight_stats_about_us_id_seq'::regclass);


--
-- Name: product_prices id; Type: DEFAULT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.product_prices ALTER COLUMN id SET DEFAULT nextval('product.product_prices_id_seq'::regclass);


--
-- Data for Name: about_us_page; Type: TABLE DATA; Schema: about_us; Owner: thientrucdb_user
--

COPY about_us.about_us_page (banner_title, banner_description, our_story_content) FROM stdin;
Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401.\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401\n\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật B
Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401.\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401\n\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật B
\.


--
-- Data for Name: company_services; Type: TABLE DATA; Schema: about_us; Owner: thientrucdb_user
--

COPY about_us.company_services (id, title, description, details) FROM stdin;
4	Tư Vấn & Đào Tạo	Chúng tôi không chỉ cung cấp thiết bị và dịch vụ, mà còn tư vấn và\r\nđào tạo để khách hàng có thể sử dụng hiệu quả các giải pháp công\r\nnghệ.	{"Tư vấn lựa chọn thiết bị phù hợp nhu cầu","Đào tạo sử dụng thiết bị, hệ thống công nghệ","Hướng dẫn xử lý sự cố cơ bản","Tư vấn nâng cấp, mở rộng hệ thống","Cập nhật xu hướng công nghệ mới"}
2	Bảo Trì & Sửa Chữa	Chúng tôi cung cấp dịch vụ bảo trì định kỳ và sửa chữa kịp thời, giúp thiết bị của bạn luôn hoạt động ổn định và kéo dài tuổi thọ	{"Bảo trì định kỳ hệ thống màn hình LED, TV","Sửa chữa, thay thế linh kiện thiết bị điện tử","Khắc phục sự cố hệ thống âm thanh, ánh sáng","Nâng cấp, cải tiến hệ thống công nghệ hiện có","Dịch vụ hỗ trợ kỹ thuật 24/7"}
3	Giải Pháp Công Nghệ Mới	Chúng tôi cung cấp các giải pháp công nghệ toàn diện, được thiết kế riêng để đáp ứng nhu cầu cụ thể của từng khách hàng.	{"Giải pháp hội nghị truyền hình trực tuyến","Giải pháp phòng họp thông minh","Giải pháp quảng cáo kỹ thuật số","Giải pháp hệ thống âm thanh chuyên nghiệp","Giải pháp nhà thông minh cho doanh nghiệp"}
14	123	123	{123}
15	123	123	{123}
\.


--
-- Data for Name: why_choose_us; Type: TABLE DATA; Schema: about_us; Owner: thientrucdb_user
--

COPY about_us.why_choose_us (id, title, description, details) FROM stdin;
1	Chuyên Môn Cao	Đội ngũ kỹ thuật viên với hơn 8 năm kinh nghiệm trong lĩnh vực lắp đặt và bảo trì thiết bị công nghệ.	{"Kỹ thuật viên được đào tạo chuyên sâu","Kinh nghiệm đa dạng với nhiều loại thiết bị","Cập nhật công nghệ mới nhất"}
2	Dịch Vụ Toàn Diện	Cung cấp đầy đủ các dịch vụ từ tư vấn, lắp đặt, bảo trì đến sửa chữa và hỗ trợ kỹ thuật.	{"Tư vấn lựa chọn thiết bị phù hợp","Lắp đặt chuyên nghiệp, đúng kỹ thuật","Hỗ trợ kỹ thuật 24/7"}
12	fsdf	AAAAAAAAAA	{AAA,CCCC}
15	12312	213	{123}
16	ádfád	dsfadfa	{dfádfa}
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: admin; Owner: thientrucdb_user
--

COPY admin.accounts (username, role, password, fullname, phone, email, "position", description) FROM stdin;
manager2	manager	$2b$10$m4M/EuAd5zemr2XEniyP0edZKRFm7XPtHD1EP41gCxVd5.m39AFoe	Nguyễn Văn B	0987654321	nguyenvanb@gmail.com	Chăm sóc khách hàng	Hoạt động 24/7 trên đường hotline
taikhoanmoi	manager	$2b$10$gZtBxIp2QgCSyHONTrpgLOsxGR82tPKTemEnpAaDD/0X3I/LQoNDi	123	21312313	1111@student.hcmus.edu.vn	1	1
admin	admin	$2b$10$1eJLS.ylyhn3qz.Ouk6BrOOCYtK9sw.ldI4PSEH9BzOgjv0lYRdg.	Đỗ Thanh Tùng	\N	\N	\N	\N
minhlaun	manager	$2b$10$hKVlg3v6lo9pOcGqIj.NUeCZUFn1epCISIsC5502X/R4f.fMd83M6	sadasdasdasd				
ductri	manager	$2b$10$yJQfkLh5Lb0K7xRAlsfco.yjtYX4KJKm.OnIs3dBOnCav93XEVhua	Tri				
hgau	manager	$2b$10$QsJynDYp7KZUbu9oZzyC.u5Kl9ecoY4.MX.FupXdKyuOLB3wJK3tO	Huỳnh Gia Âu	0123	huynhgiaau27112005@gmail.com	abc	abc
hgbao	manager	$2b$10$bbML7rvp8JvdvPvqvVBv.uoycQJKx/uRc6orAH1MHsbqSU3G8sSmK	Huỳnh Gia Bảo				
dnmtri23	manager	$2b$10$XwpkDDfGBLdR.aSovke1/e7UCwUmMOk8B1xgjHKyuIrvQE.NPLgIS	Tri				
manager1	manager	$2b$10$40ZA0j7rGay3PcC7gK3DE.piK8qJ1npYuV6NVN0FZsbaXC/kZ1H/O	Nguyễn Văn A		flazerfa123@gmail.com		
ductri0981	manager	$2b$10$dshK3WyY3FStORf33FK6puieAvAGKsPRSfBap4zZr/bkOEzIuFTSC	Nguyễn Đức Trí	0906640981	ductri0981@gmail.com	Developer	Fullstack developer
huynhgiaau	manager	$2b$10$A3jK0g7gmcOmjRr7LW1mx.lFzJoXPuoo03lIGHD4ZLasOj.vT03qu	a	a	huynhgiau27112005@gmail.com	a	a
\.


--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: admin; Owner: thientrucdb_user
--

COPY admin.activity_logs (id, content, username, "time") FROM stdin;
1205	Tạo Người Liên Hệ: Nguyễn Đức Trí	admin	2025-07-30 19:43:22.674188+07
1216	Cập nhật tin tức nổi bật	admin	2025-07-30 20:27:05.046985+07
1225	Cập nhật Thông Tin Công Ty	hgau	2025-07-30 20:47:10.695361+07
1234	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0016 - MOUSE QUANG CÓ DÂY	hgau	2025-07-30 20:52:45.595058+07
1243	Tạo dự án: DA0033 - abc	hgau	2025-07-30 20:56:20.071161+07
1254	Cập nhật Banner trang Trang Chủ	hgau	2025-07-30 21:00:47.079246+07
1263	Cập nhật Banner trang Dự Án	hgau	2025-07-30 21:07:54.852646+07
1265	Cập nhật trang Tuyển Dụng	hgau	2025-07-30 21:08:10.343086+07
1278	Cập nhật tin tức nổi bật	hgau	2025-07-30 21:20:46.98594+07
1287	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0008 - MinhTri	admin	2025-07-31 11:59:28.160472+07
1298	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:31:21.233866+07
1306	Cập nhật Banner trang Dự Án	hgau	2025-07-31 16:06:22.529387+07
1314	Cập nhật Người Liên Hệ: Nguyễn Đức Trí	admin	2025-08-01 22:24:48.887462+07
1322	Xóa tin tức: TT0040 - Tin tức mới	admin	2025-08-02 13:01:00.608816+07
1330	Xóa tin tức: TT0063 - 	admin	2025-08-02 13:09:08.749526+07
1338	Tạo khu vực dự án: KV0015 - asdasd	admin	2025-08-02 13:25:41.567731+07
1347	Tạo dự án: DA0037 - fasf	admin	2025-08-02 13:33:18.089221+07
1348	Trưng bày dự án: DA0037 - fasf	admin	2025-08-02 13:33:23.134322+07
1356	Cập nhật tin tức (đã đổi tên): TT0011 - Agribank và 10 thành tựu nổi bật năm 2024	admin	2025-08-02 14:04:24.905004+07
1364	Tạo Manager: ductri - Tri	admin	2025-08-02 14:50:04.848946+07
1373	Tạo Người Liên Hệ: 4324324234	admin	2025-08-02 16:26:28.873466+07
1381	Xóa Người Liên Hệ: 123Tesstting	hgau	2025-08-02 18:28:11.881555+07
1383	Xóa Người Liên Hệ: 123123	hgau	2025-08-02 18:28:20.40799+07
1391	Gán loại sản phẩm LS0003 - MONITOR cho các sản phẩm: SP0012, SP0013, SP0015	hgau	2025-08-02 20:06:32.734766+07
1399	Cập nhật tin tứcundefined - FPT vào Top 40 doanh nghiệp CNTT châu Á: TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	hgau	2025-08-02 20:17:43.19222+07
1408	Tạo khu vực dự án: KV0018 - Khu vực mới	hgau	2025-08-02 20:23:18.215255+07
1424	Cập nhật sản phẩm: SP0068 - RAM mới	hgau	2025-08-02 20:26:35.508509+07
1433	Xóa tin tức: TT0010 - VietinBank thu hút nhân tài để thúc đẩy chuyển đổi số	admin	2025-08-02 20:59:28.762775+07
1442	Xóa tin tức: TT0011 - Agribank và 10 thành tựu nổi bật năm 2024	admin	2025-08-02 21:04:58.716963+07
1451	Xóa dự án: DA0039 - Công trình Mall ở Quảng Ngãi siêu cấp Vjp Pro	admin	2025-08-02 21:09:00.804805+07
1458	Xóa sản phẩm: SP0021 - CPU Intel Core i5-12400- Box(SK1700)	admin	2025-08-02 21:16:41.72939+07
1471	Tạo dự án: DA0045 - awe	admin	2025-08-02 21:33:10.507867+07
1486	Tạo dự án: DA0048 - d	admin	2025-08-02 21:41:35.12029+07
1501	Trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	admin	2025-08-02 21:45:48.310823+07
1206	Cập nhật sản phẩm: SP0055 - dfasfasfd	admin	2025-07-30 19:43:57.049362+07
1217	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	admin	2025-07-30 20:27:39.825951+07
1226	Cập nhật Thông Tin Công Ty	hgau	2025-07-30 20:48:12.880452+07
1235	Cập nhật Thông Tin Công Ty	dnmtri23	2025-07-30 20:52:48.054744+07
1244	Cập nhật dự án: DA0033 - abc	hgau	2025-07-30 20:57:02.939086+07
1255	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	hgau	2025-07-30 21:01:01.844811+07
1266	Cập nhật trang Tuyển Dụng	hgau	2025-07-30 21:09:12.473728+07
1268	Cập nhật Banner trang Liên Hệ	hgau	2025-07-30 21:09:27.701222+07
1280	Tạo Người Liên Hệ: Huỳnh Gia Âu	hgau	2025-07-30 21:45:13.515302+07
1289	Tạo khu vực dự án: KV0011 - czxc	admin	2025-07-31 12:00:19.378886+07
1299	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:38:04.291208+07
1307	Cập nhật Banner trang Tin Tức	hgau	2025-07-31 16:08:02.951662+07
1315	Cập nhật Người Liên Hệ: 123123	admin	2025-08-01 22:25:29.386488+07
1323	Tạo tin tức: TT0060 - 	admin	2025-08-02 13:01:29.70294+07
1331	Tạo tin tức: TT0064 - 	admin	2025-08-02 13:10:43.566215+07
1339	Gán khu vực KV0014 - dasd cho các dự án: DA0034	admin	2025-08-02 13:25:47.405889+07
1349	Tạo tin tức: TT0066 - 	admin	2025-08-02 13:44:41.811364+07
1357	Cập nhật tin tức (đã đổi tên): TT0011 - Agribank và 10 thành tựu nổi bật năm 2024	admin	2025-08-02 14:13:02.990774+07
1365	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	admin	2025-08-02 14:53:01.57723+07
1374	Tạo Người Liên Hệ: 1231313	admin	2025-08-02 16:31:03.727162+07
1384	Xóa Người Liên Hệ: fdsfdsfads	hgau	2025-08-02 18:30:33.047519+07
1392	Gán loại sản phẩm LS0002 - PHẦN MỀM DIỆT VIRUS cho các sản phẩm: SP0012, SP0013, SP0015, SP0016	hgau	2025-08-02 20:06:50.917759+07
1400	Cập nhật tin tức: TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	hgau	2025-08-02 20:18:42.724444+07
1409	Cập nhật Banner trang Trang Chủ	hgau	2025-08-02 20:23:30.824347+07
1425	Tạo Manager: hgbao - Huỳnh Gia Bảo	admin	2025-08-02 20:29:15.286494+07
1434	Tạo dự án: DA0041 - fdfda	admin	2025-08-02 21:00:39.65595+07
1443	Tạo khu vực dự án: KV0020 - ưe	admin	2025-08-02 21:06:07.089162+07
1452	Cập nhật sản phẩm: SP0068 - RAM mới	admin	2025-08-02 21:09:43.315569+07
1459	Cập nhật tin tức: TT0045 - ádddddddddád	admin	2025-08-02 21:18:37.264088+07
1472	Bỏ trưng bày sản phẩm: SP0012 - Kaspersky Plus 1pc - Bản quyền 02 năm	admin	2025-08-02 21:33:18.194285+07
1474	Bỏ trưng bày sản phẩm: SP0012 - Kaspersky Plus 1pc - Bản quyền 02 năm	admin	2025-08-02 21:33:21.705639+07
1487	Xóa dự án: DA0048 - d	admin	2025-08-02 21:41:41.388859+07
1502	Trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	admin	2025-08-02 21:46:38.167647+07
1506	Bỏ trưng bày sản phẩm: SP0015 - Bkav Pro (1PC) - Bản quyền 01 năm	admin	2025-08-02 21:46:49.984979+07
1508	Trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	admin	2025-08-02 21:46:52.78273+07
1207	Tạo sản phẩm: SP0066 - fdfd	admin	2025-07-30 19:44:30.358926+07
1218	Tạo Người Liên Hệ: Huỳnh Gia Âu	hgau	2025-07-30 20:38:32.435027+07
1227	Cập nhật Thông Tin Công Ty	hgau	2025-07-30 20:48:49.354687+07
1236	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0012 - POWER	hgau	2025-07-30 20:53:33.413177+07
1245	Cập nhật dự án (đã đổi tên): DA0033 - abcaa	hgau	2025-07-30 20:57:16.663819+07
1256	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	hgau	2025-07-30 21:03:18.485161+07
1267	Cập nhật trang Tuyển Dụng	hgau	2025-07-30 21:09:16.596142+07
1281	Cập nhật dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-30 21:55:43.414401+07
1290	Tạo khu vực dự án: KV0012 - zxcxc	admin	2025-07-31 12:00:23.089718+07
1300	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:39:01.254625+07
1308	Tạo tin tức: TT0056 - Test ảnh mới tối ưu	admin	2025-08-01 17:42:35.097216+07
1316	Cập nhật Người Liên Hệ: Đỗ Nguyễn Minh Trí	admin	2025-08-01 22:26:26.020881+07
1324	Xóa tin tức: TT0060 - 	admin	2025-08-02 13:02:14.113939+07
1332	Xóa tin tức: TT0064 - 	admin	2025-08-02 13:11:15.292025+07
1340	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0014 - dasd	admin	2025-08-02 13:26:20.0307+07
1342	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0015 - asdasd	admin	2025-08-02 13:26:29.610286+07
1350	Xóa tin tức: TT0066 - 	admin	2025-08-02 13:45:08.781164+07
1358	Cập nhật Người Liên Hệ: 123	admin	2025-08-02 14:14:06.21551+07
1366	Cập nhật trang Tuyển Dụng	admin	2025-08-02 14:53:31.150744+07
1367	Xóa tin tức: TT0013 - Doanh nghiệp ngành gỗ đặt mục tiêu hoàn thiện chuỗi cung ứng	admin	2025-08-02 14:53:51.257446+07
1375	Tạo Người Liên Hệ: 233213123	admin	2025-08-02 16:32:44.433047+07
1385	Tạo Người Liên Hệ: Nguyễn Phúc Ti Na	hgau	2025-08-02 18:31:28.838752+07
1393	Tạo tin tức: TT0071 - Huỳnh Gia Âu có pồ	hgau	2025-08-02 20:09:55.729249+07
1401	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Âu	hgau	2025-08-02 20:18:54.093624+07
1410	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	hgau	2025-08-02 20:23:34.172112+07
1411	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	hgau	2025-08-02 20:23:38.122432+07
1426	Cập nhật sản phẩm: SP0068 - RAM mới	admin	2025-08-02 20:33:00.605403+07
1435	Cập nhật Banner trang Trang Chủ	admin	2025-08-02 21:00:44.727345+07
1436	Xóa Thông Số Nổi Bật trang Trang Chủ: 50+ Số liệu hoàn toàn	admin	2025-08-02 21:00:50.768665+07
1444	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0020 - ưe	admin	2025-08-02 21:06:29.335071+07
1453	Cập nhật sản phẩm: SP0019 - CPU Intel Core i5-10400- Box(SK1200)	admin	2025-08-02 21:10:29.470071+07
1460	Tạo dự án: DA0042 - fdfd	admin	2025-08-02 21:20:25.622929+07
1473	Trưng bày sản phẩm: SP0012 - Kaspersky Plus 1pc - Bản quyền 02 năm	admin	2025-08-02 21:33:19.534363+07
1475	Bỏ trưng bày sản phẩm: SP0024 - HDD Western 1TB - WD11PURZ	admin	2025-08-02 21:33:25.178654+07
1488	Xóa dự án: DA0045 - awe	admin	2025-08-02 21:41:51.445417+07
1503	Bỏ trưng bày sản phẩm: SP0015 - Bkav Pro (1PC) - Bản quyền 01 năm	admin	2025-08-02 21:46:40.99204+07
1504	Trưng bày sản phẩm: SP0015 - Bkav Pro (1PC) - Bản quyền 01 năm	admin	2025-08-02 21:46:46.867215+07
1505	Bỏ trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	admin	2025-08-02 21:46:48.333887+07
1507	Bỏ trưng bày sản phẩm: SP0016 - Trend micro internet Security 3pc -  Bản quyền 01 năm	admin	2025-08-02 21:46:51.275546+07
1461	Xóa dự án: DA0042 - fdfd	admin	2025-08-02 21:20:29.979475+07
1476	Trưng bày sản phẩm: SP0020 - CPU Intel Core i3-12100 - Box(SK1700)	admin	2025-08-02 21:33:59.613344+07
1489	Tạo dự án: DA0049 - d	admin	2025-08-02 21:42:10.267178+07
1509	Xóa tin tức: TT0057 - Test	admin	2025-08-02 21:54:09.451858+07
1462	Tạo dự án: DA0043 - fdsfdsafas	admin	2025-08-02 21:20:37.331297+07
1208	Cập nhật dự án (đã đổi tên): DA0025 - fdsfsaffdsfdfsadfsfsđààdfff	dnmtri23	2025-07-30 19:48:18.829229+07
1219	Cập nhật Người Liên Hệ (đã đổi tên): MỚI a	hgau	2025-07-30 20:39:06.002165+07
1228	Tạo sản phẩm: SP0067 - mới 111	hgau	2025-07-30 20:51:26.176727+07
1237	Tạo tin tức: TT0055 - 	hgau	2025-07-30 20:54:02.925373+07
1246	Cập nhật dự án: DA0033 - abcaa	hgau	2025-07-30 20:57:28.235283+07
1257	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	hgau	2025-07-30 21:03:42.689882+07
1269	Cập nhật Banner trang Về Chúng Tôi	hgau	2025-07-30 21:09:41.831677+07
1272	Cập nhật Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: fsdf	hgau	2025-07-30 21:09:56.60934+07
1282	Cập nhật dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-30 21:57:01.099048+07
1291	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0012 - zxcxc	admin	2025-07-31 12:05:03.682703+07
1293	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0002 - Miền Trung	admin	2025-07-31 12:05:08.278506+07
1301	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:40:48.771601+07
1309	Tạo tin tức: TT0057 - Test	admin	2025-08-01 17:45:23.652004+07
1317	Cập nhật sản phẩm: SP0044 - CAMERA EZVIZ CS-H6C-4MP	admin	2025-08-01 22:33:00.144143+07
1325	Tạo tin tức: TT0061 - 	admin	2025-08-02 13:03:41.388635+07
1333	Tạo tin tức: TT0065 - 	admin	2025-08-02 13:12:50.369944+07
1341	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0013 - 11	admin	2025-08-02 13:26:27.535896+07
1351	Tạo tin tức: TT0067 - 	admin	2025-08-02 13:46:04.746313+07
1359	Cập nhật Người Liên Hệ: 123	admin	2025-08-02 14:14:38.727184+07
1368	Tạo tin tức: TT0068 - 	admin	2025-08-02 15:14:15.137644+07
1376	Tạo Người Liên Hệ: 321313	admin	2025-08-02 16:35:14.025198+07
1386	Cập nhật Người Liên Hệ (đã đổi tên): Lươn Phúc Mãng Cầu	hgau	2025-08-02 18:32:14.746895+07
1394	Cập nhật tin tức (đã đổi tên): TT0071 - Huỳnh Gia Âu có pồ	hgau	2025-08-02 20:10:35.353661+07
1402	Cập nhật sản phẩm (đã đổi tên): SP0012 - Kaspersky Plus 1pc - Bản quyền 02 năm	hgau	2025-08-02 20:19:19.080222+07
1404	Cập nhật tin tức: TT0010 - VietinBank thu hút nhân tài để thúc đẩy chuyển đổi số	hgau	2025-08-02 20:19:44.67099+07
1412	Cập nhật Thông Số Nổi Bật trang Trang Chủ (đã đổi tên): 1000000 Tên thành tựu Tên thành tựu Tên thành tựu	hgau	2025-08-02 20:23:59.462892+07
1427	Tạo tin tức: TT0072 - fdfd	admin	2025-08-02 20:57:31.166937+07
1437	Tạo Thông Số Nổi Bật trang Trang Chủ: 5 Con sói	admin	2025-08-02 21:01:12.850789+07
1445	Cập nhật khu vực dự án (đã đổi tên): KV0019 - fdsferwqrád	admin	2025-08-02 21:06:52.22059+07
1447	Cập nhật khu vực dự án (đã đổi tên): KV0019 - fdsferwqrádá	admin	2025-08-02 21:07:04.886843+07
1454	Cập nhật sản phẩm: SP0068 - RAM mới	admin	2025-08-02 21:14:14.883286+07
1477	Xóa tin tức: TT0055 - aaaaaaaaaaaa	admin	2025-08-02 21:34:40.613355+07
1490	Xóa dự án: DA0049 - d	admin	2025-08-02 21:42:15.856076+07
1510	Xóa tin tức: TT0056 - Test ảnh mới tối ưu	admin	2025-08-02 21:54:33.573807+07
1463	Xóa dự án: DA0043 - fdsfdsafas	admin	2025-08-02 21:20:45.838333+07
1478	Trưng bày dự án: DA0044 - Dự án nổi bật mới	admin	2025-08-02 21:38:12.497377+07
1491	Tạo dự án: DA0050 - s	admin	2025-08-02 21:42:29.473263+07
1511	Xóa tin tức: TT0059 - Hello	admin	2025-08-02 21:54:51.833625+07
1464	Xóa tin tức: TT0053 - d	admin	2025-08-02 21:29:43.403702+07
1479	Trưng bày dự án: DA0045 - awe	admin	2025-08-02 21:38:19.972481+07
1209	Cập nhật tin tức (đã đổi tên): TT0050 - ádddddddddádf	admin	2025-07-30 19:48:26.975993+07
1220	Xóa Người Liên Hệ: minluan	hgau	2025-07-30 20:41:57.633288+07
1229	Bỏ trưng bày sản phẩm: SP0067 - mới 111	hgau	2025-07-30 20:51:31.901192+07
1238	Cập nhật tin tức (đã đổi tên): TT0055 - aaaaaaaaaaaa	hgau	2025-07-30 20:54:45.769731+07
1247	Xóa dự án: DA0033 - abcaa	hgau	2025-07-30 20:57:34.83799+07
1258	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	hgau	2025-07-30 21:04:00.790687+07
1270	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	hgau	2025-07-30 21:09:47.149287+07
1283	Cập nhật dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-30 21:57:20.547458+07
1292	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0011 - czxc	admin	2025-07-31 12:05:06.316445+07
1294	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0001 - Miền Bắc	admin	2025-07-31 12:05:09.878804+07
1302	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:42:44.573606+07
1310	Tạo tin tức: TT0058 - Test có tạo ảnh webp không	admin	2025-08-01 17:48:26.667478+07
1318	Xóa sản phẩm: SP0044 - CAMERA EZVIZ CS-H6C-4MP	admin	2025-08-01 22:33:20.688604+07
1326	Xóa tin tức: TT0061 - 	admin	2025-08-02 13:04:14.468266+07
1334	Xóa tin tức: TT0065 - 	admin	2025-08-02 13:13:04.830455+07
1343	Tạo khu vực dự án: KV0016 - as	admin	2025-08-02 13:30:11.197724+07
1352	Cập nhật tin tức (đã đổi tên): TT0067 - 	admin	2025-08-02 13:46:56.796601+07
1360	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	admin	2025-08-02 14:23:37.044225+07
1369	Tạo tin tức: TT0069 - fgfgfg	admin	2025-08-02 15:36:59.117772+07
1377	Tạo Người Liên Hệ: 324324324	admin	2025-08-02 16:39:10.290934+07
1387	Xóa Người Liên Hệ: Lươn Phúc Mãng Cầu	hgau	2025-08-02 18:32:34.001371+07
1395	Cập nhật tin tức (đã đổi tên): TT0071 - Huỳnh Gia Âu có pồ	hgau	2025-08-02 20:11:40.948387+07
1403	Cập nhật sản phẩm: SP0012 - Kaspersky Plus 1pc - Bản quyền 02 năm	hgau	2025-08-02 20:19:31.218734+07
1413	Cập nhật tin tức nổi bật	hgau	2025-08-02 20:24:28.733073+07
1428	Tạo loại tin tức: LT0019 - fdfdsafsdf	admin	2025-08-02 20:58:16.309476+07
1438	Xóa tin tức: TT0014 - Doanh nghiệp xuất khẩu lao động chui bị phạt 360 triệu đồng	admin	2025-08-02 21:02:17.122408+07
1446	Xóa tin tức: TT0054 - fdfd	admin	2025-08-02 21:07:03.932303+07
1455	Xóa tin tức: TT0017 - Nhiều doanh nghiệp vận tải tăng giá cước nhe	admin	2025-08-02 21:16:05.151041+07
1480	Bỏ trưng bày dự án: DA0044 - Dự án nổi bật mới	admin	2025-08-02 21:38:21.745268+07
1492	Xóa dự án: DA0050 - s	admin	2025-08-02 21:42:36.225877+07
1512	Cập nhật sản phẩm: SP0068 - RAM mới	admin	2025-08-02 22:05:35.720439+07
1465	Xóa tin tức: TT0050 - ádddddddddádf	admin	2025-08-02 21:30:09.922808+07
1481	Xóa dự án: DA0044 - Dự án nổi bật mới	admin	2025-08-02 21:39:05.478184+07
1493	Tạo dự án: DA0051 - d	admin	2025-08-02 21:42:48.25202+07
1466	Xóa dự án: DA0038 - fdsfsfasdfsdfsdfasf	admin	2025-08-02 21:30:18.381352+07
1482	Tạo dự án: DA0046 - d	admin	2025-08-02 21:40:07.225966+07
1494	Xóa dự án: DA0051 - d	admin	2025-08-02 21:42:54.3777+07
543	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:04:17.155017+07
544	Tạo dự án: DA0022 - fdsfsdafa	admin	2025-07-21 18:04:40.561367+07
545	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:04:49.32412+07
546	Xóa dự án: DA0022 - fdsfsdafa	admin	2025-07-21 18:06:27.331633+07
547	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:10:12.611209+07
548	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:15:48.073948+07
549	Tạo sản phẩm: SP0054 - 123	admin	2025-07-21 18:19:57.109882+07
550	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:22:43.088561+07
551	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:23:53.535064+07
552	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:24:09.320986+07
553	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:24:36.966273+07
554	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:26:02.633499+07
555	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:26:21.491802+07
556	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:26:31.858801+07
557	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:27:04.534746+07
558	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:27:14.129333+07
559	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:27:17.657319+07
560	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:27:55.037985+07
561	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:28:18.532221+07
562	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:33:02.843163+07
563	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:33:41.736854+07
564	Tạo Manager: dsa - asdasd	admin	2025-07-21 18:38:22.70786+07
565	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:38:31.57393+07
566	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:39:03.816644+07
567	Tạo tin tức: TT0025 - fdsfds	admin	2025-07-21 18:50:05.34618+07
568	Tạo tin tức: TT0026 - dsfsdf	admin	2025-07-21 18:51:28.568452+07
569	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:52:23.060244+07
570	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:53:11.431288+07
571	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:53:15.833946+07
572	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:53:17.106198+07
573	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:53:25.375919+07
574	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:53:26.373992+07
575	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:54:19.035458+07
576	Xóa tin tức: TT0025 - fdsfds	admin	2025-07-21 18:54:27.985273+07
577	Xóa tin tức: TT0026 - dsfsdf	admin	2025-07-21 18:54:30.699554+07
578	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:54:40.92085+07
579	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:55:37.945165+07
580	Tạo dự án: DA0023 - fdsfds	admin	2025-07-21 18:56:34.232215+07
581	Cập nhật dự án: DA0023 - fdsfds	admin	2025-07-21 18:57:39.293978+07
582	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:58:14.235674+07
583	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:58:18.941072+07
584	Cập nhật Banner trang Trang Chủ	admin	2025-07-21 18:58:21.132982+07
585	Cập nhật dự án: DA0023 - fdsfds	admin	2025-07-21 18:58:24.581316+07
586	Cập nhật dự án: DA0023 - fdsfds	admin	2025-07-21 18:58:54.504622+07
587	Tạo tin tức: TT0027 - fdsfdsaaf	admin	2025-07-21 19:02:28.590377+07
588	Cập nhật tin tức (đã đổi tên): TT0027 - fdsfdsaaf	admin	2025-07-21 19:03:00.517391+07
589	Tạo dự án: DA0024 - sfddsaf	admin	2025-07-21 19:03:57.855515+07
590	Tạo dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:04:27.498636+07
591	Cập nhật dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:04:58.638411+07
592	Cập nhật dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:05:53.65336+07
593	Cập nhật dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:07:25.572454+07
594	Tạo loại tin tức: LT0013 - ABC	admin	2025-07-21 19:08:19.98635+07
595	Cập nhật dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:08:30.14331+07
596	Cập nhật loại sản phẩm (đã đổi tên): LS0005 - CPU INTEL123	admin	2025-07-21 19:17:46.679544+07
597	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0018 - cáp	admin	2025-07-21 19:17:55.973415+07
598	Tạo loại tin tức: LT0014 - sdaf	admin	2025-07-21 19:19:48.952763+07
599	Cập nhật dự án: DA0025 - fdsfsaf	admin	2025-07-21 19:20:45.261308+07
600	Cập nhật dự án (đã đổi tên): DA0025 - fdsfsaffdsf	admin	2025-07-21 19:23:57.979526+07
601	Cập nhật dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	admin	2025-07-21 19:27:01.824185+07
602	Cập nhật tin tức (đã đổi tên): TT0027 - fdsfdsaaf	admin	2025-07-21 19:29:42.546752+07
603	Tạo loại tin tức: LT0015 - MinhTri	admin	2025-07-21 19:35:58.055074+07
604	Tạo khu vực dự án: KV0004 - dfa	admin	2025-07-21 19:36:11.113613+07
605	Tạo dự án: DA0026 - fdsf	admin	2025-07-21 19:36:17.990265+07
606	Tạo khu vực dự án: KV0005 - MinhTri	admin	2025-07-21 19:38:48.356588+07
607	Tạo khu vực dự án: KV0006 - Đỗ Nguyễn Minh Trí	admin	2025-07-21 19:41:29.65648+07
608	Tạo khu vực dự án: KV0007 - sdf	admin	2025-07-21 19:42:12.468445+07
609	Tạo khu vực dự án: KV0008 - MinhTri	admin	2025-07-21 19:42:26.432133+07
610	Xóa Manager: 123123 - 12312	admin	2025-07-21 19:42:58.609172+07
611	Xóa Manager: dsa - asdasd	admin	2025-07-21 19:51:07.194083+07
612	Tạo Manager: 123 - 123132	admin	2025-07-21 20:16:30.92004+07
613	Xóa Manager: 123 - 123132	admin	2025-07-21 20:17:58.664845+07
614	Xóa Manager: ductri0981 - Nguyễn Đức Trí	admin	2025-07-21 20:22:32.947294+07
615	Tạo Manager: minhlaun - sadasdasdasd	admin	2025-07-21 20:28:46.473114+07
616	Tạo Manager: 123321 - 12331255	admin	2025-07-21 20:35:49.682034+07
617	Tạo Manager: 123123 - undefined	admin	2025-07-21 20:37:10.68608+07
618	Xóa Manager: 123123 - null	admin	2025-07-21 20:38:12.948117+07
619	Tạo Manager: 123123 - 12323	admin	2025-07-21 20:38:42.642397+07
620	Cập nhật Manager: manager3 - Nguyễn Văn C	admin	2025-07-21 20:41:05.379999+07
621	Cập nhật Manager (đã đổi tên): manager3 - Nguyễn 	admin	2025-07-21 20:41:13.005214+07
622	Cập nhật Manager (đã đổi tên): manager3 - 3453512313	admin	2025-07-21 20:44:06.578672+07
623	Cập nhật Manager (đã đổi tên): manager3 - 3453512313qweqweqe	admin	2025-07-21 20:50:16.329515+07
624	Cập nhật Manager: 123321 - 12331255	admin	2025-07-21 21:00:56.612008+07
625	Tạo Manager: 1231 - 123123	admin	2025-07-21 21:06:59.548405+07
626	Tạo sản phẩm: SP0055 - dfasfasfd	admin	2025-07-21 21:07:44.655269+07
627	Cập nhật Manager (đã đổi tên): 1231 - 12312312313	admin	2025-07-21 21:10:48.864172+07
628	Tạo Manager: 12313 - 123123	admin	2025-07-21 21:19:24.117483+07
629	Cập nhật Manager: 123321 - 12331255	admin	2025-07-21 21:53:29.557068+07
630	Cập nhật Manager (đã đổi tên): 1231 - minhluan	admin	2025-07-21 21:53:39.234428+07
631	Cập nhật Manager: 123321 - 12331255	admin	2025-07-21 21:54:04.758127+07
632	Cập nhật Manager: 123321 - 12331255	admin	2025-07-21 21:54:11.70817+07
633	Cập nhật Manager: 123321 - 12331255	admin	2025-07-21 21:54:17.456168+07
634	Tạo Người Liên Hệ: 1233	admin	2025-07-21 22:06:19.530784+07
635	Tạo Người Liên Hệ: 123123	admin	2025-07-21 22:10:30.344976+07
636	Tạo Người Liên Hệ: minluan	admin	2025-07-21 22:14:35.800879+07
637	Tạo Người Liên Hệ: minluaneweq	admin	2025-07-21 22:15:10.482562+07
638	Cập nhật trang Tuyển Dụng	admin	2025-07-21 22:19:54.451082+07
639	Tạo loại tin tức: LT0016 - ABC	admin	2025-07-21 22:28:18.226296+07
640	Chỉnh sửa loại tin tức (đã đổi tên): LT0001 - Công TyABC	admin	2025-07-21 22:28:27.365919+07
641	Chỉnh sửa loại tin tức (đã đổi tên): LT0010 - Công ty123	admin	2025-07-21 22:28:35.811976+07
642	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0015 - MinhTri	admin	2025-07-21 22:28:43.388715+07
643	Tạo sản phẩm: SP0056 - CABLE MINH TRÍ	admin	2025-07-21 22:29:13.343293+07
644	Tạo sản phẩm: SP0057 - TESSt Đặc điểm	admin	2025-07-21 22:32:18.237894+07
645	Xóa tin tức: TT0008 - 8 dự án giao thông trọng điểm sẽ khởi công trong năm	admin	2025-07-21 22:36:33.708648+07
646	Xóa Manager: 1231 - minhluan	admin	2025-07-21 22:36:55.05581+07
647	Xóa tin tức: TT0003 - aaaaaaaaaaaaaaaaaaafdfdsfsafs	admin	2025-07-21 22:37:04.183586+07
648	Xóa tin tức: TT0027 - fdsfdsaaf	admin	2025-07-21 22:42:29.829292+07
649	Xóa tin tức: TT0004 - Bão đơn xin việc AI	admin	2025-07-21 22:43:12.339168+07
650	Tạo sản phẩm: SP0058 - 123	admin	2025-07-21 22:43:50.518958+07
651	Tạo sản phẩm: SP0059 - CABLE MINH TRÍ	admin	2025-07-21 22:44:54.827027+07
652	Tạo sản phẩm: SP0060 - CABLE MINH TRÍ	admin	2025-07-21 22:46:21.161707+07
653	Xóa tin tức: TT0015 - MobiFone vào top 50 doanh nghiệp sáng tạo, kinh doanh hiệu quả	admin	2025-07-21 22:51:51.505571+07
654	Cập nhật sản phẩm: SP0060 - CABLE MINH TRÍ	admin	2025-07-21 22:54:29.119459+07
655	Xóa dự án: DA0005 - Tập đoàn Điện lực Việt Nam	admin	2025-07-21 22:55:08.392676+07
656	Xóa dự án: DA0026 - fdsf	admin	2025-07-21 22:55:14.596057+07
657	Cập nhật sản phẩm: SP0060 - CABLE MINH TRÍ	admin	2025-07-21 23:12:20.865083+07
658	Cập nhật sản phẩm: SP0056 - CABLE MINH TRÍ	admin	2025-07-21 23:13:19.088482+07
659	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:15.849286+07
660	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:15.967845+07
661	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:16.941935+07
662	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:17.133747+07
663	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:17.468084+07
664	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:18.291954+07
665	Trưng bày dự án: DA0011 - Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum	admin	2025-07-21 23:18:20.455192+07
666	Trưng bày dự án: DA0025 - fdsfsaffdsf	admin	2025-07-21 23:18:22.119125+07
1210	Cập nhật dự án (đã đổi tên): DA0025 - fdsfsaffdsfdfsadfsfsđààdfffassssssssssss	dnmtri23	2025-07-30 19:48:55.462991+07
1221	Tạo Người Liên Hệ: mới 2	hgau	2025-07-30 20:42:19.935996+07
1230	Cập nhật sản phẩm (đã đổi tên): SP0067 - mới 1111	hgau	2025-07-30 20:51:47.44623+07
1239	Cập nhật tin tức (đã đổi tên): TT0055 - aaaaaaaaaaaa	hgau	2025-07-30 20:54:54.037731+07
1248	Cập nhật Thông Tin Công Ty	hgau	2025-07-30 20:59:40.981582+07
1259	Cập nhật Banner trang Sản Phẩm	hgau	2025-07-30 21:04:21.848193+07
1271	Cập nhật trang Tuyển Dụng	admin	2025-07-30 21:09:53.727083+07
1284	Cập nhật dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-30 21:58:00.567733+07
1295	Tạo khu vực dự án: KV0013 - 11	admin	2025-07-31 12:06:36.769776+07
1303	Cập nhật Banner trang Trang Chủ	hgau	2025-07-31 16:01:14.524921+07
1311	Tạo tin tức: TT0059 - Hello	admin	2025-08-01 17:50:20.983544+07
1319	Tạo Người Liên Hệ: fdsfdsfads	admin	2025-08-01 22:47:08.244239+07
1327	Tạo tin tức: TT0062 - 	admin	2025-08-02 13:05:18.975454+07
1335	Xóa Người Liên Hệ: Huỳnh Gia Âu	admin	2025-08-02 13:13:37.103894+07
1344	Tạo dự án: DA0036 - saf	admin	2025-08-02 13:30:20.195207+07
1353	Cập nhật tin tức (đã đổi tên): TT0067 - 	admin	2025-08-02 13:47:37.347531+07
1361	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	admin	2025-08-02 14:36:57.071852+07
1370	Tạo Người Liên Hệ: fdf	admin	2025-08-02 16:01:45.595643+07
1378	Tạo Người Liên Hệ: 213213	admin	2025-08-02 16:41:18.291616+07
1388	Cập nhật Thông Tin Công Ty	hgau	2025-08-02 18:34:28.569275+07
1396	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	hgau	2025-08-02 20:12:54.871149+07
1405	Tạo dự án: DA0039 - Công trình Mall	hgau	2025-08-02 20:21:59.837373+07
1414	Cập nhật Banner trang Sản Phẩm	hgau	2025-08-02 20:24:35.520854+07
1415	Cập nhật Banner trang Bảng Giá	hgau	2025-08-02 20:24:39.070926+07
1417	Cập nhật Banner trang Tin Tức	hgau	2025-08-02 20:24:44.799164+07
1419	Cập nhật trang Tuyển Dụng	hgau	2025-08-02 20:24:50.81043+07
1421	Cập nhật Banner trang Liên Hệ	hgau	2025-08-02 20:24:57.327416+07
1429	Tạo dự án: DA0040 - fdfeqwr	admin	2025-08-02 20:58:45.663567+07
1439	Xóa tin tức: TT0016 - Phó tổng giám đốc Vietnam Airlines: Hãng hàng không phải giữ slot bay dù khách giảm	admin	2025-08-02 21:02:29.472373+07
1448	Xóa dự án: DA0041 - fdfda	admin	2025-08-02 21:07:24.067492+07
1456	Xóa dự án: DA0036 - saf	admin	2025-08-02 21:16:12.946619+07
1467	Bỏ trưng bày sản phẩm: SP0024 - HDD Western 1TB - WD11PURZ	admin	2025-08-02 21:31:02.992638+07
1468	Trưng bày sản phẩm: SP0024 - HDD Western 1TB - WD11PURZ	admin	2025-08-02 21:31:06.836178+07
1483	Xóa dự án: DA0046 - d	admin	2025-08-02 21:40:15.859192+07
1495	Xóa tin tức: TT0058 - Test có tạo ảnh webp không	admin	2025-08-02 21:43:29.394709+07
667	Trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-21 23:18:23.766749+07
668	Tạo Manager: dnmtri23 - Tri	admin	2025-07-22 00:41:15.062643+07
669	Xóa Manager: 123123 - 12323	admin	2025-07-22 07:41:33.393977+07
670	Tạo Manager: 3123123 - 2131323	admin	2025-07-22 07:41:40.072832+07
671	Cập nhật Manager: 12313 - 123123	admin	2025-07-22 07:41:48.586595+07
672	Tạo Manager: 123123 - 12312	admin	2025-07-22 07:41:55.957927+07
673	Xóa Manager: 123123 - 12312	admin	2025-07-22 07:42:00.266466+07
674	Xóa Manager: 12313 - 123123	admin	2025-07-22 07:42:02.219774+07
675	Xóa Người Liên Hệ: 123231	admin	2025-07-22 07:46:46.109304+07
676	Cập nhật Người Liên Hệ: 12313	admin	2025-07-22 07:46:55.250934+07
677	Xóa Người Liên Hệ: Đức Trí...	admin	2025-07-22 07:47:10.457342+07
678	Tạo Người Liên Hệ: 123123	admin	2025-07-22 07:47:14.029476+07
679	Cập nhật Thông Tin Công Ty	admin	2025-07-22 07:56:48.684247+07
680	Xóa sản phẩm: SP0050 - 123	admin	2025-07-22 08:01:52.997499+07
681	Tạo loại sản phẩm: LS0019 - qrerwrqr	admin	2025-07-22 08:06:15.887446+07
682	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0019 - qrerwrqr	admin	2025-07-22 08:06:21.932713+07
683	Cập nhật loại sản phẩm: LS0009 - SSD	admin	2025-07-22 08:06:46.187474+07
684	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0007 - Cô	admin	2025-07-22 08:41:01.963629+07
685	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0012 - Toi la ai	admin	2025-07-22 08:41:06.260446+07
686	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0013 - ABC	admin	2025-07-22 08:41:13.941872+07
687	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0016 - ABC	admin	2025-07-22 08:41:16.987453+07
688	Xóa dự án: DA0024 - sfddsaf	admin	2025-07-22 08:41:35.78525+07
689	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0007 - sdf	admin	2025-07-22 08:44:46.607973+07
690	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0004 - dfa	admin	2025-07-22 08:44:53.59686+07
691	Cập nhật tin tức (đã đổi tên): TT0009 - Sự kiện chăm sóc xe Hyundai hút nghìn người tham dự	admin	2025-07-22 08:52:09.497864+07
692	Xóa tin tức: TT0009 - Sự kiện chăm sóc xe Hyundai hút nghìn người tham dự	admin	2025-07-22 08:52:16.491302+07
693	Xóa tin tức: TT0021 - Tin tức cũ	admin	2025-07-22 08:52:28.141861+07
694	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 08:58:16.97526+07
695	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:01:50.11637+07
696	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:01:51.109737+07
697	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-22 09:02:14.471549+07
698	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:08:33.987514+07
699	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 09:10:37.567263+07
700	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:23:13.68786+07
701	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:23:22.115799+07
702	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:23:30.22109+07
703	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:23:38.24841+07
704	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:23:42.180574+07
705	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:23:49.928759+07
706	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:25:10.100612+07
707	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:25:18.576496+07
708	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:25:23.209849+07
709	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:25:46.761071+07
710	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:25:59.104842+07
711	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:27:40.647187+07
712	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:27:57.972143+07
713	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:28:57.921435+07
714	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:29:21.936427+07
715	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:29:44.837589+07
716	Cập nhật Banner trang Dự Án	admin	2025-07-22 09:33:06.479878+07
717	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:33:48.547988+07
718	Cập nhật Banner trang Dự Án	admin	2025-07-22 09:35:12.257404+07
719	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:36:07.345584+07
720	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:36:27.585847+07
721	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 09:37:27.923645+07
722	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:37:36.181767+07
723	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-22 09:37:36.33992+07
724	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:39:00.278495+07
725	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:39:26.679528+07
726	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:39:39.773629+07
727	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:40:30.469483+07
728	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:40:48.678008+07
729	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:41:48.347178+07
730	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 09:42:23.884985+07
731	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 09:42:31.366031+07
732	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:42:55.799921+07
733	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:26.986567+07
734	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:28.545188+07
735	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:30.297434+07
736	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:31.305431+07
737	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:32.018399+07
738	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:32.215275+07
739	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:32.383681+07
740	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:44:32.567485+07
741	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:44:41.416403+07
742	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:45:18.196197+07
743	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:45:54.495702+07
744	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:45:56.865505+07
745	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 09:45:59.490676+07
746	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 09:48:12.169543+07
747	Cập nhật Banner trang Dự Án	admin	2025-07-22 09:50:38.271143+07
748	Cập nhật Banner trang Tin Tức	admin	2025-07-22 09:50:49.505207+07
749	Cập nhật Banner trang Tin Tức	admin	2025-07-22 09:52:09.394323+07
750	Tạo sản phẩm: SP0061 - 123	dnmtri23	2025-07-22 09:53:14.858947+07
751	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:53:49.146137+07
752	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:53:52.860198+07
753	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:53:55.985487+07
754	Cập nhật sản phẩm: SP0061 - 123	dnmtri23	2025-07-22 09:53:59.03221+07
755	Cập nhật trang Tuyển Dụng	admin	2025-07-22 09:53:59.280857+07
756	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 09:54:05.33714+07
757	Cập nhật sản phẩm: SP0061 - 123	dnmtri23	2025-07-22 09:56:44.884367+07
758	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 09:56:55.897027+07
759	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 09:57:03.153215+07
760	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 09:57:07.75551+07
761	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 09:57:51.017387+07
762	Cập nhật Banner trang Tin Tức	admin	2025-07-22 09:58:09.475164+07
763	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 10:00:38.475378+07
764	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	admin	2025-07-22 10:00:39.778631+07
765	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	admin	2025-07-22 10:00:41.349649+07
766	Tạo sản phẩm: SP0062 - 123	dnmtri23	2025-07-22 10:03:25.432648+07
767	Tạo sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:04:11.805217+07
768	Cập nhật sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:07:39.914944+07
769	Cập nhật sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:07:45.143544+07
770	Cập nhật sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:08:00.814493+07
771	Trưng bày sản phẩm: SP0061 - 123	dnmtri23	2025-07-22 10:10:44.032219+07
772	Trưng bày sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:10:47.107993+07
773	Bỏ trưng bày sản phẩm: SP0063 - 456	dnmtri23	2025-07-22 10:10:48.649821+07
774	Bỏ trưng bày sản phẩm: SP0061 - 123	dnmtri23	2025-07-22 10:10:49.641224+07
775	Trưng bày dự án: DA0007 - Ngân hàng Vietcombank Chi nhánh Thăng Long	dnmtri23	2025-07-22 10:13:41.649993+07
776	Trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	dnmtri23	2025-07-22 10:13:44.422379+07
777	Bỏ trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	dnmtri23	2025-07-22 10:13:45.200124+07
778	Bỏ trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	dnmtri23	2025-07-22 10:13:46.165085+07
779	Tạo tin tức: TT0028 - 123	dnmtri23	2025-07-22 10:14:17.85584+07
780	Xóa tin tức: TT0028 - 123	dnmtri23	2025-07-22 10:14:26.248812+07
781	Cập nhật tin tức (đã đổi tên): TT0017 - Nhiều doanh nghiệp vận tải tăng giá cước nhe	dnmtri23	2025-07-22 10:15:56.761438+07
782	Tạo tin tức: TT0029 - Toi la ai	dnmtri23	2025-07-22 10:16:12.856915+07
783	Xóa tin tức: TT0029 - Toi la ai	dnmtri23	2025-07-22 10:16:21.577747+07
784	Tạo tin tức: TT0030 - 123	dnmtri23	2025-07-22 10:20:57.288564+07
785	Xóa tin tức: TT0030 - 123	dnmtri23	2025-07-22 10:21:06.558753+07
786	Tạo tin tức: TT0031 - 123	dnmtri23	2025-07-22 10:21:29.373709+07
787	Xóa tin tức: TT0031 - 123	dnmtri23	2025-07-22 10:21:39.348071+07
788	Tạo tin tức: TT0032 - 123	dnmtri23	2025-07-22 10:22:33.678885+07
789	Xóa tin tức: TT0032 - 123	dnmtri23	2025-07-22 10:22:41.160631+07
790	Tạo tin tức: TT0033 - 123	dnmtri23	2025-07-22 10:24:57.997868+07
791	Xóa tin tức: TT0033 - 123	dnmtri23	2025-07-22 10:25:09.229387+07
792	Tạo tin tức: TT0034 - 123	dnmtri23	2025-07-22 10:26:00.850306+07
793	Xóa tin tức: TT0034 - 123	dnmtri23	2025-07-22 10:26:13.080177+07
794	Tạo tin tức: TT0035 - 123	dnmtri23	2025-07-22 10:26:29.981206+07
795	Xóa tin tức: TT0035 - 123	dnmtri23	2025-07-22 10:26:42.373293+07
796	Tạo tin tức: TT0036 - 123	dnmtri23	2025-07-22 10:28:37.922288+07
797	Xóa tin tức: TT0036 - 123	dnmtri23	2025-07-22 10:28:44.394706+07
798	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:37:28.879938+07
799	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:38:11.868356+07
800	Tạo tin tức: TT0037 - 123	dnmtri23	2025-07-22 10:38:47.40001+07
801	Xóa tin tức: TT0037 - 123	dnmtri23	2025-07-22 10:38:55.334647+07
802	Tạo tin tức: TT0038 - 123	dnmtri23	2025-07-22 10:39:27.6368+07
803	Xóa tin tức: TT0038 - 123	dnmtri23	2025-07-22 10:39:33.780512+07
804	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0014 - sdaf	dnmtri23	2025-07-22 10:39:44.108862+07
805	Tạo loại tin tức: LT0017 - 123	dnmtri23	2025-07-22 10:39:48.887515+07
806	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:39:54.781003+07
807	Chỉnh sửa loại tin tức (đã đổi tên): LT0010 - Công ty123456	dnmtri23	2025-07-22 10:39:55.051915+07
808	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-22 10:40:10.12767+07
809	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-22 10:40:15.820218+07
810	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-22 10:40:21.227948+07
811	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:40:26.733534+07
812	Cập nhật Banner trang Dự Án	dnmtri23	2025-07-22 10:40:31.657533+07
813	Cập nhật Banner trang Liên Hệ	dnmtri23	2025-07-22 10:40:47.785025+07
814	Cập nhật Banner trang Về Chúng Tôi	dnmtri23	2025-07-22 10:40:52.951227+07
815	Xóa Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: 4234	dnmtri23	2025-07-22 10:40:58.315481+07
816	Xóa Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: áda	dnmtri23	2025-07-22 10:41:02.517977+07
817	Cập nhật Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: ádsad	dnmtri23	2025-07-22 10:41:13.588189+07
818	Tạo Nhiệm Vụ Và Trách Nhiệm trang Về Chúng Tôi: 123	dnmtri23	2025-07-22 10:41:24.950997+07
819	Xóa Nhiệm Vụ Và Trách Nhiệm trang Vê Chúng Tôi: 123	dnmtri23	2025-07-22 10:41:28.755297+07
820	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:41:54.007293+07
821	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:42:16.55575+07
822	Xóa Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: fsdf	dnmtri23	2025-07-22 10:42:51.52882+07
823	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:43:54.330733+07
824	Cập nhật Banner trang Về Chúng Tôi	dnmtri23	2025-07-22 10:44:48.507921+07
825	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:44:48.53875+07
826	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	dnmtri23	2025-07-22 10:44:52.19567+07
827	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:47:06.667377+07
828	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:47:32.90946+07
829	Cập nhật trang Tuyển Dụng	admin	2025-07-22 10:48:21.440171+07
830	Cập nhật Manager: manager1 - Nguyễn Văn A	admin	2025-07-22 12:22:28.153437+07
831	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 13:02:42.803651+07
832	Xóa Tại Sao Chọn Thiên Trúc trang Về Chúng Tôi: ádsad	admin	2025-07-22 13:07:38.835165+07
833	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 13:11:10.709721+07
834	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	admin	2025-07-22 13:14:33.956983+07
835	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	admin	2025-07-22 13:14:40.08602+07
836	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:15:06.977432+07
837	Cập nhật trang Tuyển Dụng	admin	2025-07-22 13:15:23.698771+07
838	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 13:15:27.276685+07
839	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 13:17:20.884525+07
840	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 13:17:30.013658+07
841	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 13:17:32.945392+07
842	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 13:17:40.497789+07
1211	Bỏ trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm213dfdsfds	admin	2025-07-30 20:26:27.478963+07
1214	Trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-30 20:26:47.71644+07
1222	Xóa Người Liên Hệ: MỚI a	hgau	2025-07-30 20:44:19.550174+07
1231	Xóa sản phẩm: SP0067 - mới 1111	hgau	2025-07-30 20:51:53.335148+07
1240	Tạo loại tin tức: LT0018 - Loại mới	hgau	2025-07-30 20:55:35.107965+07
1249	Tạo khu vực dự án: KV0010 - miền cực lạc	hgau	2025-07-30 21:00:07.044732+07
1252	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0010 - miền cực lạc aa	hgau	2025-07-30 21:00:19.760697+07
1260	Cập nhật Banner trang Bảng Giá	hgau	2025-07-30 21:04:29.670965+07
1273	Tạo Tại Sao Chọn Thiên trúc trang Về Chúng Tôi: 12312	dnmtri23	2025-07-30 21:10:12.515622+07
1274	Tạo Tại Sao Chọn Thiên trúc trang Về Chúng Tôi: ádfád	dnmtri23	2025-07-30 21:10:18.689336+07
1285	Cập nhật dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-30 21:58:30.261332+07
1296	Tạo khu vực dự án: KV0014 - dasd	admin	2025-07-31 12:07:55.618755+07
1304	Cập nhật Banner trang Sản Phẩm	hgau	2025-07-31 16:02:49.477516+07
1312	Cập nhật Người Liên Hệ: 3213213	admin	2025-08-01 22:19:45.62028+07
1320	Xóa Người Liên Hệ: minluaneweq	admin	2025-08-02 12:59:40.132078+07
1328	Xóa tin tức: TT0062 - 	admin	2025-08-02 13:05:32.599921+07
1336	Tạo dự án: DA0034 - a	admin	2025-08-02 13:24:42.706533+07
1345	Trưng bày dự án: DA0036 - saf	admin	2025-08-02 13:30:30.716306+07
1354	Cập nhật tin tức (đã đổi tên): TT0067 - 	admin	2025-08-02 13:48:00.037485+07
1362	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	admin	2025-08-02 14:37:18.345659+07
1371	Tạo Người Liên Hệ: 2/8	admin	2025-08-02 16:02:16.61739+07
1379	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	hgau	2025-08-02 17:58:51.956266+07
1389	Bỏ trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	hgau	2025-08-02 18:40:26.389286+07
1397	Cập nhật tin tức (đã đổi tên): TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	hgau	2025-08-02 20:13:13.283787+07
1406	Cập nhật dự án (đã đổi tên): DA0039 - Công trình Mall ở Quảng Ngãi siêu cấp Vjp Pro	hgau	2025-08-02 20:22:43.903234+07
1416	Cập nhật Banner trang Dự Án	hgau	2025-08-02 20:24:41.974666+07
1418	Cập nhật trang Tuyển Dụng	hgau	2025-08-02 20:24:48.168325+07
1420	Cập nhật trang Tuyển Dụng	hgau	2025-08-02 20:24:54.675376+07
1422	Cập nhật Banner trang Về Chúng Tôi	hgau	2025-08-02 20:25:02.535667+07
1430	Tạo khu vực dự án: KV0019 - fdsferwqr	admin	2025-08-02 20:58:53.600561+07
1431	Xóa tin tức: TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Âu	admin	2025-08-02 20:59:00.444852+07
1440	Cập nhật tin tức: TT0011 - Agribank và 10 thành tựu nổi bật năm 2024	admin	2025-08-02 21:02:51.711905+07
1449	Tạo khu vực dự án: KV0021 - ad	admin	2025-08-02 21:08:02.68016+07
1457	Xóa tin tức: TT0052 - tiên phong nè	admin	2025-08-02 21:16:26.563974+07
1469	Xóa dự án: DA0040 - fdfeqwr	admin	2025-08-02 21:31:20.519196+07
1484	Tạo dự án: DA0047 - s	admin	2025-08-02 21:41:22.096781+07
1496	Tạo dự án: DA0052 - Dự án nổi bật mới	admin	2025-08-02 21:44:59.413402+07
1498	Trưng bày dự án: DA0052 - Dự án nổi bật mới	admin	2025-08-02 21:45:05.701556+07
1500	Trưng bày dự án: DA0052 - Dự án nổi bật mới	admin	2025-08-02 21:45:12.418051+07
843	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 13:17:43.542849+07
844	Cập nhật trang Tuyển Dụng	admin	2025-07-22 13:18:19.127644+07
845	Xóa Người Liên Hệ: 12313	admin	2025-07-22 13:19:41.040987+07
846	Tạo Manager: ductri0981 - Nguyễn Đức Trí	admin	2025-07-22 13:20:47.07675+07
847	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:23:57.292025+07
848	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:24:03.776224+07
849	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:24:06.19506+07
850	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:24:08.666895+07
851	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 13:24:14.219431+07
852	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 13:24:16.184448+07
853	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-22 13:24:19.820255+07
854	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 13:24:22.252621+07
855	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 13:24:27.269656+07
856	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 13:24:30.700401+07
857	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 13:24:34.008967+07
858	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 13:25:17.855943+07
859	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 13:25:26.27564+07
860	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:41:30.937467+07
861	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:45:57.002366+07
862	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:47:20.885529+07
863	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:47:36.966053+07
864	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:49:00.350737+07
865	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:49:44.823621+07
866	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:53:17.066618+07
867	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:55:31.258994+07
868	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 13:56:51.598868+07
869	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 14:00:52.651516+07
870	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 14:01:22.680511+07
871	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 14:03:51.405285+07
872	Gán loại tin tức LT0005 - Thành Tựu cho các tin tức: TT0002	admin	2025-07-22 15:15:14.423911+07
873	Gán loại tin tức LT0002 - Dự Án cho các tin tức: TT0017, TT0014, TT0016, TT0007, TT0013, TT0001	admin	2025-07-22 15:16:19.414178+07
874	Trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 16:23:27.196488+07
875	Bỏ trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 16:23:28.43239+07
876	Trưng bày dự án: DA0001 - Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm	admin	2025-07-22 16:23:29.803961+07
877	Bỏ trưng bày dự án: DA0001 - Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm	admin	2025-07-22 16:23:31.089955+07
878	Trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-22 16:23:32.538038+07
879	Bỏ trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-22 16:23:33.432014+07
880	Bỏ trưng bày dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	admin	2025-07-22 16:23:34.396844+07
881	Trưng bày dự án: DA0001 - Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm	admin	2025-07-22 16:23:38.990171+07
882	Trưng bày dự án: DA0012 - Ủy ban nhân dân xã Ka Đơn	admin	2025-07-22 16:23:46.356295+07
883	Bỏ trưng bày dự án: DA0012 - Ủy ban nhân dân xã Ka Đơn	admin	2025-07-22 16:23:47.491263+07
884	Bỏ trưng bày dự án: DA0010 - Sân vận động tỉnh Kon Tum.	admin	2025-07-22 16:23:48.146667+07
885	Bỏ trưng bày dự án: DA0009 - Bệnh viện Y học cổ truyền tỉnh Đắk Lắk	admin	2025-07-22 16:23:53.429331+07
886	Bỏ trưng bày dự án: DA0025 - fdsfsaffdsf	admin	2025-07-22 16:23:57.561533+07
887	Bỏ trưng bày dự án: DA0011 - Sở Văn hóa, Thể thao và Du lịch tỉnh Kon Tum	admin	2025-07-22 16:24:01.572077+07
888	Trưng bày dự án: DA0010 - Sân vận động tỉnh Kon Tum.	admin	2025-07-22 16:24:04.108773+07
889	Trưng bày dự án: DA0012 - Ủy ban nhân dân xã Ka Đơn	admin	2025-07-22 16:24:06.065754+07
890	Trưng bày dự án: DA0025 - fdsfsaffdsf	admin	2025-07-22 16:24:07.3888+07
891	Bỏ trưng bày dự án: DA0013 - Liên đoàn Lao động quận Gò Vấp - TP.HCM	admin	2025-07-22 16:24:10.673072+07
892	Bỏ trưng bày dự án: DA0014 - Liên đoàn Lao động quận Bình Thạnh - TP.HCM	admin	2025-07-22 16:24:11.483143+07
893	Trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:24:13.821023+07
894	Trưng bày dự án: DA0019 - Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM	admin	2025-07-22 16:24:14.967272+07
895	Trưng bày dự án: DA0020 - Trường Đại học Khoa học Tự nhiên - TP.HCM	admin	2025-07-22 16:24:15.987038+07
896	Trưng bày dự án: DA0023 - fdsfds	admin	2025-07-22 16:24:17.39707+07
897	Trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-22 16:38:11.602563+07
898	Trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-22 16:38:20.894304+07
899	Bỏ trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	admin	2025-07-22 16:38:30.180318+07
900	Trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 16:38:43.653426+07
901	Trưng bày dự án: DA0003 - Văn phòng HĐND & UBND quận Đống Đa	admin	2025-07-22 16:44:21.941718+07
902	Bỏ trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 16:44:36.203015+07
903	Bỏ trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	admin	2025-07-22 16:48:40.054808+07
904	Trưng bày dự án: DA0015 - Chi cục Quản trị, Ngân hàng Nhà nước Việt Nam Tại TP.HCM	admin	2025-07-22 16:48:53.289642+07
905	Bỏ trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:49:18.253002+07
906	Trưng bày dự án: DA0016 - Học viện Cán bộ Tp. HCM	admin	2025-07-22 16:55:53.522782+07
946	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:15:39.488649+07
907	Trưng bày dự án: DA0013 - Liên đoàn Lao động quận Gò Vấp - TP.HCM	admin	2025-07-22 16:56:01.089706+07
908	Bỏ trưng bày dự án: DA0013 - Liên đoàn Lao động quận Gò Vấp - TP.HCM	admin	2025-07-22 16:56:07.295015+07
909	Bỏ trưng bày dự án: DA0019 - Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM	admin	2025-07-22 16:56:09.774867+07
910	Trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 16:59:08.404249+07
911	Bỏ trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 16:59:10.626766+07
912	Trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:13.069239+07
913	Bỏ trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:16.531863+07
914	Trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:19.197455+07
916	Trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 16:59:22.731486+07
918	Trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:26.657493+07
1212	Trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	admin	2025-07-30 20:26:35.042657+07
1223	Cập nhật Người Liên Hệ: 123123	hgau	2025-07-30 20:44:27.950949+07
1232	Gán loại sản phẩm LS0012 - POWER cho các sản phẩm: SP0011, SP0014	hgau	2025-07-30 20:52:15.938147+07
1241	Chỉnh sửa loại tin tức (đã đổi tên): LT0018 - Loại mới aaaaaaa	hgau	2025-07-30 20:55:42.60839+07
1250	Gán khu vực KV0010 - miền cực lạc cho các dự án: DA0025, DA0002	hgau	2025-07-30 21:00:13.21703+07
1251	Cập nhật khu vực dự án (đã đổi tên): KV0010 - miền cực lạc aa	hgau	2025-07-30 21:00:16.4422+07
1261	Cập nhật Banner trang Dự Án	hgau	2025-07-30 21:05:06.206389+07
1275	Tạo Nhiệm Vụ Và Trách Nhiệm trang Về Chúng Tôi: 123	dnmtri23	2025-07-30 21:16:13.08002+07
1276	Tạo Nhiệm Vụ Và Trách Nhiệm trang Về Chúng Tôi: 123	dnmtri23	2025-07-30 21:16:18.897179+07
1286	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0009 - Toi la ai giua cuoc doi nay	admin	2025-07-31 11:59:24.59958+07
1288	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0003 - Miền Nam	admin	2025-07-31 11:59:40.302893+07
1297	Cập nhật Thông Tin Công Ty	hgau	2025-07-31 15:30:18.792174+07
1305	Cập nhật Banner trang Bảng Giá	hgau	2025-07-31 16:04:18.789226+07
1313	Cập nhật Người Liên Hệ: Tri ne	admin	2025-08-01 22:24:20.114178+07
1321	Xóa Người Liên Hệ: fdsfdsf	admin	2025-08-02 12:59:58.031+07
1329	Tạo tin tức: TT0063 - 	admin	2025-08-02 13:08:42.391952+07
1337	Tạo dự án: DA0035 - dasd	admin	2025-08-02 13:25:32.871466+07
1346	Tạo khu vực dự án: KV0017 - safasf	admin	2025-08-02 13:33:07.424821+07
1355	Tạo dự án: DA0038 - fdsfsfasdfsdfsdfasf	admin	2025-08-02 13:55:27.21954+07
1363	Cập nhật dự án: DA0038 - fdsfsfasdfsdfsdfasf	admin	2025-08-02 14:39:55.623574+07
1372	Tạo tin tức: TT0070 - fdsfsf	admin	2025-08-02 16:13:56.204258+07
1380	Xóa Người Liên Hệ: mới 2	hgau	2025-08-02 18:28:07.92608+07
1382	Xóa Người Liên Hệ: 123123	hgau	2025-08-02 18:28:14.312604+07
1390	Tạo sản phẩm: SP0068 - RAM mới	hgau	2025-08-02 18:42:05.732641+07
1398	Cập nhật tin tức[object Object] - FPT vào Top 40 doanh nghiệp CNTT châu Á: TT0001 - FPT vào Top 40 doanh nghiệp CNTT châu Á	hgau	2025-08-02 20:16:08.430026+07
1407	Xóa dự án: DA0037 - fasf	hgau	2025-08-02 20:22:57.144625+07
1423	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	hgau	2025-08-02 20:25:05.798286+07
1432	Xóa tin tức: TT0007 - Doanh nghiệp thiệt hại lớn vẫn nỗ lực cứu trợ vùng bão lũ	admin	2025-08-02 20:59:08.294745+07
1441	Xóa tin tức: TT0046 - 2025	admin	2025-08-02 21:04:04.725622+07
1450	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0021 - ad	admin	2025-08-02 21:08:11.822515+07
1470	Tạo dự án: DA0044 - Dự án nổi bật mới	admin	2025-08-02 21:32:59.427253+07
1485	Xóa dự án: DA0047 - s	admin	2025-08-02 21:41:28.274152+07
1497	Bỏ trưng bày dự án: DA0052 - Dự án nổi bật mới	admin	2025-08-02 21:45:03.978524+07
1499	Bỏ trưng bày dự án: DA0052 - Dự án nổi bật mới	admin	2025-08-02 21:45:11.473784+07
915	Bỏ trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:20.114211+07
917	Bỏ trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 16:59:25.197166+07
919	Bỏ trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 16:59:28.895434+07
920	Bỏ trưng bày dự án: DA0020 - Trường Đại học Khoa học Tự nhiên - TP.HCM	admin	2025-07-22 16:59:41.875651+07
921	Trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	admin	2025-07-22 17:00:53.523972+07
922	Bỏ trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	admin	2025-07-22 17:00:54.792674+07
923	Trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 17:00:56.872995+07
924	Bỏ trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	admin	2025-07-22 17:00:57.715953+07
925	Trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	admin	2025-07-22 17:00:58.942356+07
926	Bỏ trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	admin	2025-07-22 17:01:01.147876+07
927	Bỏ trưng bày dự án: DA0025 - fdsfsaffdsf	admin	2025-07-22 17:01:03.074159+07
928	Trưng bày dự án: DA0025 - fdsfsaffdsf	admin	2025-07-22 17:01:03.796004+07
929	Trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 17:01:05.754707+07
930	Bỏ trưng bày dự án: DA0017 - Viện Khoa học Xã hội vùng Nam Bộ - TP.HCM	admin	2025-07-22 17:01:06.555887+07
931	Trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 17:01:08.230517+07
932	Bỏ trưng bày dự án: DA0018 - Trường Tiểu học Minh Đạo - TP.HCM	admin	2025-07-22 17:01:09.752251+07
933	Tạo tin tức: TT0039 - fdsfdsf	ductri0981	2025-07-22 21:58:23.87915+07
934	Cập nhật tin tức (đã đổi tên): TT0039 - fdsfdsf	ductri0981	2025-07-22 21:58:47.467163+07
935	Xóa tin tức: TT0039 - fdsfdsf	ductri0981	2025-07-22 21:59:00.816963+07
936	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 21:59:29.361744+07
937	Cập nhật trang Tuyển Dụng	ductri0981	2025-07-22 21:59:36.448794+07
938	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 22:06:34.328749+07
939	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:06:42.12565+07
940	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:06:44.574053+07
941	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 22:06:53.709259+07
942	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 22:07:12.731798+07
943	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:11:36.096206+07
944	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:14:41.512489+07
945	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:14:52.063715+07
947	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:15:46.078619+07
948	Cập nhật Banner trang Dự Án	admin	2025-07-22 22:27:12.173894+07
949	Cập nhật Banner trang Dự Án	admin	2025-07-22 22:28:03.525056+07
950	Tạo Người Liên Hệ: fdsfdsf	admin	2025-07-22 22:28:48.628314+07
951	Tạo sản phẩm: SP0064 - sản phẩm mới	admin	2025-07-22 22:34:57.951552+07
952	Cập nhật sản phẩm: SP0064 - sản phẩm mới	admin	2025-07-22 22:35:10.411542+07
953	Cập nhật sản phẩm: SP0064 - sản phẩm mới	admin	2025-07-22 22:35:32.53618+07
954	Cập nhật sản phẩm: SP0064 - sản phẩm mới	admin	2025-07-22 22:35:41.191018+07
955	Xóa sản phẩm: SP0064 - sản phẩm mới	admin	2025-07-22 22:35:45.965992+07
956	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:36:02.174272+07
957	Cập nhật sản phẩm: SP0017 - MAINBOARD GIGABYTE H510M H	admin	2025-07-22 22:36:12.629384+07
958	Xóa sản phẩm: SP0017 - MAINBOARD GIGABYTE H510M H	admin	2025-07-22 22:36:17.313596+07
959	Xóa sản phẩm: SP0048 - fdf	admin	2025-07-22 22:37:51.826574+07
960	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:41:17.171975+07
961	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:42:10.833902+07
962	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:43:20.238386+07
963	Cập nhật trang Tuyển Dụng	admin	2025-07-22 22:43:37.130717+07
964	Tạo Manager: huynhgiaau - a	admin	2025-07-22 22:56:15.401366+07
965	Tạo Manager: moi - a	admin	2025-07-22 22:58:02.191754+07
966	Trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	hgau	2025-07-22 23:03:09.68165+07
967	Trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-22 23:03:11.795167+07
968	Bỏ trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	hgau	2025-07-22 23:03:13.731588+07
969	Tạo tin tức: TT0040 - Tin tức mới	admin	2025-07-22 23:05:34.899365+07
970	Tạo tin tức: TT0041 - tin đã xuất bản	admin	2025-07-22 23:06:59.633837+07
971	Cập nhật tin tức (đã đổi tên): TT0041 - tin đã xuất bản	admin	2025-07-22 23:07:36.970638+07
972	Tạo tin tức: TT0042 - aaa	admin	2025-07-22 23:08:04.699182+07
973	Cập nhật tin tức (đã đổi tên): TT0042 - aaa	admin	2025-07-22 23:08:18.946113+07
974	Tạo Manager: 123123 - 312313	admin	2025-07-22 23:08:29.043729+07
975	Cập nhật Manager: 123321 - 12331255	admin	2025-07-22 23:09:05.442909+07
976	Xóa tin tức: TT0041 - tin đã xuất bản	admin	2025-07-22 23:09:47.19418+07
977	Tạo tin tức: TT0043 - MỚI	admin	2025-07-22 23:10:09.514452+07
978	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0006 - Sản phẩm	admin	2025-07-22 23:11:09.592657+07
979	Tạo dự án: DA0027 - DỰ ÁN MỚI	admin	2025-07-22 23:11:48.236823+07
980	Trưng bày dự án: DA0027 - DỰ ÁN MỚI	admin	2025-07-22 23:11:55.157776+07
981	Tạo tin tức: TT0044 - 22/7	admin	2025-07-22 23:11:56.819488+07
982	Cập nhật tin tức (đã đổi tên): TT0044 - 22/7	admin	2025-07-22 23:12:17.733341+07
983	Tạo dự án: DA0028 - miền nam	admin	2025-07-22 23:12:27.643356+07
984	Tạo tin tức: TT0045 - 	admin	2025-07-22 23:12:33.723522+07
985	Xóa Manager: 123123 - 312313	admin	2025-07-22 23:14:55.085923+07
986	Xóa Manager: 123321 - 12331255	admin	2025-07-22 23:14:58.213246+07
987	Xóa Manager: moi - a	admin	2025-07-22 23:15:11.280013+07
988	Cập nhật dự án: DA0027 - DỰ ÁN MỚI	admin	2025-07-22 23:15:16.512475+07
989	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0005 - MinhTri	admin	2025-07-22 23:15:25.188508+07
990	Tạo tin tức: TT0046 - 2025	admin	2025-07-22 23:15:28.355501+07
991	Cập nhật Banner trang Trang Chủ	admin	2025-07-22 23:15:31.860465+07
992	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-22 23:15:35.909292+07
993	Cập nhật Thông Số Nổi Bật trang Trang Chủ (đã đổi tên): 1001 ABCD1	admin	2025-07-22 23:15:42.566458+07
994	Xóa Thông Số Nổi Bật trang Trang Chủ: 1001 ABCD1	admin	2025-07-22 23:15:45.369831+07
995	Tạo Thông Số Nổi Bật trang Trang Chủ: 213 123	admin	2025-07-22 23:15:49.173518+07
996	Cập nhật tin tức nổi bật	admin	2025-07-22 23:16:06.01996+07
997	Cập nhật tin tức (đã đổi tên): TT0002 - Dự án gần 1 tỷ USD của Vinhomes tại Hải Phòng đủ điều kiện huy động vốn 123	admin	2025-07-22 23:16:28.834587+07
998	Tạo tin tức: TT0047 - haizzz	admin	2025-07-22 23:17:00.087223+07
999	Cập nhật Banner trang Sản Phẩm	admin	2025-07-22 23:17:01.361403+07
1000	Cập nhật Banner trang Bảng Giá	admin	2025-07-22 23:17:04.395519+07
1001	Cập nhật Banner trang Dự Án	admin	2025-07-22 23:17:07.347064+07
1002	Cập nhật Banner trang Tin Tức	admin	2025-07-22 23:17:10.239362+07
1003	Cập nhật trang Tuyển Dụng	admin	2025-07-22 23:17:15.20622+07
1004	Cập nhật trang Tuyển Dụng	admin	2025-07-22 23:17:17.69522+07
1005	Cập nhật trang Tuyển Dụng	admin	2025-07-22 23:19:04.680933+07
1006	Cập nhật trang Tuyển Dụng	admin	2025-07-22 23:19:14.735319+07
1007	Cập nhật Banner trang Liên Hệ	admin	2025-07-22 23:19:19.745542+07
1008	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 23:19:24.924676+07
1009	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-22 23:19:59.546579+07
1010	Tạo Nhiệm Vụ Và Trách Nhiệm trang Về Chúng Tôi: 123	admin	2025-07-22 23:20:09.625125+07
1011	Cập nhật Nhiệm Vụ Và Trách Nhiệm trang Về Chúng Tôi (đã đổi tên): 1231	admin	2025-07-22 23:20:14.09102+07
1012	Xóa Nhiệm Vụ Và Trách Nhiệm trang Vê Chúng Tôi: 1231	admin	2025-07-22 23:20:17.491881+07
1013	Tạo Manager: taikhoanmoi - 123	admin	2025-07-22 23:25:24.864486+07
1014	Xóa Manager: 3123123 - 2131323	admin	2025-07-22 23:28:07.923023+07
1015	Xóa Manager: manager3 - 3453512313qweqweqe	admin	2025-07-22 23:28:33.375411+07
1016	Tạo Manager: aaaaaaaaaaaaaaaaaaâ - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	admin	2025-07-22 23:28:53.020081+07
1017	Xóa Manager: aaaaaaaaaaaaaaaaaaâ - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	admin	2025-07-22 23:29:34.175797+07
1018	Tạo Manager: dothanhtung27112005 - a	admin	2025-07-22 23:29:59.490315+07
1019	Xóa Manager: dothanhtung27112005 - a	admin	2025-07-22 23:31:34.927495+07
1020	Tạo Manager: df - fsdfsdf sdf sdf fd sdf dsf sd sfs sdf sdf	admin	2025-07-22 23:43:15.535766+07
1021	Cập nhật Manager (đã đổi tên): df - fsdfsdf sdf sdf fd sdf dsf sd sfs sdf sdf sd fsd dsf sdf sdf 	admin	2025-07-22 23:43:30.825399+07
1022	Gán loại tin tức LT0003 - Sự kiện cho các tin tức: TT0002, TT0011, TT0010	admin	2025-07-23 13:31:01.506609+07
1023	Gán khu vực KV0006 - Đỗ Nguyễn Minh Trí cho các dự án: DA0016, DA0028, DA0013	admin	2025-07-23 13:32:26.303524+07
1024	Gán loại sản phẩm LS0014 - KEYBOARD CÓ DÂY cho các sản phẩm: SP0010, SP0011	admin	2025-07-23 13:44:41.492432+07
1025	Gán loại sản phẩm LS0015 - KEYBOARD KHÔNG DÂY cho các sản phẩm: SP0010, SP0011, SP0012, SP0014	admin	2025-07-23 13:47:43.73647+07
1026	Gán khu vực KV0008 - MinhTri cho các dự án: DA0027, DA0016	admin	2025-07-23 14:23:50.235868+07
1027	Gán loại sản phẩm LS0016 - MOUSE QUANG CÓ DÂY cho các sản phẩm: SP0010, SP0011	admin	2025-07-23 14:26:08.638485+07
1028	Gán khu vực KV0001 - Miền Bắc cho các dự án: DA0019, DA0028	admin	2025-07-23 14:27:20.002979+07
1029	Gán loại tin tức LT0005 - Thành Tựu cho các tin tức: TT0044, TT0045	admin	2025-07-23 14:28:51.816536+07
1030	Tạo loại sản phẩm: LS0020 - MOIQA	manager1	2025-07-23 14:52:25.64498+07
1031	Gán loại sản phẩm LS0020 - MOIQA cho các sản phẩm: SP0010, SP0011, SP0012, SP0013, SP0014, SP0015, SP0016, SP0018, SP0019, SP0020, SP0021, SP0022, SP0023, SP0024, SP0025, SP0026, SP0027, SP0028, SP0029, SP0030, SP0031, SP0032, SP0033, SP0034, SP0035, SP0036, SP0037, SP0038, SP0039, SP0040, SP0041, SP0042, SP0043, SP0045, SP0046, SP0047, SP0044, SP0051, SP0052, SP0053, SP0054, SP0055, SP0057, SP0058, SP0059, SP0060, SP0056, SP0061, SP0062, SP0063	manager1	2025-07-23 14:53:05.975603+07
1032	Gán loại tin tức LT0004 - Tuyển Dụng cho các tin tức: TT0007	manager1	2025-07-23 14:54:34.902603+07
1033	Gán loại tin tức LT0003 - Sự kiện cho các tin tức: TT0005	manager1	2025-07-23 14:55:49.22593+07
1034	Gán loại tin tức LT0002 - Dự Án cho các tin tức: TT0010	manager1	2025-07-23 15:11:13.456907+07
1035	Gán loại sản phẩm LS0004 - MAINBOARD cho các sản phẩm: SP0010, SP0011, SP0012, SP0013, SP0014, SP0015, SP0016, SP0018, SP0019, SP0020, SP0021, SP0022, SP0023, SP0024, SP0025, SP0026, SP0027, SP0028, SP0029, SP0030, SP0031, SP0032, SP0033, SP0034, SP0035, SP0036, SP0037, SP0038, SP0039, SP0040, SP0041, SP0042, SP0043, SP0045, SP0046, SP0047, SP0044, SP0051, SP0052, SP0053, SP0054, SP0055, SP0057, SP0058, SP0059, SP0060, SP0056, SP0061, SP0062, SP0063	admin	2025-07-23 15:47:45.502499+07
1036	Gán loại sản phẩm LS0004 - MAINBOARD cho các sản phẩm: SP0010	admin	2025-07-23 15:48:02.446086+07
1037	Gán loại sản phẩm LS0004 - MAINBOARD cho các sản phẩm: SP0010	admin	2025-07-23 15:48:17.896674+07
1038	Gán loại tin tức LT0004 - Tuyển Dụng cho các tin tức: TT0046	admin	2025-07-23 15:48:27.695162+07
1039	Gán khu vực KV0002 - Miền Trung cho các dự án: DA0013	admin	2025-07-23 15:49:07.277647+07
1040	Gán loại sản phẩm LS0017 - CAMERA XOAY, CỐ ĐỊNH cho các sản phẩm: SP0010	admin	2025-07-23 15:50:16.257565+07
1041	Gán loại tin tức LT0005 - Thành Tựu cho các tin tức: TT0005	admin	2025-07-23 15:50:40.238834+07
1042	Gán khu vực KV0008 - MinhTri cho các dự án: DA0008	admin	2025-07-23 15:50:55.020314+07
1043	Tạo tin tức: TT0048 - 	admin	2025-07-27 16:08:53.530658+07
1044	Xóa tin tức: TT0048 - 	admin	2025-07-27 16:11:05.365962+07
1045	Tạo tin tức: TT0049 - 	admin	2025-07-27 16:12:33.651496+07
1046	Xóa tin tức: TT0049 - 	admin	2025-07-27 16:17:12.771603+07
1047	Tạo tin tức: TT0050 - 	admin	2025-07-27 16:17:25.563088+07
1048	Tạo dự án: DA0029 - zd	admin	2025-07-27 16:19:40.457445+07
1049	Tạo sản phẩm: SP0065 - dây cáp cá mập	hgau	2025-07-27 16:25:01.612898+07
1050	Cập nhật sản phẩm: SP0065 - dây cáp cá mập	hgau	2025-07-27 16:25:27.934396+07
1051	Cập nhật sản phẩm: SP0065 - dây cáp cá mập	hgau	2025-07-27 16:25:37.512336+07
1052	Cập nhật sản phẩm: SP0065 - dây cáp cá mập	hgau	2025-07-27 16:25:46.075129+07
1053	Cập nhật sản phẩm: SP0065 - dây cáp cá mập	hgau	2025-07-27 16:25:55.000154+07
1054	Cập nhật Banner trang Trang Chủ	hgau	2025-07-27 17:08:22.302057+07
1055	Cập nhật Thông Tin Công Ty	admin	2025-07-27 17:08:49.133164+07
1056	Xóa Manager: df - fsdfsdf sdf sdf fd sdf dsf sd sfs sdf sdf sd fsd dsf sdf sdf 	admin	2025-07-27 17:09:06.283821+07
1057	Gán loại sản phẩm LS0009 - SSD cho các sản phẩm: SP0010	admin	2025-07-27 22:33:02.046143+07
1058	Gán loại sản phẩm LS0013 - USB cho các sản phẩm: SP0010, SP0011, SP0012	admin	2025-07-27 22:33:19.657686+07
1059	Gán loại sản phẩm LS0017 - CAMERA XOAY, CỐ ĐỊNH cho các sản phẩm: SP0010, SP0011	admin	2025-07-27 22:35:31.786224+07
1060	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0011 - CASE	admin	2025-07-27 22:35:39.839601+07
1061	Tạo tin tức: TT0051 - dự án	admin	2025-07-27 22:36:41.084714+07
1062	Cập nhật tin tức (đã đổi tên): TT0051 - dự ána	admin	2025-07-27 22:36:53.28456+07
1063	Xóa tin tức: TT0051 - dự ána	admin	2025-07-27 22:37:03.420704+07
1064	Xóa tin tức: TT0005 - Thành tựu phát triển kinh tế - xã hội năm 2024 là rất ấn tượng và toàn diện	admin	2025-07-27 22:37:13.632333+07
1065	Xóa tin tức: TT0044 - 22/7	admin	2025-07-27 22:37:19.297922+07
1066	Tạo dự án: DA0030 - a	admin	2025-07-27 22:38:05.228081+07
1067	Cập nhật dự án (đã đổi tên): DA0030 - aa	admin	2025-07-27 22:38:27.725117+07
1068	Xóa dự án: DA0030 - aa	admin	2025-07-27 22:38:38.735819+07
1069	Xóa dự án: DA0001 - Trung tâm Văn hóa - Thông tin và Thể thao quận Hoàn Kiếm	admin	2025-07-27 22:38:48.176179+07
1070	Cập nhật Banner trang Trang Chủ	admin	2025-07-27 22:41:15.517551+07
1071	Cập nhật Thông Số Nổi Bật trang Trang Chủ (đã đổi tên): 213 Tên thành tựu Tên thành tựu Tên thành tựu TênTên t	admin	2025-07-27 22:45:08.966218+07
1072	Cập nhật Thông Số Nổi Bật trang Trang Chủ: 1000000000 Tên thành tựu Tên thành tựu Tên thành tựu TênTên t	admin	2025-07-27 22:45:16.764416+07
1073	Cập nhật tin tức nổi bật	admin	2025-07-27 22:45:51.168063+07
1074	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-27 22:46:44.843265+07
1075	Cập nhật Banner trang Trang Chủ	admin	2025-07-27 22:47:26.258508+07
1076	Cập nhật Banner trang Dự Án	admin	2025-07-27 22:52:41.419186+07
1077	Cập nhật trang Tuyển Dụng	admin	2025-07-27 22:53:16.457924+07
1078	Cập nhật trang Tuyển Dụng	admin	2025-07-27 22:53:29.782825+07
1079	Cập nhật trang Tuyển Dụng	admin	2025-07-27 22:53:58.324862+07
1080	Cập nhật trang Tuyển Dụng	admin	2025-07-27 22:54:10.330357+07
1081	Cập nhật Banner trang Liên Hệ	admin	2025-07-27 22:54:40.680861+07
1082	Cập nhật Banner trang Liên Hệ	admin	2025-07-27 22:54:45.102579+07
1083	Cập nhật trang Tuyển Dụng	admin	2025-07-27 22:54:58.551789+07
1084	Cập nhật Banner trang Về Chúng Tôi	admin	2025-07-27 22:55:05.512617+07
1085	Cập nhật Câu Chuyện Của Chúng Tôi trang Về Chúng Tôi	admin	2025-07-27 22:55:11.476049+07
1086	Cập nhật khu vực dự án (đã đổi tên): KV0006 - Đỗ Nguyễn Minh Trí dasdadsddasdasdasdasddas	admin	2025-07-28 08:12:56.01702+07
1087	Xóa dự án: DA0028 - miền nam	admin	2025-07-28 08:32:22.483842+07
1088	Xóa tin tức: TT0047 - haizzz	admin	2025-07-28 08:36:06.360028+07
1089	Cập nhật Banner trang Sản Phẩm	admin	2025-07-28 08:36:41.891732+07
1090	Cập nhật Banner trang Sản Phẩm	admin	2025-07-28 08:36:44.929251+07
1091	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 08:37:23.509233+07
1092	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 08:37:26.891234+07
1093	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 08:37:54.468319+07
1094	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 08:38:02.670822+07
1095	Cập nhật Banner trang Sản Phẩm	admin	2025-07-28 08:38:50.780663+07
1096	Cập nhật Banner trang Dự Án	admin	2025-07-28 08:39:30.535004+07
1097	Cập nhật Banner trang Sản Phẩm	admin	2025-07-28 08:39:57.879242+07
1098	Cập nhật Banner trang Dự Án	admin	2025-07-28 14:28:48.188847+07
1099	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 14:28:52.518873+07
1100	Cập nhật trang Tuyển Dụng	admin	2025-07-28 14:28:58.517318+07
1101	Xóa tin tức: TT0002 - Dự án gần 1 tỷ USD của Vinhomes tại Hải Phòng đủ điều kiện huy động vốn 123	admin	2025-07-28 14:31:46.361151+07
1102	Xóa khu vực dự án và tất cả dự án thuộc loại: KV0006 - Đỗ Nguyễn Minh Trí dasdadsddasdasdasdasddas	admin	2025-07-28 14:39:31.411818+07
1103	Tạo tin tức: TT0052 - tiên phong nè	admin	2025-07-28 14:52:07.745257+07
1104	Gán loại sản phẩm LS0002 - PHẦN MỀM DIỆT VIRUS cho các sản phẩm: SP0010, SP0011, SP0012	admin	2025-07-28 15:03:35.170301+07
1105	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0020 - MOIQA	admin	2025-07-28 15:04:09.599179+07
1106	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0005 - CPU INTEL123	admin	2025-07-28 15:04:17.855851+07
1107	Cập nhật Banner trang Trang Chủ	admin	2025-07-28 17:17:23.732162+07
1108	Cập nhật Banner trang Dự Án	admin	2025-07-28 17:17:27.59173+07
1109	Cập nhật Banner trang Bảng Giá	admin	2025-07-28 17:17:32.086721+07
1110	Tạo dự án: DA0031 - mới nè	hgau	2025-07-28 17:19:09.221416+07
1111	Cập nhật Banner trang Trang Chủ	admin	2025-07-28 19:32:18.78295+07
1112	Cập nhật Banner trang Liên Hệ	admin	2025-07-28 19:33:08.575982+07
1113	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-28 20:29:33.249957+07
1114	Bỏ trưng bày dự án: DA0015 - Chi cục Quản trị, Ngân hàng Nhà nước Việt Nam Tại TP.HCM	hgau	2025-07-28 21:12:32.540716+07
1115	Bỏ trưng bày dự án: DA0023 - fdsfds	hgau	2025-07-28 21:12:33.887071+07
1116	Bỏ trưng bày dự án: DA0016 - Học viện Cán bộ Tp. HCM	hgau	2025-07-28 21:12:48.395961+07
1117	Bỏ trưng bày dự án: DA0027 - DỰ ÁN MỚI	hgau	2025-07-28 21:12:49.364835+07
1118	Gán loại sản phẩm LS0008 - HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA cho các sản phẩm: SP0010, SP0011	hgau	2025-07-28 21:39:36.335583+07
1119	Trưng bày sản phẩm: SP0012 - Kaspersky Plus 1pc - Bản quyền 01 năm	hgau	2025-07-28 21:39:44.114668+07
1120	Trưng bày sản phẩm: SP0011 - Kaspersky STANDARD 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-28 23:30:26.96717+07
1121	Tạo khu vực dự án: KV0009 - Toi la ai giua cuoc doi nay	dnmtri23	2025-07-29 08:48:25.862422+07
1122	Tạo tin tức: TT0053 - d	admin	2025-07-30 09:14:08.905221+07
1123	Tạo dự án: DA0032 - d	admin	2025-07-30 09:24:37.486477+07
1124	Trưng bày dự án: DA0032 - d	admin	2025-07-30 09:27:28.365254+07
1125	Bỏ trưng bày dự án: DA0032 - d	admin	2025-07-30 09:27:30.760666+07
1126	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 09:49:11.197967+07
1127	Cập nhật dự án: DA0032 - d	admin	2025-07-30 09:55:13.805663+07
1128	Cập nhật dự án: DA0032 - d	admin	2025-07-30 10:00:02.130018+07
1129	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:01:57.13802+07
1130	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:03:42.907606+07
1131	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:04:43.080318+07
1132	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:05:08.247752+07
1133	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:05:55.069189+07
1134	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:08:46.587795+07
1135	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:09:45.478573+07
1136	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:09:56.680222+07
1137	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:13:20.357642+07
1138	Cập nhật tin tức (đã đổi tên): TT0053 - d	admin	2025-07-30 10:18:52.175713+07
1139	Tạo tin tức: TT0054 - fdfd	admin	2025-07-30 10:51:38.121295+07
1140	Cập nhật tin tức (đã đổi tên): TT0045 - ádddddddddád	admin	2025-07-30 10:57:15.801221+07
1141	Cập nhật dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm	admin	2025-07-30 10:57:25.740801+07
1142	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 11:20:11.842422+07
1143	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 11:20:15.775509+07
1144	Bỏ trưng bày sản phẩm: SP0010 - Kaspersky STANDARD (1PC)- Bản quyền 01 năm	dnmtri23	2025-07-30 11:20:38.543348+07
1145	Trưng bày sản phẩm: SP0010 - Kaspersky STANDARD (1PC)- Bản quyền 01 năm	dnmtri23	2025-07-30 11:28:54.071263+07
1146	Bỏ trưng bày sản phẩm: SP0011 - Kaspersky STANDARD 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 11:28:57.309823+07
1147	Bỏ trưng bày sản phẩm: SP0010 - Kaspersky STANDARD (1PC)- Bản quyền 01 năm	dnmtri23	2025-07-30 11:28:58.875941+07
1148	Trưng bày sản phẩm: SP0010 - Kaspersky STANDARD (1PC)- Bản quyền 01 năm	dnmtri23	2025-07-30 11:29:00.333453+07
1149	Trưng bày sản phẩm: SP0011 - Kaspersky STANDARD 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 11:29:02.217241+07
1150	Cập nhật sản phẩm: SP0010 - Kaspersky STANDARD (1PC)- Bản quyền 01 năm	dnmtri23	2025-07-30 11:29:16.804363+07
1151	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-30 11:32:31.043037+07
1152	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-30 11:32:38.126406+07
1153	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-30 11:32:41.908436+07
1154	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-30 11:33:56.524258+07
1155	Cập nhật Banner trang Sản Phẩm	dnmtri23	2025-07-30 11:34:00.050701+07
1156	Cập nhật loại sản phẩm (đã đổi tên): LS0009 - SSD123	dnmtri23	2025-07-30 11:35:10.853184+07
1157	Gán loại sản phẩm LS0013 - USB cho các sản phẩm: SP0011, SP0012	dnmtri23	2025-07-30 11:35:32.088783+07
1158	Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: LS0009 - SSD123	dnmtri23	2025-07-30 11:35:42.955706+07
1159	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 11:40:29.18979+07
1160	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	dnmtri23	2025-07-30 11:40:34.948119+07
1161	Cập nhật Banner trang Sản Phẩm	admin	2025-07-30 12:36:04.793192+07
1162	Cập nhật Banner trang Trang Chủ	admin	2025-07-30 12:39:04.044218+07
1163	Cập nhật Banner trang Trang Chủ	admin	2025-07-30 12:42:04.87403+07
1164	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	admin	2025-07-30 12:42:11.273861+07
1165	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	admin	2025-07-30 12:43:17.30402+07
1166	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 12:43:50.224047+07
1167	Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ	admin	2025-07-30 12:44:55.895802+07
1168	Cập nhật Thông Số Nổi Bật trang Trang Chủ (đã đổi tên): 100000000 Tên thành tựu Tên thành tựu Tên thành tựu TênT	admin	2025-07-30 12:45:32.23659+07
1169	Tạo Người Liên Hệ: Đỗ Nguyễn Minh Trí	dnmtri23	2025-07-30 12:59:14.092813+07
1170	Cập nhật Người Liên Hệ (đã đổi tên): Tri ne	dnmtri23	2025-07-30 12:59:45.69153+07
1513	Cập nhật Banner trang Trang Chủ	admin	2025-08-05 22:47:13.885544+07
1171	Cập nhật Người Liên Hệ (đã đổi tên): 123123123	dnmtri23	2025-07-30 13:00:31.104153+07
1172	Cập nhật Người Liên Hệ (đã đổi tên): Toi la sdafdsaf	dnmtri23	2025-07-30 13:02:20.328518+07
1173	Xóa Người Liên Hệ: Toi la sdafdsaf	dnmtri23	2025-07-30 13:02:29.248519+07
1174	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 13:09:35.236658+07
1175	Cập nhật Banner trang Trang Chủ	dnmtri23	2025-07-30 13:09:41.685061+07
1176	Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ	dnmtri23	2025-07-30 13:09:47.855999+07
1177	Cập nhật dự án (đã đổi tên): DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm213	dnmtri23	2025-07-30 14:11:06.102325+07
1178	Cập nhật dự án (đã đổi tên): DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm213dfdsfds	dnmtri23	2025-07-30 14:12:03.351668+07
1179	Trưng bày dự án: DA0004 - Văn phòng HĐND & UBND quận Đống Đa	dnmtri23	2025-07-30 14:12:15.80849+07
1180	Trưng bày sản phẩm: SP0014 - Kaspersky Plus 5PC - Bản quyền 01 năm	dnmtri23	2025-07-30 14:12:22.699667+07
1181	Trưng bày dự án: DA0008 - Văn Phòng Hội Đồng Nhân Dân và UBND huyện Quế Võ	dnmtri23	2025-07-30 14:12:36.479178+07
1182	Trưng bày sản phẩm: SP0015 - Bkav Pro (1PC) - Bản quyền 01 năm	dnmtri23	2025-07-30 14:12:43.613147+07
1183	Trưng bày sản phẩm: SP0016 - Trend micro internet Security 3pc -  Bản quyền 01 năm	dnmtri23	2025-07-30 14:18:13.003297+07
1184	Trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 14:18:15.899779+07
1185	Bỏ trưng bày sản phẩm: SP0011 - Kaspersky STANDARD 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 14:18:17.857875+07
1186	Trưng bày dự án: DA0019 - Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM	dnmtri23	2025-07-30 14:18:23.604128+07
1187	Bỏ trưng bày dự án: DA0019 - Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM	dnmtri23	2025-07-30 14:18:25.05821+07
1188	Trưng bày sản phẩm: SP0011 - Kaspersky STANDARD 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 15:00:03.651576+07
1189	Bỏ trưng bày sản phẩm: SP0013 - Kaspersky Plus 3pcs - Bản quyền 01 năm	dnmtri23	2025-07-30 15:00:09.803062+07
1190	Trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	dnmtri23	2025-07-30 15:00:17.837433+07
1191	Bỏ trưng bày dự án: DA0006 - Trường THPT chuyên Hà Nội-Amsterdam	dnmtri23	2025-07-30 15:00:20.03981+07
1192	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:10:26.989158+07
1193	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:10:44.087159+07
1194	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:11:03.35091+07
1195	Cập nhật trang Tuyển Dụng	admin	2025-07-30 19:11:26.470191+07
1196	Cập nhật Banner trang Dự Án	admin	2025-07-30 19:11:39.836429+07
1197	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:11:50.569061+07
1198	Cập nhật Banner trang Dự Án	admin	2025-07-30 19:11:54.388185+07
1199	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:13:33.555779+07
1200	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:13:56.415564+07
1201	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:15:02.144695+07
1202	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:15:07.855519+07
1203	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:15:13.953139+07
1204	Cập nhật Banner trang Tin Tức	admin	2025-07-30 19:15:21.799122+07
1213	Trưng bày dự án: DA0002 - Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm213dfdsfds	admin	2025-07-30 20:26:41.808063+07
1215	Trưng bày dự án: DA0019 - Trường Tiểu Học Trần Văn Ơn - Q5- TP.HCM	admin	2025-07-30 20:26:50.154241+07
1224	Cập nhật Thông Tin Công Ty	hgau	2025-07-30 20:45:29.044884+07
1233	Gán loại sản phẩm LS0007 - HDD PC MÁY TÍNH cho các sản phẩm: SP0018, SP0019, SP0020, SP0022	hgau	2025-07-30 20:52:34.179472+07
1242	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0018 - Loại mới aaaaaaa	hgau	2025-07-30 20:55:46.843989+07
1253	Cập nhật Banner trang Trang Chủ	hgau	2025-07-30 21:00:37.184986+07
1262	Cập nhật Banner trang Tin Tức	hgau	2025-07-30 21:07:46.980179+07
1264	Cập nhật trang Tuyển Dụng	hgau	2025-07-30 21:08:01.437587+07
1277	Cập nhật tin tức nổi bật	hgau	2025-07-30 21:20:39.019303+07
1279	Cập nhật tin tức nổi bật	hgau	2025-07-30 21:20:53.019572+07
1514	Cập nhật Banner trang Trang Chủ	admin	2025-08-06 09:15:44.250998+07
1515	Cập nhật sản phẩm: SP0068 - RAM mới	admin	2025-08-06 09:19:59.188991+07
1516	Cập nhật Người Liên Hệ: 12312	ductri0981	2025-08-06 09:33:26.008217+07
1517	Cập nhật Người Liên Hệ: 12323123	ductri0981	2025-08-06 09:34:30.50769+07
1518	Cập nhật Người Liên Hệ: tri	ductri0981	2025-08-06 09:34:35.688626+07
1519	Cập nhật Người Liên Hệ: 32132	ductri0981	2025-08-06 09:34:40.615802+07
1520	Cập nhật Người Liên Hệ: Tri ne	ductri0981	2025-08-06 09:35:23.858769+07
1521	Cập nhật Người Liên Hệ: 123	ductri0981	2025-08-06 09:35:29.773569+07
1522	Cập nhật Người Liên Hệ: 2/8	ductri0981	2025-08-06 09:35:54.009709+07
1523	Cập nhật Người Liên Hệ: 12312	ductri0981	2025-08-06 09:37:04.77132+07
1524	Cập nhật Người Liên Hệ: Nguyễn Đức Trí	ductri0981	2025-08-06 09:37:21.75324+07
1525	Cập nhật tin tức: TT0045 - ádddddddddád	ductri0981	2025-08-06 09:38:02.543751+07
1526	Cập nhật trang Tuyển Dụng	ductri0981	2025-08-06 09:40:09.761469+07
1527	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0002 - Dự Án	ductri0981	2025-08-06 09:40:39.408939+07
1528	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0003 - Sự kiện	ductri0981	2025-08-06 09:40:42.055363+07
1529	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0004 - Tuyển Dụng	ductri0981	2025-08-06 09:40:44.605377+07
1530	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0010 - Công ty123456	ductri0981	2025-08-06 09:40:46.883402+07
1531	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0011 - 231123123	ductri0981	2025-08-06 09:40:49.25453+07
1532	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0005 - Thành Tựu	ductri0981	2025-08-06 09:41:14.481284+07
1533	Xóa loại tin tức và tất cả tin tức thuộc loại: LT0001 - Công TyABC	ductri0981	2025-08-06 09:41:16.485061+07
1534	Tạo tin tức: TT0073 - fdsfs	ductri0981	2025-08-06 09:41:58.253803+07
1535	Tạo tin tức: TT0074 - rểqwreqw	ductri0981	2025-08-06 09:42:07.516588+07
1536	Tạo tin tức: TT0075 - rewrwrqwr	ductri0981	2025-08-06 09:42:16.195621+07
1537	Tạo tin tức: TT0076 - rewrw	ductri0981	2025-08-06 09:42:25.101477+07
1538	Tạo tin tức: TT0077 - rewrwq	ductri0981	2025-08-06 09:42:33.302035+07
1539	Cập nhật tin tức: TT0073 - fdsfs	ductri0981	2025-08-06 09:43:48.500814+07
1540	Cập nhật tin tức: TT0073 - fdsfs	ductri0981	2025-08-06 09:44:03.048096+07
1541	Cập nhật Người Liên Hệ: 321313	ductri0981	2025-08-06 09:45:39.413184+07
1542	Cập nhật tin tức: TT0073 - fdsfs	admin	2025-08-06 09:46:01.817491+07
\.


--
-- Data for Name: company_info; Type: TABLE DATA; Schema: contact; Owner: thientrucdb_user
--

COPY contact.company_info (company_email, company_phone, office_address, main_office_id, googlemaps_embed_url, working_hours, fanpage_url) FROM stdin;
thientrucvn@gmail.com	{"1900 5657 000"}	{"{\\"id\\":1,\\"address\\":\\"09 Hòa Đông, Phường Cao Lãnh, Đồng Tháp\\"}","{\\"id\\":2,\\"address\\":\\"Cơ sở 2 mới\\",\\"googlemaps_url\\":\\"\\"}"}	1	<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16148.314626929105!2d106.66198164224625!3d10.758200177467838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef1efebf7d7%3A0x9014ce53b8910a58!2zQuG7h25oIHZp4buHbiBDaOG7oyBS4bqreQ!5e1!3m2!1svi!2s!4v1753883261664!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>	{"Thứ Hai - Thứ Sáu: 8:30 - 17:30","Thứ Bảy - Chủ Nhật: Đóng cửa"}	http://www.facebook.com/thientruc.vn___
thientrucvn@gmail.com	{"1900 5657 000"}	{"{\\"id\\":1,\\"address\\":\\"09 Hòa Đông, Phường Cao Lãnh, Đồng Tháp\\"}","{\\"id\\":2,\\"address\\":\\"Cơ sở 2 mới\\",\\"googlemaps_url\\":\\"\\"}"}	1	<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16148.314626929105!2d106.66198164224625!3d10.758200177467838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef1efebf7d7%3A0x9014ce53b8910a58!2zQuG7h25oIHZp4buHbiBDaOG7oyBS4bqreQ!5e1!3m2!1svi!2s!4v1753883261664!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>	{"Thứ Hai - Thứ Sáu: 8:30 - 17:30","Thứ Bảy - Chủ Nhật: Đóng cửa"}	http://www.facebook.com/thientruc.vn___
\.


--
-- Data for Name: contact_page; Type: TABLE DATA; Schema: contact; Owner: thientrucdb_user
--

COPY contact.contact_page (banner_title, banner_description) FROM stdin;
Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả
Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả
\.


--
-- Data for Name: support_agents; Type: TABLE DATA; Schema: contact; Owner: thientrucdb_user
--

COPY contact.support_agents (id, avatar_img, name, role, phone_number, facebook_url) FROM stdin;
89	\N	Huỳnh Gia Âu	a	1	https://www.facebook.com/
66	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754061584/contact/x4wrlcdvaftfhrbdfylc.png	3213213	2321321	3213213	3123231
85	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754061984/contact/pi0htcf8ar6fu9nlqr7d.jpg	Đỗ Nguyễn Minh Trí	Ban giám đốc	213	
91	data:image/jpeg;base64,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	fdf		123	
93	https://res.cloudinary.com/dsbyueyvz/image/upload/v1754126787/contact/yjj0ejj5qpa6zlp6vrzn.webp	4324324234		12312313	
94	data:image/jpeg;base64,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	1231313		213213213	
95	https://res.cloudinary.com/dsbyueyvz/image/upload/v1754127162/contact/t5e4rfzgrvlpstwe3vps.webp	233213123		32213132	
97	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754127548/contact/alttobedbaetcrrayuqh.jpg	324324324		12313213	
98	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754127676/contact/uvkqcvqyaa5x5yuffdb9.jpg	213213		2131313	
68	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	12323123		1233123	
59	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	tri		0123	
58	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	32132		3213213	
79	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	Tri ne		12313	
75	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	123		3123	
92	data:image/jpeg;base64,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	2/8		231313	
70	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	12312		12313	
86	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	Nguyễn Đức Trí	2321321	3213213	https://www.facebook.com/thoriedgold790/
96	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754448338/contact/phbxnm8wkykpmvgdddxb.jpg	321313		3213213	
\.


--
-- Data for Name: highlight_stats_about_us; Type: TABLE DATA; Schema: home; Owner: thientrucdb_user
--

COPY home.highlight_stats_about_us (id, number_text, label) FROM stdin;
1	16+	Năm Kinh Nghiệm
12	1000000	Tên thành tựu Tên thành tựu Tên thành tựu
13	5	Con sói
\.


--
-- Data for Name: home_page; Type: TABLE DATA; Schema: home; Owner: thientrucdb_user
--

COPY home.home_page (banner_title, banner_description, aboutus_content, aboutus_img, news_switch_time) FROM stdin;
Xây Dựng Công Trình Công Nghệ Uy Tín Hàng Đầu Việt Nam	Công Ty Thiên Trúc thực hiện công trình đa dạng, uy tín hàng đầu Việt Nam. Gồm nhiều dịch vụ về xây dựng công trình, công nghệ trải dài 3 miền Bắc Trung Nam.	Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên  công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc 	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754121180/home/g2i7ucwdax2iqyc2nh4x.jpg	0
Xây Dựng Công Trình Công Nghệ Uy Tín Hàng Đầu Việt Nam	Công Ty Thiên Trúc thực hiện công trình đa dạng, uy tín hàng đầu Việt Nam. Gồm nhiều dịch vụ về xây dựng công trình, công nghệ trải dài 3 miền Bắc Trung Nam.	Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp Thi Công & Lắp ráp công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên  công trình thiên Trúc Lắp ráp công trình thiên Trúc công trình thiên Trúc Lắp ráp công trình thiên Trúc 	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754121180/home/g2i7ucwdax2iqyc2nh4x.jpg	0
\.


--
-- Data for Name: featured_news; Type: TABLE DATA; Schema: news; Owner: thientrucdb_user
--

COPY news.featured_news (news_id, sort) FROM stdin;
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: news; Owner: thientrucdb_user
--

COPY news.news (id, category_id, title, is_published, public_date, measure_time, num_readers, main_img, main_content) FROM stdin;
TT0074	LT0017	rểqwreqw	f	2025-08-06	1	0	\N	rvcvcvdsfsaf
TT0075	LT0017	rewrwrqwr	f	2025-08-06	1	0	\N	fdfdsfasdf
TT0076	LT0019	rewrw	f	2025-08-06	1	0	\N	rqwrqwr
TT0077	LT0019	rewrwq	f	2025-08-06	1	0	\N	rewreqwr
TT0073	LT0017	fdsfs	f	2025-08-06	1	0	\N	àasfsf
\.


--
-- Data for Name: news_categories; Type: TABLE DATA; Schema: news; Owner: thientrucdb_user
--

COPY news.news_categories (id, name, rgb_color, item_count) FROM stdin;
LT0017	123	#3B82F6	3
LT0019	fdfdsafsdf	#3bf684	2
\.


--
-- Data for Name: news_contents; Type: TABLE DATA; Schema: news; Owner: thientrucdb_user
--

COPY news.news_contents (news_id, content) FROM stdin;
TT0074	<p>ewrqwrqewr</p>
TT0075	<p>wrqwrqewrqewr</p>
TT0076	<p>dvdfsafasf</p>
TT0077	<p>fdsfdsafdasf</p>
TT0073	<p>fdsfsafsf</p>
\.


--
-- Data for Name: news_page; Type: TABLE DATA; Schema: news; Owner: thientrucdb_user
--

COPY news.news_page (banner_title, banner_description) FROM stdin;
Cập nhật các thông tin mới nhất và phổ biến nhất về công ty Thiên Trúc	Khám phá các tin tức mới nhất và phổ biến nhất về chúng tôi trải dài về nhiều khía cạnh: về công ty, sản phẩm, dự án sắp ra mắt, sự kiện, ... Liên hệ chúng tôi để cập nhật tin tức mới nhất
Cập nhật các thông tin mới nhất và phổ biến nhất về công ty Thiên Trúc	Khám phá các tin tức mới nhất và phổ biến nhất về chúng tôi trải dài về nhiều khía cạnh: về công ty, sản phẩm, dự án sắp ra mắt, sự kiện, ... Liên hệ chúng tôi để cập nhật tin tức mới nhất
\.


--
-- Data for Name: highlight_producs; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.highlight_producs (highlight_product_ids) FROM stdin;
\.


--
-- Data for Name: price_page; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.price_page (banner_title, banner_description) FROM stdin;
Giá Và Thời Gian Bảo Hành Chi Tiết Của Sản Phẩm	Khám phá thông tin nổi bật gồm giá cả và thời gian bảo hành của từng sản phẩm tính bằng tháng. Liên lạc Chúng Tôi để được hỗ trợ sớm nhất.
Giá Và Thời Gian Bảo Hành Chi Tiết Của Sản Phẩm	Khám phá thông tin nổi bật gồm giá cả và thời gian bảo hành của từng sản phẩm tính bằng tháng. Liên lạc Chúng Tôi để được hỗ trợ sớm nhất.
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.product_categories (id, name, item_count) FROM stdin;
LS0013	USB	0
LS0003	MONITOR	0
LS0002	PHẦN MỀM DIỆT VIRUS	4
LS0004	MAINBOARD	37
LS0017	CAMERA XOAY, CỐ ĐỊNH	0
LS0008	HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA	1
LS0007	HDD PC MÁY TÍNH	4
LS0006	RAM	1
LS0014	KEYBOARD CÓ DÂY	0
LS0015	KEYBOARD KHÔNG DÂY	0
LS0010	HDD DI ĐỘNG	0
\.


--
-- Data for Name: product_page; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.product_page (banner_title, banner_description) FROM stdin;
Khám Phá Sản Phẩm Của Thiên Trúc	Thiên Trúc chứa hơn 1000 loại sản phẩm có chứng nhận cấp quốc tế, đảm bảo uy tín. Liên lạc Thiên Trúc để thực hiện công trình
Khám Phá Sản Phẩm Của Thiên Trúc	Thiên Trúc chứa hơn 1000 loại sản phẩm có chứng nhận cấp quốc tế, đảm bảo uy tín. Liên lạc Thiên Trúc để thực hiện công trình
\.


--
-- Data for Name: product_prices; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.product_prices (id, product_id, price, note) FROM stdin;
13	SP0013	650000	Mac dinh
15	SP0015	240000	Mac dinh
16	SP0016	380000	Mac dinh
18	SP0018	1800000	Mac dinh
20	SP0020	3150000	Mac dinh
22	SP0022	450000	Mac dinh
23	SP0023	660000	Mac dinh
24	SP0024	1300000	Mac dinh
25	SP0025	1650000	Mac dinh
26	SP0026	2550000	Mac dinh
27	SP0027	245000	Mac dinh
28	SP0028	300000	Mac dinh
29	SP0029	450000	Mac dinh
30	SP0030	600000	Mac dinh
31	SP0031	160000	Mac dinh
32	SP0032	200000	Mac dinh
33	SP0033	160000	Mac dinh
34	SP0034	530000	Mac dinh
35	SP0035	500000	Mac dinh
36	SP0036	400000	Mac dinh
37	SP0037	120000	Mac dinh
38	SP0038	80000	Mac dinh
39	SP0039	80000	Mac dinh
40	SP0040	400000	Mac dinh
41	SP0041	550000	Mac dinh
42	SP0042	600000	Mac dinh
43	SP0043	425000	Mac dinh
45	SP0045	115000	Mac dinh
46	SP0046	200000	Mac dinh
47	SP0047	\N	Mac dinh
51	SP0051	\N	Mac dinh
52	SP0052	\N	Mac dinh
53	SP0053	\N	Mac dinh
54	SP0054	\N	Mac dinh
57	SP0057	\N	Mac dinh
58	SP0058	\N	Mac dinh
59	SP0059	\N	Mac dinh
60	SP0060	123	Mac dinh
56	SP0056	\N	Mac dinh
61	SP0061	\N	Mac dinh
62	SP0062	\N	Mac dinh
63	SP0063	21321	Mac dinh
10	SP0010	210000	Mac dinh
55	SP0055	\N	Mac dinh
12	SP0012	4000000	Mac dinh
19	SP0019	3450000	Mac dinh
68	SP0068	100000	Mac dinh
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: product; Owner: thientrucdb_user
--

COPY product.products (id, name, description, product_img, category_id, product_specifications, warranty_period, product_features, highlight_features, is_featured) FROM stdin;
SP0019	CPU Intel Core i5-10400- Box(SK1200)	SK1200, chạy với H410, H510	\N	LS0007	{"Thương hiệu":"Thiên Trúc","Xuất xứ":"Việt Nam","Công suất":"45W"}	36	{ưđá,áda}	{0,1}	t
SP0018	GIGABYTE H610M - H V3	Socket: LGA1700 hỗ trợ CPU Intel thế hệ thứ 12, 13 và 14\r\nKích thước: Micro ATX\r\nKhe cắm RAM: 2 khe (Tối đa 64GB)	\N	LS0007	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	36	{}	{}	f
SP0012	Kaspersky Plus 1pc - Bản quyền 02 năm		\N	LS0002	{"Thương hiệu":"Thiên Trúc","Xuất xứ":"Việt Nam","Công suất":"45W"}	12	{}	{}	f
SP0020	CPU Intel Core i3-12100 - Box(SK1700)	SK1700, chạy với H610	\N	LS0007	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	36	{}	{}	t
SP0022	DDRAM IV 8GB(3200) - Lexar		\N	LS0007	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	36	{}	{}	t
SP0015	Bkav Pro (1PC) - Bản quyền 01 năm		\N	LS0002	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0016	Trend micro internet Security 3pc -  Bản quyền 01 năm		\N	LS0002	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0010	Kaspersky STANDARD (1PC)- Bản quyền 01 năm		https://res.cloudinary.com/dsbyueyvz/image/upload/v1753849756/product/erppgiypoidfk71bfejv.png	LS0008	{"Thương hiệu":"Thiên Trúc","Xuất xứ":"Việt Nam","Công suất":"45W"}	11	{}	{}	t
SP0013	Kaspersky Plus 3pcs - Bản quyền 01 năm		\N	LS0002	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0023	DDRAM IV 8Gb (2666) - KINGMAX		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	36	{}	{}	f
SP0025	HDD Western 2TB - WD23PURZ	hoạt động 24/7	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0026	HDD Western 4TB - WD42PURU	hoạt động 24/7	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0036	KVM SWITCH UGREEN 30357 (2PC dùng chung LCD + KB + M)	2PC dùng chung LCD + KB + M)	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0024	HDD Western 1TB - WD11PURZ	hoạt động 24/7	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0037	MOUSE DELL MS116(USB)	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0038	Mouse LOGITECH B100	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0039	Mouse A4Tech OP-330(USB)	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0040	CAMERA IMOU IPC-A32EP-L 3MP	Xoay 360, Không màu đêm, có míc, có loa	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0041	CAMERA IMOU IPC-A52EP-L 5MP	Xoay 360, Không màu đêm, có míc, có loa	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0042	CAMERA IMOU IPC-F32P-IMOU 3MP	Cố định, Không có màu đêm, có míc, không loa	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0043	CAMERA EZVIZ CS-C6N-3MP	Xoay 360, Không màu đêm, có míc, có loa	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0045	Thẻ nhớ Kingston 64Gb class 10		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0046	Thẻ nhớ Kingston 128Gb class 10		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0047	MỚI ĐÂY		\N	LS0004	{}	\N	{}	{}	f
SP0051	123		\N	LS0004	{}	\N	{}	{}	f
SP0052	123456		\N	LS0004	{}	\N	{}	{}	f
SP0027	NGUỒN 235W - eMASTER EV772BR		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0028	NGUỒN 250W - eMASTER mini EM250W		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0029	NGUỒN JETEK 350W ELITE V2		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0030	NGUỒN JETEK 500W ELITE V2		\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0031	Keyboard A4Tech KK-3	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0032	Keyboard Dell 216(USB)	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0033	Keyboard LOGITECH K120	USB	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0034	KEYBOARD COMBO LOGITECH MK235	Wireless, có phím số	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	t
SP0035	KEYBOARD COMBO LOGITECH MK240	Wireless, không phím số	\N	LS0004	{"Thương hiệu": "Thiên Trúc", "Xuất xứ": "Việt Nam", "Công suất": "45W"}	12	{}	{}	f
SP0053	dsấdfsàdsa		\N	LS0004	{}	\N	{}	{}	f
SP0054	123		\N	LS0004	{}	\N	{}	{}	f
SP0057	TESSt Đặc điểm		\N	LS0004	{}	\N	{123}	{0}	f
SP0058	123		\N	LS0004	{}	\N	{"Dac diem"}	{}	f
SP0059	CABLE MINH TRÍ		\N	LS0004	{}	\N	{123}	{}	f
SP0060	CABLE MINH TRÍ	123	https://res.cloudinary.com/dsbyueyvz/image/upload/v1753112779/product/r1kxoxxnn2nepejsbetm.jpg	LS0004	{"123":"123"}	123	{123}	{}	t
SP0056	CABLE MINH TRÍ		\N	LS0004	{}	\N	{bbbb,aaa}	{0,1}	f
SP0061	123		\N	LS0004	{}	\N	{123}	{0}	f
SP0062	123		\N	LS0004	{}	\N	{123}	{}	f
SP0063	456	dsfdsf	\N	LS0004	{"dafdsaf":"dfasdf"}	12312	{2312312312,fadfsaf,dsafdsaf,adfadfsaf,fdsafsfasdfsa}	{2,3,4}	f
SP0055	dfasfasfd		https://res.cloudinary.com/dsbyueyvz/image/upload/v1753879436/product/t6cegzyrw4bbxc5dqgyh.png	LS0004	{}	\N	{}	{}	f
SP0068	RAM mới	RAM mới nè có khả năng chống cháy chống nổ chống abc dèf chống nổ chống abc dèf chống nổ chống abc dèf 	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754446798/product/y7izkreiedphmjpqkyy5.png	LS0006	{"1":"a","2":"b"}	12	{"đặc điểm 1","Có khả năng chống nước tuyệt vời","Chống va đập mạnh mẽ","đặc điểm 4","đặc điểm 5","Chống va đập mạnh mẽ abc"}	{1,2,3}	t
\.


--
-- Data for Name: project_contents; Type: TABLE DATA; Schema: project; Owner: thientrucdb_user
--

COPY project.project_contents (project_id, content) FROM stdin;
DA0052	<p>Oke</p>
\.


--
-- Data for Name: project_page; Type: TABLE DATA; Schema: project; Owner: thientrucdb_user
--

COPY project.project_page (banner_title, banner_description) FROM stdin;
Khám phá các công trình kiến trúc của Thiên Trúc	Nơi đây chứa tất cả các công trình công nghệ của Thiên Trúc trải dài từ Bắc Trung Nam, từ trường học tới trung tâm thương mại. Liên hệ chúng tôi sớm nhất để được thực hiện công trình.
Khám phá các công trình kiến trúc của Thiên Trúc	Nơi đây chứa tất cả các công trình công nghệ của Thiên Trúc trải dài từ Bắc Trung Nam, từ trường học tới trung tâm thương mại. Liên hệ chúng tôi sớm nhất để được thực hiện công trình.
\.


--
-- Data for Name: project_regions; Type: TABLE DATA; Schema: project; Owner: thientrucdb_user
--

COPY project.project_regions (id, name, rgb_color, item_count) FROM stdin;
KV0019	fdsferwqrádá	#f63c3b	0
KV0017	safasf	#3B82F6	0
KV0016	as	#3B82F6	0
KV0018	Khu vực mới	#c8178d	1
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: project; Owner: thientrucdb_user
--

COPY project.projects (id, region_id, title, province, complete_time, main_img, main_content, is_featured) FROM stdin;
DA0052	KV0018	Dự án nổi bật mới	Quảng Ngãi	2025-08-02	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754145897/project/st0o2rffctrbhmjo4qo2.jpg	Dự án này của miền Trung miền Nam miền Bắc vjprpo	t
\.


--
-- Data for Name: recruitment_page; Type: TABLE DATA; Schema: recruitment; Owner: thientrucdb_user
--

COPY recruitment.recruitment_page (banner_title, banner_description, culture_content, culture_img_1, culture_img_2, culture_img_3, culture_img_4) FROM stdin;
Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đâ	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401\r\nCập nhật Bannertrang sản phẩm lỗi 401\r\n\r\n\r\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Đây là Banner Đây là Banner Đây là Banner 	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	https://res.cloudinary.com/dsbyueyvz/image/upload/v1753155490/recruitment/swa2c4hxgufaymsmfzku.jpg	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754121209/recruitment/qzidiqhben6tad9ele4l.jpg	http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/4.jpg.aspx?width=570&height=473
Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đây là Banner Đâ	Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật BCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sả	Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401 Cập nhật Banner trang sản phẩm lỗi 401\r\nCập nhật Bannertrang sản phẩm lỗi 401\r\n\r\n\r\nCập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Cập nhật Banner trang sản phẩm lỗi 401Đây là Banner Đây là Banner Đây là Banner 	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDg0ODQ4NEA8ODQ0OFREWFhURExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NEA8QFS0dFRkrKzcrLS0rLSs3Ky03Ky0rNy0rKysrKysrKysrKystKysrKystKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIEBQYDB//EADIQAQACAQEFBgQFBQEAAAAAAAABAhEDBAUhMUESMlFhcaEiUoGxExUzcpEjQoLR8LL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD6IA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtSlrTEViZmekKKjY6O6bz3pivvLKrujT6zafScJRpBu53Rp9JtH1Y+rue0dy0T5TwKNYL6ulak4tExPmooAIAAAAAAAAAAAAAAAAAAAIB67PozqWitec+0eLodk2WunXFY49Z6zLw3Ts0Vp2pj4rcfoz4TdXERCQRRGEgPLX2et69m0Zj3hz227LOlbE8YnjWfF0zF2/Z4vpzGPijjHquaOcCRpkAQAAAAAAAAAAAAAAAAF9np2r1r42iFGXuqudavlmf4B0NYwlCWWgAAAAAHNbw0+zq3jzz/LHbHfdcalZ8atc1iAAgAAAAAAAAAAAAAAAAzdz/AK0ftswmRsF+zq0nziJ9BXSiISyoAAAAADS7979P2z92sZu9751pj5YiGE1iAAgAAAAAAAAAAAAAAAARPXwAHS7FrxfTrbyxPqyHP7s2v8O2J7tuflPi39ZzCauJARQAB56+pFazaeVYXlpd7bX2p/DrPCOcx1kwa/UvNrTaeczMqg0yAAAAAAAAAAAAAAAAAAAAM/d+8Ox8N8zXpPWGAKrqtLVraM1mJjynK7lNPUtWc1maz5Mqm89aOsT6xlmFdCrqXisZmYiPGZw0N96as9Yj0hi6mte3etNvUhWw2/eeY7Gnynnb/TWAoACAAAAAAAAAAAAAAAAAPfZtkvqT8McOszyB4LUpae7WZ9ImW72fddK8bfHPnyZtaRHKIj0hKsc7XYdaeVJ+y/5brfJ7w6IKRzv5brfJ7wj8u1vk94dGFI5z8u1vk94T+W63ye8OiCkc7+W63ye8K22DWj+yfaXSBSOVvpWjvVmPWJUdXasTziJ9WHtG7dO3KOzPjBSNAMra9hvp84zX5oYqoAKACAAAAAAAAAIZm7dk/Evx7lefn5A9N37BN8Wvwp/6bylIiIiIxEcohNYiIiI4QlmtAAAAAAAAAAAAImsTz5NNvDd+M30+XWvg3SJByY2O9dj7E9usfDbnHhLXNZ1AAQAAAAAAAAiMziOrpNk0I06RWPr6tPurS7WrEzyrmfr0b3Jq4sZQZZVIrlOQTkyjJkE5MoyjIi2RGTIJMoATkQZFTkyjJkFdakWrNZ5TDmtbTmtprPScOmy0++dPF4tH90cfVcRrgFQAAAAAAABtdy14XnxxDZ5a7c/6c/un7Qz0VYyqAtkyrkBbJlUyC2TKoCxlUBbJlUBbIrkBbJlUyC2WDveudPPhOWYxt5RnRt/j9waSunaeMRMxmY+scVXpS14jEcszPDHHh78FOzPh/wB/0qiAAAAAAAAbfdE/05/dP2hmtXunV71J68YbPIq2UIyZBMyZQZBOTKMmQTlOVcoyC+UZRkyCRGTIJmTKMmQTkyjJkE5Y28Z/pX+n3ZGWDvXVxWK9Zn2Bq+15z/KM+oCAAAAAAAAMjYf1K/VuQFEwAEoAEygATBIAgABMIATJAASgAGq3n3/8QBhgCAAAAP/Z	https://res.cloudinary.com/dsbyueyvz/image/upload/v1753155490/recruitment/swa2c4hxgufaymsmfzku.jpg	https://res.cloudinary.com/dsbyueyvz/image/upload/f_auto,q_auto/v1754121209/recruitment/qzidiqhben6tad9ele4l.jpg	http://thientruc.vn/getattachment/Gioi-thieu/Ngay-Hoi-Khai-Truong--Sieu-Thi-May-Tinh--Thien-(1)/4.jpg.aspx?width=570&height=473
\.


--
-- Name: company_services_id_seq; Type: SEQUENCE SET; Schema: about_us; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('about_us.company_services_id_seq', 15, true);


--
-- Name: why_choose_us_id_seq; Type: SEQUENCE SET; Schema: about_us; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('about_us.why_choose_us_id_seq', 16, true);


--
-- Name: activity_logs_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('admin.activity_logs_id_seq', 1542, true);


--
-- Name: support_agents_id_seq; Type: SEQUENCE SET; Schema: contact; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('contact.support_agents_id_seq', 99, true);


--
-- Name: highlight_stats_about_us_id_seq; Type: SEQUENCE SET; Schema: home; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('home.highlight_stats_about_us_id_seq', 13, true);


--
-- Name: news_category_seq; Type: SEQUENCE SET; Schema: news; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('news.news_category_seq', 19, true);


--
-- Name: news_seq; Type: SEQUENCE SET; Schema: news; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('news.news_seq', 77, true);


--
-- Name: category_seq; Type: SEQUENCE SET; Schema: product; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('product.category_seq', 20, true);


--
-- Name: product_prices_id_seq; Type: SEQUENCE SET; Schema: product; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('product.product_prices_id_seq', 68, true);


--
-- Name: product_seq; Type: SEQUENCE SET; Schema: product; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('product.product_seq', 68, true);


--
-- Name: project_region_seq; Type: SEQUENCE SET; Schema: project; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('project.project_region_seq', 21, true);


--
-- Name: project_seq; Type: SEQUENCE SET; Schema: project; Owner: thientrucdb_user
--

SELECT pg_catalog.setval('project.project_seq', 52, true);


--
-- Name: company_services company_services_pkey; Type: CONSTRAINT; Schema: about_us; Owner: thientrucdb_user
--

ALTER TABLE ONLY about_us.company_services
    ADD CONSTRAINT company_services_pkey PRIMARY KEY (id);


--
-- Name: why_choose_us why_choose_us_pkey; Type: CONSTRAINT; Schema: about_us; Owner: thientrucdb_user
--

ALTER TABLE ONLY about_us.why_choose_us
    ADD CONSTRAINT why_choose_us_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: admin; Owner: thientrucdb_user
--

ALTER TABLE ONLY admin.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (username);


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: admin; Owner: thientrucdb_user
--

ALTER TABLE ONLY admin.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: support_agents support_agents_pkey; Type: CONSTRAINT; Schema: contact; Owner: thientrucdb_user
--

ALTER TABLE ONLY contact.support_agents
    ADD CONSTRAINT support_agents_pkey PRIMARY KEY (id);


--
-- Name: highlight_stats_about_us highlight_stats_about_us_pkey; Type: CONSTRAINT; Schema: home; Owner: thientrucdb_user
--

ALTER TABLE ONLY home.highlight_stats_about_us
    ADD CONSTRAINT highlight_stats_about_us_pkey PRIMARY KEY (id);


--
-- Name: featured_news featured_news_pkey; Type: CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.featured_news
    ADD CONSTRAINT featured_news_pkey PRIMARY KEY (news_id);


--
-- Name: news_categories news_categories_pkey; Type: CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.news_categories
    ADD CONSTRAINT news_categories_pkey PRIMARY KEY (id);


--
-- Name: news_contents news_contents_pkey; Type: CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.news_contents
    ADD CONSTRAINT news_contents_pkey PRIMARY KEY (news_id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id);


--
-- Name: product_prices product_prices_pkey; Type: CONSTRAINT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.product_prices
    ADD CONSTRAINT product_prices_pkey PRIMARY KEY (id, product_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: project_contents project_contents_pkey; Type: CONSTRAINT; Schema: project; Owner: thientrucdb_user
--

ALTER TABLE ONLY project.project_contents
    ADD CONSTRAINT project_contents_pkey PRIMARY KEY (project_id);


--
-- Name: project_regions project_regions_pkey; Type: CONSTRAINT; Schema: project; Owner: thientrucdb_user
--

ALTER TABLE ONLY project.project_regions
    ADD CONSTRAINT project_regions_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: project; Owner: thientrucdb_user
--

ALTER TABLE ONLY project.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: activity_logs trg_trim_activity_logs; Type: TRIGGER; Schema: admin; Owner: thientrucdb_user
--

CREATE TRIGGER trg_trim_activity_logs AFTER INSERT ON admin.activity_logs FOR EACH STATEMENT EXECUTE FUNCTION admin.trim_activity_logs();


--
-- Name: news_categories trg_news_category_id; Type: TRIGGER; Schema: news; Owner: thientrucdb_user
--

CREATE TRIGGER trg_news_category_id BEFORE INSERT ON news.news_categories FOR EACH ROW EXECUTE FUNCTION news.gen_category_id();


--
-- Name: news trg_news_id; Type: TRIGGER; Schema: news; Owner: thientrucdb_user
--

CREATE TRIGGER trg_news_id BEFORE INSERT ON news.news FOR EACH ROW EXECUTE FUNCTION news.gen_news_id();


--
-- Name: product_categories trg_category_id; Type: TRIGGER; Schema: product; Owner: thientrucdb_user
--

CREATE TRIGGER trg_category_id BEFORE INSERT ON product.product_categories FOR EACH ROW EXECUTE FUNCTION product.gen_category_id();


--
-- Name: products trg_product_id; Type: TRIGGER; Schema: product; Owner: thientrucdb_user
--

CREATE TRIGGER trg_product_id BEFORE INSERT ON product.products FOR EACH ROW EXECUTE FUNCTION product.gen_product_id();


--
-- Name: projects trg_project_id; Type: TRIGGER; Schema: project; Owner: thientrucdb_user
--

CREATE TRIGGER trg_project_id BEFORE INSERT ON project.projects FOR EACH ROW EXECUTE FUNCTION project.gen_project_id();


--
-- Name: project_regions trg_project_region_id; Type: TRIGGER; Schema: project; Owner: thientrucdb_user
--

CREATE TRIGGER trg_project_region_id BEFORE INSERT ON project.project_regions FOR EACH ROW EXECUTE FUNCTION project.gen_region_id();


--
-- Name: activity_logs activity_logs_username_fkey; Type: FK CONSTRAINT; Schema: admin; Owner: thientrucdb_user
--

ALTER TABLE ONLY admin.activity_logs
    ADD CONSTRAINT activity_logs_username_fkey FOREIGN KEY (username) REFERENCES admin.accounts(username);


--
-- Name: featured_news featured_news_news_id_fkey; Type: FK CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.featured_news
    ADD CONSTRAINT featured_news_news_id_fkey FOREIGN KEY (news_id) REFERENCES news.news(id);


--
-- Name: news news_category_id_fkey; Type: FK CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.news
    ADD CONSTRAINT news_category_id_fkey FOREIGN KEY (category_id) REFERENCES news.news_categories(id);


--
-- Name: news_contents news_contents_news_id_fkey; Type: FK CONSTRAINT; Schema: news; Owner: thientrucdb_user
--

ALTER TABLE ONLY news.news_contents
    ADD CONSTRAINT news_contents_news_id_fkey FOREIGN KEY (news_id) REFERENCES news.news(id);


--
-- Name: product_prices product_prices_product_id_fkey; Type: FK CONSTRAINT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.product_prices
    ADD CONSTRAINT product_prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES product.products(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: product; Owner: thientrucdb_user
--

ALTER TABLE ONLY product.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES product.product_categories(id);


--
-- Name: project_contents project_contents_project_id_fkey; Type: FK CONSTRAINT; Schema: project; Owner: thientrucdb_user
--

ALTER TABLE ONLY project.project_contents
    ADD CONSTRAINT project_contents_project_id_fkey FOREIGN KEY (project_id) REFERENCES project.projects(id);


--
-- Name: projects projects_region_id_fkey; Type: FK CONSTRAINT; Schema: project; Owner: thientrucdb_user
--

ALTER TABLE ONLY project.projects
    ADD CONSTRAINT projects_region_id_fkey FOREIGN KEY (region_id) REFERENCES project.project_regions(id);


--
-- PostgreSQL database dump complete
--

