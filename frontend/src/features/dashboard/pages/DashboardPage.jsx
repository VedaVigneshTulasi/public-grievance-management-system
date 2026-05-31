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
    <div className="space-y-10">
      <PageHeader title={`Welcome back, ${JSON.parse(localStorage.getItem("user"))?.name || "Citizen"}`} subtitle="Track grievances, monitor resolutions, and manage your citizen dashboard with ease." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Complaints" value={stats.totalComplaints || 0} color="text-[#0B2E59]" icon={<FileText size={28} />} />
        <StatCard title="Pending" value={stats.pendingComplaints || 0} color="text-amber-600" icon={<Clock size={28} />} />
        <StatCard title="Resolved" value={stats.resolvedComplaints || 0} color="text-emerald-600" icon={<CheckCircle size={28} />} />
        <StatCard title="In Progress" value={stats.inProgressComplaints || 0} color="text-indigo-600" icon={<AlertTriangle size={28} />} />
      </div>

      <Card className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] p-8">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0B2E59]">Quick Actions</h2>
          <p className="text-slate-600">Use the quick links below to raise new grievances, review your cases, or track a complaint instantly.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/complaints/create" className="rounded-3xl bg-[#0B2E59] px-6 py-3 text-white shadow hover:bg-[#123D82] transition">Lodge Complaint</Link>
            <Link to="/complaints" className="rounded-3xl border border-[#0B2E59] px-6 py-3 text-[#0B2E59] hover:bg-slate-100 transition">My Complaints</Link>
            <Link to="/track" className="rounded-3xl border border-[#138808] px-6 py-3 text-[#138808] hover:bg-emerald-50 transition">Track Complaint</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#0B2E59]">Citizen Summary</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Total Filed</p>
              <p className="mt-2 text-3xl font-bold text-[#0B2E59]">{stats.totalComplaints || 0}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="mt-2 text-3xl font-bold text-amber-700">{stats.pendingComplaints || 0}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">In Progress</p>
              <p className="mt-2 text-3xl font-bold text-indigo-700">{stats.inProgressComplaints || 0}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2E59]">Recent Complaints</h2>
              <p className="text-slate-600">Latest grievances filed by you are displayed here.</p>
            </div>
            <Link to="/complaints" className="text-sm font-semibold text-[#123D82] hover:text-[#0B2E59]">View all complaints</Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="bg-[#0B2E59] text-white">
                  <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">ID</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">Title</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">Department</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">Status</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {topComplaints.map((complaint) => (
                  <tr key={complaint._id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                    <td className="px-4 py-4 text-sm font-semibold text-[#0B2E59]">{complaint.trackingId}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{complaint.title}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{complaint.department}</td>
                    <td className="px-4 py-4 text-sm"><StatusBadge status={complaint.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-8 bg-[#F8FAFC]">
          <h2 className="text-2xl font-bold text-[#0B2E59]">Complaint Status Overview</h2>
          <div className="mt-6 space-y-4">
            {statusReport.map((item) => (
              <div key={item._id || item.status} className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{item._id || item.status}</p>
                  <p className="text-sm text-slate-500">{item.count || item.value}</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-[#0B2E59]" style={{ width: `${Math.min((item.count || item.value) * 2, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <h2 className="text-2xl font-bold text-[#0B2E59]">Department Efficiency</h2>
        <div className="mt-6 space-y-4">
          {departmentReport.slice(0, 4).map((dept) => (
            <div key={dept._id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{dept._id}</p>
                  <p className="text-sm text-slate-500">Resolved {dept.total || 0} cases</p>
                </div>
                <p className="text-sm font-semibold text-[#123D82]">{dept.efficiency || 0}%</p>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${dept.efficiency >= 75 ? "bg-emerald-500" : dept.efficiency >= 50 ? "bg-[#123D82]" : "bg-amber-500"}`}
                  style={{ width: `${Math.min(dept.efficiency || 0, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
