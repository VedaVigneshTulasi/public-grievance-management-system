const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-100 text-amber-700 border border-amber-200",
    "Under Review": "bg-sky-100 text-sky-700 border border-sky-200",
    "In Progress": "bg-indigo-100 text-indigo-700 border border-indigo-200",
    Resolved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;