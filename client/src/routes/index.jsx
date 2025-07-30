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
import ProjectDetail from '@/pages/ProjectDetail'
import NewsDetail from '@/pages/NewsDetail'
import ProductDetail from '@/pages/ProductDetail'
import { createBrowserRouter } from "react-router-dom";
import Loading from '@/components/Loading'
import { LoadingAboutUs, LoadingContact, LoadingHome, LoadingNews, LoadingPrice, LoadingProduct, LoadingProject, LoadingRecruitment, LoadingProjectDetail, LoadingProductDetail, LoadingNewsDetail } from '../components/LoadingPage'
export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        pendingElement: <Loading/>,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: LoadingHome,
            },
            {
                path: "/san-pham",
                element: <Product />,
                loader: LoadingProduct
            },
            {
                path: "/san-pham/:id",
                element: <ProductDetail />,
                loader: LoadingProductDetail
            },
             {
                path: "/bang-gia",
                element: <Price />,
                loader: LoadingPrice
            },
            {
                path: "/du-an",
                element: <Project />,
                loader: LoadingProject
            },
             {
                path: "/du-an/:id",
                element: <ProjectDetail />,
                loader: LoadingProjectDetail
            },
             {
                path: "/tin-tuc",
                element: <News />,
                loader: LoadingNews
            },
            {
                path: "/tin-tuc/:id",
                element: <NewsDetail />,
                loader: LoadingNewsDetail
            },
             {
                path: "/tuyen-dung",
                element: <Recruitment />,
                loader: LoadingRecruitment
            },
            {
                path: "/lien-he",
                element: <Contact />,
                loader: LoadingContact
            },
            {
                path: "/ve-chung-toi",
                element: <AboutUs />,
                loader: LoadingAboutUs,
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
])
