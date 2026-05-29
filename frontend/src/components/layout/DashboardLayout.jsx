import Sidebar from "./Sidebar";

const DashboardLayout = ({
  children,
}) => {

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-72">

        <main className="p-4 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;