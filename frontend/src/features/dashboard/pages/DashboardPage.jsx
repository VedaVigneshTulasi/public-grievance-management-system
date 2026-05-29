import {
  useEffect,
  useState,
} from "react";

import Navbar from "../../../components/layout/Navbar";

import PageContainer from "../../../components/layout/PageContainer";

import StatCard from "../../../components/common/StatCard";

import StatusPieChart from "../components/StatusPieChart";

import DepartmentBarChart from "../components/DepartmentBarChart";

import {
  getDashboardStatsApi,
  getStatusReportApi,
  getDepartmentReportApi,
} from "../services/dashboardService";

const DashboardPage = () => {

  const [stats, setStats] =
    useState({});

  const [statusData, setStatusData] =
    useState([]);

  const [departmentData, setDepartmentData] =
    useState([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const statsResponse =
          await getDashboardStatsApi();

        const statusResponse =
          await getStatusReportApi();

        const departmentResponse =
          await getDepartmentReportApi();

        setStats(
          statsResponse.stats
        );

        setStatusData(
          statusResponse.report
        );

        setDepartmentData(
          departmentResponse.report
        );

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
            Dashboard Analytics
          </h1>

          <p className="text-gray-600 mt-2">
            Monitor grievance statistics
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

          <StatCard
            title="Total"
            value={
              stats.totalComplaints || 0
            }
          />

          <StatCard
            title="Pending"
            value={
              stats.pendingComplaints || 0
            }
          />

          <StatCard
            title="Resolved"
            value={
              stats.resolvedComplaints || 0
            }
          />

          <StatCard
            title="Rejected"
            value={
              stats.rejectedComplaints || 0
            }
          />

          <StatCard
            title="In Progress"
            value={
              stats.inProgressComplaints || 0
            }
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <StatusPieChart
            data={statusData}
          />

          <DepartmentBarChart
            data={departmentData}
          />

        </div>

      </PageContainer>

    </div>
  );
};

export default DashboardPage;