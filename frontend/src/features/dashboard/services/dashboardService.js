import axiosInstance from "../../../api/axiosInstance";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getDashboardStatsApi =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const getStatusReportApi =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/status-report",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const getDepartmentReportApi =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/department-report",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};