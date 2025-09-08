import { queryClient } from '@/queryClient';
import useHome from '@/hooks/useHome'
import useContact from '@/hooks/useContact'
import useAboutUs from '@/hooks/useAboutUs'
import useNews from '@/hooks/useNews'
import useProducts from '@/hooks/useProducts'
import useProjects from '@/hooks/useProjects'
import useRecruitment from '@/hooks/useRecruitment'
import Loading from '@/components/Loading'
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
          queryKey: ["about_us", "general", "about_us_page"],
          queryFn: aboutUsServices.general.getAboutUsPage,
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["about_us", "company_services", "get_all"],
          queryFn: aboutUsServices.company_services.getAll, 
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["about_us", "why_choose_us", "get_all"],
          queryFn: aboutUsServices.why_choose_us.getAll, 
          staleTime: 1000 * 60 * 10
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["contact", "company_info"],
          queryFn: contactServices.general.getCompanyInfo, 
          staleTime: 1000 * 60 * 10,
      }),
    ]);
  return null;
};
export const LoadingHome = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["home", "general", "get_all"],
          queryFn: homeServices.general.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["news", "news", "featured_news"],
          queryFn: newsServices.news.getAllFeatured,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["products", "products", "highlight_products"],
          queryFn: productsServices.products.getAllFeatured,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["projects", "projects", "highlight_projects", ""],
          queryFn: () =>  projectsServices.projects.getAllFeatured(""),
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["projects", "project_regions", "get_all_featured"],
          queryFn: projectsServices.project_regions.getAllFeatured,
          staleTime: 10 * 60 * 1000,
      }),
  ]);
  return null;
}
export const LoadingContact = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["contact", "general", "contact"],
          queryFn: contactServices.general.getAll,
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingNews = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["news", "general", "news_page"],
          queryFn: newsServices.general.getNewsPage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["news", "news_categories", "get_all"],
          queryFn: newsServices.new_categories.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["news", "news", "get_list", "", undefined, true, "date_desc", 1, 9],
          queryFn: () => newsServices.news.getList("", undefined, true, "date_desc", 1, 9),
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
    queryKey: ["news", "news_contents", "get_one", id],
    queryFn: () => newsServices.new_contents.getOne(id),
    staleTime: 10 * 60 * 1000,
  })
  return null;
}
export const LoadingPrice = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["products", "general", "get_price_page"],
          queryFn: productsServices.general.getPricePage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["products", "product_categories", "get_all"],
          queryFn: productsServices.product_categories.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["products", "products", "get_list_by_category", undefined, '', '', undefined, undefined],
          queryFn: () => productsServices.products.getListByCategory(undefined, '', '', undefined, undefined),
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
}
export const LoadingProduct = async () => {
  await Promise.all([
    queryClient.prefetchQuery({ 
      queryKey: ["products", "general", "get_product_page"],
      queryFn: productsServices.general.getProductPage,
      staleTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "product_categories", "get_all"],
      queryFn: productsServices.product_categories.getAll,
      staleTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "products", "get_list", undefined, undefined, undefined, 1, 12],
      queryFn: () => productsServices.products.getList(undefined, undefined, undefined, 1, 12),
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
    queryKey: ["products", "products", "get_one", id],
    queryFn: () => productsServices.products.getOne(id),
    staleTime: 10 * 60 * 1000,
  })
}

export const LoadingProject = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["projects", "general", "project_page"],
          queryFn: projectsServices.general.getProjectPage,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["projects", "project_regions", "get_all"],
          queryFn: projectsServices.project_regions.getAll,
          staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({ 
          queryKey: ["projects", "projects", "get_list", undefined, undefined, undefined, 1, undefined],
          queryFn: () => projectsServices.projects.getList(undefined, undefined, undefined, 1, undefined),
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
      queryKey: ["projects", "project_contents", "get_one", id],
      queryFn: () => projectsServices.project_contents.getOne(id),
      staleTime: 10 * 60 * 1000,
  })
  return null;
}
export const LoadingRecruitment = async () => {
  await Promise.all([
      queryClient.prefetchQuery({ 
          queryKey: ["recruitment", "general", "recruitment_page"],
          queryFn: recruitmentServices.general.getRecruitmentPage,
          staleTime: 10 * 60 * 1000,
      }),
    ]);
  return null;
} 