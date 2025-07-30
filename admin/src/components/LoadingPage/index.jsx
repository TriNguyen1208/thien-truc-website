import useHome from '@/hooks/useHome'
import useContact from '@/hooks/useContact'
import useAboutUs from '@/hooks/useAboutUs'
import useNews from '@/hooks/useNews'
import useProducts from '@/hooks/useProducts'
import useProjects from '@/hooks/useProjects'
import useRecruitment from '@/hooks/useRecruitment'
import useAdmin from '@/hooks/useAdmin'
import Loading from '@/components/Loading'

export default function LoadingPage(){
  const {isLoading: isLoadingAboutUsPage} = useAboutUs.getAboutUsPage();
  const {isLoading: isLoadingAboutUsServices } = useAboutUs.company_services.getAll();
  const {isLoading: isLoadingAboutUsChoose } = useAboutUs.why_choose_us.getAll();
  
  const {isLoading: isLoadingNewsCategories} = useNews.news_categories.getAll();
  const {isLoading: isLoadingNewsQuantity} = useNews.getQuantity()
  const {isLoading: isLoadingHighlightNews } = useNews.getFeatureNews();
  const {isLoading: isLoadingNews } = useNews.news.getList();
  const {isLoading: isLoadingNewsPage} = useNews.getNewsPage()

  const {isLoading: isLoadingQuantityProject} = useProjects.getQuantity()
  const {isLoading: isLoadingProjectRegions } = useProjects.project_regions.getAll();
  const {isLoading: isLoadingProject } = useProjects.projects.getList();
  const {isLoading: isLoadingProjectSuggestion } = useProjects.getSearchCategoriesSuggestions('');
  const {isLoading: isLoadingProjectPage} = useProjects.getProjectPage()

  const {isLoading: isLoadingCompanyInfo} = useContact.getCompanyInfo()
  const {isLoading: isLoadingSupportAgent} = useContact.support_agents.getAll()
  const {isLoading: isLoadingContactPage} = useContact.getContactPage();
  const {isLoading: isLoadingQuantityContact} = useContact.getQuantity()

  const {isLoading: isLoadingQuantityProduct} = useProducts.getQuantity()
  const {isLoading: isLoadingPricePage} = useProducts.getPricePage()
  const {isLoading: isLoadingProductListCategory } = useProducts.products.getListByCategory();
  const {isLoading: isLoadingProductCategories } = useProducts.product_categories.getAll();
  const {isLoading: isLoadingProductPage} = useProducts.getProductPage()

  const {isLoading: isLoadingQuantityAdmin} = useAdmin.getQuantity()
  const {isLoading: isLoadingActivity} = useAdmin.getActivityLogs()
  const {isLoading: isLoadingManagers } = useAdmin.manager.getAll();

  const {isLoading: isLoadingHomePageData} = useHome.getHomePage();
  const {isLoading: isLoadingHomeHighlightFeature} = useHome.highlight_stats_about_us.getAll();
  
  const {isLoading: isLoadingRecruitment} = useRecruitment.getRecruitmentPage();
  if(
    isLoadingAboutUsPage || isLoadingAboutUsServices || isLoadingAboutUsChoose || isLoadingNewsCategories || isLoadingNewsQuantity ||
    isLoadingNews || isLoadingNewsPage || isLoadingQuantityProject || isLoadingProjectRegions || isLoadingProject || isLoadingProjectSuggestion ||
    isLoadingCompanyInfo || isLoadingSupportAgent || isLoadingContactPage || isLoadingQuantityContact || isLoadingQuantityProduct || isLoadingPricePage || 
    isLoadingProductListCategory || isLoadingProductCategories || isLoadingProductPage || isLoadingQuantityAdmin || isLoadingActivity || isLoadingManagers ||
    isLoadingHomePageData || isLoadingHomeHighlightFeature || isLoadingProjectPage || isLoadingHighlightNews || isLoadingRecruitment
  )
    return <Loading/>
  return null
}