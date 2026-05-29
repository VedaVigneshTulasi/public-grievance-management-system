import Navbar from "../../../components/layout/Navbar";

import PageContainer from "../../../components/layout/PageContainer";

import StatCard from "../../../components/common/StatCard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      <Navbar />

      <PageContainer>

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-[#0b2e59]">
            Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Monitor and manage public grievances efficiently
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Total Complaints"
            value="120"
          />

          <StatCard
            title="Pending"
            value="45"
          />

          <StatCard
            title="Resolved"
            value="60"
          />

          <StatCard
            title="Rejected"
            value="15"
          />

        </div>

      </PageContainer>

    </div>
  );
};

export default DashboardPage;