import axiosInstance from "./Axios";

export const getAllJob = async () => {
  const response = await axiosInstance.get("/jobs");

  return response.data;
};
