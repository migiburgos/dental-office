import axiosInstance from "../../utils/axiosInstance";

const PATH = "/auth";

export const register = async (body) => {
  const response = await axiosInstance.post(`${PATH}/register`, body);
  return response.data;
};

export const login = async (body) => {
  const response = await axiosInstance.post(`${PATH}/login`, body);
  return response.data;
};
