import axiosInstance from "../../utils/axiosInstance";

const PATH = "/appointments";

export const fetchAppointments = async (body) => {
  const response = await axiosInstance.get(`${PATH}/`);
  return response.data;
};

export const fetchAppointmentsByDoctor = async (body) => {
  const query = encodeURI(body.doctor);
  const response = await axiosInstance.get(`${PATH}/doctor/${query}`);
  return response.data;
};

export const createAppointment = async (body) => {
  const response = await axiosInstance.post(`${PATH}/create`, body);
  return response.data;
};

export const updateAppointment = async (body) => {
  const id = body.appointmentId;
  const response = await axiosInstance.put(`${PATH}/${id}`, body);
  return response.data;
};

export const deleteAppointment = async (body) => {
  const id = body.appointmentId;
  const response = await axiosInstance.delete(`${PATH}/${id}`, body);
  return response.data;
};
