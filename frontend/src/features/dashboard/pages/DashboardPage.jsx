import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import PageLoader from "../../../components/common/PageLoader.jsx";
import StatCard from "../../../components/common/StatCard";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { getDashboardStats, getStatusReport, getDepartmentReport } from "../services/dashboardService";
import { getComplaints } from "../../complaints/services/complaintService";

const DashboardPage = () => {
  const [stats, setStats] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [statusReport, setStatusReport] = useState([]);
  const [departmentReport, setDepartmentReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getDashboardStats();
      setStats(statsData.stats || {});
      const complaintsData = await getComplaints();
      setComplaints(complaintsData.complaints || []);
      const statusData = await getStatusReport();
      setStatusReport(statusData.report || []);
      const departmentData = await getDepartmentReport();
      setDepartmentReport(departmentData.report || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const topComplaints = complaints.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Government of India
          </span>
          <span className="text-sm text-slate-500">Citizen Grievance Portal</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0B2E59] mb-2">Public Grievance Management System</h1>
        <p className="text-slate-600">Welcome back, <span className="font-semibold text-[#0B2E59]">{JSON.parse(localStorage.getItem("user"))?.name || "Citizen"}</span></p>
      </div>

      {/* Your Summary Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-4">Your Summary</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Filed" value={stats.totalComplaints || 0} color="text-[#0B2E59]" icon={<FileText size={28} />} />
          <StatCard title="Pending" value={stats.pendingComplaints || 0} color="text-amber-600" icon={<Clock size={28} />} />
          <StatCard title="In Progress" value={stats.inProgressComplaints || 0} color="text-indigo-600" icon={<AlertTriangle size={28} />} />
          <StatCard title="Resolved" value={stats.resolvedComplaints || 0} color="text-emerald-600" icon={<CheckCircle size={28} />} />
        </div>
      </div>

      {/* Quick Actions Section */}
      <Card className="p-8 mb-8 shadow-md">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-2">Quick Actions</h2>
        <p className="text-slate-600 mb-6">Access key features for managing your grievances</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/complaints/create" className="px-6 py-3 bg-[#0B2E59] text-white font-semibold rounded-lg shadow hover:bg-[#123D82] transition duration-200">
            Lodge Complaint
          </Link>
          <Link to="/complaints" className="px-6 py-3 border-2 border-[#0B2E59] text-[#0B2E59] font-semibold rounded-lg hover:bg-slate-100 transition duration-200">
            My Complaints
          </Link>
          <Link to="/track" className="px-6 py-3 border-2 border-[#138808] text-[#138808] font-semibold rounded-lg hover:bg-emerald-50 transition duration-200">
            Track Complaint
          </Link>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-8 mb-8">
        {/* Recent Complaints */}
        <Card className="p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2E59] mb-1">Recent Complaints</h2>
              <p className="text-slate-600 text-sm">Latest grievances filed</p>
            </div>
            <Link to="/complaints" className="text-[#0B2E59] font-semibold hover:text-[#123D82] mt-4 sm:mt-0">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#0B2E59] bg-slate-50">
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#0B2E59] uppercase">ID</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#0B2E59] uppercase">Title</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#0B2E59] uppercase">Department</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-[#0B2E59] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {topComplaints.length > 0 ? (
                  topComplaints.map((complaint) => (
                    <tr key={complaint._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-4 py-4 text-sm font-semibold text-[#0B2E59]">{complaint.trackingId}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{complaint.title}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{complaint.department}</td>
                      <td className="px-4 py-4 text-sm"><StatusBadge status={complaint.status} /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500">No complaints filed yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Status Overview and Department Efficiency */}
      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        {/* Complaint Status Overview */}
        <Card className="p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">Complaint Status Overview</h2>
          <div className="space-y-5">
            {statusReport.length > 0 ? (
              statusReport.map((item) => (
                <div key={item._id || item.status} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-slate-900 text-sm uppercase">{item._id || item.status}</p>
                    <p className="text-lg font-bold text-[#0B2E59]">{item.count || item.value}</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0B2E59] h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min((item.count || item.value) * 2, 100)}%` }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No status data available</p>
            )}
          </div>
        </Card>

        {/* Department Efficiency */}
        <Card className="p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">Department Efficiency</h2>
          <div className="space-y-5">
            {departmentReport.slice(0, 4).length > 0 ? (
              departmentReport.slice(0, 4).map((dept) => (
                <div key={dept._id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900">{dept._id}</p>
                      <p className="text-xs text-slate-500 mt-1">Resolved {dept.total || 0} cases</p>
                    </div>
                    <p className="text-lg font-bold text-[#0B2E59]">{dept.efficiency || 0}%</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dept.efficiency >= 75 ? "bg-emerald-500" : dept.efficiency >= 50 ? "bg-[#0B2E59]" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(dept.efficiency || 0, 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No department data available</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
