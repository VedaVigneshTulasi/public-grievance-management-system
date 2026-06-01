import { useEffect, useState } from "react";

import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

import toast from "react-hot-toast";

import StatCard from "../../../components/common/StatCard";

import { getDashboardStats } from "../../dashboard/services/dashboardService";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import PageLoader from "../../../components/common/PageLoader.jsx";

import AnalyticsChart from "../../dashboard/components/AnalyticsChart";

import {
  getStatusReport,
  getDepartmentReport,
} from "../../dashboard/services/dashboardService";

import {
  getAllComplaints,
  updateComplaintStatus,
  addRemark,
  assignDepartment,
} from "../services/adminService";

const AdminDashboardPage = () => {
  const [complaints, setComplaints] = useState([]);

  const [stats, setStats] = useState({});

  const [statusReport, setStatusReport] = useState([]);

  const [departmentReport, setDepartmentReport] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [remark, setRemark] = useState("");

  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const [complaintsData, statsData, statusData, departmentData] =
        await Promise.all([
          getAllComplaints(),
          getDashboardStats(),
          getStatusReport(),
          getDepartmentReport(),
        ]);

      setStatusReport(statusData.report || []);

      setDepartmentReport(departmentData.report || []);

      setComplaints(complaintsData.complaints || []);

      setStats(statsData.stats || {});
    } catch (error) {
      toast.error("Failed To Load Complaints");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <PageLoader />;
  }

const handleStatusChange = async (
  complaintId,
  status
) => {
  try {

    let data = { status };

    if (status === "Rejected") {

      const remark = window.prompt(
        "Enter rejection reason"
      );

      if (!remark?.trim()) {
        toast.error(
          "Remark is required for rejection"
        );
        return;
      }

      data = {
        status,
        remark,
      };
    }

    await updateComplaintStatus(
      complaintId,
      data
    );

    toast.success("Status Updated");

    loadComplaints();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Update Failed"
    );

  }
};

  const handleAddRemark = async () => {
    try {
      await addRemark(selectedComplaint, remark);

      toast.success("Remark Added");

      setRemark("");

      loadComplaints();
    } catch {
      toast.error("Failed To Add Remark");
    }
  };

  const handleDepartmentAssign = async (complaintId, department) => {
    try {
      await assignDepartment(complaintId, department);

      toast.success("Department Assigned");

      loadComplaints();
    } catch {
      toast.error("Assignment Failed");
    }
  };

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage complaints and resolutions"
      />

      <Card className="p-6 mb-8 bg-gradient-to-r from-[#0B2E59] to-blue-700 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Department Performance Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-blue-100">Departments</p>

            <h3 className="text-3xl font-bold">{departmentReport.length}</h3>
          </div>

          <div>
            <p className="text-blue-100">Total Cases</p>

            <h3 className="text-3xl font-bold">{stats.totalComplaints || 0}</h3>
          </div>

          <div>
            <p className="text-blue-100">Resolved</p>

            <h3 className="text-3xl font-bold">
              {stats.resolvedComplaints || 0}
            </h3>
          </div>

          <div>
            <p className="text-blue-100">Pending</p>

            <h3 className="text-3xl font-bold">
              {stats.pendingComplaints || 0}
            </h3>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Complaints"
          value={stats.totalComplaints || 0}
          color="text-blue-600"
          icon={<FileText size={28} />}
        />

        <StatCard
          title="Pending"
          value={stats.pendingComplaints || 0}
          color="text-orange-500"
          icon={<Clock size={28} />}
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedComplaints || 0}
          color="text-green-600"
          icon={<CheckCircle size={28} />}
        />

        <StatCard
          title="In Progress"
          value={stats.inProgressComplaints || 0}
          color="text-red-500"
          icon={<AlertTriangle size={28} />}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-4 min-h-[320px]">
          <h2 className="text-xl font-bold text-[#0B2E59] mb-4">
            Complaint Status Analytics
          </h2>

          <AnalyticsChart data={statusReport} type="pie" />
        </Card>

        <Card className="p-4 min-h-[320px]">
          <h2 className="text-xl font-bold text-[#0B2E59] mb-4">
            Department Analytics
          </h2>

          <AnalyticsChart data={departmentReport} type="bar" />
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0B2E59] mb-4">
          🏆 Top Department
        </h2>

        <h3 className="text-3xl font-bold">
          {departmentReport?.[0]?._id || "N/A"}
        </h3>

        <p className="text-gray-500">Highest complaint volume</p>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">
          Department Ranking
        </h2>

        <div className="space-y-4">
          {[...departmentReport]
            .sort((a, b) => (b.total || 0) - (a.total || 0))
            .map((dept, index) => (
              <div
                key={dept._id}
                className="
          flex
          justify-between
          items-center
          p-4
          border
          rounded-xl
          hover:bg-slate-50
          transition
          "
              >
                <div className="flex items-center gap-4">
                  <span
                    className="
              w-8
              h-8
              rounded-full
              bg-[#0B2E59]
              text-white
              flex
              items-center
              justify-center
              text-sm
              "
                  >
                    {index + 1}
                  </span>

                  <span className="font-semibold">{dept._id}</span>
                </div>

                <span className="font-bold text-blue-700">
                  {dept.total || 0} Cases
                </span>
              </div>
            ))}
        </div>
      </Card>

      <Card className="p-6 mb-6">
  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search complaints..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
      "
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
      "
    >
      <option value="">
        All Status
      </option>

      <option>Pending</option>
      <option>Under Review</option>
      <option>In Progress</option>
      <option>Resolved</option>
      <option>Rejected</option>
    </select>

    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value)
      }
      className="
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
      "
    >
      <option value="latest">
        Latest First
      </option>

      <option value="oldest">
        Oldest First
      </option>

      <option value="priority">
        Priority First
      </option>
    </select>

  </div>
