import { useLocation, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useRef, useMemo, useEffect } from "react";
import useNews from "@/hooks/useNews";
import Banner from "@/components/Banner";
import Loading from "@/components/Loading";
import NewsContent from "./components/NewsContent"; 

// --- Constants ---
const ITEMS_PER_PAGE = 9;
const ALL_CATEGORIES = "Tất cả thể loại";
const SORT_OPTIONS = [
  { label: "Mới nhất", value: "date_desc" },
  { label: "Phổ biến", value: "popular" },
];
const DEFAULT_SORT_BY = SORT_OPTIONS[0].value;

// Custom hook để quản lý URL params (giữ nguyên như lần refactor trước)
const useNewsParams = (validCategories) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo(() => {
        const query = searchParams.get("query") || "";
        const limit = searchParams.get('limit') || ITEMS_PER_PAGE;
        const rawSortBy = searchParams.get("sort_by");
        const sortBy = SORT_OPTIONS.some(opt => opt.value === rawSortBy) ? rawSortBy : DEFAULT_SORT_BY;
        const rawPage = parseInt(searchParams.get("page"), 10);
        const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
        const rawFilter = searchParams.get("filter");
        const filter = validCategories.includes(rawFilter) ? rawFilter : ALL_CATEGORIES;
        return { query, limit, sortBy, page, filter };
    }, [searchParams, validCategories]);

    const updateParams = (newValues) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(newValues).forEach(([key, value]) => newParams.set(key, value));
        if (!('page' in newValues) || Object.keys(newValues).length > 1) {
          newParams.set("page", "1");
        }
        setSearchParams(newParams);
    };

    return [params, updateParams];
};

export default function News() {
    const scrollTargetRef = useRef(null);
    const scrollTargetHead = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const navigation = useNavigation();

    // --- Data Fetching ---
    const { data: newsPage, isLoading: isLoadingNewsPage } = useNews.getNewsPage();
    const { data: newsCategories, isLoading: isLoadingCategories } = useNews.news_categories.getAll();

    const categories = useMemo(() => [
        ALL_CATEGORIES,
        ...(newsCategories?.map((cat) => cat.name) ?? []),
    ], [newsCategories]);

    const [params, updateParams] = useNewsParams(categories);

    const { data: filteredData, isLoading: isLoadingFilteredData } = useNews.news.getList(
        params.query,
        params.filter === ALL_CATEGORIES ? undefined : params.filter,
        true,
        params.sortBy,
        params.page,
        params.limit
    );

    // --- Side Effects ---
    useEffect(() => {
        if (scrollTargetRef.current) {
          scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [params]);
    useEffect(() => {
         scrollTargetHead.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    // --- Memoized Props ---
    const bannerData = useMemo(() => ({
        title: newsPage?.banner_title,
        description: newsPage?.banner_description,
        hasSearch: newsPage?.is_visible,
        categories: categories,
        currentQuery: params.query,
        currentCategory: params.filter,
        handleButton: (filter, query) => updateParams({ filter, query }),
        handleSearchSuggestion: useNews.getSearchSuggestions,
        handleEnter: (id) => navigate(`/tin-tuc/${id}`),
        // Các props khác cho Banner
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        contentPlaceholder: "Nhập vào đây",
    }), [newsPage, categories, params.query, params.filter, navigate, updateParams]);
    
    // --- Render Logic ---
    if (isLoadingNewsPage || isLoadingCategories) {
      return <Loading />;
    }

    return (
        <>
            <div ref = {scrollTargetHead}></div>
            {navigation.state === 'loading' && <Loading />}
            <Banner data={bannerData} />
            <NewsContent
              scrollTargetRef={scrollTargetRef}
              isVisible={newsPage?.is_visible}
              isLoading={isLoadingFilteredData}
              filteredData={filteredData}
              params={params}
              updateParams={updateParams}
              categories={categories}
              sortOptions={SORT_OPTIONS}
              itemsPerPage={ITEMS_PER_PAGE}
              location={location}
            />
        </>
    );
}