import axiosInstance from "../../../services/axiosInstance";

export const getNotifications =
  async () => {

    const response =
      await axiosInstance.get(
        "/notifications"
      );

    return response.data;
};

export const markAsRead =
  async (id) => {

    const response =
      await axiosInstance.patch(
        `/notifications/${id}`
      );

    return response.data;
};