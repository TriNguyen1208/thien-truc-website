import useHome from "@/redux/hooks/useHome"
import useAboutUs from "@/redux/hooks/useAboutUs"
import useContact from "@/redux/hooks/useContact"
import useNews from "@/redux/hooks/useNews"
import useProducts from "@/redux/hooks/useProducts"
import useProjects from "@/redux/hooks/useProjects"
import useRecruitment from "@/redux/hooks/useRecruitment"
import Card from "../../components/Card"
//Ví dụ chill chill
export default function Home(){
    const { getAll: getAllHome } = useHome();
    const { getAll: getAllAboutUs } = useAboutUs();
    const { getAll: getAllContact } = useContact();
    const { getAll: getAllNews } = useNews(null);
    const { getId: getIdProducts } = useProducts(2);
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
        <div className="grid grid-cols-2 gap-[32px]">
              {
             aboutus.company_service.map((card)=>{
                return (
                    <div className="w-[560px]">
                        <Card card={card} key={card.id} />
                    </div>

                )
            }
            )
           } 
        </div>
              
        </>
    )
}