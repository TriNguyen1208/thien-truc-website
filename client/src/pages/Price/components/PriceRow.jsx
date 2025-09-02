// src/pages/Price/components/PriceRow.jsx
import { Button } from 'antd';

export default function PriceRow({ product, index, isLast, navigate }) {
    const formatPrice = (price) => {
        if (!price || price === '') {
            return <span className="text-red-400 italic font-normal">Cập nhật sau</span>;
        }
        return <span className="text-[#ff0000]">{Number(price).toLocaleString('vi-VN')} đ</span>;
    };

    const formatWarranty = (warranty) => {
        if (!warranty && warranty !== 0) {
            return <span className="text-gray-500 italic font-normal">Cập nhật sau</span>;
        }
        if (warranty === 0) {
            return <span className="text-gray-500 italic font-normal">Không bảo hành</span>;
        }
        return `${warranty} tháng`;
    };

    return (
        <tr
            className={`${
                isLast ? '' : 'border-b border-gray-300'
            } hover:bg-gray-200 transition-colors duration-200 grid grid-cols-1s p-[12px] gap-y-[12px] md:flex md:p-0`}
        >
            {/* Mobile View */}
            <td className="md:hidden" colSpan={5}>
                <div className="flex flex-row justify-between">
                    <span>
                        <span>#</span> {index + 1}
                    </span>
                    {formatPrice(product.price)}
                </div>
            </td>
            <td className="hidden md:table-cell md:w-[8%] md:p-[12px] md:text-center">{index + 1}</td>
            <td className="md:w-[40%] md:p-[12px]">{product.name}</td>
            <td className="font-semibold hidden md:table-cell md:w-[15%] md:p-[12px] md:text-center">
                {formatPrice(product.price)}
            </td>
            <td className="hidden md:table-cell md:w-[17%] md:p-[12px] text-center">
                {formatWarranty(product.warranty)}
            </td>
            <td className="hidden md:table-cell text-green-800 md:w-[20%] md:p-[12px]">
                <div className="w-full md:flex md:justify-center">
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
            {/* Mobile View */}
            <td className="md:hidden" colSpan={5}>
                <div className="flex flex-row justify-between">
                    <span>Bảo hành: {formatWarranty(product.warranty)}</span>
                    <span className="text-green-800">
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
                    </span>
                </div>
            </td>
        </tr>
    );
}