import { NavLink } from "react-router-dom"
export default function Header(){
    return(
        <>
            <div>
                <ul className="flex space-x-4 list-none">
                    <li>
                        <NavLink to = "/">
                            Trang chủ
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to = "/san-pham">
                            Sản phẩm
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to = "/bang-gia">
                            Bảng giá
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to = "/tin-tuc">
                            Tin tức
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to = "/tuyen-dung">
                            Tuyển dụng
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to = "/lien-he">
                            Liên hệ
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}