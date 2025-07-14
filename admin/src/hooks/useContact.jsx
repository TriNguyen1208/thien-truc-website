import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetCompanyInfo(){
    return useQuery({
        queryKey: ["admin_company_info"],
        queryFn: contactServices.getCompanyInfo,
        staleTime: 5 * 60 * 1000,
    })
}
function usePatchCompanyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedCompanyInfo) => contactServices.patchCompanyInfo(updatedCompanyInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_company_info'] });
    },
  });
}
export default {
    getCompanyInfo: useGetCompanyInfo,
    patchCompanyInfo: usePatchCompanyInfo
}