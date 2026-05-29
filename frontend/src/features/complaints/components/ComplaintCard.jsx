import { useNavigate } from "react-router-dom";
 
import StatusBadge from "../../../components/common/StatusBadge";
 
const ComplaintCard = ({
  complaint,
}) => {
 
  const navigate = useNavigate();
 
  return (
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
 
      <div className="flex items-start justify-between">
 
        <div>
 
          <h2 className="text-xl font-bold text-[#0b2e59]">
            {complaint.title}
</h2>
 
          <p className="text-gray-600 mt-2">
            {complaint.description.slice(
              0,
              100
            )}...
</p>
 
        </div>
 
        <StatusBadge
          status={complaint.status}
        />
 
      </div>
 
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
 
        <div>
<span className="font-semibold">
            Department:
</span>
 
          <p>{complaint.department}</p>
</div>
 
        <div>
<span className="font-semibold">
            Priority:
</span>
 
          <p>{complaint.priority}</p>
</div>
 
      </div>
 
      <button
        onClick={() =>
          navigate(
            `/complaints/${complaint._id}`
          )
        }
        className="mt-6 bg-[#0b2e59] hover:bg-[#163d73] text-white px-4 py-2 rounded"
>
        View Details
</button>
 
    </div>
  );
};
 
export default ComplaintCard;