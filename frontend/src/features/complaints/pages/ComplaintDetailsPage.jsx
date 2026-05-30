import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import Skeleton from "../../../components/common/Skeleton";

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
    return <Skeleton />;
  }

  if (!complaint) {
    return (
      <div className="text-center py-10">
        Complaint Not Found
      </div>
    );
  }

  const statuses = [
    "Pending",
    "Under Review",
    "In Progress",
    "Resolved",
  ];

  const currentIndex = statuses.indexOf(
    complaint.status
  );

  return (
    <div>
      <PageHeader
        title="Complaint Details"
        subtitle="Track complaint progress and updates"
      />

      {/* Complaint Information */}

      <Card className="p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0B2E59]">
            Complaint Information
          </h2>

          <StatusBadge
            status={complaint.status}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div>
            <h3 className="text-gray-500 text-sm">
              Tracking ID
            </h3>

            <p className="font-bold text-[#0B2E59] text-lg mt-1">
              {complaint.trackingId ||
                "Not Available"}
            </p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm">
              Complaint Title
            </h3>

            <p className="font-semibold mt-1">
              {complaint.title}
            </p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm">
              Department
            </h3>

            <p className="font-semibold mt-1">
              {complaint.department}
            </p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm">
              Priority
            </h3>

            <p className="font-semibold mt-1">
              {complaint.priority}
            </p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm">
              Location
            </h3>

            <p className="font-semibold mt-1">
              {complaint.location}
            </p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm">
              Created Date
            </h3>

            <p className="font-semibold mt-1">
              {new Date(
                complaint.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>
      </Card>

      {/* Government Tracking Timeline */}

      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-8">
          Complaint Progress Tracker
        </h2>

        <div className="space-y-6">

          {statuses.map(
            (status, index) => (
              <div
                key={status}
                className="flex items-center gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index <= currentIndex
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  {index <= currentIndex
                    ? "✓"
                    : ""}
                </div>

                <div>
                  <p className="font-semibold">
                    {status}
                  </p>

                  <p className="text-sm text-gray-500">
                    {index <= currentIndex
                      ? "Completed"
                      : "Pending"}
                  </p>
                </div>

              </div>
            )
          )}

        </div>
      </Card>

      {/* Description */}

      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-4">
          Complaint Description
        </h2>

        <p className="text-gray-700 leading-7">
          {complaint.description}
        </p>
      </Card>

      {/* Remarks Timeline */}

      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">
          Remarks Timeline
        </h2>

        {complaint.remarks &&
        complaint.remarks.length > 0 ? (
          <div className="space-y-6">

            {complaint.remarks.map(
              (remark, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#0B2E59] pl-4"
                >
                  <p className="font-medium">
                    {remark.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      remark.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              )
            )}

          </div>
        ) : (
          <p className="text-gray-500">
            No remarks available
          </p>
        )}
      </Card>

      {/* Activity Timeline */}

      <Card className="p-8">
        <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">
          Activity Timeline
        </h2>

        <div className="space-y-6">

          <div className="border-l-4 border-green-600 pl-4">
            <p className="font-semibold">
              Complaint Created
            </p>

            <p className="text-sm text-gray-500">
              {new Date(
                complaint.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-semibold">
              Current Status
            </p>

            <p className="text-sm text-gray-500">
              {complaint.status}
            </p>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default ComplaintDetailsPage;