import axiosInstance from "../../../services/axiosInstance";

// Get All Complaints
export const getAllComplaints =
  async () => {

    const response =
      await axiosInstance.get(
        "/admin/complaints"
      );

    return response.data;
};

// Update Status
export const updateComplaintStatus =
  async (
    complaintId,
    data
  ) => {

    const response =
      await axiosInstance.patch(
        `/admin/status/${complaintId}`,
        data
      );

    return response.data;
};

// Add Remark
export const addRemark =
  async (
    complaintId,
    text
  ) => {

    const response =
      await axiosInstance.post(
        `/admin/remarks/${complaintId}`,
        { text }
      );

    return response.data;
};

export const assignDepartment =
  async (
    complaintId,
    department
  ) => {

    const response =
      await axiosInstance.patch(
        `/admin/assign-department/${complaintId}`,
        {
          department,
        }
      );

    return response.data;
};