// src/pages/instructor/InstructorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [instructorName, setInstructorName] = useState("");
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Get instructor name from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("instructorData"));
    if (data) setInstructorName(data.name);
  }, []);

  // Fetch courses and lectures
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/instructor/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(res.data.courseList || []);
        setLectures(res.data.lectureList || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch lectures", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instructorData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Instructor Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {instructorName}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Stats */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium">Courses</h3>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium">Lectures</h3>
              <p className="text-2xl font-bold">{lectures.length}</p>
            </div>
          </div>
        )}

        {/* Course list */}
        <h2 className="text-xl font-semibold mb-2">Courses Assigned</h2>
        <ul className="mb-4">
          {courses.map((course) => (
            <li key={course._id} className="bg-white p-2 rounded shadow mb-2">
              {course.title}
            </li>
          ))}
        </ul>

        {/* Lecture list */}
        <h2 className="text-xl font-semibold mb-2">Lectures Assigned</h2>
        <ul>
          {lectures.map((lec) => (
            <li key={lec._id} className="bg-white p-2 rounded shadow mb-2">
              {lec.title} ({lec.courseId?.title || "No course assigned"})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructorDashboard;
