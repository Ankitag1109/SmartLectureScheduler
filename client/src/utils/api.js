// // client/src/utils/api.js
// import axios from "axios";

// // Create an axios instance
// const api = axios.create({
//   baseURL: "http://localhost:5000", // Backend base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add a request interceptor to include token automatically
// api.interceptors.request.use(
//   (config) => {
//     // Get token from localStorage (admin or instructor)
//     const adminToken = localStorage.getItem("adminToken");
//     const instructorToken = localStorage.getItem("instructorToken");

//     if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     } else if (instructorToken) {
//       config.headers.Authorization = `Bearer ${instructorToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Export functions for API calls
// export const fetchAdminStats = () => api.get("/admin/stats");

// export const addInstructor = (data) => api.post("/admin/add-instructor", data);

// export const getInstructors = () => api.get("/admin/instructors");

// export const deleteInstructor = (id) => api.delete(`/admin/instructor/${id}`);

// export const addCourse = (data) => api.post("/admin/add-course", data);

// export const getCourses = () => api.get("/admin/courses");

// export const deleteCourse = (id) => api.delete(`/admin/course/${id}`);

// export const addLecture = (data) => api.post("/admin/add-lecture", data);

// export const getInstructorLectures = () => api.get("/instructor/my-lectures");

// export const instructorLogin = (data) => api.post("/instructor/login", data);

// export default api;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to request headers
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("instructorToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