</Card>

      {/* <Card className="p-6 mb-8">

  <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">

    Department Efficiency

  </h2>

  <div className="space-y-5">

    {departmentReport.map((dept) => (

      <div key={dept._id}>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            {dept._id}
          </span>

          <span className="font-bold">

            {dept.efficiency || 0}%

          </span>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-4">

          <div
            className={`
              h-4
              rounded-full
              ${
                dept.efficiency >= 90
                  ? "bg-green-500"
                  : dept.efficiency >= 70
                  ? "bg-blue-500"
                  : dept.efficiency >= 50
                  ? "bg-orange-500"
                  : "bg-red-500"
              }
            `}
            style={{
              width: `${dept.efficiency || 0}%`,
            }}
          />

        </div>

      </div>

    ))}

  </div>

</Card> */}

      <Card className="p-6 mt-4 shadow-xl overflow-x-auto border border-slate-200 bg-white">
        <div className="min-w-[940px]">
          <table className="w-full table-auto border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#0B2E59] text-white rounded-xl">
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Title</th>
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Department</th>
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Assign To</th>
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Priority</th>
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Status</th>
                <th className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em]">Actions</th>
              </tr>
            </thead>

            <tbody>
             {complaints
  .filter((complaint) =>
    complaint.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((complaint) =>
    statusFilter
      ? complaint.status === statusFilter
      : true
  )
  .sort((a, b) => {

    if (sortBy === "latest") {
      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    }

    if (sortBy === "priority") {

      const priorityOrder = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    return 0;
  })
  .map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b border-slate-200 hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-4 max-w-[320px] text-sm text-slate-800">
                    <div className="max-w-[320px] truncate" title={complaint.title}>
                      {complaint.title}
                    </div>
                  </td>

                  <td className="px-4 py-4 max-w-[180px] text-sm text-slate-700">
                    <div className="max-w-[180px] truncate" title={complaint.department}>
                      {complaint.department}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <select
                      onChange={(e) =>
                        handleDepartmentAssign(complaint._id, e.target.value)
                      }
                      className="w-[140px] border border-slate-300 rounded-xl px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Assign
                      </option>
                      <option>Roads</option>
                      <option>Water Supply</option>
                      <option>Electricity</option>
                      <option>Sanitation</option>
                      <option>Public Safety</option>
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                        complaint.priority === "Critical"
                          ? "bg-red-100 text-red-700"
                          : complaint.priority === "High"
                          ? "bg-orange-100 text-orange-700"
                          : complaint.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </td>

                  <td className="px-4 py-4 min-w-[150px]">
                    <div className="inline-flex items-center gap-2">
                      <StatusBadge status={complaint.status} />
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <select
                        onChange={(e) =>
                          handleStatusChange(complaint._id, e.target.value)
                        }
                        className="w-[145px] border border-slate-300 rounded-xl px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Change Status
                        </option>
                        <option>Pending</option>
                        <option>Under Review</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>

                      <button
                        onClick={() => setSelectedComplaint(complaint._id)}
                        className="bg-[#0B2E59] text-white px-4 py-2 rounded-xl shadow-sm hover:bg-[#0b2450] transition text-sm"
                      >
                        Remarks
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedComplaint && (
        <Card className="p-8 mt-4 shadow-xl">
          <h2 className="text-2xl font-bold text-[#0B2E59] mb-4">
            Add Administrative Remark
          </h2>

          <textarea
            rows="4"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter administrative remark..."
            className="
  w-full
  border
  border-slate-300
  rounded-xl
  p-4
  focus:ring-2
  focus:ring-blue-500
  outline-none
  "
          />

          <button
            onClick={handleAddRemark}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
          >
            Submit Remark
          </button>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboardPage;
