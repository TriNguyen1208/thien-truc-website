import { useQuery } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutus.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["about_us"],
        queryFn: aboutUsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetAboutUsPage(){
    return useQuery({
        queryKey: ["about_us_page"],
        queryFn: aboutUsServices.getAboutUsPage,
        staleTime: 10 * 60 * 1000,
    })
}
const company_services = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["company_services"],
            queryFn: aboutUsServices.company_services.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["company_service", id],
            queryFn: () => aboutUsServices.company_services.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    } 
}
const why_choose_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["why_choose_us"],
            queryFn: aboutUsServices.why_choose_us.getAll,
            staleTime: 10 * 60 * 1000,
            
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["why_choose_us", id],
            queryFn: () => aboutUsServices.why_choose_us.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    } 
}
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