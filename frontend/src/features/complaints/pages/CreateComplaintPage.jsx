import DashboardLayout from "../../../components/layout/DashboardLayout";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintForm from "../components/ComplaintForm";

const CreateComplaintPage = () => {

  return (
    <DashboardLayout>

      <PageContainer>

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#0b2e59]">
            Lodge Complaint
          </h1>

          <p className="text-gray-600 mt-2">
            Submit and track your public grievance complaints
          </p>

        </div>

        <div className="max-w-4xl">

          <ComplaintForm />

        </div>

      </PageContainer>

    </DashboardLayout>
  );
};

export default CreateComplaintPage;