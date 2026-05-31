import { Outlet } from "react-router-dom";

import {
  ShieldCheck,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-[1.2fr_0.8fr] rounded-[32px] overflow-hidden shadow-2xl bg-white">
          <div className="hidden lg:flex flex-col justify-between bg-[#0B2E59] p-14 text-white">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-[0.24em]">
                Citizen Services Portal
              </div>
              <h1 className="text-5xl font-bold mt-10 leading-tight">
                Public Grievance
                <br />
                Management System
              </h1>
              <p className="text-slate-200 text-lg mt-8 leading-relaxed">
                A reliable government portal for grievance submission, tracking, and resolution with complete transparency.
              </p>
            </div>

            <div className="mt-10 grid gap-5">
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner">
                <div className="flex items-center gap-3 text-slate-100">
                  <ShieldCheck size={20} className="text-[#FF9933]" />
                  <span>Secure Government Authentication</span>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner">
                <div className="flex items-center gap-3 text-slate-100">
                  <Clock size={20} className="text-[#138808]" />
                  <span>Fast complaint tracking for citizens</span>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner">
                <div className="flex items-center gap-3 text-slate-100">
                  <FileText size={20} className="text-[#FF9933]" />
                  <span>Department driven resolution workflow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Government of India
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#0B2E59]">Citizen Login</h2>
              <p className="mt-2 text-slate-600">
                Access grievance services, lodge new complaints, and track resolutions from your dashboard.
              </p>
            </div>
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;