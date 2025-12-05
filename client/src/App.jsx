import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import RoleBasedLogin from "./pages/RoleBasedLogin";
import Dashboard from "./pages/admin/Dashboard";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";

// Protected route component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token"); // token saved after login
  const userRole = localStorage.getItem("role"); // role saved after login
  if (!token || userRole !== role) {
    return <Navigate to="/" replace />; // redirect to login if unauthorized
  }
  return children;
};

const App = () => (
  <Router>
    <Routes>
      {/* Unified Role-Based Login */}
      <Route path="/" element={<RoleBasedLogin />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Instructor Dashboard */}
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default App;
