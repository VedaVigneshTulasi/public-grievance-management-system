import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";

import {
  getComplaintById,
} from "../services/complaintService";

const ComplaintDetailsPage = () => {

  const { id } = useParams();

  const [complaint, setComplaint] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadComplaint();

  }, []);

  const loadComplaint =
    async () => {

      try {

        const data =
          await getComplaintById(id);

        setComplaint(
          data.complaint
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (
      <div className="text-center py-10">
        Loading Complaint...
      </div>
    );
  }

  if (!complaint) {

    return (
      <div className="text-center py-10">
        Complaint Not Found
      </div>
    );
  }

  return (
    <div>

      <PageHeader
        title="Complaint Details"
        subtitle="Track complaint progress and remarks"
      />

      {/* Complaint Info */}

      <Card className="p-8 mb-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <h3 className="text-gray-500 text-sm">
              Complaint Title
            </h3>

            <p className="font-semibold text-lg mt-1">
              {complaint.title}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Department
            </h3>

            <p className="font-semibold text-lg mt-1">
              {complaint.department}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Priority
            </h3>

            <p className="font-semibold text-lg mt-1">
              {complaint.priority}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Status
            </h3>

            <div className="mt-2">

              <StatusBadge
                status={complaint.status}
              />

            </div>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Location
            </h3>

            <p className="font-semibold text-lg mt-1">
              {complaint.location}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Created Date
            </h3>

            <p className="font-semibold text-lg mt-1">

              {
                new Date(
                  complaint.createdAt
                ).toLocaleDateString()
              }

            </p>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="text-gray-500 text-sm">
            Description
          </h3>

          <p className="mt-2 text-gray-700">
            {complaint.description}
          </p>

        </div>

      </Card>

      {/* Remarks Timeline */}

      <Card className="p-8 mb-8">

        <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">

          Remarks Timeline

        </h2>

        {
          complaint.remarks &&
          complaint.remarks.length > 0 ? (

            <div className="space-y-6">

              {
                complaint.remarks.map(
                  (
                    remark,
                    index
                  ) => (

                    <div
                      key={index}
                      className="border-l-4 border-[#0B2E59] pl-4"
                    >

                      <p className="font-medium">
                        {remark.text}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">

                        {
                          new Date(
                            remark.createdAt
                          ).toLocaleString()
                        }

                      </p>

                    </div>
                  )
                )
              }

            </div>

          ) : (

            <p className="text-gray-500">

              No remarks available

            </p>
          )
        }

      </Card>

      {/* Activity Timeline */}

      <Card className="p-8">

        <h2 className="text-2xl font-bold text-[#0B2E59] mb-6">

          Activity Timeline

        </h2>

        <div className="space-y-6">

          <div className="border-l-4 border-green-500 pl-4">

            <p className="font-medium">
              Complaint Created
            </p>

            <p className="text-sm text-gray-500">

              {
                new Date(
                  complaint.createdAt
                ).toLocaleString()
              }

            </p>

          </div>

          <div className="border-l-4 border-blue-500 pl-4">

            <p className="font-medium">
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