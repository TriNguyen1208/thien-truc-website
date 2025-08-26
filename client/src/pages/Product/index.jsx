import useProducts from '@/hooks/useProducts'
import Banner from '@/components/Banner'
import CenterCard from '@/components/CenterCard'
import ItemProduct from '@/components/ItemProduct'
import ViewMoreButton from '@/components/ViewMoreButton'
import Loading from '@/components/Loading'
import Paging from '@/components/Paging'
import { useRef } from 'react'
import { TruckOutlined, UserOutlined, CreditCardOutlined, SafetyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useNavigation, useSearchParams, Link } from "react-router-dom";
import ComingSoon from '@/pages/ComingSoon'

//Start extra components
function GoBackListProduct({ goBack, categorySelected, query }) {
    return ((categorySelected != 'Tất cả sản phẩm' && categorySelected != '') || query != '' ?
        <div onClick={goBack} className='flex flex-row text-[#16A34A] my-[10px] text-[15px] gap-[10px] cursor-pointer hover:text-[#0B4A24] transition-all duration-300 ease-in-out '>
            <ArrowLeftOutlined /> <p className=''>Quay Lại</p>
        </div> : <div></div>
    )
}
function ProductsContainter({ filter, query, page, categories, handleViewMore, handlePageChange }) {

    let props = undefined
    if (filter === 'Tất cả sản phẩm' && query === '') {
        return (     
            <AllCategories handleViewMore = {handleViewMore}/>
        )
    } else if (query === '') {
        props = {
            category: categories.find(obj => obj.name === filter),
            page: page,
            handlePageChange: handlePageChange,
        
        }

    } else {
        if (filter === 'Tất cả sản phẩm') {
            props = {
                category: categories.find(obj => obj.name === filter),
                isQuery: true,
                query: query,
                page: page,
                handlePageChange: handlePageChange,
            
            }

        } else {
            props = {
                category: categories.find(obj => obj.name === filter),
                page: page,
                query: query,
                handlePageChange: handlePageChange,
              
            }

        }
    }
    return (<Category {...props} />)
}

