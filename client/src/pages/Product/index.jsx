// src/pages/Product.jsx
import { useMemo, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import useProducts from '@/hooks/useProducts';
import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import ComingSoon from '@/pages/ComingSoon';
import FeatureSection from './components/FeatureSection';
import ProductToolbar from './components/ProductToolbar';
import CustomSlider from './components/CustomSlider';

// --- Constants ---
const ITEMS_PER_PAGE = 12;
const ALL_CATEGORIES = "Tất cả sản phẩm";
const ITEMS_PER_CATEGORY_SLIDER = 4;

// --- Custom Hook để quản lý URL params (giữ nguyên trong file) ---
const useProductParams = (validCategories) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo(() => {
        const query = searchParams.get("query") || undefined;
        const rawFilter = searchParams.get("filter");
        const filter = validCategories.includes(rawFilter) ? rawFilter : ALL_CATEGORIES;
        const rawPage = parseInt(searchParams.get("page"), 10);
        const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
        
        return { query, filter, page };
    }, [searchParams, validCategories]);

    const updateParams = (newValues) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(newValues).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });

        if ('filter' in newValues || 'query' in newValues) {
            newParams.set("page", "1");
        }

        setSearchParams(newParams);
    };

    return [params, updateParams];
};

export default function Product() {
    // Hook
    const scrollTargetRef = useRef(null);
    const navigate = useNavigate();
    const navigation = useNavigation();
    const location = useLocation();

    // Data fetching
    const { data: productPage, isLoading: isLoadingPage } = useProducts.getProductPage();
    const { data: productCategories, isLoading: isLoadingCategories } = useProducts.product_categories.getAll();

    const categoriesName = useMemo(() => [
        ALL_CATEGORIES,
        ...((productCategories || []).map((category) => category.name) ?? []),
    ], [productCategories]);

    const [params, updateParams] = useProductParams(categoriesName);

    // Fetch data cho chế độ tìm kiếm/lọc
    const { data: filteredProducts, isLoading: isLoadingFilteredProducts } = useProducts.products.getList(
        params.query,
        params.filter === ALL_CATEGORIES ? undefined : params.filter,
        undefined,
        params.page,
        ITEMS_PER_PAGE
    );
    
    // Fetch data cho chế độ "Tất cả sản phẩm" (theo category)
    const { data: productsByCat, isLoading: isLoadingProductsByCat } = useProducts.products.getListByCategory('', '', '', '', ITEMS_PER_CATEGORY_SLIDER);

    // Utils
    useEffect(() => {
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [params]);

    // Handlers
    const handleSearch = (category, query) => updateParams({ filter: category, query });
    const handleEnterSearch = (idProduct) => navigate(`${location.pathname}/${idProduct}`);
    const handleViewMore = (categoryName) => updateParams({ filter: categoryName, query: '' });
    const goBack = () => updateParams({ filter: ALL_CATEGORIES, query: '' });

    // Data
    const bannerMainData = useMemo(() => ({
        title: productPage?.banner_title,
        description: productPage?.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasSearch: productPage?.is_visible,
        currentQuery: params.query,
        currentCategory: params.filter,
        handleButton: handleSearch,
        categories: categoriesName,
        contentPlaceholder: 'Tìm kiếm sản phẩm...',
        handleSearchSuggestion: useProducts.getSearchSuggestions,
        handleEnter: handleEnterSearch
    }), [productPage, params, categoriesName, handleSearch, handleEnterSearch]);

    if (isLoadingPage || isLoadingCategories) {
        return <Loading />;
    }

    const isAllCategoriesView = params.filter === ALL_CATEGORIES && !params.query;

    console.log("day la categories: ", productCategories);
    return (
        <>
            {navigation.state === 'loading' && <Loading />}
            <Banner data={bannerMainData} />
            {productPage?.is_visible ? (
            <>
                <FeatureSection navigate={navigate} />
                <div className="container-fluid flex flex-col" ref={scrollTargetRef}>
                    {isAllCategoriesView ? (
                        <CustomSlider 
                            productsByCat={productsByCat} 
                            isLoading={isLoadingProductsByCat}
                            handleViewMore={handleViewMore}
                        />
                    ) : (
                        <ProductToolbar 
                            categoryName={params.filter}
                            query={params.query}
                            products={filteredProducts?.results} 
                            totalCount={filteredProducts?.totalCount}
                            page={params.page}
                            isLoading={isLoadingFilteredProducts}
                            goBack={goBack}
                            updateParams={updateParams}
                        />
                    )}
                </div>
            </>
            ) : (
                <ComingSoon />
            )}
        </>
    );
}