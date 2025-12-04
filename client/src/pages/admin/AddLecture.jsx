// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddLecture = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     courseId: "",
//     videoUrl: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const res = await axios.get(
//           "http://localhost:5000/api/admin/courses",
//           config
//         );
//         setCourses(res.data.courses);
//       } catch (err) {
//         setError("Failed to load courses");
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       const token = localStorage.getItem("adminToken");
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/lecture",
//         formData,
//         config
//       );
//       setSuccess(res.data.message);
//       setFormData({ title: "", courseId: "", videoUrl: "" });
//       setTimeout(() => navigate("/admin/courses"), 1000);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Add New Lecture</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       {success && <p className="text-green-500 mb-2">{success}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Lecture Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <select
//           name="courseId"
//           value={formData.courseId}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         >
//           <option value="">Select Course</option>
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.title}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           name="videoUrl"
//           placeholder="Video URL"
//           value={formData.videoUrl}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Add Lecture
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddLecture;
import React, { useState, useEffect } from "react";

export default function AddLecture() {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleAddLecture = async () => {
    const res = await fetch("http://localhost:5000/api/admin/lectures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, courseId, date }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-4">
      <h2>Add Lecture</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select onChange={(e) => setCourseId(e.target.value)}>
        <option>Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>
      <button onClick={handleAddLecture}>Add Lecture</button>
    </div>
  );
}
