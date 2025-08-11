import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutus.api.js";
import { toast } from "react-toastify";

// ==== About Us Page ====
function useGetAboutUsPage() {
  return useQuery({
    queryKey: ["admin_about_us_page"],
    queryFn: aboutUsServices.getAboutUsPage,
    staleTime: 10 * 60 * 1000,
  });
}

const updateAboutUsPage = {
  useUpdateBanner: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => aboutUsServices.updateAboutUsPage.banner(data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_about_us_page"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
  useUpdateOurStory: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => aboutUsServices.updateAboutUsPage.ourStory(data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_about_us_page"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
  useUpdateVisibility: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => aboutUsServices.updateAboutUsPage.visibility(data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_about_us_page"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }
};

// ==== Company Services ====
const company_services = {
  useGetAll: () =>
    useQuery({
      queryKey: ["admin_company_services"],
      queryFn: aboutUsServices.company_services.getAll,
      staleTime: 10 * 60 * 1000,
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
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => aboutUsServices.company_services.updateOne(id, data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.company_services.deleteOne,
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_company_services"] });
      },
      onError: (error) => {
        toast.error(error.message);
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
      staleTime: 10 * 60 * 1000,
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
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => aboutUsServices.why_choose_us.updateOne(id, data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: aboutUsServices.why_choose_us.deleteOne,
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_why_choose_us"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
};

export default {
  getAboutUsPage: useGetAboutUsPage,
  updateAboutUsPage: {
    updateBanner: updateAboutUsPage.useUpdateBanner,
    updateOurStory: updateAboutUsPage.useUpdateOurStory,
    updateVisibility: updateAboutUsPage.useUpdateVisibility
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
