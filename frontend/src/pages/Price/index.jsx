// src/components/ProductDetailModal.jsx
import React from 'react'
import { useEffect } from 'react'

export default function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    if (product) {
      document.body.classList.add('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [product])
  if (!product) return null
  
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] bg-opacity-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full flex flex-col md:flex-row gap-6 border border-gray-200"
        onClick={(e) => e.stopPropagation()} // ngăn click bên trong đóng modal
      >
        {/* Bên trái */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
          <p className="text-red-600 font-bold text-[30px] mb-4">
            Giá: {product.price.toLocaleString('vi-VN')} VND
          </p>
          <p className="text-gray-700 mb-4 border-t border-b border-gray-300 py-4">{product.descriptionLong || product.description}</p>
          <ul className="text-sm text-gray-600 space-y-2 mt-4">
            <li>🚚 Hỗ trợ vận chuyển toàn quốc</li>
            <li>🛡️ Bảo hành chính hãng {product.warranty}</li>
          </ul>
        </div>

        {/* Bên phải */}
        <div className="flex-1 border border-gray-200 px-6 py-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-[4px] h-6 bg-green-800 mr-2" />
            <h3 className="text-green-800 font-bold text-lg">Mô tả</h3>
          </div>
          <table className="w-full text-sm text-gray-700">
            <tbody>
              {product.details &&
                Object.entries(product.details).map(([key, value], idx) => (
                  <tr key={key} className="idx odd:bg-gray-50 even:bg-white">
                    <td className="py-2 font-medium w-1/3">{key}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// src/pages/Price/index.jsx  
import React, { useState } from 'react'
import Banner from '@/components/Banner'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from 'antd'
import ProductDetailModal from '../../components/ProductDetailModal'
import { motion, AnimatePresence } from 'framer-motion';
import useProducts from "@/redux/hooks/useproducts";
import '@/styles/custom.css'

const bannerData = {
  title: 'BẢNG GIÁ SẢN PHẨM',
  description: 'Giá cả minh bạch, dịch vụ chất lượng cao, cam kết uy tín',
  hasButton: false,
  hasSearch: false,
  colorBackground: 'var(--gradient-banner)',
  colorText: '#ffffff',
  categories: null,
  contentButton: null,
  contentPlaceholder: null,
}

export default function PricePage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [openCategories, setOpenCategories] = useState({})

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const filteredData = mockData
    .filter(
      (cat) =>
        selectedCategory === 'Tất cả' || cat.category === selectedCategory
    )
    .map((cat) => ({
      ...cat,
      products: cat.products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))

  return (
  <>
    <Banner data={bannerData} />

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
   {selectedProduct && (<ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>)}
  </>
)
}
