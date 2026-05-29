import axiosInstance from "../../../api/axiosInstance";
 
const getToken = () => {
  return localStorage.getItem("token");
};
 
export const createComplaintApi = async (
  data
) => {
 
  const response =
    await axiosInstance.post(
      "/complaints",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`,
        },
      }
    );
 
  return response.data;
};
 
export const getComplaintsApi =
  async (params = {}) => {
 
    const response =
      await axiosInstance.get(
        "/complaints",
        {
          params,
 
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );
 
    return response.data;
};
 
export const getComplaintByIdApi =
  async (id) => {
 
    const response =
      await axiosInstance.get(
        `/complaints/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );
 
    return response.data;
};