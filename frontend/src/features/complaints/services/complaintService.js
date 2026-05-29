import axiosInstance from "../../../api/axiosInstance";

export const createComplaintApi = async (
  data
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.post(
      "/complaints",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getComplaintsApi =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axiosInstance.get(
        "/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
};