const Table = ({ columns = [], children }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-[#0B2E59] text-white">
            <tr className="sticky top-0 shadow-sm">
              {columns.map((column) => (
                <th key={column} className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;