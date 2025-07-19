import useProducts from '@/hooks/useProducts'
import Banner from '@/components/Banner'
import CenterCard from '@/components/CenterCard'
import ItemProduct from '@/components/ItemProduct'
import ViewMoreButton from '@/components/ViewMoreButton'
import Loading from '@/components/Loading'
import Paging from '@/components/Paging'
import { useRef } from 'react'
import { TruckOutlined, UserOutlined, CreditCardOutlined, SafetyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

//Start extra components
function GoBackListProduct({goBack ,categorySelected ,query}){
    return( (categorySelected != 'Tất cả sản phẩm' && categorySelected != '') || query != '' ?
        <div onClick={goBack} className='flex flex-row text-[#16A34A] my-[10px] text-[15px] gap-[10px] cursor-pointer hover:text-[#0B4A24] transition-all duration-300 ease-in-out '>
            <ArrowLeftOutlined /> <p className=''>Quay Lại</p>
        </div> : <div></div>
    )
}
function ListByCategories({ filter, query, page,categories, handleViewMore, handleViewProduct, handlePageChange }) {
    
    if(filter === '')
    {
        return(
            categories.map((category, index)=>{
                const props = {
                     category: category, 
                     handleViewMore : null, 
                }
                return(
                    <Category {...props}/>
                )
            })
        )
    }
    
    return (
        Object.entries(data).map((objectCategory, index) => {

            const props = {
                category: objectCategory[0],
                products: objectCategory[1],
                handleViewMore: handleViewMore,
                handleViewProduct: handleViewProduct,
                handlePageChange: handlePageChange
            }
            return (<div key={index}>
                <Category {...props} />
            </div>)
        })
    )
}

function ListProduct({ products, handleViewProduct }) {
    return (
        <div className='grid grid-cols-4 py-[20px] mx-[30px] gap-y-[20px]'>
            {
                products.map((product, i) => {
                    return (
                        <div key={i} className='w-[330px] h-[620px]'>
                            <ItemProduct product={products[i]}
                                handleClick={() => handleViewProduct(product)}
                            />
                        </div>

                    )
                })
            }


        </div>
    )
}
function Category({ category, handleViewProduct  }) {
    const {data: productByCategory, isLoading: isLoadingProductByCategory} = useProducts.products.getListByCategory('','',category.name, false,4)
    if(isLoadingProductByCategory)
    {
        return(<div>Loading</div>)
    }
    if(Object.keys(productByCategory).length === 0)
    {
        return(<></>)
    }
    return (

        <div className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] pt-[20px] mb-[20px]'>
            <div className='border-b-[1px] border-[#E5E7EB] pb-[20px] shadow-sm'>
                <div className='border-l-[5px] border-[#1E2A38] px-[16px] ml-[30px]'>
                    <h1 className='text-[30px] leading-none text-[#1E2A38]'>
                        {category.name}
                    </h1>
                </div>
            </div>
            <ListProduct products={productByCategory[category.name]} handleViewProduct={handleViewProduct} />

            <div className='flex justify-center py-[20px] border-t-[1px] border-[#E5E7EB]'>
                <div className="h-fit w-fit">
                    {
                        <ViewMoreButton content={'Xem Tất Cả Sản Phẩm'} handleClick={() => handleViewMore(category)} /> 
                    }

                </div>

            </div>

        </div>
    )
}
//End extra components
export default function Product() {
    const scrollTargetRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || "";
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
        newParams.set("page", "1");
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }
    const handleViewProduct = (product) => {
        const path = location.pathname;

        navigate(`${path}/${product.id}`)
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
    const idSelectedCategories = filter ? categories.findIndex((name) => name === filter) : 0;
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
        hasSearch: true,
        contentButton: null,
        value: query,
        idCategories: idSelectedCategories,
        handleButton: handleSearch,
        categories: categoriesName,
        contentPlaceholder: 'Tìm kiếm sản phẩm...',
        handleSearchSuggestion: handleSearchSuggestion,
        handleEnter: handleEnterSearch
    }

    const bannerViewPrices = {
        title: 'Xem Bảng Giá Ngay',
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
            title: "Giao Hàng Nhanh",
            description: "Miễn phí với đơn hàng trên 1 triệu."
        },
        {
            icon: UserOutlined,
            title: "Tư vấn chuyên nghiệp",
            description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm."
        },
        {
            icon: SafetyOutlined,
            title: '100% Chính Hãng',
            description: "Cam kết sản phẩm chính hãng."
        },
        {
            icon: CreditCardOutlined,
            title: "Thanh Toán Linh Hoạt",
            description: "Nhiều phương thức thanh toán."
        }

    ]



 
    return (

        <>
            <Banner data={bannerMain} />
            <Banner data={bannerViewPrices} />
            <div className="container-fluid flex flex-col ">
                <div className='flex flex-grow justify-between py-[45px]  '>
                    {
                        contentCenterCards.map((card, index) => {
                            return (
                                <div key={index} className='w-[340px] h-[162px]'>
                                    <CenterCard data={card} />
                                </div>
                            )
                        })
                    }
                </div>
                <div ref={scrollTargetRef}  ></div>
                <div className='my-[40px]'>
                    <GoBackListProduct goBack={goBack} categorySelected={filter} query={query} />
                </div>

               <ListByCategories filter ={filter} query= {query} page={page} categories = {productCategories} handleViewMore = {null} handleViewProduct = {null}  handlePageChange = {null}  />

            </div>

        </>
    )
}