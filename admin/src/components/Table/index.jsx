import React from 'react'
import ItemTable from '../ItemTable';

const Table = ({columns, data}) => {
    return (
        <table className='table-auto w-full border-collapse'>
            <thead>
                <tr className='text-left hover:bg-gray-50'>
                    {columns.map((item, index) => (
                        <th key={index} className='px-4 py-3 font-semibold text-gray-700'>
                            {item.type === "checkbox" ? (
                                <div className='flex gap-3 items-center'>
                                    <input
                                        type='checkbox'
                                        className='w-4 h-4 accent-green-600 text-white'
                                        checked={item.checked}
                                        onChange={item.onChange}
                                    />
                                    <span>{item.content}</span>
                                </div>
                            ) : (<span>{item.content}</span>)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>(
                    <tr key={index} className='border-b hover:bg-gray-50'>
                        <ItemTable data={item}/>
                    </tr>
                ))}
            </tbody>
        </table>   
    )
}

export default Table