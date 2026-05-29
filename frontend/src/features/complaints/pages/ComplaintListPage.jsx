import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintCard from "../components/ComplaintCard";

import Loader from "../../../components/common/Loader";

import {
  getComplaintsApi,
} from "../services/complaintService";

const ComplaintListPage = () => {

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    fetchComplaints();

  }, [search, status]);

  const fetchComplaints =
    async () => {

      try {

        const response =
          await getComplaintsApi({
            search,
            status,
          });

        setComplaints(
          response.complaints
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>

      <PageContainer>

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#0b2e59]">
            My Complaints
          </h1>

          <p className="text-gray-600 mt-2">
            Track and monitor your complaints
          </p>

        </div>

        {/* Filters */}

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border border-gray-300 p-3 rounded w-full"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border border-gray-300 p-3 rounded"
          >

            <option value="">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Resolved">
              Resolved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

        {/* Complaint List */}

        <div className="space-y-6">

          {
            complaints.map(
              (complaint) => (
                <ComplaintCard
                  key={complaint._id}
                  complaint={complaint}
                />
              )
            )
          }

        </div>

      </PageContainer>

    </DashboardLayout>
  );
};

export default ComplaintListPage;