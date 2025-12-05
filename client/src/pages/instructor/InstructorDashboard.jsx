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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("instructorData"));
    if (data) setInstructorName(data.name);
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/instructor/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourses(res.data.courses || []);
      setLectures(res.data.lectures || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setCourses([]);
      setLectures([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instructorData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
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

        <h2 className="text-xl font-semibold mb-2">Courses Assigned</h2>
        {courses.length === 0 ? (
          <p>No courses assigned yet.</p>
        ) : (
          <ul className="mb-4">
            {courses.map((c) => (
              <li key={c._id} className="bg-white p-2 rounded shadow mb-2">
                <strong>{c.title}</strong>
                <br />
                Instructor: {c.instructor?.name}
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mb-2">Lectures Assigned</h2>
        {lectures.length === 0 ? (
          <p>No lectures assigned yet.</p>
        ) : (
          <ul>
            {lectures.map((l) => (
              <li key={l._id} className="bg-white p-2 rounded shadow mb-2">
                <strong>{l.title}</strong>
                <br />
                Course: {l.course?.title}
                <br />
                Instructor: {l.instructor?.name}
                <br />
                Date: {new Date(l.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
