import axiosInstance from "../../../services/axiosInstance";

/* ========================================
   CREATE COMPLAINT
======================================== */

export const createComplaint =
  async (complaintData) => {

    const response =
      await axiosInstance.post(
        "/complaints",
        complaintData
      );

    return response.data;
};

/* ========================================
   GET COMPLAINTS
======================================== */

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

/* ========================================
   GET COMPLAINT BY ID
======================================== */

export const getComplaintById =
  async (id) => {

    const response =
      await axiosInstance.get(
        `/complaints/${id}`
      );

    return response.data;
};

/* ========================================
   UPDATE COMPLAINT
======================================== */

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

/* ========================================
   DELETE COMPLAINT
======================================== */

export const deleteComplaint =
  async (id) => {

    const response =
      await axiosInstance.delete(
        `/complaints/${id}`
      );

    return response.data;
};

/* ========================================
   TRACK COMPLAINT
======================================== */

export const trackComplaint =
  async (
    trackingId
  ) => {

    const response =
      await axiosInstance.get(
        `/complaints/track/${trackingId}`
      );

    return response.data;
};