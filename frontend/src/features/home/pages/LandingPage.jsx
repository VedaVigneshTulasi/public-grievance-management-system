import {
  ArrowRight,
  FileText,
  CheckCircle,
  Building2,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const LandingPage = () => {

  return (
    <div>

      {/* Hero */}

      <section className="bg-gradient-to-r from-[#0B2E59] to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <h1 className="text-5xl font-bold max-w-3xl">

            Public Grievance
            Management System

          </h1>

          <p className="mt-6 text-xl text-blue-100 max-w-2xl">

            Empowering citizens through transparent
            complaint management and faster resolution.

          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/register"
              className="bg-white text-[#0B2E59] px-6 py-3 rounded-lg font-semibold"
            >
              Register Complaint
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-3xl font-bold text-[#0B2E59]">
              500+
            </h3>

            <p>Total Complaints</p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-3xl font-bold text-green-600">
              320+
            </h3>

            <p>Resolved</p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-3xl font-bold text-orange-600">
              40+
            </h3>

            <p>Departments</p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-3xl font-bold text-blue-600">
              10k+
            </h3>

            <p>Citizens Served</p>

          </div>

        </div>

      </section>

      {/* Services */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12 text-[#0B2E59]">

          Government Services

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <FileText size={40} />
            <h3 className="font-semibold mt-4">
              Road Complaints
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Building2 size={40} />
            <h3 className="font-semibold mt-4">
              Water Supply
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <CheckCircle size={40} />
            <h3 className="font-semibold mt-4">
              Sanitation
            </h3>
          </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;