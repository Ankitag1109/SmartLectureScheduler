// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin"); // "admin" or "instructor"
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const endpoint =
//       role === "admin"
//         ? "http://localhost:5000/api/admin/login"
//         : "http://localhost:5000/api/instructor/login";

//     try {
//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }

//       // Save token and user info
//       if (role === "admin") {
//         localStorage.setItem("adminToken", data.token);
//         localStorage.setItem("adminData", JSON.stringify(data.admin));
//         navigate("/admin/dashboard");
//       } else {
//         localStorage.setItem("instructorToken", data.token);
//         localStorage.setItem("instructorData", JSON.stringify(data.instructor));
//         navigate("/instructor/dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//         >
//           <option value="admin">Admin</option>
//           <option value="instructor">Instructor</option>
//         </select>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
