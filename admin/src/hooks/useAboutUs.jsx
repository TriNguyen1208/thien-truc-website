import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutUs.api.js";
import { toast } from "react-toastify";

// ==== About Us Page ====
function useGetAboutUsPage() {
  return useQuery({
    queryKey: ["admin_about_us_page"],
    queryFn: aboutUsServices.getAboutUsPage,
    staleTime: 5 * 60 * 1000,
  });
}

const updateAboutUsPage = {
  useUpdateBanner: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => aboutUsServices.updateAboutUsPage.banner(data),
      onSuccess: () => {
        toast.success("Cập nhật banner thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_about_us_page"] });
      },
      onError: () => {
        toast.error("Cập nhật banner thất bại");
      },
    });
  },
  useUpdateOurStory: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => aboutUsServices.updateAboutUsPage.ourStory(data),
      onSuccess: () => {
        toast.success("Cập nhật câu chuyện thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_about_us_page"] });
      },
      onError: () => {
        toast.error("Cập nhật câu chuyện thất bại");
      },
    });
  },
};

// ==== Company Services ====
const company_services = {
  useGetAll: () =>
    useQuery({
      queryKey: ["admin_company_services"],
      queryFn: aboutUsServices.company_services.getAll,
      staleTime: 5 * 60 * 1000,
    }),

  useGetOne: (id) =>
    useQuery({
      queryKey: ["admin_company_services", id],
      queryFn: () => aboutUsServices.company_services.getOne(id),
      enabled: !!id,
    }),

  useCreateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.company_services.createOne,
      onSuccess: () => {
        toast.success("Thêm dịch vụ thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: () => {
        toast.error("Thêm dịch vụ thất bại");
      },
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => aboutUsServices.company_services.updateOne(id, data),
      onSuccess: () => {
        toast.success("Cập nhật dịch vụ thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: () => {
        toast.error("Cập nhật dịch vụ thất bại");
      },
    });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.company_services.deleteOne,
      onSuccess: () => {
        toast.success("Xóa dịch vụ thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: () => {
        toast.error("Xóa dịch vụ thất bại");
      },
    });
  },
};

// ==== Why Choose Us ====
const why_choose_us = {
  useGetAll: () =>
    useQuery({
      queryKey: ["admin_why_choose_us"],
      queryFn: aboutUsServices.why_choose_us.getAll,
      staleTime: 5 * 60 * 1000,
    }),

  useGetOne: (id) =>
    useQuery({
      queryKey: ["admin_why_choose_us", id],
      queryFn: () => aboutUsServices.why_choose_us.getOne(id),
      enabled: !!id,
    }),

  useCreateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.why_choose_us.createOne,
      onSuccess: () => {
        toast.success("Thêm lý do chọn chúng tôi thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: () => {
        toast.error("Thêm lý do chọn chúng tôi thất bại");
      },
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => aboutUsServices.why_choose_us.updateOne(id, data),
      onSuccess: () => {
        toast.success("Cập nhật thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: () => {
        toast.error("Cập nhật thất bại");
      },
    });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.why_choose_us.deleteOne,
      onSuccess: () => {
        toast.success("Xóa thành công");
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: () => {
        toast.error("Xóa thất bại");
      },
    });
  },
};

export default {
  getAboutUsPage: useGetAboutUsPage,
  updateAboutUsPage: {
    updateBanner: updateAboutUsPage.useUpdateBanner,
    updateOurStory: updateAboutUsPage.useUpdateOurStory,
  },
  company_services: {
    getAll: company_services.useGetAll,
    getOne: company_services.useGetOne,
    createOne: company_services.useCreateOne,
    updateOne: company_services.useUpdateOne,
    deleteOne: company_services.useDeleteOne,
  },
  why_choose_us: {
    getAll: why_choose_us.useGetAll,
    getOne: why_choose_us.useGetOne,
    createOne: why_choose_us.useCreateOne,
    updateOne: why_choose_us.useUpdateOne,
    deleteOne: why_choose_us.useDeleteOne,
  },
};
