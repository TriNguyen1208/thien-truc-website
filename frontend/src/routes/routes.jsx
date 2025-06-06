import React from 'react'
import Home from "@/pages/Home"
import Product from '@/pages/Product'
import Project from '@/pages/Project'
import Price from '@/pages/Price'
import News from '@/pages/News'
import Recruitment from '@/pages/Recruitment'
import Contact from '@/pages/Contact'
import AboutUs from '@/pages/AboutUs'
import PageNotFound from '@/pages/PageNotFound'
import DefaultLayout from "@/layouts/DefaultLayout"

export const routes = [
    // {
    //     //Ví dụ về cách thêm route mới.
    //     //Không cần thêm children giống 28tech (Tức là không dùng outlet. Nó bị rối quãi nên là khi thiết kế layout truyền children vào props)
    //     path: "/",
    //     element: <Home />,
    // },
    // {
    //     path: "*",
    //     element: <div>Page Not Found</div>,
    // },


    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/san-pham",
                element: <Product />
            },
             {
                path: "/bang-gia",
                element: <Price />
            },
            {
                path: "/du-an",
                element: <Project />
            },
             {
                path: "/tin-tuc",
                element: <News />
            },
             {
                path: "/tuyen-dung",
                element: <Recruitment />
            },
            {
                path: "/lien-he",
                element: <Contact />
            },
            {
                path: "/ve-chung-toi",
                element: <AboutUs />
            }


        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]
