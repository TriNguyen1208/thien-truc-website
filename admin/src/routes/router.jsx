import DefaultLayout from "@/layouts/DefaultLayout"
import AboutUsPageContent from "../pages/AboutUsPageContent"
import Company from "../pages/Company"
import Contact from "../pages/Contact"
import ContactPageContent from "../pages/ContactPageContent"
import HomePageContent from "../pages/HomePageContent"
import Manager from "../pages/Manager"
import News from "../pages/News"
import NewsCategories from "../pages/NewsCategories"
import NewsPageContent from "../pages/NewsPageContent"
import PageNotFound from "@/pages/PageNotFound"
import PricePageContent from "../pages/PricePageContent"
import Product from "../pages/Product"
import ProductCategories from "../pages/ProductCategories"
import ProductPageContent from "../pages/ProductPageContent"
import Project from "../pages/Project"
import ProjectCategories from "../pages/ProjectCategories"
import ProjectPageContent from "../pages/ProjectPageContent"
import RecruitmentPageContent from "../pages/RecruitmentPageContent"
import ControlPanel from "../pages/ControlPanel"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import AddNews from "../pages/AddNews"
import AddProject from "../pages/AddProject"
import EditNews from "../pages/EditNews"
import EditProject from "../pages/EditProject"
import { createBrowserRouter } from "react-router-dom";
import AuthGate from "../components/AuthGate"
export const router = createBrowserRouter([
    {
        path: "/",
        element:
        <AuthGate>
            <ProtectedRoute>
                <DefaultLayout/>
            </ProtectedRoute>
        </AuthGate>,
        children: [
            {
                path: "/",
                element: <ControlPanel />
            },
            {
                path: "/quan-ly-manager",
                element: <Manager />
            },
            {
                path: "/doi-ngu-lien-lac",
                element: <Contact />
            },
            {
                path: "/thong-tin-cong-ty",
                element: <Company />
            },
            {
                path: "/quan-ly-san-pham",
                element: <Product />
            },
            {
                path: "/quan-ly-loai-san-pham",
                element: <ProductCategories />
            },
            {
                path: "/quan-ly-tin-tuc",
                element: <News />
            },
            {
                path: "/quan-ly-loai-tin-tuc",
                element: <NewsCategories />
            },
            {
                path: "/quan-ly-du-an",
                element: <Project />
            },
            {
                path: "/quan-ly-khu-vuc-du-an",
                element: <ProjectCategories />
            },
            {
                path: "/noi-dung-trang/trang-chu",
                element: <HomePageContent />
            },
            {
                path: "/noi-dung-trang/san-pham",
                element: <ProductPageContent />
            },
            {
                path: "/noi-dung-trang/bang-gia",
                element: <PricePageContent />
            },
            {
                path: "/noi-dung-trang/du-an",
                element: <ProjectPageContent />
            },
            {
                path: "/noi-dung-trang/tin-tuc",
                element: <NewsPageContent />
            },
            {
                path: "/noi-dung-trang/tuyen-dung",
                element: <RecruitmentPageContent />
            },
            {
                path: "/noi-dung-trang/lien-he",
                element: <ContactPageContent />
            },
            {
                path: "/noi-dung-trang/ve-chung-toi",
                element: <AboutUsPageContent />
            },
            {
                path: "/quan-ly-tin-tuc/them-tin-tuc",
                element: <AddNews/>
            },
            {
                path: "/quan-ly-du-an/them-du-an",
                element: <AddProject/>
            },
            {
                path: "/quan-ly-tin-tuc/chinh-sua-tin-tuc/:id",
                element: <EditNews/>
            },
            {
                path: "/quan-ly-du-an/chinh-sua-du-an/:id",
                element: <EditProject/>
            }
        ]
    },
    {
        path: "/dang-nhap",
        element: <Login/>
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
])