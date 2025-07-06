import React from 'react'

const ItemTable = ({data}) => {
    return (
        <>
            {data.map((item, index) => (
                <td key={index} className='px-4 py-3 align-middle whitespace-nowrap'>
                    {item.type === "text" && <span>{item.content}</span>}
                    {item.type === "img" && (
                        <img src={item.path} className='w-12 h-8 object-cover rounded'/>
                    )}
                    {item.type === "checkbox" && (
                        <input
                            type='checkbox'
                            className='w-4 h-4 accent-green-600 text-white'
                            checked={item.checked}
                            onChange={item.onChange}
                        />
                    )}
                    {item.type === "component" && item.component}
                    {item.type === "array-components" && (
                        <div className="flex gap-2">
                        {item.components.map((comp, i) => (
                            <React.Fragment key={i}>
                                {comp.component}
                            </React.Fragment>
                        ))}
                        </div>
                    )}
                </td>
            ))}
        </>
        
    )
}

export default ItemTable