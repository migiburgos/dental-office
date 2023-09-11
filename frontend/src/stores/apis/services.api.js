import axiosInstance from "../../utils/axiosInstance";

const PATH = "/services";

export const fetchServices = async (body) => {
  const response = await axiosInstance.get(`${PATH}/`, body);
  return response.data;
};
