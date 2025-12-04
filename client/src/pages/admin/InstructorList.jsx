import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminNavbar from "../../components/AdminNavbar";

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]); // default as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await API.get("/admin/instructors");

        // Check if response is an array, otherwise empty array
        const data = Array.isArray(res.data) ? res.data : [];
        setInstructors(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load instructors");
        setInstructors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <p className="p-6">Loading instructors...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Instructors</h2>
        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {instructors.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-2">
                  No instructors found
                </td>
              </tr>
            ) : (
              instructors.map((inst) => (
                <tr key={inst._id}>
                  <td className="border px-4 py-2">{inst.name}</td>
                  <td className="border px-4 py-2">{inst.email}</td>
                  <td className="border px-4 py-2">{inst.phone}</td>
                  <td className="border px-4 py-2">{inst.department}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorList;
