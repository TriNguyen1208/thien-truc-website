import React from 'react'

const ItemTable = ({ data }) => {
    return (
        <>
            {data.map((item, index) => (
                <td
                    key={index}
                    className="px-4 py-3 align-middle whitespace-nowrap overflow-hidden truncate max-w-[350px] relative"
                    title={item.type === "text" ? item.content : undefined}
                >
                    {item.type === "text" && <span>{item.content}</span>}

                    {item.type === "img" && (
                        <img
                            src={item.path}
                            className="w-12 h-8 object-cover rounded"
                        />
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