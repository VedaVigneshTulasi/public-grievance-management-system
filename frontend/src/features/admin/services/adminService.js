import axiosInstance from "../../../api/axiosInstance";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAdminComplaintsApi =
  async () => {

    const response =
      await axiosInstance.get(
        "/admin/complaints",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const updateStatusApi =
  async (id, status) => {

    const response =
      await axiosInstance.patch(
        `/admin/status/${id}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};