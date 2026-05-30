import axiosInstance from "../../../services/axiosInstance";

// Create Complaint
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

// Get Complaints
export const getComplaints = async (
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

// Get Complaint By Id
export const getComplaintById =
  async (id) => {

    const response =
      await axiosInstance.get(
        `/complaints/${id}`
      );

    return response.data;
};

// Update Complaint
export const updateComplaint =
  async (
    id,
    complaintData
  ) => {

    const response =
      await axiosInstance.put(
        `/complaints/${id}`,
        complaintData
      );

    return response.data;
};

// Delete Complaint
export const deleteComplaint =
  async (id) => {

    const response =
      await axiosInstance.delete(
        `/complaints/${id}`
      );

    return response.data;
};