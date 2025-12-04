// // // // // // // import React, { useState } from "react";
// // // // // // // import api from "../../api/axios";
// // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // const AdminRegister = () => {
// // // // // // //   const [name, setName] = useState("");
// // // // // // //   const [email, setEmail] = useState("");
// // // // // // //   const [password, setPassword] = useState("");
// // // // // // //   const [msg, setMsg] = useState("");

// // // // // // //   const navigate = useNavigate();

// // // // // // //   const handleRegister = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setMsg("");

// // // // // // //     try {
// // // // // // //       const res = await api.post("/admin/register", { name, email, password });

// // // // // // //       localStorage.setItem("adminToken", res.data.token);

// // // // // // //       navigate("/admin/dashboard");
// // // // // // //     } catch (err) {
// // // // // // //       setMsg(err.response?.data?.message || "Registration failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex justify-center items-center h-screen bg-gray-200">
// // // // // // //       <form
// // // // // // //         className="p-6 bg-white shadow-lg rounded"
// // // // // // //         onSubmit={handleRegister}
// // // // // // //       >
// // // // // // //         <h2 className="text-xl mb-4 font-semibold">Admin Registration</h2>

// // // // // // //         {msg && <p className="text-red-500">{msg}</p>}

// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           className="border p-2 w-full my-2"
// // // // // // //           placeholder="Name"
// // // // // // //           value={name}
// // // // // // //           onChange={(e) => setName(e.target.value)}
// // // // // // //         />

// // // // // // //         <input
// // // // // // //           type="email"
// // // // // // //           className="border p-2 w-full my-2"
// // // // // // //           placeholder="Email"
// // // // // // //           value={email}
// // // // // // //           onChange={(e) => setEmail(e.target.value)}
// // // // // // //         />

// // // // // // //         <input
// // // // // // //           type="password"
// // // // // // //           className="border p-2 w-full my-2"
// // // // // // //           placeholder="Password"
// // // // // // //           value={password}
// // // // // // //           onChange={(e) => setPassword(e.target.value)}
// // // // // // //         />

// // // // // // //         <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
// // // // // // //           Register
// // // // // // //         </button>

// // // // // // //         <p className="mt-3 text-sm">
// // // // // // //           Already have an account?{" "}
// // // // // // //           <span
// // // // // // //             onClick={() => navigate("/admin/login")}
// // // // // // //             className="text-blue-600 cursor-pointer"
// // // // // // //           >
// // // // // // //             Login
// // // // // // //           </span>
// // // // // // //         </p>
// // // // // // //       </form>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AdminRegister;
// // // // // // import React, { useState } from "react";
// // // // // // import axios from "axios";

// // // // // // const AdminRegister = () => {
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [password, setPassword] = useState("");
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const handleRegister = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     try {
// // // // // //       const res = await axios.post("http://localhost:5000/api/admin/register", {
// // // // // //         email,
// // // // // //         password,
// // // // // //       });

// // // // // //       setMessage("Admin registered successfully!");
// // // // // //     } catch (error) {
// // // // // //       setMessage(error.response?.data?.error || "Registration failed!");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// // // // // //       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
// // // // // //         <h2 className="text-2xl font-bold text-center mb-6">
// // // // // //           Admin Registration
// // // // // //         </h2>

// // // // // //         {message && <p className="text-center mb-3 text-red-600">{message}</p>}

// // // // // //         <form onSubmit={handleRegister} className="space-y-4">
// // // // // //           <input
// // // // // //             type="email"
// // // // // //             placeholder="Admin Email"
// // // // // //             className="w-full p-3 border rounded"
// // // // // //             value={email}
// // // // // //             onChange={(e) => setEmail(e.target.value)}
// // // // // //           />

// // // // // //           <input
// // // // // //             type="password"
// // // // // //             placeholder="Password"
// // // // // //             className="w-full p-3 border rounded"
// // // // // //             value={password}
// // // // // //             onChange={(e) => setPassword(e.target.value)}
// // // // // //           />

// // // // // //           <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded">
// // // // // //             Register
// // // // // //           </button>
// // // // // //         </form>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminRegister;
// // // // // import React, { useState } from "react";
// // // // // import axios from "axios";

// // // // // const AdminRegister = () => {
// // // // //   const [form, setForm] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     password: "",
// // // // //   });

// // // // //   const handleChange = (e) => {
// // // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handleRegister = async (e) => {
// // // // //     e.preventDefault();

// // // // //     try {
// // // // //       await axios.post("http://localhost:5000/api/admin/register", form);

// // // // //       alert("Admin registered!");
// // // // //       window.location.href = "/admin/login";
// // // // //     } catch (err) {
// // // // //       alert("Registration failed");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="form-box">
// // // // //       <h2>Admin Register</h2>

// // // // //       <form onSubmit={handleRegister}>
// // // // //         <input name="name" placeholder="Name" onChange={handleChange} />
// // // // //         <input name="email" placeholder="Email" onChange={handleChange} />
// // // // //         <input
// // // // //           type="password"
// // // // //           name="password"
// // // // //           placeholder="Password"
// // // // //           onChange={handleChange}
// // // // //         />
// // // // //         <button type="submit">Register</button>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminRegister;
// // // // import React, { useState } from "react";
// // // // import axios from "axios";

// // // // const AdminRegister = () => {
// // // //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// // // //   const [message, setMessage] = useState("");

// // // //   const handleChange = (e) =>
// // // //     setForm({ ...form, [e.target.name]: e.target.value });

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const res = await axios.post(
// // // //         "http://localhost:5000/api/admin/register",
// // // //         form
// // // //       );
// // // //       setMessage(res.data.message);
// // // //       setForm({ name: "", email: "", password: "" });
// // // //     } catch (err) {
// // // //       setMessage(err.response?.data?.error || "Error occurred");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Admin Register</h2>
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

// // // // export default AdminRegister;
// // // // src/pages/admin/AdminRegister.jsx
// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // const AdminRegister = () => {
// // //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// // //   const [message, setMessage] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) =>
// // //     setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const res = await axios.post(
// // //         "http://localhost:5000/api/admin/register",
// // //         form
// // //       );
// // //       setMessage(res.data.message);
// // //       setForm({ name: "", email: "", password: "" });
// // //       // Optional: navigate to login
// // //       // navigate("/admin/login");
// // //     } catch (err) {
// // //       setMessage(err.response?.data?.error || "Error occurred");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Admin Register</h2>
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

// // // export default AdminRegister;
// // import React, { useState } from "react";
// // import axios from "axios";

// // const AdminRegister = () => {
// //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// //   const [message, setMessage] = useState("");

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!form.name || !form.email || !form.password)
// //       return setMessage("Please fill all fields");

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/admin/register",
// //         form
// //       );
// //       setMessage(res.data.message);
// //       setForm({ name: "", email: "", password: "" });
// //     } catch (err) {
// //       setMessage(err.response?.data?.error || "Error occurred");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Admin Register</h2>
// //       <form onSubmit={handleSubmit}>
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
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //         />
// //         <button type="submit">Register</button>
// //       </form>
// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // };

// // export default AdminRegister;
// import React, { useState } from "react";
// import axios from "axios";

// const AdminRegister = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.password)
//       return setMessage("Fill all fields");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/register",
//         form
//       );
//       setMessage(res.data.message);
//       setForm({ name: "", email: "", password: "" });
//     } catch (err) {
//       setMessage(err.response?.data?.error || "Error occurred");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Register</h2>
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

// export default AdminRegister;
