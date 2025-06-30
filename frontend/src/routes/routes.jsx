import React from 'react'
import Home from "@/pages/Home"
// import Product from '../pages/Product'
import Product from '@/pages/Product'
import Project from '@/pages/Project'
import Price from '@/pages/Price'
import News from '@/pages/News'
import Recruitment from '@/pages/Recruitment'
import Contact from '@/pages/Contact'
import AboutUs from '@/pages/AboutUs'
import PageNotFound from '@/pages/PageNotFound'
import DefaultLayout from "@/layouts/DefaultLayout"
import ExampleComponents from '@/pages/ExampleComponents'
import ProjectDetail from '@/pages/ProjectDetail'
import NewsDetail from '../pages/NewsDetail'
import ProductDetail from '../pages/ProductDetail'
export const routes = [
    {
        path: "/",
        element: <DefaultLayout />,
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
                path: "/san-pham/:id",
                element: <ProductDetail />
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
                path: "/du-an/:id",
                element: <ProjectDetail />
            },
             {
                path: "/tin-tuc",
                element: <News />
            },
            {
                path: "/tin-tuc/:id",
                element: <NewsDetail />
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
            },
            {
                path: "/test-components",
                element: <ExampleComponents/>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]
