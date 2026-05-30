import axiosInstance from "../../../services/axiosInstance";

export const getDashboardStats =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/stats"
      );

    return response.data;
};

export const getStatusReport =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/status-report"
      );

    return response.data;
};

export const getDepartmentReport =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/department-report"
      );

    return response.data;
};