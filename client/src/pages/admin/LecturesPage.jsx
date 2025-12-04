import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import AddLecture from "./AddLecture";
import Loader from "../../components/Loader";

const LecturesPage = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  // Axios config with JWT
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch lectures from backend
  const fetchLectures = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/lectures",
        config
      );
      setLectures(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch lectures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h2>Lectures</h2>

        {/* AddLecture component with refresh callback */}
        <AddLecture onAdd={fetchLectures} />

        {loading && <Loader />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
          {lectures.map((lec) => (
            <li key={lec._id}>
              <strong>{lec.title}</strong> - {lec.course?.title || "No Course"}{" "}
              - {lec.instructor?.name || "No Instructor"} - {lec.date}{" "}
              {lec.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturesPage;
