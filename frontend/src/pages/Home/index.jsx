import useHome from "@/redux/hooks/useHome"
import useAboutUs from "@/redux/hooks/useAboutUs"
import useContact from "@/redux/hooks/useContact"
import useNews from "@/redux/hooks/useNews"
import useProducts from "@/redux/hooks/useProducts"
import useProjects from "@/redux/hooks/useProjects"
import useRecruitment from "@/redux/hooks/useRecruitment"
import ItemProduct   from "../../components/ItemProduct"
//Ví dụ chill chill
export default function Home(){
    const { getAll: getAllHome } = useHome();
    const { getAll: getAllAboutUs } = useAboutUs();
    const { getAll: getAllContact } = useContact();
    const { getAll: getAllNews } = useNews(null);
    const { getId: getIdProducts } = useProducts(17);
    const { getAll: getAllProjects } = useProjects(null);
    const { getAll: getAllRecruitment } = useRecruitment();

    const { data: home, isLoading: isLoadingHome } = getAllHome;
    const { data: aboutus, isLoading: isLoadingAboutUs } = getAllAboutUs;
    const { data: contact, isLoading: isLoadingContact } = getAllContact;
    const { data: news, isLoading: isLoadingNews } = getAllNews;
    const { data: product, isLoading: isLoadingProduct } = getIdProducts;
    const { data: projects, isLoading: isLoadingProjects } = getAllProjects;
    const { data: recruitment, isLoading: isLoadingRecruitment } = getAllRecruitment;

    const isLoading = isLoadingHome || isLoadingAboutUs || isLoadingContact ||
                      isLoadingNews || isLoadingProduct || isLoadingProjects || isLoadingRecruitment;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!home || !aboutus || !contact || !news || !product || !projects || !recruitment) {
        return <p>Dữ liệu chưa sẵn sàng hoặc có lỗi.</p>;
    }

    return (
        <>
          <div className="flex flex-row  gap-x-[16px]">
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
          </div>
        </>
    )
}