const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-2xl bg-[#0B2E59] px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#123D82]"
      >
        Previous
      </button>
      <div className="text-sm text-slate-600">
        Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-2xl bg-[#0B2E59] px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#123D82]"
      >
        Next
      </button>
    </div>
  );
};
 
export default Pagination;
 