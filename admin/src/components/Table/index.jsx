import React from 'react'
import ItemTable from '../ItemTable';

const Table = ({ columns, data, isSetting }) => {
    return (
        <table className="table-auto w-full border-collapse">
            {!isSetting &&
                <thead>
                    <tr className="text-left bg-gray-50">
                        {columns.map((title, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
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
                        <ItemTable data={item} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default Table