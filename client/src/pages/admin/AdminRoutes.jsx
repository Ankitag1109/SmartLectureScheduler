// src/pages/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import CoursesPage from "./CoursesPage";
import AddCourse from "./AddCourse";
import LecturesPage from "./LecturesPage";
import AddLecture from "./AddLecture";
import InstructorsPage from "./InstructorsPage";
import AddInstructor from "./AddInstructor";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminRoutes = () => (
  <Routes>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/courses"
      element={
        <ProtectedRoute>
          <CoursesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/courses/add"
      element={
        <ProtectedRoute>
          <AddCourse />
        </ProtectedRoute>
      }
    />
    <Route
      path="/lectures"
      element={
        <ProtectedRoute>
          <LecturesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/lectures/add"
      element={
        <ProtectedRoute>
          <AddLecture />
        </ProtectedRoute>
      }
    />
    <Route
      path="/instructors"
      element={
        <ProtectedRoute>
          <InstructorsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/instructors/add"
      element={
        <ProtectedRoute>
          <AddInstructor />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
  </Routes>
);

export default AdminRoutes;
