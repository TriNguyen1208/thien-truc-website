import RoutesElement from '@/routes'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import useHome from '@/hooks/useHome'
import useContact from '@/hooks/useContact'
import useAboutUs from '@/hooks/useAboutUs'
import useNews from '@/hooks/useNews'
import useProducts from '@/hooks/useProducts'
import useProjects from '@/hooks/useProjects'
import useRecruitment from '@/hooks/useRecruitment'
import Loading from '@/components/Loading'

function LoadingProduct({category}) {
  const {isLoading: isLoadingProductByCategory} = useProducts.products.getList("", (category|| { name:''}).name, false, 1, 4)
  if(isLoadingProductByCategory)
  {
      return(<Loading />)
  }
  return null;
}
function LoadingProductContainer({categories}){
    return(
      (categories || []).map((category, index)=> {
        return(
          <div key = {index}>
              <LoadingProduct category={category}/>
          </div>
        )
      })
  )
}
export default function App() {
  const {isLoading: isLoadingAboutUsPage} = useAboutUs.getAboutUsPage();
  const {isLoading: isLoadingAboutUsContactServices} = useAboutUs.company_services.getAll();
  const {isLoading: isLoadingAboutUsChoose} = useAboutUs.why_choose_us.getAll();

  const {isLoading: isLoadingContactInfo} = useContact.getCompanyInfo();
  const {isLoading: isLoadingContact} = useContact.getAll();

  const {isLoading: isLoadingHome } = useHome.getAll();

  const {isLoading: isLoadingNewsPage } = useNews.getNewsPage();
  const {isLoading: isLoadingNewsCategories } = useNews.news_categories.getAll();
  const {isLoading: isLoadingNews } = useNews.news.getList("", undefined, "", "date_desc", 1, "");
  
  const {isLoading: isLoadingPricePage } = useProducts.getPricePage();
  const {isLoading: isLoadingPrices } = useProducts.product_prices.getAll(
    "",
    ""
  );

  const {isLoading: isLoadingProducts } = useProducts.products.getList(); //TODO: Sau này bỏ
  const {data: categoriesProduct, isLoading: isLoadingProductCategories } = useProducts.product_categories.getAll();
  const {isLoading: isLoadingProductPage } = useProducts.getProductPage();
  const {isLoading: isLoadingProduct} = useProducts.products.getList('', undefined, false, 1, '');

  const {isLoading: isLoadingProjectPage } = useProjects.getProjectPage();
  const {isLoading: isLoadingProjectRegion } = useProjects.project_regions.getAll();
  const {isLoading: isLoadingProject } = useProjects.projects.getList(undefined, undefined, undefined, 1, undefined);

  const {isLoading: isLoadingRecruitmentPage } = useRecruitment.getRecruitmentPage();
  <LoadingProductContainer categories={categoriesProduct}/>
  if(
    isLoadingAboutUsPage || isLoadingAboutUsContactServices || isLoadingAboutUsChoose || isLoadingContactInfo || isLoadingContact ||
    isLoadingHome || isLoadingNewsPage || isLoadingNewsCategories || isLoadingNews || isLoadingPricePage || isLoadingProductCategories || isLoadingPrices ||
    isLoadingProductPage || isLoadingProduct || isLoadingProjectPage || isLoadingProjectRegion || isLoadingProject || isLoadingRecruitmentPage || isLoadingProducts
  )
    return <Loading/>
  
  return (
    <>
      <LoadingProductContainer categories={categoriesProduct}/>
      <BrowserRouter>
          <ScrollToTop/>
          <RoutesElement/>
      </BrowserRouter>
    </>
  )
}
