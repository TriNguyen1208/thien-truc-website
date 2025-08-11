import axios from "@/services/axiosInstance.js";
import API_ROUTES from "../../../shared/routesAPIServer";

// ==== About Us Page ====
const getAboutUsPage = async () => {
  const res = await axios.get(API_ROUTES.about_us.about_us_page);
  return res.data;
};

const updateAboutUsPage = {
  banner: async (data) => {
    const res = await axios.patch(API_ROUTES.about_us.updateAboutUsPage.banner, data);
    return res.data;
  },
  ourStory: async (data) => {
    const res = await axios.patch(API_ROUTES.about_us.updateAboutUsPage.ourStory, data);
    return res.data;
  },
  visibility: async (data) => {
    const res = await axios.patch(API_ROUTES.about_us.updateAboutUsPage.visibility, data);
    return res.data;
  }
};

// ==== Company Services ====
const company_services = {
  getAll: async () => {
    const res = await axios.get(API_ROUTES.about_us.company_services.getAll);
    return res.data;
  },
  getOne: async (id) => {
    const res = await axios.get(API_ROUTES.about_us.company_services.getOne(id));
    return res.data;
  },
  createOne: async (data) => {
    const res = await axios.post(API_ROUTES.about_us.company_services.createOne, data);
    return res.data;
  },
  updateOne: async (id, data) => {
    const res = await axios.patch(API_ROUTES.about_us.company_services.updateOne(id), data);
    return res.data;
  },
  deleteOne: async (id) => {
    const res = await axios.delete(API_ROUTES.about_us.company_services.deleteOne(id));
    return res.data;
  },
};

// ==== Why Choose Us ====
const why_choose_us = {
  getAll: async () => {
    const res = await axios.get(API_ROUTES.about_us.why_choose_us.getAll);
    return res.data;
  },
  getOne: async (id) => {
    const res = await axios.get(API_ROUTES.about_us.why_choose_us.getOne(id));
    return res.data;
  },
  createOne: async (data) => {
    const res = await axios.post(API_ROUTES.about_us.why_choose_us.createOne, data);
    return res.data;
  },
  updateOne: async (id, data) => {
    const res = await axios.patch(API_ROUTES.about_us.why_choose_us.updateOne(id), data);
    return res.data;
  },
  deleteOne: async (id) => {
    const res = await axios.delete(API_ROUTES.about_us.why_choose_us.deleteOne(id));
    return res.data;
  },
};

export default {
  getAboutUsPage,
  updateAboutUsPage,
  company_services,
  why_choose_us,
};
