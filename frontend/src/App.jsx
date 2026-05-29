import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./features/auth/pages/LoginPage";

import RegisterPage from "./features/auth/pages/RegisterPage";

import DashboardPage from "./features/dashboard/pages/DashboardPage";

import CreateComplaintPage from "./features/complaints/pages/CreateComplaintPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import ComplaintListPage from "./features/complaints/pages/ComplaintListPage";

import ComplaintDetailsPage from "./features/complaints/pages/ComplaintDetailsPage";

import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-complaint"
          element={
            <ProtectedRoute>
              <CreateComplaintPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintListPage />
            </ProtectedRoute>
          }
        />
        ;
        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
