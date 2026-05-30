import {
  useEffect,
  useState,
} from "react";
 
import {
  Link,
} from "react-router-dom";
 
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
 
import {
  getComplaints,
} from "../services/complaintService";
 
const ComplaintListPage = () => {
 
  const [complaints, setComplaints] =
    useState([]);
 
  const [search, setSearch] =
    useState("");
 
  const [status, setStatus] =
    useState("");
 
  const [page, setPage] =
    useState(1);
 
  const [totalPages,
    setTotalPages] =
    useState(1);
 
  useEffect(() => {
 
    loadComplaints();
 
  }, [page, search, status]);
 
  const loadComplaints =
    async () => {
 
      try {
 
        const data =
          await getComplaints(
            page,
            search,
            status
          );
 
        setComplaints(
          data.complaints
        );
 
        setTotalPages(
          data.totalPages
        );
 
      } catch (error) {
 
        console.log(error);
      }
    };
 
  return (
<div>
 
      <PageHeader
        title="My Complaints"
        subtitle="View and track your complaints"
      />
 
      <Card className="p-6">
 
        <div className="flex flex-col md:flex-row gap-4 mb-6">
 
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
            className="border border-gray-300 rounded-lg px-4 py-3"
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
 
        </div>
 
        <div className="overflow-x-auto">
 
          <table className="w-full">
 
            <thead>
 
              <tr className="border-b">
 
                <th className="text-left py-3">
                  Title
</th>
 
                <th className="text-left py-3">
                  Department
</th>
 
                <th className="text-left py-3">
                  Priority
</th>
 
                <th className="text-left py-3">
                  Status
</th>
 
                <th className="text-left py-3">
                  Action
</th>
 
              </tr>
 
            </thead>
 
            <tbody>
 
              {
                complaints.map(
                  (
                    complaint
                  ) => (
 
                    <tr
                      key={
                        complaint._id
                      }
                      className="border-b"
>
 
                      <td className="py-4">
                        {
                          complaint.title
                        }
</td>
 
                      <td className="py-4">
                        {
                          complaint.department
                        }
</td>
 
                      <td className="py-4">
                        {
                          complaint.priority
                        }
</td>
 
                      <td className="py-4">
 
                        <StatusBadge
                          status={
                            complaint.status
                          }
                        />
 
                      </td>
 
                      <td className="py-4">
 
                        <Link
                          to={`/complaints/${complaint._id}`}
                          className="text-blue-600"
>
                          View
</Link>
 
                      </td>
 
                    </tr>
                  )
                )
              }
 
            </tbody>
 
          </table>
 
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
 
export default ComplaintListPage