function Card(){
    return (
        <div className="group flex flex-col gap-[16px] rounded-[8px] p-[32px] w-[560px] h-[360px] hover:shadow-lg transform hover:scale-105  transition-all duration-300 ease-in-out">

            <div className="flex flex-row gap-[16px] items-center ">
                <div>ICON</div>
                <div>
                    <h2 className="text-[24px] text-(--dark-blue) ">
                        Bảo Trì & Sửa Chữa
                    </h2>
                </div>
            </div>
            <div>

                <p className="text-[15px] text-[#166534] leading-loose transition-all duration-300 ease-in-out">
                    Chúng tôi cung cấp dịch vụ bảo trì định kỳ và sửa chữa kịp thời, giúp
                            thiết bị của bạn luôn hoạt động ổn định và kéo dài tuổi thọ.
                </p>
            </div>
            <div>
                    <ul className=" p-0 flex flex-col gap-[12px]  ">
                        <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]"><div>
                            icon
                            </div>
                            <p className="">
                                Bảo trì định kỳ hệ thống màn hình LED, TV
                            </p>
                        </li>
                        <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]"><div>
                            icon
                            </div>
                            <p className="">
                                Sửa chữa kịp thời các sự cố kỹ thuật
                            </p>
                        </li>
                        <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]"><div>
                            icon
                            </div>
                            <p className="">
                                Tư vấn và hỗ trợ kỹ thuật 24/7
                            </p>
                        </li>
                        <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]"><div>
                            icon
                            </div>
                            <p className="">
                                Cung cấp linh kiện thay thế chính hãng
                            </p>
                        </li>
                        <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]"><div>
                            icon
                            </div>
                            <p className="">
                                Đội ngũ kỹ thuật viên chuyên nghiệp, giàu kinh nghiệm
                            </p>
                        </li>
                      
                    </ul>
            </div>
        </div>
    )
}
export default Card;