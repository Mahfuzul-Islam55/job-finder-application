import axiosInstance from "./Axios";
import { ICreateJobType } from "./JobType";

export const getAllJob = async (type?: string) => {
  let queryString = "";
  if (type !== undefined) {
    queryString += `/?type_like=${type}`;
    const response = await axiosInstance.get(`/jobs${queryString}`);
    return response.data;
  }
  const response = await axiosInstance.get(`/jobs`);

  return response.data;
};

export const addNewJob = async (data: ICreateJobType) => {
  const response = await axiosInstance.post("/jobs", data);
  return response.data;
};

export const deleteJob = async (id: number) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};
