// src/pages/Price/index.jsx  
import React, { useState, useEffect } from 'react'
import Banner from '@/components/Banner'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from 'antd'
import ProductDetailModal from '../../components/ProductDetailModal'
import { motion, AnimatePresence } from 'framer-motion';
import useProducts from "@/redux/hooks/useproducts";
import Loading from '@/components/Loading'
import '@/styles/custom.css'

export default function PricePage() {
  
        const [querySearch, setQuerySearch] = useState("");
        const [filterSearch, setFilterSearch] = useState("Tất cả");
        const [selectedProduct, setSelectedProduct] = useState(null)
        const [search, setSearch] = useState('')
        const [selectedCategory, setSelectedCategory] = useState('Tất cả')
        const [openCategories, setOpenCategories] = useState({})
        const { data: pricePage, isLoading: isLoadingPage } = useProducts.getPricePage()
        const { data: productCategories, isLoading: isLoadingCategories } = useProducts.product_categories.getAll() 
        const { data: productPrices = [], isLoading: isLoadingPrices } = useProducts.product_prices.getAll();
        const { data: products = [], isLoading: isLoadingProducts } = useProducts.products.getList();
        console.log("productPrices", productPrices)

        if (isLoadingPage || isLoadingCategories || isLoadingPrices ) {
          return <Loading />
        }

        const handleButton = (category, query) => {
          setQuery(query);
          setCategory(category);
        };
        const handleEnter = (id) => {
          navigate(`/tin-tuc/${id}`);
        };
        const handleSearchSuggestion = (query, filter) => {
          return useProducts.getSearchSuggestions(query, filter);
        };

        const categories = productCategories.map((category) => {
            return (category.name)
        }) 

        categories.unshift("Tất cả sản phẩm")
        const handleSearch = (category, query) => {
            setIdCategory(categories.indexOf(category))
            setQuerySearch(query)
            setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }
        
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

        const toggleCategory = (category) => {
          setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
          }))
        }

        const bannerHead = {
            title: pricePage?.banner_title,
            description: pricePage?.banner_description,
            hasButton: false,
            hasSearch: true,
            colorBackground: 'var(--gradient-banner)',
            colorText: '#ffffff',
            categories : categories,
            contentButton: null,
            contentPlaceholder : 'Tìm kiếm sản phẩm...',
            handleButton : handleSearch,
            handleSearchSuggestion: handleSearchSuggestion
        }

  return (
  <>
    <Banner data={bannerHead} />

    <div className="bg-[#F0FDF4] py-20 px-6 md:px-[80px] shadow-md rounded-xl">
     
      <div className="bg-white w-full max-w-[1200px] h-[700px] mx-auto rounded-xl shadow-2xl overflow-hidden">
        <div className="text-center font-bold text-3xl py-7 bg-white">
          BẢNG GIÁ SẢN PHẨM
        </div>

        <div className="overflow-y-auto max-h-[600px] px-7 md:px-10">
          <table className="min-w-full text-base">
            <thead className="sticky top-0 z-20 bg-[#00A651] text-white shadow-md">
              <tr>
                <th className="px-4 py-[15px] text-left rounded-tl-lg rounded-bl-md  w-[5%]">STT</th>
                <th className="pl-14 pr-4 py-4 text-left  w-[45%]">TÊN SẢN PHẨM</th>             
                <th className="px-4 py-4 text-left  w-[15%]">GIÁ (VND)</th>
                <th className="px-4 py-4 text-center  w-[15%]">BẢO HÀNH</th>
                <th className="px-4 py-4 text-center  w-[15%] rounded-tr-lg rounded-br-md">CHI TIẾT</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((cat) => (
                <React.Fragment key={cat.category}>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="flex items-center justify-between px-2 md:px-3 py-[3px] bg-[#00c37e] text-white text-[21px] font-semibold cursor-pointer shadow-xl rounded-md mb-[1px]"
                        onClick={() => toggleCategory(cat.category)}
                      >
                        <div className="flex items-center gap-1">
                          <ChevronDownIcon
                            className={`w-9 h-10 transform transition-transform duration-300 ${
                              openCategories[cat.category] ? 'rotate-180' : ''
                            }`}
                          />
                          {cat.category}
                        </div>
                      </div>
                    </td>
                  </tr>

                  <AnimatePresence initial={false}>
                    {openCategories[cat.category] && (
                      <motion.tr
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <td colSpan={5} className="p-0">
                          <table className="w-full text-sm md:text-[14px]">
                            <tbody>
                              {cat.products.map((product, idx) => (
                                <tr
                                  key={product.id}
                                  className={`${
                                    idx !== cat.products.length - 1
                                      ? 'border-b border-gray-300'
                                      : ''
                                  } hover:bg-gray-200 transition-colors duration-200`}
                                >
                                  <td className="px-4 py-5 w-[5%]">{idx + 1}</td>
                                  <td className="pl-13 py-5 w-[36%]">{product.name}</td>
                                  <td className="px-2 py-5 font-semibold text-center text-green-800 w-[31%]">
                                    {product.price.toLocaleString('vi-VN')}
                                  </td>
                                  <td className="px-6 py-2 w-[15%]">{product.warranty}</td>
                                  <td className="px-4 py-2 w-[15%] text-green-800">
                                    <Button
                                      type="default"
                                      style={{
                                        borderColor: '#00c37e',
                                        color: '#00c37e',
                                      }}
                                      className="border border-[#00c37e] text-[#00c37e] hover:!bg-[#00c37e] hover:!text-white active:!bg-green-900"
                                      onClick={() => setSelectedProduct(product)}
                                    >
                                      Xem chi tiết
                                    </Button>
                                  </td>
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
                          </table>
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
      <div className="text-center pt-30">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Sẵn Sàng Hợp Tác Với Chúng Tôi?
        </h2>
        <p className="text-gray-700 mb-5">
          Hãy liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn.
        </p>
        <div className="pt-3">
        <a href="/lien-he">
          <button className="bg-white text-[#008080] px-6 py-3 rounded-md shadow-md hover:bg-[#00c37e] hover:text-white transition-all duration-300">
            Liên Hệ Ngay →
          </button>
        </a>
        </div>
      </div>
    </div>
   {selectedProduct && (<ProductDetailModal product={flatProducts.find(p => p.id === selectedProduct.id) || selectedProduct} onClose={() => setSelectedProduct(null)}/>)}
  </>
)
}
