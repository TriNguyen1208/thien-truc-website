import { Pagination} from 'antd';

export default function Paging({data, onPageChange, currentPage }) {
    const {numberPagination} = data || {};
    const handleChange = (page) => {
        if (onPageChange) onPageChange(page); 
    }
    return (
        <>
            <style>{`
          .custom-pagination .ant-pagination-item-active {
            background-color: #52c41a !important;
            border-color: #52c41a !important;
            }
            
            .custom-pagination .ant-pagination-item-active a {
                color: #fff !important;
                }
                
                .custom-pagination .ant-pagination-item:hover {
                    border-color: #52c41a !important;
                    }
                        `}</style>
            <br />

            <Pagination 
                className="custom-pagination p-10"
                current={currentPage}
                align = 'center'
                pageSize={1}
                total = {numberPagination} 
                showSizeChanger={false} 
                onChange={handleChange}
            />
        </>
    );
}

/*
import Paging from "../../components/Paging";
import { useState } from "react";
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        console.log('Trang hiện tại:', page);
        setCurrentPage(page);
    };

    const data = {
        numberPagination: 10, // = 10 item 
    };

    return (
        <div>
            <Paging data={data} onPageChange={handlePageChange} />
            <p>Trang đang xem: {currentPage}</p>
        </div>
    );
}
*/