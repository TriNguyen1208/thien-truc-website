  // src/pages/Price/index.jsx  
  import React, { useState } from 'react'
  import Banner from '@/components/Banner'
  import { ChevronDownIcon } from '@heroicons/react/24/outline'
  import { Button } from 'antd'
  import ProductDetailModal from '@/components/ProductDetailModal'
  // eslint-disable-next-line no-unused-vars
  import { motion, AnimatePresence } from 'framer-motion';
  import useProducts from "@/hooks/useProducts";
  import Loading from '@/components/Loading'
  import '@/styles/custom.css'
  import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
  import { useRef } from 'react';
  import ComingSoon from '@/pages/ComingSoon'

  export default function PricePage() {
  
      // Biến để lưu trữ tham chiếu đến phần tử
      const navigate = useNavigate();
      const navigation = useNavigation();
      const [selectedProduct, setSelectedProduct] = useState(null)
      const [openCategories, setOpenCategories] = useState({});
      const [search, setSearch] = useState('');
      const [searchParams, setSearchParams] = useSearchParams();
      const [selectedCategory, setSelectedCategory] = useState('Tất cả')  
      const scrollTargetRef = useRef(null);

      const query = searchParams.get("query") || "";


      // Load dữ liệu từ API
      const { data: pricePage, isLoading: isLoadingPage } = useProducts.getPricePage()
      const { data: productCategories =[], isLoading: isLoadingCategories } = useProducts.product_categories.getAll()
    
      const categories = [
          "Tất cả sản phẩm",
          ...productCategories.map((category) => category.name),
        ];
      const rawFilter = searchParams.get("filter") || "" ;
      const filter = rawFilter && categories.includes(rawFilter) ? rawFilter : "Tất cả sản phẩm";
      const { data: products = [], isLoading: isLoadingProducts } = useProducts.products.getList();
      const { data: productPrices = [], isLoading: isLoadingPrices } = useProducts.product_prices.getAll(
        query,
        filter === "Tất cả sản phẩm" ? "" : filter
      );
      const idSelectedCategories = filter ? categories.findIndex((name) => name === filter) : 0;
      if (isLoadingPage || isLoadingCategories || isLoadingProducts) {
        return <Loading />
      }
      // Xử lý dữ liệu sản phẩm
      const groupedData = productPrices.reduce((acc, item) => {
          const category = item.product.category.name;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            id: item.product.id,
            name: item.product.name,
            price: item.price,
            warranty: item.product.warranty_period,
            description: item.product.description,
            image: item.product.product_img
          });
          return acc;
        }, {});
      
      const filteredData = Object.entries(groupedData)
          .filter(([cat]) =>
            selectedCategory === "Tất cả" || cat === selectedCategory
          )
          .map(([cat, products]) => ({
            category: cat,
            products: products.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            ),
          }));
      
      const flatProducts = Array.isArray(products.results)
          ? products.results
          : Object.values(products.results || {}).flat();
    
      if (
          Object.keys(openCategories).length === 0 &&
          productCategories?.length > 0
        ) {
          setOpenCategories((prev) => {
            if (Object.keys(prev).length === 0) {
              const initial = productCategories.reduce((acc, cur) => {
                acc[cur.name] = true;
                return acc;
              }, {});
              return initial;
            }
            return prev;
          });
        }


      // Handlers
      const handleEnter = (id) => {
          navigate(`/san-pham/${id}`);
        }
      const handleSearchSuggestion = (query, filter) => {
          return useProducts.getSearchSuggestions(query, filter);
      };


      const handleButton = (category, query) => {
        const newParams = new URLSearchParams();
        newParams.set("query", query);
        newParams.set("filter", category);
        setSearchParams(newParams);
        setTimeout(() => {
          scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      }
      // Toggle category open/close state
      const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
          ...prev,
          [category]: !prev[category],
        }))
      }


    // Banner data
    const bannerHead = {
      title: pricePage?.banner_title,
      description: pricePage?.banner_description,
      colorBackground: "var(--gradient-banner)",
      colorText: "#ffffff",
      hasSearch: pricePage.is_visible ? true : false,
      categories: categories,
      currentQuery: query, 
      currentCategory: filter,
      contentPlaceholder: "Nhập vào đây",
      handleButton: handleButton,
      handleSearchSuggestion: handleSearchSuggestion,
      handleEnter: handleEnter
    };
    const bannerContact = {
      title : 'Sẵn sàng hợp tác với chúng tôi?',
      description: 'Hãy liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn.',
      colorBackground : "#F0FDF4",
      colorText : "#000000",
      hasButton : true,
      hasSearch : false,
      contentButton : 'Liên Hệ Ngay',
      handleButton : ()=>{ navigate('/lien-he',  { state: { scrollToForm: true } })},
      categories : null,
      contentPlaceholder : null
    }    
  return (
  <>
    {navigation.state == 'loading' && <Loading/>}
    <Banner data={bannerHead} />
    {pricePage.is_visible ? <div ref={scrollTargetRef} className=" flex flex-col  p-[16px] lg:p-[32px]">
    <div className="bg-[#F0FDF4]  shadow-md rounded-xl xl:pt-[48px]">
      <div className="bg-white w-full max-w-[1200px] h-[700px] mx-auto mb-[16px] rounded-xl shadow-2xl overflow-hidden">
        <div className=" font-bold text-[20px] text-center bg-white p-[24px] ">
          Bảng giá sản phẩm
        </div>


          <div className="overflow-y-auto max-h-[600px] overflow-x-hidden no-scrollbar">
            <table className="text-base table-fixed w-full">
              <thead className="hidden md:table-header-group sticky top-0 z-20 bg-[#00A651] text-white shadow-md ">
                <tr className='w-full'>
                  <th className="text-center  w-[8%] md:p-[12px] ">STT</th>
                  <th className="text-left  w-[40%] md:p-[12px]">TÊN SẢN PHẨM</th>            
                  <th className="text-center  w-[15%] md:p-[12px] ">GIÁ (VND)</th>
                  <th className="text-center  w-[17% md:p-[12px] ">BẢO HÀNH</th>
                  <th className="text-center  w-[20%]  md:p-[12px]">CHI TIẾT</th>
                </tr>
              </thead>

              
              <tbody>
                {filteredData.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <tr className='sticky top-0 md:top-[48px] z-10 bg-[#00c37e]'>
                      <td colSpan={5}>
                        <div
                          className="flex items-center justify-between px-2 md:px-3 py-[3px] bg-[#00c37e] text-white text-[16px] font-semibold cursor-pointer shadow-xl rounded-md mb-[1px]"
                          onClick={() => toggleCategory(cat.category)}
                        
                        >
                          <div className="flex items-center gap-1 w-full"> 
                            {/* Phần icon - không co giãn, chỉ chiếm không gian cần thiết */}
                            <ChevronDownIcon
                                className={`w-5 h-7 flex-shrink-0 transform transition-transform duration-300 ${ // Thêm flex-shrink-0
                                    openCategories[cat.category] ? 'rotate-180' : ''
                                }`}
                            />
                            {/* Phần tên danh mục - chiếm phần lớn không gian, giới hạn 90% và có thể truncate */}
                            <span className="flex-grow flex-shrink min-w-0 max-w-[90%] truncate overflow-hidden whitespace-nowrap block">
                                {cat.category}
                            </span>
                        </div>
                        </div>
                      </td>
                    </tr>


                 <AnimatePresence initial={false}>
                    {openCategories[cat.category] && (
                      <motion.tr>
                        <td colSpan={5} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {isLoadingPrices ? <Loading/> : <table className="w-full text-sm md:text-[14px]">
                              <tbody className=''>
                                {cat.products.map((product, idx) => (
                                  <tr
                                    key={product.id}
                                    className={`${
                                      idx !== cat.products.length - 1
                                        ? 'border-b border-gray-300'
                                        : ''
                                    } hover:bg-gray-200 transition-colors duration-200 grid grid-cols-1s p-[12px] gap-y-[12px] md:flex md:p-0`}
                                  >
                                    <div className='flex flex-row justify-between md:hidden'>
                                      <td className=" "><span>#</span>{idx + 1}</td>
                                        {product.price !== '' ? <span className=' text-[#ff0000] font-semibold'>{product.price.toLocaleString('vi-VN')} đ</span> : <span className=' text-red-400 italic font-normal '>{"Cập nhật sau"}</span>}
                                    </div>
                                     <td className=" hidden md:table-cell md:w-[8%] md:p-[12px] md:text-center">{idx + 1}</td>
                                     <td className=" md:w-[40%] md:p-[12px] ">{product.name}</td>
                                     <td className=" font-semibold hidden md:table-cell  md:w-[15%] md:p-[12px] md:text-center">{product.price !== '' ? <span className=' text-[#ff0000] '>{product.price.toLocaleString('vi-VN')}</span> : <span className=' text-red-400 italic font-normal '>{"Cập nhật sau"}</span>} </td>
                                    <td className=" hidden md:table-cell  md:w-[17%] md:p-[12px] text-center">  {product.warranty !== '' ? (product.warranty != 0 ? `${product.warranty} tháng` : <span className=' text-gray-500 italic font-normal '>{"Không bảo hành"}</span>) : <span className=' text-gray-500 italic font-normal '>{"Cập nhật sau"}</span>}  </td>
                                    <td className=" hidden md:table-cell text-green-800  md:w-[20%] md:p-[12px] ">
                                     <div className='w-full md:flex md:justify-center'>
                                       <Button
                                        type="default"
                                        style={{
                                          borderColor: '#00c37e',
                                          color: '#00c37e',
                                        }}
                                        className="border border-[#00c37e] text-[#00c37e] hover:!bg-[#00c37e] hover:!text-white active:!bg-green-900"
                                        onClick={() => navigate(`/san-pham/${product.id}`)}
                                      >
                                        Xem chi tiết
                                      </Button>
                                     </div>
                                    </td>
                                   <div className='flex flex-row justify-between md:hidden'>
                                     <td className=""> Bảo hành: {product.warranty !== '' ? (product.warranty != 0 ? `${product.warranty} tháng` : <span className=' text-gray-500 italic font-normal '>{"Không bảo hành"}</span>) : <span className=' text-gray-500 italic font-normal '>{"Cập nhật sau"}</span>}</td>
                                    <td className=" text-green-800">
                                      <Button
                                        type="default"
                                        style={{
                                          borderColor: '#00c37e',
                                          color: '#00c37e',
                                        }}
                                        className="border border-[#00c37e] text-[#00c37e] hover:!bg-[#00c37e] hover:!text-white active:!bg-green-900"
                                        onClick={() => navigate(`/san-pham/${product.id}`)}
                                      >
                                        Xem chi tiết
                                      </Button>
                                    </td>
                                   </div>
                                  </tr>
                                ))}
                                {cat.products.length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-400">
                                      Không có sản phẩm phù hợp
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>}
                          </motion.div>
                        </td>
                      </motion.tr>
                    )}
                    </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Banner data = {bannerContact}/>
    </div>
  </div>: <ComingSoon/>}
  </>
)
}
