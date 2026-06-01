import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import Skeleton from "../../../components/common/Skeleton";
import PageLoader from "../../../components/common/PageLoader.jsx";
import Table from "../../../components/common/Table";

import { getComplaints, deleteComplaint } from "../services/complaintService";

const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [sortBy, setSortBy] = useState("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, [page, search, status, sortBy]);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints(page, search, status);

      let complaintData = [...(data.complaints || [])];

      /* Latest */

      if (sortBy === "latest") {
        complaintData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      }

      /* Oldest */

      if (sortBy === "oldest") {
        complaintData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      }

      /* Priority */

      if (sortBy === "priority") {
        const priorityOrder = {
          Critical: 4,
          High: 3,
          Medium: 2,
          Low: 1,
        };

        complaintData.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
        );
      }

      setComplaints(complaintData);

      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Failed To Load Complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) return;

    try {
      await deleteComplaint(id);

      toast.success("Complaint Deleted Successfully");

      loadComplaints();
    } catch (error) {
      toast.error("Failed To Delete Complaint");
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <PageHeader
        title="My Complaints"
        subtitle="Track and manage grievances through the Government portal"
      />

      <Card className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#123D82]">
              Complaint Registry
            </p>
            <p className="mt-2 text-slate-600">
              Review cases, check status updates, and manage your grievances.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#0B2E59] focus:ring-2 focus:ring-[#0B2E59]/10"
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#0B2E59] focus:ring-2 focus:ring-[#0B2E59]/10"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority First</option>
            </select>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table
            columns={[
              "Tracking ID",
              "Title",
              "Department",
              "Priority",
              "Status",
              "Actions",
            ]}
          >
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="odd:bg-slate-50 hover:bg-slate-100 transition">
                <td className="px-3 py-4 align-middle font-semibold text-[#0B2E59] text-sm whitespace-nowrap">
                  {complaint.trackingId}
                </td>

                <td className="px-3 py-4 align-middle max-w-[220px] break-words whitespace-normal">
                  {complaint.title}
                </td>

                <td className="px-3 py-4 align-middle max-w-[160px] break-words whitespace-normal">
                  {complaint.department}
                </td>

                <td className="px-3 py-4 align-middle whitespace-nowrap">{complaint.priority}</td>
                <td className="px-3 py-4 align-middle font-semibold text-[#0B2E59] text-sm whitespace-nowrap">
                  <StatusBadge status={complaint.status} />
                </td>

                <td className="px-3 py-4 align-middle text-right">
                  <div className="inline-flex items-center justify-end gap-2 whitespace-nowrap">
                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="inline-flex items-center justify-center h-8 rounded-md bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      View
                    </Link>

                    <Link
                      to={`/complaints/edit/${complaint._id}`}
                      className="inline-flex items-center justify-center h-8 rounded-md bg-emerald-100 px-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(complaint._id)}
                      className="inline-flex items-center justify-center h-8 rounded-md bg-rose-100 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
};

export default ComplaintListPage;
