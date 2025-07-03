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
          <p className="text-gray-700 mb-4 border-t border-b border-gray-300 py-4">{product.description}</p>
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
              {product.product_specifications &&
                // eslint-disable-next-line no-unused-vars
                Object.entries(product.product_specifications).map(([key, value], idx) => (
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
