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