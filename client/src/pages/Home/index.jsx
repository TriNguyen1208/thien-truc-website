import { Helmet } from "react-helmet";
import useHome from "@/hooks/useHome";
import ComingSoon from '@/pages/ComingSoon';
import Loading from "@/components/Loading";
import HeroBanner from "./components/HeroBanner";
import FeaturedNews from "./components/FeaturedNews";
import AboutSection from "./components/AboutSection";
import FeaturedProjects from "./components/FeaturedProjects";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleProducts from "./components/SaleProducts";
import useProducts from "@/hooks/useProducts";

// Tách SEO
const PageSEO = ({ seoData }) => (
    <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoData.meta.title} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:url" content={seoData.url} />
        <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Thiên Trúc",
                url: seoData.url,
                logo: seoData.image,
                sameAs: [seoData.meta.urlFacebook]
            })}
        </script>
    </Helmet>
);

export default function Home() {
    const { data: allData, isLoading: loadingAll } = useHome.getAll();
    const {data: productPage, isLoading: isLoadingProductPage} = useProducts.getProductPage();
    const SEO = {
        title: "Trang chủ",
        description: "Trang chủ của công ty Thiên Trúc, nơi cung cấp các giải pháp chiếu sáng LED cao cấp.",
        keywords: "Thiên Trúc, chiếu sáng LED, giải pháp chiếu sáng, sản phẩm LED, dự án tiêu biểu",
        image: "../../assets/images/logo.png",
        url: "https://thientruc.vn",
        meta: {
            title: "Công ty Thiên Trúc",
            urlFacebook: "https://www.facebook.com/ctycpcnthientruc"
        }
    };

    if (loadingAll || isLoadingProductPage)
        return <Loading />;

    const homePageData = allData.home_page;
    const highlightStatsAboutUsData = allData.highlight_stats_about_us;

    return (
        <>
            <PageSEO seoData={SEO} />

            <HeroBanner
                images={homePageData.banner_images}
                switchTime={homePageData.banner_switch_time}
            />
           
            {homePageData.is_visible ? (
                <main>
                    <FeaturedNews />
                    {productPage?.on_sale && <SaleProducts/>}
                    <FeaturedProjects />
                    <FeaturedProducts />
                    <AboutSection
                        content={homePageData.aboutus_content}
                        imageUrl={homePageData.aboutus_img}
                        stats={highlightStatsAboutUsData}
                    />
                </main>
            ) : <ComingSoon />}
        </>
    )
};