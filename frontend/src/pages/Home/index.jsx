import useHome from "@/redux/hooks/useHome"
import useAboutUs from "@/redux/hooks/useAboutUs"
import useContact from "@/redux/hooks/useContact"
import useNews from "@/redux/hooks/useNews"
import useProducts from "@/redux/hooks/useProducts"
import useProjects from "@/redux/hooks/useProjects"
import useRecruitment from "@/redux/hooks/useRecruitment"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useContext } from "react"

=======
import Card from "../../components/Card"
>>>>>>> origin/feature/card
//Ví dụ chill chill
export default function Home(){
=======
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
>>>>>>> origin/feature/greenButton-ItemProduct

    // const { data: home, isLoading: isLoadingHome } = useHome.getAll();
    // const { data: aboutus, isLoading: isLoadingAboutUs } = useAboutUs.getAll();
    // const { data: contact, isLoading: isLoadingContact } = useContact.getAll();
    // const { data: news, isLoading: isLoadingNews } = useNews.getAll();
    // const {data: product, isLoading: isLoadingProduct} = useProducts.getId(2);
    // const { data: projects, isLoading: isLoadingProjects } = useProjects.getAll();
    // const { data: recruitment, isLoading: isLoadingRecruitment } = useRecruitment.getAll();

    // const isLoading = isLoadingHome || isLoadingAboutUs || isLoadingContact ||
    //                   isLoadingNews || isLoadingProduct || isLoadingProjects || isLoadingRecruitment;
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    // if (!home || !aboutus || !contact || !news || !product || !projects || !recruitment) {
    //     return <p>Dữ liệu chưa sẵn sàng hoặc có lỗi.</p>;
    // }
    // return (
    //     <>
    //         <h1>Welcome to Home Page</h1>
    //         <p>{home.home_page[0].banner_title}</p>
    //         <p>{aboutus.about_us_page[0].banner_title}</p>
    //         <p>{contact.contact_page[0].banner_title}</p>
    //         <p>{news.news_page[0].banner_title}</p>
    //         <p>{product.product[0].name}</p>
    //         <p>{projects.projects_page[0].banner_title}</p>
    //         <p>{recruitment.recruitment_page[0].banner_title}</p>
    //     </>
    // )
    const {data, isLoading} = useRecruitment.getRecruitmentPage();
    if(isLoading){
        return <>Is Loading...</>
    }
<<<<<<< HEAD
    if (!data) {
        return <>No data available</>; // hoặc null
      }
    return(
        <>
            {data.recruitment_page[0].culture_content}
=======
    if (!home || !aboutus || !contact || !news || !product || !projects || !recruitment) {
        return <p>Dữ liệu chưa sẵn sàng hoặc có lỗi.</p>;
    }

    return (
        <>
<<<<<<< HEAD
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
              
>>>>>>> origin/feature/card
=======
import PostCategory from "../../components/PostCategory"
//Ví dụ chill chill
export default function Home(){

    const categories = [
        'Tất cả',
        'Miền Bắc',
        'Miền Trung',
        'Miền Nam',
        'Miền Tây',
    ]
    return (
        <>
            <PostCategory categories= {categories} />
>>>>>>> origin/feature/components/postCategory
=======
          <div className="flex flex-row  gap-x-[16px]">
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
            <ItemProduct product={product.product[0]} />
          </div>
>>>>>>> origin/feature/greenButton-ItemProduct
        </>
    )
}