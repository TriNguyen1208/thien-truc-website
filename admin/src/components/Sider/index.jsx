import React from 'react'
import { NavLink } from 'react-router-dom'
const Sider = () => {
    const siderItem = [
        { label: 'Bảng điều khiển', to: '/' },
        { label: 'Quản lý manager', to: '/quan-ly-manager' },
        { label: 'Đội ngũ liên lạc', to: '/doi-ngu-lien-lac' }
    ];
    return (
        <>
            {
                siderItem.map((item, index) => (
                    <div key={index}>
                        <NavLink to={item.to}>{item.label}</NavLink>
                    </div>
                ))
            }
        </>
    )
}

export default Sider