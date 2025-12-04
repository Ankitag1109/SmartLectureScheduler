// // // // // // // client/src/pages/admin/CourseList.jsx
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";
// // // // // // import AdminNavbar from "../../components/AdminNavbar";
// // // // // // import Loader from "../../components/Loader";

// // // // // // const CourseList = () => {
// // // // // //   const [courses, setCourses] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const fetchCourses = async () => {
// // // // // //     try {
// // // // // //       const token = localStorage.getItem("adminToken");
// // // // // //       const res = await axios.get("http://localhost:5000/api/courses", {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       setCourses(res.data || []);
// // // // // //       setMessage("");
// // // // // //     } catch (err) {
// // // // // //       setMessage("Failed to load courses.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchCourses();
// // // // // //   }, []);

// // // // // //   const handleDelete = async (id) => {
// // // // // //     if (!window.confirm("Are you sure you want to delete this course?")) return;

// // // // // //     try {
// // // // // //       const token = localStorage.getItem("adminToken");
// // // // // //       await axios.delete(`http://localhost:5000/api/courses/${id}`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       setCourses((prev) => prev.filter((course) => course._id !== id));
// // // // // //       setMessage("Course deleted successfully!");
// // // // // //     } catch (err) {
// // // // // //       setMessage("Failed to delete course.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <AdminNavbar />

// // // // // //       <div className="container mx-auto mt-10 px-4">
// // // // // //         <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-4 border-blue-600 inline-block pb-2">
// // // // // //           Course List
// // // // // //         </h2>

// // // // // //         {message && (
// // // // // //           <p
// // // // // //             className={`mb-4 p-2 text-center rounded ${
// // // // // //               message.includes("success")
// // // // // //                 ? "bg-green-100 text-green-700"
// // // // // //                 : "bg-red-100 text-red-700"
// // // // // //             }`}
// // // // // //           >
// // // // // //             {message}
// // // // // //           </p>
// // // // // //         )}

// // // // // //         {loading ? (
// // // // // //           <Loader />
// // // // // //         ) : (
// // // // // //           <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
// // // // // //             <table className="min-w-full bg-white divide-y divide-gray-200">
// // // // // //               <thead className="bg-blue-600 text-white">
// // // // // //                 <tr>
// // // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
// // // // // //                     Name
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
// // // // // //                     Level
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
// // // // // //                     Description
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
// // // // // //                     Image
// // // // // //                   </th>
// // // // // //                   <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
// // // // // //                     Actions
// // // // // //                   </th>
// // // // // //                 </tr>
// // // // // //               </thead>

