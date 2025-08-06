import React from 'react'
import ItemTable from '../ItemTable';

const Table = ({ 
    columns, 
    data, 
    isSetting,
    width = null
}) => {
    return (
        <div className="max-h-[400px] overflow-y-auto scroll-table">
        <table className="border-collapse w-full">
            {!isSetting &&
                <thead>
                    <tr className="text-left bg-gray-50">
                        {columns.map((title, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 align-middle whitespace-pre-line break-words overflow-hidden relative sticky top-0 bg-gray-50 z-10"
                                style={{ width: width ? width[index] : 'auto' }}
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
            }
            <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 text-left"
                    >
                        <ItemTable data={item} width={width}/>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};


export default Table