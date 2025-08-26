import React from 'react'
import LazyLoad from '@/components/LazyLoad';
const ItemTable = ({ data, width }) => {
    return (
        <>
            {(data || []).map((item, index) => (
                <td
                    key={index}
                    className="px-4 py-3 align-middle whitespace-pre-line break-words overflow-hidden relative max-w-[200px]"
                    title={item.type === "text" ? item.content : undefined}
                    style={{ width: width ? width[index] : 'auto' }}
                >
                    {item.type === "text"  &&   <span className="line-clamp-2 break-words whitespace-pre-line"> {/* 👈 hiển thị tối đa 3 dòng */}
                                                    {item.content}
                                                </span>}

                    {item.type === "img" && (
                        <LazyLoad
                            height={200}
                            offset={100}
                            throttle={100}
                            once
                            placeholder={
                                <div className="bg-gray-200 w-full h-full" />
                            }
                            style={{width: '48px', height: '32px'}}
                        >
                            <img
                                src={item.path}
                                className="w-12 h-8 object-cover rounded"
                            />
                        </LazyLoad>
                    )}

                    {item.type === "checkbox" && (
                        <div className="flex gap-3 items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-green-600"
                                checked={item.checked}
                                onChange={item.onChange}
                            />
                            {item?.content && (
                                <span
                                    className="truncate max-w-[150px]"
                                    title={item.content}
                                >
                                    {item.content}
                                </span>
                            )}
                        </div>
                    )}

                    {item.type === "component" && item.component}

                    {item.type === "array-components" && (
                        <div className="flex gap-2 flex-wrap">
                            {item.components.map((comp, i) => (
                                <React.Fragment key={i}>
                                    {comp}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </td>
            ))}
        </>
    );
};


export default ItemTable