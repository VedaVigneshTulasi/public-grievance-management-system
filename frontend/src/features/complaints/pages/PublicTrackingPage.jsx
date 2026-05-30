import { useState } from "react";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";

import {
  trackComplaint,
} from "../services/complaintService";

const PublicTrackingPage = () => {

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
    <div className="max-w-5xl mx-auto py-10">

      <PageHeader
        title="Public Complaint Tracking"
        subtitle="Track complaint using Tracking ID"
      />

      <Card className="p-6 mb-8">

        <div className="flex gap-4">

          <input
            type="text"
            value={trackingId}
            onChange={(e) =>
              setTrackingId(
                e.target.value
              )
            }
            placeholder="Enter Tracking ID"
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            onClick={
              handleSearch
            }
            className="bg-[#0B2E59] text-white px-6 rounded-lg"
          >
            Track
          </button>

        </div>

      </Card>

      {error && (

        <Card className="p-6 text-red-600">

          {error}

        </Card>

      )}

      {complaint && (

        <Card className="p-8">

          <h2 className="text-2xl font-bold mb-6">

            Complaint Details

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <strong>
                Tracking ID
              </strong>

              <p>
                {
                  complaint.trackingId
                }
              </p>

            </div>

            <div>

              <strong>
                Status
              </strong>

              <p>
                {
                  complaint.status
                }
              </p>

            </div>

            <div>

              <strong>
                Department
              </strong>

              <p>
                {
                  complaint.department
                }
              </p>

            </div>

            <div>

              <strong>
                Priority
              </strong>

              <p>
                {
                  complaint.priority
                }
              </p>

            </div>

            <div>

              <strong>
                Location
              </strong>

              <p>
                {
                  complaint.location
                }
              </p>

            </div>

          </div>

          <div className="mt-8">

            <strong>
              Description
            </strong>

            <p className="mt-2">
              {
                complaint.description
              }
            </p>

          </div>

        </Card>

      )}

    </div>
  );
};

export default PublicTrackingPage;