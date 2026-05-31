const PageLoader = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-[#123D82] animate-spin"></div>
        <p className="text-slate-600 font-medium">Loading government services...</p>
      </div>
    </div>
  );
};

export default PageLoader;