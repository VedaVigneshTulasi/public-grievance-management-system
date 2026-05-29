import {
  useEffect,
  useState,
} from "react";

import Navbar from "../../../components/layout/Navbar";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintTable from "../components/ComplaintTable";

import {
  getAdminComplaintsApi,
  updateStatusApi,
} from "../services/adminService";

const AdminDashboardPage = () => {

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints =
    async () => {

      try {

        const response =
          await getAdminComplaintsApi();

        setComplaints(
          response.complaints
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleStatusChange =
    async (id, status) => {

      try {

        await updateStatusApi(
          id,
          status
        );

        fetchComplaints();

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      <Navbar />

      <PageContainer>

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#0b2e59]">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage public complaints
          </p>

        </div>

        <ComplaintTable
          complaints={complaints}
          onStatusChange={
            handleStatusChange
          }
        />

      </PageContainer>

    </div>
  );
};

export default AdminDashboardPage;