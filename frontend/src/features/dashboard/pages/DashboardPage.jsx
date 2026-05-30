import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import StatCard from "../../../components/common/StatCard";

import {
  getDashboardStats,
} from "../services/dashboardService";

import {
  getComplaints,
} from "../../complaints/services/complaintService";

const DashboardPage = () => {

  const [stats, setStats] =
    useState({});

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const statsData =
          await getDashboardStats();

        const complaintsData =
          await getComplaints();

        setStats(statsData);

        setComplaints(
          complaintsData.complaints || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div>

      {/* Page Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-[#0B2E59]">

          Citizen Dashboard

        </h1>

        <p className="text-gray-600 mt-2">

          Monitor and manage your grievances

        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Complaints"
          value={stats.totalComplaints || 0}
          color="text-blue-600"
        />

        <StatCard
          title="Pending"
          value={stats.pendingComplaints || 0}
          color="text-orange-500"
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedComplaints || 0}
          color="text-green-600"
        />

        <StatCard
          title="Departments"
          value={stats.totalDepartments || 0}
          color="text-purple-600"
        />

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">

        <h2 className="text-xl font-semibold mb-4">

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

        </div>

      </div>

      {/* Recent Complaints */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

        <h2 className="text-xl font-semibold mb-6">

          Recent Complaints

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

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

              {
                complaints
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

                        <td className="py-4">

                          {
                            complaint.title
                          }

                        </td>

                        <td className="py-4">

                          {
                            complaint.department
                          }

                        </td>

                        <td className="py-4">

                          {
                            complaint.status
                          }

                        </td>

                      </tr>
                    )
                  )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;