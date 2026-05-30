import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import Skeleton from "../../../components/common/Skeleton";

import {
  getComplaints,
  deleteComplaint,
} from "../services/complaintService";

const ComplaintListPage = () => {
  const [complaints, setComplaints] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadComplaints();
  }, [page, search, status, sortBy]);

  const loadComplaints = async () => {
    try {
      const data =
        await getComplaints(
          page,
          search,
          status
        );

      let complaintData =
        [...(data.complaints || [])];

      if (
        sortBy ===
        "priority"
      ) {
        const priorityOrder = {
          Critical: 4,
          High: 3,
          Medium: 2,
          Low: 1,
        };

        complaintData.sort(
          (a, b) =>
            priorityOrder[
              b.priority
            ] -
            priorityOrder[
              a.priority
            ]
        );
      }

      setComplaints(
        complaintData
      );

      setTotalPages(
        data.totalPages || 1
      );
    } catch (error) {
      toast.error(
        "Failed To Load Complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this complaint?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteComplaint(id);

        toast.success(
          "Complaint Deleted Successfully"
        );

        loadComplaints();
      } catch (error) {
        toast.error(
          "Failed To Delete Complaint"
        );
      }
    };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <PageHeader
        title="My Complaints"
        subtitle="Track and manage grievances"
      />

      <Card className="p-6">

        <div className="flex flex-col lg:flex-row gap-4 mb-6">

          <SearchBar
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="">
              All Status
            </option>

            <option>
              Pending
            </option>

            <option>
              Under Review
            </option>

            <option>
              In Progress
            </option>

            <option>
              Resolved
            </option>

            <option>
              Rejected
            </option>

          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="latest">
              Latest First
            </option>

            <option value="priority">
              Priority First
            </option>

          </select>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100">

                <th className="p-4 text-left">
                  Tracking ID
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Department
                </th>

                <th className="p-4 text-left">
                  Priority
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints.map(
                (complaint) => (

                  <tr
                    key={
                      complaint._id
                    }
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold text-[#0B2E59]">
                      {
                        complaint.trackingId ||
                        "N/A"
                      }
                    </td>

                    <td className="p-4">
                      {
                        complaint.title
                      }
                    </td>

                    <td className="p-4">
                      {
                        complaint.department
                      }
                    </td>

                    <td className="p-4">
                      {
                        complaint.priority
                      }
                    </td>

                    <td className="p-4">

                      <StatusBadge
                        status={
                          complaint.status
                        }
                      />

                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                        <Link
                          to={`/complaints/${complaint._id}`}
                          className="text-blue-600 font-medium"
                        >
                          View
                        </Link>

                        <Link
                          to={`/complaints/edit/${complaint._id}`}
                          className="text-green-600 font-medium"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              complaint._id
                            )
                          }
                          className="text-red-600 font-medium"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <Pagination
          currentPage={page}
          totalPages={
            totalPages
          }
          onPageChange={
            setPage
          }
        />

      </Card>

    </div>
  );
};

export default ComplaintListPage;