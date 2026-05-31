import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Printer } from "lucide-react";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import PageLoader from "../../../components/common/PageLoader.jsx";
import ActivityTimeline from "../../../components/common/ActivityTimeline";
import { getComplaintById } from "../services/complaintService";

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint = async () => {
    try {
      const data = await getComplaintById(id);
      setComplaint(data.complaint);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!complaint) {
    return <div className="text-center py-10">Complaint Not Found</div>;
  }

  const statuses = ["Pending", "Under Review", "In Progress", "Resolved", "Rejected"];
  const currentIndex = statuses.indexOf(complaint.status);
  const progressWidth = ((currentIndex + 1) / statuses.length) * 100;

  return (
    <div className="space-y-8">
      <PageHeader title="Complaint Details" subtitle="Track complaint progress and department updates" />

      <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#0B2E59]">Complaint Information</h2>
            <p className="mt-2 text-slate-600">Review the grievance details, status, and history from the portal.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={complaint.status} />
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-2xl bg-[#0B2E59] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a264f]">
              <Printer size={18} /> Print
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tracking ID</p>
            <p className="mt-3 font-semibold text-[#0B2E59]">{complaint.trackingId || "N/A"}</p>
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
      </Card>

      <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-[#0B2E59] mb-6">Status Progress</h2>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-5">
            {statuses.map((status, index) => (
              <div key={status} className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white ${index <= currentIndex ? "bg-[#138808]" : "bg-slate-300"}`}>
                  {index <= currentIndex ? "✓" : index + 1}
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">{status}</p>
              </div>
            ))}
          </div>
          <div className="w-full rounded-full bg-slate-200 h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-[#138808] transition-all duration-500" style={{ width: `${progressWidth}%` }} />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-[#0B2E59] mb-4">Complaint Description</h2>
          <p className="text-slate-700 leading-7">{complaint.description}</p>
        </Card>

        <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-[#F8FAFC]">
          <h2 className="text-2xl font-semibold text-[#0B2E59] mb-4">Action Snapshot</h2>
          <div className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Current Status</p>
              <p className="mt-1 text-slate-600">{complaint.status}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Priority Level</p>
              <p className="mt-1 text-slate-600">{complaint.priority}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Assigned Department</p>
              <p className="mt-1 text-slate-600">{complaint.department}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-[#0B2E59] mb-6">Attachments</h2>
        {complaint.attachments?.length > 0 ? (
          <div className="space-y-3">
            {complaint.attachments.map((file, index) => (
              <a key={index} href={`http://localhost:5000${file.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100">
                <span className="text-lg">📄</span>
                <span>{file.fileName}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No attachments uploaded.</p>
        )}
      </Card>

      <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-[#0B2E59] mb-6">Remarks Timeline</h2>
        {complaint.remarks?.length > 0 ? (
          <div className="space-y-4">
            {complaint.remarks.map((remark, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{remark.text}</p>
                <p className="mt-2 text-sm text-slate-500">{new Date(remark.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No remarks available.</p>
        )}
      </Card>

      <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-[#0B2E59] mb-6">Activity Timeline</h2>
        <ActivityTimeline complaint={complaint} />
      </Card>
    </div>
  );
};

export default ComplaintDetailsPage;
