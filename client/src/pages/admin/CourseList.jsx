import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]); // ensure default is array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/admin/courses");

        // Make sure we have an array
        const data = Array.isArray(res.data) ? res.data : [];
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load courses");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="p-6">Loading courses...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Courses</h2>
          <Link
            to="/admin/add-course"
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Course
          </Link>
        </div>
        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Level</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-2">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{course.name}</td>
                  <td className="border px-4 py-2">{course.level}</td>
                  <td className="border px-4 py-2">{course.description}</td>
                  <td className="border px-4 py-2">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-16 h-16"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
