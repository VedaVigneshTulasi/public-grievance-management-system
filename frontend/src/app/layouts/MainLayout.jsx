import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-[#0B2E59] text-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span>{today}</span>
            <span className="text-slate-300">|</span>
            <span>Help Desk: <strong>1800-123-4567</strong></span>
            <span className="text-slate-300">|</span>
            <span>Email: <strong>support@pgms.gov.in</strong></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#accessibility" className="underline decoration-slate-200 decoration-2">Accessibility</a>
            <a href="mailto:support@pgms.gov.in" className="underline decoration-slate-200 decoration-2">Contact</a>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-[#F5EFE6] shadow-sm">
              <span className="text-2xl font-bold text-[#0B2E59]">🇮🇳</span>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#123D82]">
                Government of India
              </p>
              <h1 className="text-2xl font-bold text-slate-900">
                Public Grievance Management System
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Citizen Services Portal for transparent grievance redressal
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F5EFE6] border border-slate-200 px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Citizen First Service Platform
            </p>
            <p className="mt-2 text-lg font-semibold text-[#0B2E59]">
              Online grievance submission & tracking
            </p>
          </div>
        </div>
      </header>

      <main className="pb-16">
        <Outlet />
      </main>

      <footer className="bg-[#0B2E59] text-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-5">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">About Portal</h3>
            <p className="text-sm text-slate-300 leading-7">
              A secure platform for citizens to lodge grievances, track progress and receive timely resolutions from government departments.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Departments</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Roads & Transport</li>
              <li>Water Supply</li>
              <li>Electricity</li>
              <li>Sanitation</li>
              <li>Health</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Citizen Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Submit Complaint</li>
              <li>Track Status</li>
              <li>Know Your Rights</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Privacy Policy</li>
              <li>Accessibility</li>
              <li>Help Center</li>
              <li>Contact Support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Help Desk: 1800-123-4567</p>
              <p>Email: support@pgms.gov.in</p>
              <p>National Portal of India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700/60">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-slate-400 text-center">
            © 2026 Government of India — Public Grievance Management System
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
