// src/pages/Price/components/PriceTable.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import PriceRow from './PriceRow';

export default function PriceTable({ productPrices, isLoading, navigate, query, filter }) {
    const [openCategories, setOpenCategories] = useState({});
    // Group products by category
    const groupedData = useMemo(() => {
        return Object.entries(productPrices)
            .map(([key, value]) => ({
                category: key,
                products: value
            }))
    }, [productPrices]);

    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    useEffect(() => {
        if (groupedData.length > 0) {
            const initialOpen = groupedData.reduce((acc, cat) => {
                acc[cat.category] = true; // mặc định mở
                return acc;
            }, {});
            setOpenCategories(initialOpen);
        }
    }, [groupedData]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-y-auto max-h-[600px] overflow-x-hidden">
            <table className="text-base table-fixed w-full">
                <thead className="hidden md:table-header-group sticky top-0 z-20 bg-[#00A651] text-white shadow-md">
                    <tr className="w-full">
                        <th className="text-center w-[8%] md:p-[12px]">STT</th>
                        <th className="text-left w-[40%] md:p-[12px]">TÊN SẢN PHẨM</th>
                        <th className="text-center w-[15%] md:p-[12px]">GIÁ (VND)</th>
                        <th className="text-center w-[17%] md:p-[12px]">BẢO HÀNH</th>
                        <th className="text-center w-[20%] md:p-[12px]">CHI TIẾT</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map((cat) => (
                        <React.Fragment key={cat.category}>
                            <tr className="sticky top-0 md:top-[48px] z-10 bg-[#00c37e]">
                                <td colSpan={5}>
                                    <div
                                        className="flex items-center justify-between px-2 md:px-3 py-[3px] bg-[#00c37e] text-white text-[16px] font-semibold cursor-pointer rounded-md mb-[1px]"
                                        onClick={() => toggleCategory(cat.category)}
                                    >
                                        <div className="flex items-center gap-1 w-full">
                                            <ChevronDownIcon
                                                className={`w-5 h-7 flex-shrink-0 transform transition-transform duration-300 ${openCategories[cat.category] ? '' : 'rotate-[-90deg]'
                                                // className={`w-5 h-7 flex-shrink-0 transform transition-transform duration-300"
                                                    }`}
                                            />
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
                                                <table className="w-full text-sm md:text-[14px]">
                                                    <tbody>
                                                        {cat.products.map((product, idx) => (
                                                            <PriceRow
                                                                key={product.id}
                                                                product={product}
                                                                index={idx}
                                                                isLast={idx === cat.products.length - 1}
                                                                navigate={navigate}
                                                            />
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
                                            </motion.div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </React.Fragment>
                    ))}
                    {Object.keys(groupedData).length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-400">
                                Không tìm thấy sản phẩm nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}