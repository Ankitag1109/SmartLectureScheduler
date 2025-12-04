// src/pages/instructor/MyLectures.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLectures = async () => {
    try {
      const token = localStorage.getItem("instructorToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/instructor/lectures",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLectures(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch lectures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="lectures-page">
      <h2>My Lectures</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : lectures.length === 0 ? (
        <p>No lectures assigned yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lec) => (
              <tr key={lec._id}>
                <td>{lec.title}</td>
                <td>{lec.courseName}</td>
                <td>{new Date(lec.date).toLocaleDateString()}</td>
                <td>{lec.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyLectures;
