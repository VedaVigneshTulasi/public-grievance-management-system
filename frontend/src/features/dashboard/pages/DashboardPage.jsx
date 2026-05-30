import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import Skeleton from "../../../components/common/Skeleton";

import AnalyticsChart from "../components/AnalyticsChart";

import {
  getDashboardStats,
  getStatusReport,
  getDepartmentReport,
} from "../services/dashboardService";

import {
  getComplaints,
} from "../../complaints/services/complaintService";

const DashboardPage = () => {
  const [stats, setStats] =
    useState({});

  const [complaints, setComplaints] =
    useState([]);

  const [statusReport, setStatusReport] =
    useState([]);

  const [departmentReport, setDepartmentReport] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const statsData =
        await getDashboardStats();

      const complaintsData =
        await getComplaints();

      const statusData =
        await getStatusReport();

      const departmentData =
        await getDepartmentReport();

      setStats(statsData);

      setComplaints(
        complaintsData.complaints || []
      );

      setStatusReport(
        statusData.report || []
      );

      setDepartmentReport(
        departmentData.report || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-[#0B2E59] to-blue-800 rounded-2xl p-8 text-white">

        <h1 className="text-4xl font-bold">
          Citizen Dashboard
        </h1>

        <p className="mt-2 opacity-90">
          Monitor complaints and track grievance progress
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card className="p-6">
          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Complaints
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalComplaints || 0}
              </h2>

            </div>

            <FileText
              size={40}
              className="text-blue-600"
            />

          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.pendingComplaints || 0}
              </h2>

            </div>

            <Clock
              size={40}
              className="text-orange-500"
            />

          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Resolved
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.resolvedComplaints || 0}
              </h2>

            </div>

            <CheckCircle
              size={40}
              className="text-green-600"
            />

          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                In Progress
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.inProgressComplaints || 0}
              </h2>

            </div>

            <AlertTriangle
              size={40}
              className="text-red-500"
            />

          </div>
        </Card>

      </div>

      {/* Quick Actions */}

      <Card className="p-6">

        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/complaints/create"
            className="bg-[#0B2E59] text-white px-6 py-3 rounded-lg"
          >
            Lodge Complaint
          </Link>

          <Link
            to="/complaints"
            className="border border-[#0B2E59] text-[#0B2E59] px-6 py-3 rounded-lg"
          >
            View Complaints
          </Link>

          <Link
            to="/track"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg"
          >
            Public Tracking
          </Link>

        </div>

      </Card>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <Card className="p-6">

          <h2 className="text-xl font-bold mb-6">
            Complaint Status Report
          </h2>

          <AnalyticsChart
            data={statusReport}
          />

        </Card>

        <Card className="p-6">

          <h2 className="text-xl font-bold mb-6">
            Department Report
          </h2>

          <AnalyticsChart
            data={departmentReport}
          />

        </Card>

      </div>

      {/* Recent Complaints */}

      <Card className="p-6">

        <h2 className="text-xl font-bold mb-6">
          Recent Complaints
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Tracking ID
                </th>

                <th className="text-left py-3">
                  Title
                </th>

                <th className="text-left py-3">
                  Department
                </th>

                <th className="text-left py-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints
                .slice(0, 5)
                .map(
                  (
                    complaint
                  ) => (
                    <tr
                      key={
                        complaint._id
                      }
                      className="border-b"
                    >

                      <td className="py-4 font-semibold text-[#0B2E59]">

                        {complaint.trackingId}

                      </td>

                      <td className="py-4">

                        {complaint.title}

                      </td>

                      <td className="py-4">

                        {complaint.department}

                      </td>

                      <td className="py-4">

                        {complaint.status}

                      </td>

                    </tr>
                  )
                )}

            </tbody>

          </table>

        </div>

      </Card>

    </div>
  );
};

export default DashboardPage;