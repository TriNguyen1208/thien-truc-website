import useHome from '@/hooks/useHome'
import useContact from '@/hooks/useContact'
import useAboutUs from '@/hooks/useAboutUs'
import useNews from '@/hooks/useNews'
import useProducts from '@/hooks/useProducts'
import useProjects from '@/hooks/useProjects'
import useRecruitment from '@/hooks/useRecruitment'
import Loading from '@/components/Loading'
import { queryClient } from '../../queryClient';

import aboutUsServices from "@/services/aboutus.api.js";
import contactServices from "@/services/contact.api.js";
import homeServices from "@/services/home.api.js";
import newsServices from "@/services/news.api.js";
import productsServices from "@/services/products.api.js";
import projectsServices from "@/services/projects.api.js";
import recruitmentServices from "@/services/recruitment.api.js";

export const LoadingAboutUs = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["about_us_page"],
          queryFn: aboutUsServices.getAboutUsPage,
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["company_services"],
          queryFn: aboutUsServices.company_services.getAll, 
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["why_choose_us"],
          queryFn: aboutUsServices.why_choose_us.getAll, 
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["company_info"],
          queryFn: contactServices.getCompanyInfo, 
          staleTime: 1000 * 60 * 10,
      }),
    ]);
  return null;
};
export const LoadingHome = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["home"],
          queryFn: homeServices.getAll,
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingContact = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["contact"],
          queryFn: contactServices.getAll,
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingNews = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["news_page"],
          queryFn: newsServices.getNewsPage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["news_categories"],
          queryFn: newsServices.new_categories.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["news_list", "", true, "", "date_desc", 1, ""],
          queryFn: () => newsServices.news.getList("", undefined, "", "date_desc", 1, ""),
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingNewsDetail = async({params}) => {
  const {id} = params;
  if(!id){
    throw new Error("Product ID is not existed");
  }
  await queryClient.prefetchQuery({
    queryKey: ["news_content", id],
    queryFn: () => newsServices.new_contents.getOne(id),
    staleTime: 10 * 60 * 1000,
  })
  return null;
}
export const LoadingPrice = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["price_page"],
          queryFn: productsServices.getPricePage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["product_categories"],
          queryFn: productsServices.product_categories.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["product-list", "", "", "", 1, ""],
          queryFn: ()=> productsServices.products.getList("", "", "", 1, ""),
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["product_prices", "", ""],
          queryFn: ()=> productsServices.product_prices.getAll("", ""),
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingProduct = async () => {
  await Promise.all([
    queryClient.prefetchQuery({ 
      queryKey: ["product_page"],
      queryFn: productsServices.getProductPage,
      staleTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["product_categories"],
      queryFn: productsServices.product_categories.getAll,
      staleTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["product-list", '','','','',4],
      queryFn: ()=> productsServices.products.getListByCategory('','','','',4),
      staleTime: 10 * 60 * 1000,
    })
  ]);
  return null;
};
export const LoadingProductDetail = async ({params}) => {
  const {id} = params;
  if(!id){
    throw new Error("Product ID is not existed");
  }
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => productsServices.products.getOne(id),
    staleTime: 10 * 60 * 1000,
  })
}

export const LoadingProject = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["project_page"],
          queryFn: projectsServices.getProjectPage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["project_regions"],
          queryFn: projectsServices.project_regions.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["projects_list", "", "", undefined, 1, undefined],
          queryFn: () => projectsServices.projects.getList("", "", undefined, 1, undefined),
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingProjectDetail = async({params}) => {
  const {id} = params;
  if(!id){
    throw new Error("Project ID is not existed");
  }
  await queryClient.prefetchQuery({
      queryKey: ["project_content", id],
      queryFn: () => projectsServices.project_contents.getOne(id),
      staleTime: 10 * 60 * 1000,
  })
  return null;
}
export const LoadingRecruitment = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["recruitment_page"],
          queryFn: recruitmentServices.getRecruitmentPage,
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
} 
export default function LoadingPage(){
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
    if(
        isLoadingAboutUsPage || isLoadingAboutUsContactServices || isLoadingAboutUsChoose || isLoadingContactInfo || isLoadingContact ||
        isLoadingHome || isLoadingNewsPage || isLoadingNewsCategories || isLoadingNews || isLoadingPricePage || isLoadingProductCategories || isLoadingPrices ||
        isLoadingProductPage || isLoadingProduct || isLoadingProjectPage || isLoadingProjectRegion || isLoadingProject || isLoadingRecruitmentPage || isLoadingProducts
    )
      return <Loading/>
}