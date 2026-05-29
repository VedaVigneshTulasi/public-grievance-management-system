import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import PageContainer from "../../../components/layout/PageContainer";

import StatusBadge from "../../../components/common/StatusBadge";

import Loader from "../../../components/common/Loader";

import {
  getComplaintByIdApi,
} from "../services/complaintService";

const ComplaintDetailsPage = () => {

  const { id } = useParams();

  const [complaint, setComplaint] =
    useState(null);

  useEffect(() => {

    fetchComplaint();

  }, []);

  const fetchComplaint =
    async () => {

      try {

        const response =
          await getComplaintByIdApi(id);

        setComplaint(
          response.complaint
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!complaint) {
    return <Loader />;
  }

  return (
    <DashboardLayout>

      <PageContainer>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-3xl font-bold text-[#0b2e59]">
              {complaint.title}
            </h1>

            <StatusBadge
              status={complaint.status}
            />

          </div>

          <div className="mt-6 space-y-6">

            <div>

              <h3 className="font-semibold text-lg">
                Description
              </h3>

              <p className="text-gray-700 mt-2 leading-7">
                {complaint.description}
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <h3 className="font-semibold">
                  Department
                </h3>

                <p className="mt-1">
                  {complaint.department}
                </p>

              </div>

              <div>

                <h3 className="font-semibold">
                  Priority
                </h3>

                <p className="mt-1">
                  {complaint.priority}
                </p>

              </div>

              <div>

                <h3 className="font-semibold">
                  Location
                </h3>

                <p className="mt-1">
                  {complaint.location}
                </p>

              </div>

              <div>

                <h3 className="font-semibold">
                  Status
                </h3>

                <p className="mt-1">
                  {complaint.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </PageContainer>

    </DashboardLayout>
  );
};

export default ComplaintDetailsPage;