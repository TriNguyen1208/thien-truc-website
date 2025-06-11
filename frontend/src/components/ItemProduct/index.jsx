import GreenButton from "../GreenButton";
function ItemProduct({ product }) {
    return (
        <div className="flex flex-col relative border border-[#E5E7EB] rounded-[8px] w-[324px] h-[620px] bg-white ">
            <div className = "w-[full] h-[322px] p-[8px] bg-[#F3F4F6] rounded-t-[6px]">
                <img
                    src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg"
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-[6px]"
                />
            </div>
            <div className = "flex flex-col gap-y-[12px] w-full  p-[16px]">
                <div >
                    <h2 className = "truncate overflow-hidden whitespace-nowrap text-[20px] text-black ">
                    Đèn LED Panel Thương Mạimmmmmmmmmmmmm mmmmmmmmmmmmmmmmm
                    </h2>
                </div>
                <div className = "line-clamp-3 text-[14px]">Đèn LED tiết kiệm năng lượng cho văn
                    phòng và không gian thương mại với ánh sáng đồng đềummm mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.</div>
                <div className = "flex flex-col gap-y-[4px]">
                    <div >
                        <p className = " truncate overflow-hidden whitespace-nowrap  text-[14px] text-[#374151]">Tiết kiệm năng lượng</p>
                    </div>
                    <div>
                        <p className = " truncate overflow-hidden whitespace-nowrap text-[14px] text-[#374151]">Tuổi thọ cao</p>
                    </div>
                    <div>
                        <p className = " truncate overflow-hidden whitespace-nowrap  text-[14px] text-[#374151]">Không nhấp nháy  nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy</p>
                    </div>
                </div>
            </div>
            <div className = "flex absolute bottom-[24px] justify-center w-full h-[]">
            <GreenButton content="Xem thêm" />
            </div>
        </div>
    );
}
export default ItemProduct;