// // // // // client/src/pages/admin/InstructorsPage.jsx
// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const InstructorsPage = () => {
// // // //   const [instructors, setInstructors] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     const fetchInstructors = async () => {
// // // //       const token = localStorage.getItem("adminToken");
// // // //       if (!token) {
// // // //         setError("You must be logged in as admin!");
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const res = await axios.get(
// // // //           "http://localhost:5000/api/admin/instructors",
// // // //           {
// // // //             headers: { Authorization: `Bearer ${token}` }, // Attach JWT
// // // //           }
// // // //         );
// // // //         setInstructors(res.data);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //         setError(err.response?.data?.message || "Failed to fetch instructors");
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchInstructors();
// // // //   }, []);

// // // //   if (loading) return <p>Loading...</p>;
// // // //   if (error) return <p>{error}</p>;

// // // //   return (
// // // //     <div>
// // // //       <h2>Instructors</h2>
// // // //       <ul>
// // // //         {instructors.map((inst) => (
// // // //           <li key={inst._id}>
// // // //             {inst.name} - {inst.email}
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default InstructorsPage;
// // // // src/pages/admin/InstructorsPage.jsx
// // // import React, { useEffect, useState } from "react";
// // // import AdminNavbar from "../../components/AdminNavbar";
// // // import axios from "axios";
// // // import AddInstructor from "./AddInstructor";

// // // const InstructorsPage = () => {
// // //   const [instructors, setInstructors] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   const fetchInstructors = async () => {
// // //     const token = localStorage.getItem("adminToken");
// // //     try {
// // //       const res = await axios.get(
// // //         "http://localhost:5000/api/admin/instructors",
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );
// // //       setInstructors(res.data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to fetch instructors");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchInstructors();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <AdminNavbar />
// // //       <h2>Instructors</h2>
// // //       <AddInstructor onAdd={fetchInstructors} />
// // //       {loading && <p>Loading...</p>}
// // //       {error && <p>{error}</p>}
// // //       <ul>
// // //         {instructors.map((inst) => (
// // //           <li key={inst._id}>
// // //             {inst.name} - {inst.email}
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default InstructorsPage;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const InstructorsPage = () => {
// //   const [instructors, setInstructors] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchInstructors = async () => {
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       if (!token) {
// //         console.error("No admin token found");
// //         return;
// //       }

// //       const res = await axios.get(
// //         "http://localhost:5000/api/admin/instructors",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setInstructors(res.data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching instructors:", err);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInstructors();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <h1>Instructors</h1>
// //       <ul>
// //         {instructors.map((i) => (
// //           <li key={i._id}>
// //             {i.name} - {i.email}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default InstructorsPage;
// // src/pages/admin/LecturesPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminNavbar from "../../components/AdminNavbar";
// import { Link } from "react-router-dom";

// const LecturesPage = () => {
//   const [lectures, setLectures] = useState([]);

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         const res = await axios.get(
//           "http://localhost:5000/api/admin/lectures",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setLectures(res.data);
//       } catch (err) {
//         console.error(err.response?.data?.message || err.message);
//       }
//     };
//     fetchLectures();
//   }, []);

//   return (
//     <div>
//       <AdminNavbar />
//       <h1>Lectures</h1>
//       <Link to="/admin/lectures/add">Add Lecture</Link>
//       <ul>
//         {lectures.map((lec) => (
//           <li key={lec._id}>{lec.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LecturesPage;
// src/pages/admin/InstructorsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(
          "http://localhost:5000/api/admin/instructors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInstructors(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <h1>Instructors</h1>
      <Link to="/admin/instructors/add">Add Instructor</Link>
      <ul>
        {instructors.map((ins) => (
          <li key={ins._id}>
            {ins.name} ({ins.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorsPage;
