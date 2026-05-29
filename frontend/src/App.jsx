import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import LoginPage from "./features/auth/pages/LoginPage";
 
import RegisterPage from "./features/auth/pages/RegisterPage";
 
import DashboardPage from "./features/dashboard/pages/DashboardPage";
 
import ProtectedRoute from "./routes/ProtectedRoute";
 
function App() {

  return (
<BrowserRouter>
<Routes>
 
        <Route

          path="/login"

          element={<LoginPage />}

        />
 
        <Route

          path="/register"

          element={<RegisterPage />}

        />
 
        <Route

          path="/"

          element={
<ProtectedRoute>
<DashboardPage />
</ProtectedRoute>

          }

        />
 
      </Routes>
</BrowserRouter>

  );

}
 
export default App;
 