function ListProduct({ products }) {
    return (
        <div className=' grid grid-cols-2 place-items-center p-2 lg:p-4 gap-2 sm:grid-cols-4  ' >
            {
                (products || []).map((product, i) => {
                    return (
                        <Link key={i} className=' aspect-[4/8] w-full max-w-[230px]   sm:max-h-[320px] md:max-h-[420px]  lg:max-w-[280px] lg:max-h-[470px] xl:max-h-[500px] ' to = {`/san-pham/${product.id}` }>
                          
                                <ItemProduct product={products[i]} />
                        </Link>

                    )
                })

            }


        </div>
    )

}
function AllCategories({handleViewMore}){
    const { data: products, isLoading: isLoadingProducts } = useProducts.products.getListByCategory('','','','',4)
    if(isLoadingProducts){
        return(<Loading/>)
    }
    
    return(
        <div className='w-full h-full'>
             {
                Object.keys(products).map(key => (
                        <div key={key} className='flex flex-col  border-[1px] border-[#E5E7EB] rounded-[8px] mb-[20px]'>
                            <div className='border-b-[1px] border-[#E5E7EB] py-[12px] shadow-sm'>
                    
                            <div className='border-l-[5px] border-[#1E2A38] px-[8px] ml-[12px]'>
                                <h1 className='text-[20px] lg:text-[30px] leading-none text-[#1E2A38]'>
                                    { key}
                                </h1>
                            </div>
                        </div>
                        <div>
                            <ListProduct products={products[key]}  />
                        </div>
                            <div className='flex justify-center py-[8px] border-t-[1px] border-[#E5E7EB]'>
                            <div className="h-fit w-fit">
                                    <ViewMoreButton content={'Xem Tất Cả Sản Phẩm'} handleClick={() => handleViewMore(key)} />
                            </div>

                        </div>
                                </div>
                ))
             }
        </div>

    )
}
function Category({ category, query = '', limit = '', handleViewProduct, handlePageChange,  isQuery = false, page = 1 }) {

    const { data: products, isLoading: isLoadingProductByCategory } = useProducts.products.getList(query, (category || {name: ""}).name, '', page, limit)
    if (isLoadingProductByCategory) {
        return (<Loading />)
    }
    if (products.results.length == 0) {
        return (<div className='mb-[20px]'>Không có sản phẩm</div>)
    }
    return (

        <div className='flex flex-col  border-[1px] border-[#E5E7EB] rounded-[8px] mb-[20px]'>
            <div className='border-b-[1px] border-[#E5E7EB] py-[12px] shadow-sm'>
                {
                    isQuery ? <></> : (
                        <div className='border-l-[5px] border-[#1E2A38] px-[8px] ml-[12px]'>
                                <h1 className='text-[20px] lg:text-[30px] leading-none text-[#1E2A38]'>
                                    { category.name}
                                </h1>
                            </div>
                    )
                }
            </div>
            <ListProduct products={products.results} handleViewProduct={handleViewProduct} />

            <div className='flex justify-center py-[8px] border-t-[1px] border-[#E5E7EB]'>
               
                <Paging data={{ numberPagination: Math.ceil(products.totalCount / 12) }} onPageChange={handlePageChange} currentPage={products.page} /> 
               

            </div>

        </div>
    )
}
//End extra components
export default function Product() {
    const scrollTargetRef = useRef(null)
    const navigate = useNavigate();
    const navigation = useNavigation();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || "Tất cả sản phẩm";
    const page = parseInt(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || "";
    const { data: productPage, isLoading: isLoadingPage } = useProducts.getProductPage()
    const { data: productCategories, isLoading: isLoadingCategories } = useProducts.product_categories.getAll()


    if (isLoadingPage || isLoadingCategories) {
        return (<div >
            <Loading />
        </div>)
    }
 
    const handleSearchSuggestion = (query, filter) => {
        return useProducts.getSearchSuggestions(query, filter)
    }
    const handleEnterSearch = (idProduct) => {
        const path = location.pathname;
        navigate(`${path}/${idProduct}`)
    }
    const handleViewMore = (category) => {
        const newParams = new URLSearchParams();
        newParams.set("filter", category);
        newParams.set("page", 1);
        newParams.set("query", '');
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }

    const goBack = () => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }
    const handlePageChange = (page) => {
        const newParams = new URLSearchParams();

        newParams.set("page", `${page}`);
        newParams.set("filter", filter);
        newParams.set("query", query);
        setSearchParams(newParams);
    }
    const categoriesName = productCategories.map((category) => {
        return (category.name)
    })
    categoriesName.unshift("Tất cả sản phẩm")
    const idSelectedCategories = filter ? categoriesName.findIndex((name) => name === filter) : 0;
    const handleSearch = (category, query) => {
        const newParams = new URLSearchParams();
        newParams.set("query", query);
        newParams.set("filter", category);
        newParams.set("page", "1");
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }
    const bannerMain = {
        title: productPage.banner_title,
        description: productPage.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasButton: false,
        hasSearch: productPage.is_visible ? true : false,
        contentButton: null,
        currentQuery: query,
        currentCategory: filter,
        handleButton: handleSearch,
        categories: categoriesName,
        contentPlaceholder: 'Tìm kiếm sản phẩm...',
        handleSearchSuggestion: handleSearchSuggestion,
        handleEnter: handleEnterSearch
    }

    const bannerViewPrices = {
        title: 'Xem bảng giá ngay',
        description: 'Xem chi tiết giá lắp đặt các thiết bị điện tử và giải pháp thi công tại Thiên Trúc',
        colorBackground: "#F0FDF4",
        colorText: "#000000",
        hasButton: true,
        hasSearch: false,
        contentButton: 'Tới Bảng Giá',
        handleButton: () => { navigate('/bang-gia') },
        categories: null,
        contentPlaceholder: null,
        handleSearchSuggestion: null

    }
    const contentCenterCards = [
        {
            icon: TruckOutlined,
            title: "Giao hàng nhanh",
            description: "Miễn phí với đơn hàng trên 1 triệu."
        },
        {
            icon: UserOutlined,
            title: "Tư vấn chuyên nghiệp",
            description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm."
        },
        {
            icon: SafetyOutlined,
            title: '100% chính hãng',
            description: "Cam kết sản phẩm chính hãng."
        },
        {
            icon: CreditCardOutlined,
            title: "Thanh toán linh hoạt",
            description: "Nhiều phương thức thanh toán."
        }

    ]




    return (

        <>
            {navigation.state == 'loading' && <Loading/>}
            <Banner data={bannerMain} />
            {productPage.is_visible ? <div>
                <Banner data={bannerViewPrices} />
                <div className="container-fluid flex flex-col ">
                    <div className='grid grid-cols-2 gap-[16px] place-items-center my-[8px]  lg:grid-cols-4 lg:py-6'>
                        {
                            contentCenterCards.map((card, index) => {
                                return (
                                    <div key={index} className=' w-[100%] h-[220px] max-h-[200px] sm:w-[260px] sm:h-[160px] lg:w-[90%]'>
                                        <CenterCard data={card} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div ref={scrollTargetRef}  ></div>
                    <div >
                        <GoBackListProduct goBack={goBack} categorySelected={filter} query={query} />
                    </div>

                    <ProductsContainter filter={filter} query={query} page={page} categories={productCategories} handleViewMore={handleViewMore} handlePageChange={handlePageChange} />

                </div>
            </div>: <ComingSoon/>}
        </>
    )
}