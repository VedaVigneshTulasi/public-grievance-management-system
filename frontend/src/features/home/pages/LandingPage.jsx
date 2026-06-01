import { ArrowRight, FileText, Building2, CheckCircle, ShieldCheck, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import govtBanner from "../../../assets/images/govtBanner.png";


const LandingPage = () => {


  const grievanceStats = [
    {
      title: "Complaints Received",
      value: "12,842",
    },
    {
      title: "Resolved Cases",
      value: "11,965",
    },
    {
      title: "Resolution Rate",
      value: "93%",
    },
    {
      title: "Departments",
      value: "42",
    },
  ];


  return (
    <div className="bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            < p className="text-xs uppercase tracking-[0.24em] text-slate-500">Government of India</p>
            <h2 className="text-2xl font-semibold text-[#0B2E59]">Citizen Services Portal</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span>Monday, 31 May 2026</span>
            <span className="hidden sm:inline">|</span>
            <span>Help Desk: 1800-123-4567</span>
            <span className="hidden md:inline">|</span>
            <a href="mailto:support@pgms.gov.in" className="underline text-[#123D82]">support@pgms.gov.in</a>
          </div>
        </div>
      </section>

      <section className="bg-[#0B2E59] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-200">
              <span className="h-2 w-2 rounded-full bg-[#FF9933]" /> Citizen First Service Platform
            </p>
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Digital India</p>
              <h1 className="text-5xl font-bold leading-tight">
                Public Grievance Management System
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-slate-200">
                A government portal to lodge grievances, track progress and receive timely resolutions from authorised departments.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/complaints/create" className="inline-flex items-center gap-2 rounded-3xl bg-white px-6 py-4 text-[#0B2E59] font-semibold shadow-lg transition hover:bg-slate-100">
                Lodge Complaint
                <ArrowRight size={18} />
              </Link>
              <Link to="/track" className="inline-flex items-center justify-center rounded-3xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Track Complaint
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-3xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Login
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Total Complaints</p>
                <p className="mt-3 text-4xl font-bold text-white">12K+</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Resolved Cases</p>
                <p className="mt-3 text-4xl font-bold text-[#138808]">95%</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Departments</p>
                <p className="mt-3 text-4xl font-bold text-[#FF9933]">40+</p>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] bg-slate-950/80 p-8 shadow-2xl ring-1 ring-white/10">
            <div className="h-[350px] overflow-hidden rounded-[32px]">
  <img
    src={govtBanner}
    alt="Government Banner"
    className="w-full h-full object-contain bg-white"
  />
</div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-100 shadow-inner">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Secure Digital Governance</p>
                <p className="mt-3 text-lg font-semibold">Citizen registration, grievance submission and status updates in one portal.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-100 shadow-inner">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Government Services</p>
                <p className="mt-3 text-lg font-semibold">Roads, water, electricity, health, transport and sanitation complaints supported.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
         <div className="space-y-8">
  <div>
    <h2 className="text-4xl font-bold text-[#0B2E59]">
      Government Services
    </h2>

    <p className="mt-4 text-lg text-slate-600 max-w-2xl">
      Citizens can raise grievances across critical public sectors.
      Every complaint is monitored by department officials and
      tracked until resolution.
    </p>
  </div>

  <div className="grid grid-cols-2 gap-4">

    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Complaints Received
      </p>
      <h3 className="mt-2 text-3xl font-bold text-[#0B2E59]">
        12,842
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Resolved Cases
      </p>
      <h3 className="mt-2 text-3xl font-bold text-[#138808]">
        11,965
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Departments
      </p>
      <h3 className="mt-2 text-3xl font-bold text-[#FF9933]">
        42
      </h3>
    </div>

    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500">
        Resolution Rate
      </p>
      <h3 className="mt-2 text-3xl font-bold text-[#138808]">
        93%
      </h3>
    </div>

  </div>

  <div className="rounded-3xl bg-[#0B2E59] p-6 text-white">
    <h3 className="text-xl font-semibold">
      Citizen Charter
    </h3>

    <ul className="mt-4 space-y-3 text-slate-200">
      <li>✓ Transparent grievance handling</li>
      <li>✓ Real-time complaint tracking</li>
      <li>✓ Department accountability</li>
      <li>✓ Faster issue resolution</li>
    </ul>
  </div>
</div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B2E59] text-white shadow">
                <FileText size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Roads</h3>
              <p className="mt-2 text-slate-600">Report issues with roads, footpaths and traffic management.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123D82] text-white shadow">
                <Building2 size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Water Supply</h3>
              <p className="mt-2 text-slate-600">Raise concerns on water quality, leakage and supply disruptions.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#138808] text-white shadow">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Electricity</h3>
              <p className="mt-2 text-slate-600">Submit power outage complaints and meter or billing issues.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9933] text-white shadow">
                <Users size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Sanitation</h3>
              <p className="mt-2 text-slate-600">Report cleanliness, waste management and public hygiene concerns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#123D82]">How it works</p>
            <h2 className="mt-3 text-4xl font-bold text-[#0B2E59]">Citizen grievance process simplified</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { title: "Submit Complaint", description: "Enter your grievance details and attach evidence.", color: "bg-[#FF9933]/10 text-[#FF9933]" },
              { title: "Review", description: "Government officers validate and review the complaint.", color: "bg-[#123D82]/10 text-[#123D82]" },
              { title: "Assign Department", description: "Complaint is routed to the responsible department.", color: "bg-[#0B2E59]/10 text-[#0B2E59]" },
              { title: "Resolution", description: "Department resolves the issue and updates status.", color: "bg-[#138808]/10 text-[#138808]" },
              { title: "Feedback", description: "Citizens provide feedback on closure satisfaction.", color: "bg-[#64748B]/10 text-[#64748B]" },
            ].map((step) => (
              <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${step.color}`}>
                  <span className="text-lg font-semibold">✓</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
  <div className="grid gap-12 lg:grid-cols-2 items-start">

    {/* FAQ */}
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-[#123D82]">
        FAQs
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#0B2E59]">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            How can I track my complaint?
          </h3>

          <p className="mt-3 text-slate-600">
            Use the Track Complaint option and enter your grievance Tracking ID.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Can I edit a lodged complaint?
          </h3>

          <p className="mt-3 text-slate-600">
            Yes, before the complaint reaches the resolution stage.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Is the portal available across India?
          </h3>

          <p className="mt-3 text-slate-600">
            Yes, citizens from all states and union territories can use it.
          </p>
        </div>
      </div>
    </div>

    {/* Government Performance */}
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-[#123D82]">
        Government Performance
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#0B2E59]">
        Public Service Analytics
      </h2>

      <div className="mt-8 grid gap-4">

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Citizen Satisfaction
          </p>

          <h3 className="mt-2 text-4xl font-bold text-[#138808]">
            93%
          </h3>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Average Resolution Time
          </p>

          <h3 className="mt-2 text-4xl font-bold text-[#0B2E59]">
            7 Days
          </h3>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Complaints Resolved
          </p>

          <h3 className="mt-2 text-4xl font-bold text-[#138808]">
            11,965
          </h3>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Active Departments
          </p>

          <h3 className="mt-2 text-4xl font-bold text-[#FF9933]">
            42
          </h3>
        </div>

      </div>
    </div>

  </div>
</section>
    </div>
  );
};

export default LandingPage;