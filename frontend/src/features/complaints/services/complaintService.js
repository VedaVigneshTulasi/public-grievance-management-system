import axiosInstance from "../../../services/axiosInstance";

export const getComplaints =
  async () => {

    const response =
      await axiosInstance.get(
        "/complaints"
      );

    return response.data;
};