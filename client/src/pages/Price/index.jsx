// src/pages/Price/index.jsx
import { useMemo, useRef } from 'react';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import useProducts from '@/hooks/useProducts';
import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import ComingSoon from '@/pages/ComingSoon';
import PriceTable from './components/PriceTable';
import ContactBanner from './components/ContactBanner';

export default function PricePage() {
    // Hook
    const navigate = useNavigate();
    const navigation = useNavigation();
    const scrollTargetRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Data Fetching
    const { data: pricePage, isLoading: isLoadingPage } = useProducts.getPricePage();
    const { data: productCategories = [], isLoading: isLoadingCategories } = useProducts.product_categories.getAll();
    const query = searchParams.get('query') || '';

    const categories = useMemo(() => [
        'Tất cả sản phẩm',
        ...productCategories.map((category) => category.name),
    ], [productCategories]);

    const rawFilter = searchParams.get('filter') || '';
    const filter = rawFilter && categories.includes(rawFilter) ? rawFilter : 'Tất cả sản phẩm';

    const { data: productAll = [], isLoading: isLoadingProductAll } = useProducts.getAll();
    
    // Handlers
    const handleEnter = (id) => navigate(`/san-pham/${id}`);
    const handleSearchSuggestion = (query, filter) => useProducts.getSearchSuggestions(query, filter);
    const handleButton = (category, query) => {
        const newParams = new URLSearchParams();
        newParams.set('query', query);
        newParams.set('filter', category);
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    // Banner data
    const bannerHeadData = useMemo(() => ({
        title: pricePage?.banner_title,
        description: pricePage?.banner_description,
        colorBackground: 'var(--gradient-banner)',
        colorText: '#ffffff',
        hasSearch: pricePage?.is_visible,
        categories,
        currentQuery: query,
        currentCategory: filter,
        contentPlaceholder: 'Nhập vào đây',
        handleButton,
        handleSearchSuggestion,
        handleEnter,
    }), [pricePage, categories, query, filter]);

    if (isLoadingPage || isLoadingCategories) {
        return <Loading />;
    }

    return (
        <>
            {navigation.state === 'loading' && <Loading />}
            <Banner data={bannerHeadData} />
            {pricePage?.is_visible ? (
              <div ref={scrollTargetRef} className="flex flex-col p-[16px] lg:p-[32px]">
                  <div className="bg-[#F0FDF4] shadow-md rounded-xl xl:pt-[48px]">
                      <div className="bg-white w-full max-w-[1200px] h-[700px] mx-auto mb-[16px] rounded-xl shadow-2xl overflow-hidden">
                          <div className="font-bold text-[20px] text-center bg-white p-[24px]">
                              Bảng giá sản phẩm
                          </div>
                          <PriceTable
                              productPrices={productAll}
                              isLoading={isLoadingProductAll}
                              navigate={navigate}
                          />
                      </div>
                      <ContactBanner navigate={navigate} />
                  </div>
              </div>
              ) : <ComingSoon />
            }
        </>
    );
}