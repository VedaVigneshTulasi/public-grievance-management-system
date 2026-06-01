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
import EditComplaintPage from "../../features/complaints/pages/EditComplaintPage";
import PublicTrackingPage from "../../features/complaints/pages/PublicTrackingPage";

import AdminDashboardPage from "../../features/admin/pages/AdminDashboardPage";
import ActivityLogsPage from "../../features/admin/pages/ActivityLogsPage";
import UserManagementPage from "../../features/admin/pages/UserManagementPage";
import DepartmentManagementPage from "../../features/admin/pages/DepartmentManagementPage";
import SystemReportsPage from "../../features/admin/pages/SystemReportsPage";
import SettingsPage from "../../features/admin/pages/SettingsPage";
import ProfilePage from "../../features/profile/pages/ProfilePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/track" element={<PublicTrackingPage />} />
        </Route>

        {/* Authentication */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Citizen Routes */}

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

          <Route path="/complaints/edit/:id" element={<EditComplaintPage />} />
        </Route>

        {/* Admin Routes */}

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

          <Route path="/activity-logs" element={<ActivityLogsPage />} />

          <Route path="/admin/users" element={<UserManagementPage />} />

          <Route path="/admin/departments" element={<DepartmentManagementPage />} />

          <Route path="/admin/reports" element={<SystemReportsPage />} />

          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
