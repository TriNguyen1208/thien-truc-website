import React from 'react'
import Home from "@/pages/Home"
export const routes = [
    {
        //Ví dụ về cách thêm route mới.
        //Không cần thêm children giống 28tech (Tức là không dùng outlet. Nó bị rối quãi nên là khi thiết kế layout truyền children vào props)
        path: "/",
        element: <Home />,
    },
    {
        path: "*",
        element: <div>Page Not Found</div>,
    }
]
