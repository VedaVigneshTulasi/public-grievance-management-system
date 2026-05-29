import Navbar from "../../../components/layout/Navbar";

import PageContainer from "../../../components/layout/PageContainer";

import ComplaintForm from "../components/ComplaintForm";

const CreateComplaintPage = () => {

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      <Navbar />

      <PageContainer>

        <ComplaintForm />

      </PageContainer>

    </div>
  );
};

export default CreateComplaintPage;