import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import LandingPage from "../../features/home/pages/LandingPage";

import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import CreateComplaintPage from "../../features/complaints/pages/CreateComplaintPage";
import ComplaintListPage from "../../features/complaints/pages/ComplaintListPage";
import ComplaintDetailsPage from "../../features/complaints/pages/ComplaintDetailsPage";

import AdminDashboardPage from "../../features/admin/pages/AdminDashboardPage";

import ActivityLogsPage from "../../features/admin/pages/ActivityLogsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Citizen */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/complaints" element={<ComplaintListPage />} />

          <Route path="/complaints/create" element={<CreateComplaintPage />} />

          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
        </Route>

        {/* Admin */}

        <Route
          element={
            <ProtectedRoute>
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>

        <Route path="/activity-logs" element={<ActivityLogsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
