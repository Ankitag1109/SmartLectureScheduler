import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
          "http://localhost:5000/api/admin/courses",
          config
        );
        setCourses(res.data.courses);
      } catch (err) {
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <h4 className="font-semibold mt-2">Lectures:</h4>
            <ul className="list-disc list-inside">
              {course.lectures?.map((lec) => (
                <li key={lec._id}>
                  {lec.title} -{" "}
                  <a href={lec.videoUrl} className="text-blue-600">
                    Watch
                  </a>
                </li>
              )) || <li>No lectures yet</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
