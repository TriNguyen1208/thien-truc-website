import { useCustomQuery} from "@/hooks/customQuery";
import aboutUsServices from "@/services/aboutus.api.js";

function useGetAll(){
    return useCustomQuery(["about_us", "general", "get_all"], aboutUsServices.general.getAll);
}

function useGetAboutUsPage(){
    return useCustomQuery(["about_us", "general", "about_us_page"], aboutUsServices.general.getAboutUsPage);
}

const company_services = {
    useGetAll: () => useCustomQuery(["about_us", "company_services", "get_all"], aboutUsServices.company_services.getAll),
    useGetOne: (id) => useCustomQuery(["about_us", "company_services", "get_one", id], () => aboutUsServices.company_services.getOne(id))
}
const why_choose_us = {
    useGetAll: () => useCustomQuery(["about_us", "why_choose_us", "get_all"], aboutUsServices.why_choose_us.getAll),
    useGetOne: (id) => useCustomQuery(["about_us", "why_choose_us", "get_one", id], () => aboutUsServices.why_choose_us.getOne(id))
};

export default {
    getAll: useGetAll,
    getAboutUsPage: useGetAboutUsPage,
    company_services: {
        getAll: company_services.useGetAll,
        getOne: company_services.useGetOne,
    },
    why_choose_us: {
        getAll: why_choose_us.useGetAll,
        getOne: why_choose_us.useGetOne,
    }
};