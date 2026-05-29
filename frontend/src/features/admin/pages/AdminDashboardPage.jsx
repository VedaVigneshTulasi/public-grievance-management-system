import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintTable from "../components/ComplaintTable";

import Loader from "../../../components/common/Loader";

import {
  getAdminComplaintsApi,
  updateStatusApi,
} from "../services/adminService";

const AdminDashboardPage = () => {

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

      } finally {

        setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>

      <PageContainer>

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#0b2e59]">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage and monitor complaints
          </p>

        </div>

        <ComplaintTable
          complaints={complaints}
          onStatusChange={
            handleStatusChange
          }
        />

      </PageContainer>

    </DashboardLayout>
  );
};

export default AdminDashboardPage;