import axiosInstance from "./Axios";

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
