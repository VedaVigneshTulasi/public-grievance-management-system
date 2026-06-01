import { useEffect, useState } from "react";
import { Download, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader.jsx";
import { getSystemReports } from "../services/adminService";

const SystemReportsPage = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("month");

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = async () => {
    try {
      const data = await getSystemReports({ range: dateRange });
      setReports(data);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(reports, null, 2)], {
        type: "application/json",
      });
      element.href = URL.createObjectURL(file);
      element.download = `system-report-${new Date().getTime()}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Report downloaded successfully");
    } catch (error) {
      toast.error("Failed to download report");
    }
  };

  if (loading) {
    return <PageLoader />;
  }

 const mockReports =
  reports?.performanceMetrics
    ? reports
    : {
    complaintsByStatus: {
      Pending: 15,
      "Under Review": 8,
      "In Progress": 12,
      Resolved: 25,
      Rejected: 5,
    },
    complaintsByPriority: {
      Critical: 8,
      High: 15,
      Medium: 22,
      Low: 20,
    },
    complaintsByDepartment: {
      Roads: 20,
      Water: 15,
      Electricity: 18,
      Sanitation: 12,
      "Public Safety": 10,
    },
    monthlyTrend: [
      { month: "Jan", complaints: 12, resolved: 8, pending: 4 },
      { month: "Feb", complaints: 15, resolved: 10, pending: 5 },
      { month: "Mar", complaints: 18, resolved: 12, pending: 6 },
      { month: "Apr", complaints: 22, resolved: 16, pending: 6 },
      { month: "May", complaints: 25, resolved: 18, pending: 7 },
      { month: "Jun", complaints: 28, resolved: 20, pending: 8 },
    ],
    performanceMetrics: {
      averageResolutionTime: "4.5 days",
      resolutionRate: "78%",
      citizenSatisfaction: "4.2/5",
      departmentEfficiency: "82%",
    },
  };

  const totalComplaints = Object.values(mockReports.complaintsByStatus).reduce(
    (a, b) => a + b,
    0
  );
  const resolvedCount = mockReports.complaintsByStatus.Resolved || 0;
  const resolutionRate = ((resolvedCount / totalComplaints) * 100).toFixed(1);

  return (
    <div>
      <PageHeader
        title="System Reports & Analytics"
        subtitle="Comprehensive system statistics and trends"
      />

      {/* Date Range & Download */}
      <Card className="p-6 mb-8 flex justify-between items-center">
        <div className="flex gap-4">
          <label className="text-sm font-semibold text-gray-700">Date Range:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download size={18} />
          Download Report
        </button>
      </Card>

      {/* Key Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold">Total Complaints</h3>
              <p className="text-3xl font-bold text-blue-700 mt-2">{totalComplaints}</p>
            </div>
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <p className="text-xs text-gray-500 mt-2">↑ 5% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold">Resolution Rate</h3>
              <p className="text-3xl font-bold text-green-700 mt-2">{resolutionRate}%</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-xs text-gray-500 mt-2">↑ 2% improvement</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold">Avg Resolution Time</h3>
              <p className="text-3xl font-bold text-orange-700 mt-2">
                {mockReports?.performanceMetrics
  ?.averageResolutionTime || "N/A"}
              </p>
            </div>
            <TrendingDown className="text-orange-600" size={24} />
          </div>
          <p className="text-xs text-gray-500 mt-2">↓ 0.5 days faster</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold">Satisfaction</h3>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                {mockReports?.performanceMetrics
  ?.citizenSatisfaction || "N/A"}
              </p>
            </div>
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          <p className="text-xs text-gray-500 mt-2">↑ 0.3 points increase</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Complaints by Status */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Complaints by Status</h3>
          <div className="space-y-4">
            {Object.entries(mockReports.complaintsByStatus).map(([status, count]) => (
              <div key={status}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{status}</span>
                  <span className="font-bold text-blue-700">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${(count / totalComplaints) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Complaints by Priority */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Complaints by Priority</h3>
          <div className="space-y-4">
            {Object.entries(mockReports.complaintsByPriority).map(([priority, count]) => {
              const colors = {
                Critical: "bg-red-600",
                High: "bg-orange-600",
                Medium: "bg-yellow-600",
                Low: "bg-green-600",
              };
              return (
                <div key={priority}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{priority}</span>
                    <span className="font-bold text-gray-800">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${colors[priority]} h-3 rounded-full transition-all`}
                      style={{
                        width: `${
                          (count /
                            Object.values(
                              mockReports.complaintsByPriority
                            ).reduce((a, b) => a + b, 0)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Department Complaints</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(mockReports.complaintsByDepartment).map(([dept, count]) => (
            <div key={dept} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="font-medium text-gray-700">{dept}</span>
              <span className="text-2xl font-bold text-blue-600">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Monthly Trend</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Month</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Total Complaints
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Resolved
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Pending
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReports.monthlyTrend.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.month}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{row.complaints}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{row.resolved}</td>
                  <td className="px-4 py-3 text-sm font-bold text-orange-600">{row.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SystemReportsPage;
