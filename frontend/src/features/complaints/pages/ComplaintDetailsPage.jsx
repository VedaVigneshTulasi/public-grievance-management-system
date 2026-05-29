
import {
  useEffect,
  useState,
} from "react";
 
import {
  useParams,
} from "react-router-dom";
 
import Navbar from "../../../components/layout/Navbar";
 
import PageContainer from "../../../components/layout/PageContainer";
 
import StatusBadge from "../../../components/common/StatusBadge";
 
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
    return (
<h1 className="p-10">
        Loading...
</h1>
    );
  }
 
  return (
<div className="min-h-screen bg-[#f5f7fa]">
 
      <Navbar />
 
      <PageContainer>
 
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
 
          <div className="flex items-center justify-between">
 
            <h1 className="text-3xl font-bold text-[#0b2e59]">
              {complaint.title}
</h1>
 
            <StatusBadge
              status={complaint.status}
            />
 
          </div>
 
          <div className="mt-6 space-y-4">
 
            <div>
<h3 className="font-semibold">
                Description
</h3>
 
              <p className="text-gray-700 mt-2">
                {complaint.description}
</p>
</div>
 
            <div className="grid grid-cols-2 gap-6">
 
              <div>
<h3 className="font-semibold">
                  Department
</h3>
 
                <p>
                  {complaint.department}
</p>
</div>
 
              <div>
<h3 className="font-semibold">
                  Priority
</h3>
 
                <p>
                  {complaint.priority}
</p>
</div>
 
              <div>
<h3 className="font-semibold">
                  Location
</h3>
 
                <p>
                  {complaint.location}
</p>
</div>
 
            </div>
 
          </div>
 
        </div>
 
      </PageContainer>
 
    </div>
  );
};
 
export default ComplaintDetailsPage;