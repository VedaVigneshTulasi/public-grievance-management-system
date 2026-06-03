import axiosInstance from "../../../services/axiosInstance";

export const loginApi =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/auth/login",
        data
      );

    return response.data;
};

export const registerApi =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/auth/register",
        data
      );

    return response.data;
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/check-email",
      { email }
    );
    return response.data.exists;
  } catch (error) {
    // If endpoint doesn't exist, return false to not block registration
    return false;
  }
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await axiosInstance.post("/auth/reset-password", payload);
  return response.data;
};