// // // // // //               <tbody className="divide-y divide-gray-200">
// // // // // //                 {courses.length === 0 ? (
// // // // // //                   <tr>
// // // // // //                     <td colSpan="5" className="text-center py-6 text-gray-500">
// // // // // //                       No courses found
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ) : (
// // // // // //                   courses.map((course, index) => (
// // // // // //                     <tr
// // // // // //                       key={course._id}
// // // // // //                       className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
// // // // // //                     >
// // // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
// // // // // //                         {course.name}
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
// // // // // //                         {course.level}
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
// // // // // //                         {course.description}
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4 whitespace-nowrap text-center">
// // // // // //                         {course.image ? (
// // // // // //                           <img
// // // // // //                             src={`http://localhost:5000/uploads/${course.image}`}
// // // // // //                             alt={course.name}
// // // // // //                             className="w-20 h-20 object-cover rounded"
// // // // // //                           />
// // // // // //                         ) : (
// // // // // //                           <span className="text-gray-400">No Image</span>
// // // // // //                         )}
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4 whitespace-nowrap text-center">
// // // // // //                         <button
// // // // // //                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transition duration-200"
// // // // // //                           onClick={() => handleDelete(course._id)}
// // // // // //                         >
// // // // // //                           Delete
// // // // // //                         </button>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))
// // // // // //                 )}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CourseList;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import AdminNavbar from "../../components/AdminNavbar";
// // // // // import Loader from "../../components/Loader";

// // // // // const CourseList = () => {
// // // // //   const [courses, setCourses] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [message, setMessage] = useState("");

// // // // //   const fetchCourses = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("adminToken");
// // // // //       const res = await axios.get("http://localhost:5000/api/courses", {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       setCourses(res.data || []);
// // // // //       setMessage("");
// // // // //     } catch {
// // // // //       setMessage("Failed to load courses.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (id) => {
// // // // //     if (!window.confirm("Are you sure you want to delete this course?")) return;

// // // // //     try {
// // // // //       const token = localStorage.getItem("adminToken");
// // // // //       await axios.delete(`http://localhost:5000/api/courses/${id}`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       setCourses((prev) => prev.filter((c) => c._id !== id));
// // // // //       setMessage("Course deleted successfully!");
// // // // //     } catch {
// // // // //       setMessage("Failed to delete course.");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchCourses();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div>
// // // // //       <AdminNavbar />
// // // // //       <div className="container mx-auto mt-10 px-4">
// // // // //         <h2 className="text-3xl font-bold mb-4 border-b-4 border-blue-600 inline-block pb-2">
// // // // //           Course List
// // // // //         </h2>
// // // // //         {message && (
// // // // //           <p
// // // // //             className={`mb-4 p-2 text-center rounded ${
// // // // //               message.includes("success")
// // // // //                 ? "bg-green-100 text-green-700"
// // // // //                 : "bg-red-100 text-red-700"
// // // // //             }`}
// // // // //           >
// // // // //             {message}
// // // // //           </p>
// // // // //         )}
// // // // //         {loading ? (
// // // // //           <Loader />
// // // // //         ) : (
// // // // //           <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
// // // // //             <table className="min-w-full bg-white divide-y divide-gray-200">
// // // // //               <thead className="bg-blue-600 text-white">
// // // // //                 <tr>
// // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
// // // // //                     Name
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
// // // // //                     Level
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
// // // // //                     Description
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
// // // // //                     Image
// // // // //                   </th>
// // // // //                   <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
// // // // //                     Actions
// // // // //                   </th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-gray-200">
// // // // //                 {courses.length === 0 ? (
// // // // //                   <tr>
// // // // //                     <td colSpan="5" className="text-center py-6 text-gray-500">
// // // // //                       No courses found
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ) : (
// // // // //                   courses.map((course, index) => (
// // // // //                     <tr
// // // // //                       key={course._id}
// // // // //                       className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
// // // // //                     >
// // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
// // // // //                         {course.name}
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
// // // // //                         {course.level}
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
// // // // //                         {course.description}
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4 whitespace-nowrap text-center">
// // // // //                         {course.image ? (
// // // // //                           <img
// // // // //                             src={`http://localhost:5000/uploads/${course.image}`}
// // // // //                             alt={course.name}
// // // // //                             className="w-20 h-20 object-cover rounded"
// // // // //                           />
// // // // //                         ) : (
// // // // //                           <span className="text-gray-400">No Image</span>
// // // // //                         )}
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4 whitespace-nowrap text-center">
// // // // //                         <button
// // // // //                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md"
// // // // //                           onClick={() => handleDelete(course._id)}
// // // // //                         >
// // // // //                           Delete
// // // // //                         </button>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CourseList;
// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import AdminNavbar from "../../components/AdminNavbar";
// // // // import Loader from "../../components/Loader";

// // // // const CourseList = () => {
// // // //   const [courses, setCourses] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchCourses = async () => {
// // // //       try {
// // // //         const token = localStorage.getItem("adminToken");
// // // //         const res = await axios.get("http://localhost:5000/api/courses", {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });
// // // //         setCourses(res.data);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchCourses();
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <AdminNavbar />
// // // //       <div className="container mx-auto mt-10">
// // // //         <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-600 inline-block pb-2">
// // // //           Course List
// // // //         </h2>

// // // //         {loading ? (
// // // //           <Loader />
// // // //         ) : (
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             {courses.map((course) => (
// // // //               <div
// // // //                 key={course._id}
// // // //                 className="border rounded shadow p-4 flex flex-col items-center"
// // // //               >
// // // //                 {course.image && (
// // // //                   <img
// // // //                     src={course.imageUrl || "/placeholder.png"} // fallback if no image
// // // //                     alt={course.name}
// // // //                     className="w-32 h-20 object-cover rounded"
// // // //                   />
// // // //                 )}
// // // //                 <h3 className="text-xl font-semibold mb-1">{course.name}</h3>
// // // //                 <p className="text-gray-700 mb-1">{course.level}</p>
// // // //                 <p className="text-gray-600 text-sm">{course.description}</p>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CourseList;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import AdminNavbar from "../../components/AdminNavbar";
// // // import Loader from "../../components/Loader";

// // // const CourseList = () => {
// // //   const [courses, setCourses] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [alert, setAlert] = useState({ type: "", message: "" });

// // //   const fetchCourses = async () => {
// // //     try {
// // //       const token = localStorage.getItem("adminToken");
// // //       const res = await axios.get("http://localhost:5000/api/courses", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setCourses(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setAlert({ type: "error", message: "Failed to fetch courses." });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchCourses();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <AdminNavbar />
// // //       <div className="container mx-auto mt-10 px-4">
// // //         <h2 className="text-3xl font-bold mb-6 border-b-4 border-green-600 inline-block pb-2">
// // //           Courses
// // //         </h2>

// // //         {alert.message && (
// // //           <p
// // //             className={`mb-4 p-2 text-center rounded ${
// // //               alert.type === "success"
// // //                 ? "bg-green-100 text-green-700"
// // //                 : "bg-red-100 text-red-700"
// // //             }`}
// // //           >
// // //             {alert.message}
// // //           </p>
// // //         )}

// // //         {loading ? (
// // //           <Loader />
// // //         ) : courses.length === 0 ? (
// // //           <p className="text-center text-gray-500">No courses found.</p>
// // //         ) : (
// // //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {courses.map((course) => (
// // //               <div
// // //                 key={course._id}
// // //                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
// // //               >
// // //                 {course.image && (
// // //                   <img
// // //                     src={course.image} // Already includes full URL from backend
// // //                     alt={course.name}
// // //                     className="w-full h-48 object-cover"
// // //                   />
// // //                 )}
// // //                 <div className="p-4">
// // //                   <h3 className="text-xl font-bold text-gray-800">
// // //                     {course.name}
// // //                   </h3>
// // //                   <p className="text-gray-600 mb-2">
// // //                     <strong>Level:</strong> {course.level}
// // //                   </p>
// // //                   <p className="text-gray-700">{course.description}</p>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CourseList;
// // import React, { useEffect, useState } from "react";
// // import API from "../../utils/api";
// // import AdminNavbar from "../../components/AdminNavbar";
// // import { Link } from "react-router-dom";

// // const CourseList = () => {
// //   const [courses, setCourses] = useState([]);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const res = await API.get("/admin/courses");
// //         setCourses(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchCourses();
// //   }, []);

// //   return (
// //     <div>
// //       <AdminNavbar />
// //       <div className="p-6">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-2xl font-bold">Courses</h2>
// //           <Link
// //             to="/admin/add-course"
// //             className="bg-blue-700 text-white px-4 py-2 rounded"
// //           >
// //             Add Course
// //           </Link>
// //         </div>
// //         <table className="border w-full">
// //           <thead>
// //             <tr className="bg-gray-200">
// //               <th className="border px-4 py-2">Name</th>
// //               <th className="border px-4 py-2">Level</th>
// //               <th className="border px-4 py-2">Description</th>
// //               <th className="border px-4 py-2">Image</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {courses.map((course) => (
// //               <tr key={course._id}>
// //                 <td className="border px-4 py-2">{course.name}</td>
// //                 <td className="border px-4 py-2">{course.level}</td>
// //                 <td className="border px-4 py-2">{course.description}</td>
// //                 <td className="border px-4 py-2">
// //                   {course.image && (
// //                     <img
// //                       src={course.image}
// //                       alt={course.name}
// //                       className="w-16 h-16"
// //                     />
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseList;
// import React, { useEffect, useState } from "react";
// import API from "../../utils/api";
// import AdminNavbar from "../../components/AdminNavbar";
// import { Link } from "react-router-dom";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await API.get("/admin/courses");

//         // Ensure data is an array
//         const data = Array.isArray(res.data) ? res.data : [];
//         setCourses(data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setCourses([]);
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   if (loading) return <p className="p-6">Loading courses...</p>;

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Courses</h2>
//           <Link
//             to="/admin/add-course"
//             className="bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Add Course
//           </Link>
//         </div>
//         <table className="border w-full">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Level</th>
//               <th className="border px-4 py-2">Description</th>
//               <th className="border px-4 py-2">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-2">
//                   No courses found
//                 </td>
//               </tr>
//             ) : (
//               courses.map((course) => (
//                 <tr key={course._id}>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.level}</td>
//                   <td className="border px-4 py-2">{course.description}</td>
//                   <td className="border px-4 py-2">
//                     {course.image ? (
//                       <img
//                         src={course.image}
//                         alt={course.name}
//                         className="w-16 h-16"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CourseList;
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
