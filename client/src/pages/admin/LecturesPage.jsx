// // // // src/pages/admin/LecturesPage.jsx
// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";
// // // import AdminNavbar from "../../components/AdminNavbar";
// // // import Loader from "../../components/Loader";

// // // const LecturesPage = () => {
// // //   const [lectures, setLectures] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchLectures = async () => {
// // //       setLoading(true);
// // //       setError("");

// // //       try {
// // //         const token = localStorage.getItem("adminToken");
// // //         if (!token) throw new Error("No token found. Please login.");

// // //         const res = await axios.get(
// // //           "http://localhost:5000/api/admin/lectures",
// // //           {
// // //             headers: { Authorization: `Bearer ${token}` },
// // //           }
// // //         );

// // //         const lecturesData = Array.isArray(res.data)
// // //           ? res.data
// // //           : res.data.lectures || [];
// // //         setLectures(lecturesData);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setError(
// // //           err.response?.data?.message ||
// // //             err.message ||
// // //             "Failed to fetch lectures"
// // //         );
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchLectures();
// // //   }, []);

// // //   if (loading) return <Loader />;

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <AdminNavbar />
// // //       <div className="p-6 max-w-6xl mx-auto">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h2 className="text-2xl font-bold">Lectures</h2>
// // //           <Link
// // //             to="/admin/lectures/add"
// // //             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
// // //           >
// // //             Add Lecture
// // //           </Link>
// // //         </div>

// // //         {error && (
// // //           <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <table className="w-full border rounded bg-white">
// // //           <thead>
// // //             <tr className="bg-gray-200">
// // //               <th className="p-2 border">Title</th>
// // //               <th className="p-2 border">Course</th>
// // //               <th className="p-2 border">Instructor</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {lectures.map((lecture) => (
// // //               <tr key={lecture._id || lecture.id}>
// // //                 <td className="p-2 border">{lecture.title}</td>
// // //                 <td className="p-2 border">{lecture.course?.name || "N/A"}</td>
// // //                 <td className="p-2 border">
// // //                   {lecture.instructor?.name || "N/A"}
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LecturesPage;
// // // src/pages/admin/LecturesPage.jsx
// // import React, { useEffect, useState } from "react";
// // import AdminNavbar from "../../components/AdminNavbar";
// // import axios from "axios";
// // import AddLecture from "./AddLecture";

// // const LecturesPage = () => {
// //   const [lectures, setLectures] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const fetchLectures = async () => {
// //     const token = localStorage.getItem("adminToken");
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/admin/lectures", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setLectures(res.data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to fetch lectures");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLectures();
// //   }, []);

// //   return (
// //     <div>
// //       <AdminNavbar />
// //       <h2>Lectures</h2>
// //       <AddLecture onAdd={fetchLectures} />
// //       {loading ? <p>Loading...</p> : null}
// //       {error && <p>{error}</p>}
// //       <ul>
// //         {lectures.map((lec) => (
// //           <li key={lec._id}>
// //             {lec.title} - {lec.course?.name} - {lec.instructor?.name}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default LecturesPage;
// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../../components/AdminNavbar";
// import axios from "axios";
// import AddLecture from "./AddLecture";

// const LecturesPage = () => {
//   const [lectures, setLectures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("adminToken");
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchLectures = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/lectures",
//         config
//       );
//       setLectures(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch lectures");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLectures();
//   }, []);

//   return (
//     <div>
//       <AdminNavbar />
//       <h2>Lectures</h2>
//       <AddLecture onAdd={fetchLectures} />
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <ul>
//         {lectures.map((lec) => (
//           <li key={lec._id}>
//             {lec.title} - {lec.course?.title} - {lec.instructor?.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LecturesPage;
// client/src/pages/admin/LecturesPage.jsx
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
