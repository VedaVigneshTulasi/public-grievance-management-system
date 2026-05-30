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
 
// Get All Complaints

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

export const getComplaintById = async (

  complaintId

) => {
 
  const response =

    await axiosInstance.get(

      `/complaints/${complaintId}`

    );
 
  return response.data;

};
 
// Update Complaint

export const updateComplaint = async (

  complaintId,

  complaintData

) => {
 
  const response =

    await axiosInstance.put(

      `/complaints/${complaintId}`,

      complaintData

    );
 
  return response.data;

};
 
// Delete Complaint

export const deleteComplaint = async (

  complaintId

) => {
 
  const response =

    await axiosInstance.delete(

      `/complaints/${complaintId}`

    );
 
  return response.data;

};
 