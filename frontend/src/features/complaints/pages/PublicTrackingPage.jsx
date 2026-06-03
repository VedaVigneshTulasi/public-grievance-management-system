import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import { trackComplaint } from "../services/complaintService";

const PublicTrackingPage = () => {
  const navigate = useNavigate();

  const [trackingId,
    setTrackingId] =
    useState("");

  const [complaint,
    setComplaint] =
    useState(null);

  const [error,
    setError] =
    useState("");

  const handleSearch =
    async () => {

      try {

        setError("");

        const data =
          await trackComplaint(
            trackingId
          );

        setComplaint(
          data.complaint
        );

      } catch (error) {

        setComplaint(null);

        setError(
          "Complaint Not Found"
        );

      }
    };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <PageHeader title="Public Complaint Tracking" subtitle="Track your grievance using the official tracking ID" />

      <Card className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
          />
          <button
            onClick={handleSearch}
            className="rounded-3xl bg-[#0B2E59] px-6 py-4 text-sm font-semibold text-white shadow hover:bg-[#123D82] transition"
          >
            Track Complaint
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-3xl bg-[#138808] px-6 py-4 text-sm font-semibold text-white shadow hover:bg-[#0D6B06] transition"
          >
            Dashboard
          </button>
        </div>
      </Card>

      {error && (
        <Card className="rounded-[32px] border border-red-200 bg-red-50 p-6 text-red-800">
          {error}
        </Card>
      )}

      {complaint && (
        <Card className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2E59]">Complaint Details</h2>
              <p className="text-slate-600">View the complaint status and description below.</p>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tracking ID</p>
              <p className="mt-3 font-semibold text-slate-900">{complaint.trackingId}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Department</p>
              <p className="mt-3 font-semibold text-slate-900">{complaint.department}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Priority</p>
              <p className="mt-3 font-semibold text-slate-900">{complaint.priority}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Location</p>
              <p className="mt-3 font-semibold text-slate-900">{complaint.location}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Submitted</p>
              <p className="mt-3 font-semibold text-slate-900">{new Date(complaint.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Description</p>
            <p className="mt-3 text-slate-700 leading-7">{complaint.description}</p>
          </div>
        </Card>
      )}

    </div>
  );
};

export default PublicTrackingPage;