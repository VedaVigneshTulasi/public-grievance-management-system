const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Government of India</p>
      <h1 className="mt-3 text-4xl font-bold text-[#0B2E59]">{title}</h1>
      <p className="mt-3 text-slate-600 max-w-3xl">{subtitle}</p>
    </div>
  );
};

export default PageHeader;