// // // // // import React, { useState } from "react";
// // // // // import axios from "axios";

// // // // // const InstructorRegister = () => {
// // // // //   // ✅ Declare message state
// // // // //   const [message, setMessage] = useState("");

// // // // //   const [form, setForm] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     phone: "",
// // // // //     department: "",
// // // // //     password: "",
// // // // //   });

// // // // //   const handleChange = (e) => {
// // // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const res = await axios.post(
// // // // //         "http://localhost:5000/api/instructor/register",
// // // // //         form
// // // // //       );
// // // // //       setMessage(res.data.message); // ✅ Set message state
// // // // //       setForm({ name: "", email: "", phone: "", department: "", password: "" });
// // // // //     } catch (err) {
// // // // //       // ✅ Set error message state
// // // // //       setMessage(err.response?.data?.error || "Error occurred");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Instructor Register</h2>
// // // // //       <form onSubmit={handleSubmit}>
// // // // //         <input
// // // // //           name="name"
// // // // //           placeholder="Name"
// // // // //           value={form.name}
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <input
// // // // //           name="email"
// // // // //           placeholder="Email"
// // // // //           value={form.email}
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <input
// // // // //           name="phone"
// // // // //           placeholder="Phone"
// // // // //           value={form.phone}
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <input
// // // // //           name="department"
// // // // //           placeholder="Department"
// // // // //           value={form.department}
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <input
// // // // //           name="password"
// // // // //           type="password"
// // // // //           placeholder="Password"
// // // // //           value={form.password}
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <button type="submit">Register</button>
// // // // //       </form>
// // // // //       {/* ✅ Display message */}
// // // // //       {message && <p>{message}</p>}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default InstructorRegister;
// // // // // src/pages/instructor/InstructorRegister.jsx
// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";

// // // // const InstructorRegister = () => {
// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     phone: "",
// // // //     department: "",
// // // //     password: "",
// // // //   });
// // // //   const [message, setMessage] = useState("");
// // // //   const navigate = useNavigate();

// // // //   const handleChange = (e) =>
// // // //     setForm({ ...form, [e.target.name]: e.target.value });

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const res = await axios.post(
// // // //         "http://localhost:5000/api/instructor/register",
// // // //         form
// // // //       );
// // // //       setMessage(res.data.message);
// // // //       setForm({ name: "", email: "", phone: "", department: "", password: "" });
// // // //       // Optional: navigate("/instructor/login");
// // // //     } catch (err) {
// // // //       setMessage(err.response?.data?.error || "Error occurred");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Instructor Register</h2>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <input
// // // //           name="name"
// // // //           placeholder="Name"
// // // //           value={form.name}
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="email"
// // // //           placeholder="Email"
// // // //           value={form.email}
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="phone"
// // // //           placeholder="Phone"
// // // //           value={form.phone}
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="department"
// // // //           placeholder="Department"
// // // //           value={form.department}
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="password"
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={form.password}
// // // //           onChange={handleChange}
// // // //         />
// // // //         <button type="submit">Register</button>
// // // //       </form>
// // // //       {message && <p>{message}</p>}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default InstructorRegister;
// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // const InstructorRegister = () => {
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     department: "",
// // //     password: "",
// // //   });
// // //   const [message, setMessage] = useState("");

// // //   const handleChange = (e) =>
// // //     setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (
// // //       !form.name ||
// // //       !form.email ||
// // //       !form.phone ||
// // //       !form.department ||
// // //       !form.password
// // //     )
// // //       return setMessage("Please fill all fields");

// // //     try {
// // //       const res = await axios.post(
// // //         "http://localhost:5000/api/instructor/register",
// // //         form
// // //       );
// // //       setMessage(res.data.message);
// // //       setForm({ name: "", email: "", phone: "", department: "", password: "" });
// // //     } catch (err) {
// // //       setMessage(err.response?.data?.error || "Error occurred");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Instructor Register</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input
// // //           name="name"
// // //           placeholder="Name"
// // //           value={form.name}
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="email"
// // //           placeholder="Email"
// // //           value={form.email}
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="phone"
// // //           placeholder="Phone"
// // //           value={form.phone}
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="department"
// // //           placeholder="Department"
// // //           value={form.department}
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="password"
// // //           type="password"
// // //           placeholder="Password"
// // //           value={form.password}
// // //           onChange={handleChange}
// // //         />
// // //         <button type="submit">Register</button>
// // //       </form>
// // //       {message && <p>{message}</p>}
// // //     </div>
// // //   );
// // // };

// // // export default InstructorRegister;
// // import React, { useState } from "react";
// // import axios from "axios";

// // const InstructorRegister = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     department: "",
// //     password: "",
// //   });
// //   const [message, setMessage] = useState("");

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Client-side validation
// //     if (
// //       !form.name ||
// //       !form.email ||
// //       !form.phone ||
// //       !form.department ||
// //       !form.password
// //     ) {
// //       setMessage("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/instructor/register",
// //         form
// //       );
// //       setMessage(res.data.message);
// //       setForm({ name: "", email: "", phone: "", department: "", password: "" });
// //     } catch (err) {
// //       setMessage(err.response?.data?.error || "Error occurred");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
// //       <h2>Instructor Register</h2>
// //       <form
// //         onSubmit={handleSubmit}
// //         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
// //       >
// //         <input
// //           name="name"
// //           placeholder="Name"
// //           value={form.name}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="phone"
// //           placeholder="Phone"
// //           value={form.phone}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="department"
// //           placeholder="Department"
// //           value={form.department}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //         />
// //         <button type="submit">Register</button>
// //       </form>
// //       {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
// //     </div>
// //   );
// // };

// // export default InstructorRegister;
// import React, { useState } from "react";
// import axios from "axios";

// const InstructorRegister = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     department: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !form.name ||
//       !form.email ||
//       !form.phone ||
//       !form.department ||
//       !form.password
//     )
//       return setMessage("Fill all fields");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/instructor/register",
//         form
//       );
//       setMessage(res.data.message);
//       setForm({ name: "", email: "", phone: "", department: "", password: "" });
//     } catch (err) {
//       setMessage(err.response?.data?.error || "Error occurred");
//     }
//   };

//   return (
//     <div>
//       <h2>Instructor Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <input
//           name="phone"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={handleChange}
//         />
//         <input
//           name="department"
//           placeholder="Department"
//           value={form.department}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default InstructorRegister;
