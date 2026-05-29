import { useEffect, useState } from "react";

import Navbar from "../../../components/layout/Navbar";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintCard from "../components/ComplaintCard";

import { getComplaintsApi } from "../services/complaintService";

import Loader from "../../../components/common/Loader";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import SkeletonCard from "../../../components/common/SkeletonCard";

const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComplaints();
  }, [search, status,page]);

  const fetchComplaints = async () => {
    try {
      const response = await getComplaintsApi({
        search,
        status,
        page,
        limit: 5,
      });

      setTotalPages(response.totalPages);

      setComplaints(response.complaints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

if (loading) {

  return (
    <DashboardLayout>

      <PageContainer>

        <div className="space-y-6">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

      </PageContainer>

    </DashboardLayout>
  );
}

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <DashboardLayout />

      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0b2e59]">My Complaints</h1>

          <p className="text-gray-600 mt-2">
            Track and monitor your complaints
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-3 rounded"
          >
            <option value="">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Resolved">Resolved</option>

            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">

  <button
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
    className="bg-[#0b2e59] text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={
      page === totalPages
    }
    onClick={() =>
      setPage(page + 1)
    }
    className="bg-[#0b2e59] text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
      </PageContainer>
    </div>


  
  );
};

export default ComplaintListPage;
