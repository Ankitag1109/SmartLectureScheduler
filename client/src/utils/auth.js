// client/src/utils/auth.js

// ---------------- Admin ---------------- //

// Save admin token
export const setAdminToken = (token) =>
  localStorage.setItem("adminToken", token);

// Check if admin is logged in
export const isAdminLoggedIn = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

// Get logged-in admin info
export const getAdminInfo = () => {
  const data = localStorage.getItem("adminData");
  return data ? JSON.parse(data) : null;
};

// Logout admin
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  window.location.href = "/admin/login"; // redirect to login
};

// ---------------- Instructor ---------------- //

// Save instructor token
export const setInstructorToken = (token) =>
  localStorage.setItem("instructorToken", token);

// Check if instructor is logged in
export const isInstructorLoggedIn = () => {
  const token = localStorage.getItem("instructorToken");
  return !!token;
};

// Get logged-in instructor info
export const getInstructorInfo = () => {
  const data = localStorage.getItem("instructorData");
  return data ? JSON.parse(data) : null;
};

// Logout instructor
export const instructorLogout = () => {
  localStorage.removeItem("instructorToken");
  localStorage.removeItem("instructorData");
  window.location.href = "/instructor/login"; // redirect to login
};
