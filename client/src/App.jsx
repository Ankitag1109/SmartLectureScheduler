// // src/App.jsx
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // Pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import Dashboard from "./pages/admin/Dashboard";
// import InstructorLogin from "./pages/instructor/InstructorLogin";
// import InstructorDashboard from "./pages/instructor/InstructorDashboard";

// // Protected Routes
// const AdminProtectedRoute = ({ children }) => {
//   const adminToken = localStorage.getItem("adminToken");
//   if (!adminToken) return <Navigate to="/admin/login" replace />;
//   return children;
// };

// const InstructorProtectedRoute = ({ children }) => {
//   const instructorToken = localStorage.getItem("instructorToken");
//   if (!instructorToken) return <Navigate to="/instructor/login" replace />;
//   return children;
// };

// const App = () => (
//   <Router>
//     <Routes>
//       {/* Admin Routes */}
//       <Route path="/admin/login" element={<AdminLogin />} />
//       <Route
//         path="/admin/dashboard"
//         element={
//           <AdminProtectedRoute>
//             <Dashboard />
//           </AdminProtectedRoute>
//         }
//       />

//       {/* Instructor Routes */}
//       <Route path="/instructor/login" element={<InstructorLogin />} />
//       <Route
//         path="/instructor/dashboard"
//         element={
//           <InstructorProtectedRoute>
//             <InstructorDashboard />
//           </InstructorProtectedRoute>
//         }
//       />

//       {/* Default fallback */}
//       <Route path="*" element={<Navigate to="/admin/login" replace />} />
//     </Routes>
//   </Router>
// );

// export default App;
// src/App.jsx
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
