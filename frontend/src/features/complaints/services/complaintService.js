import axiosInstance from "../../../services/axiosInstance";
 
export const createComplaint = async (
  complaintData
) => {
 
  const response =
    await axiosInstance.post(
      "/complaints",
      complaintData
    );
 
  return response.data;
};
 
export const getComplaints =
  async (
    page = 1,
    search = "",
    status = ""
  ) => {
 
    const response =
      await axiosInstance.get(
        "/complaints",
        {
          params: {
            page,
            search,
            status,
          },
        }
      );
 
    return response.data;
};