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

// Get All Users
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

// Delete User
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`);
  return response.data;
};

// Update User Role
export const updateUserRole = async (userId, role) => {
  const response = await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
  return response.data;
};

// Get All Departments
export const getAllDepartments = async () => {
  const response = await axiosInstance.get("/admin/departments");
  return response.data;
};

// Create Department
export const createDepartment = async (data) => {
  const response = await axiosInstance.post("/admin/departments", data);
  return response.data;
};

// Update Department
export const updateDepartment = async (deptId, data) => {
  const response = await axiosInstance.patch(`/admin/departments/${deptId}`, data);
  return response.data;
};

// Delete Department
export const deleteDepartment = async (deptId) => {
  const response = await axiosInstance.delete(`/admin/departments/${deptId}`);
  return response.data;
};

// Get System Reports
export const getSystemReports = async (params = {}) => {
  const response = await axiosInstance.get("/admin/reports", { params });
  return response.data;
};

// Get System Settings
export const getSystemSettings = async () => {
  const response = await axiosInstance.get("/admin/settings");
  return response.data;
};

// Update System Settings
export const updateSystemSettings = async (data) => {
  const response = await axiosInstance.patch("/admin/settings", data);
  return response.data;
};