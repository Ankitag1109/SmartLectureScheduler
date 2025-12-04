// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddInstructor = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     department: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

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
//         "http://localhost:5000/api/admin/instructor",
//         formData,
//         config
//       );
//       setSuccess(res.data.message);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         department: "",
//         password: "",
//       });
//       setTimeout(() => navigate("/admin/instructors"), 1000);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Add New Instructor</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       {success && <p className="text-green-500 mb-2">{success}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={formData.department}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Add Instructor
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddInstructor;
import React, { useState } from "react";

export default function AddInstructor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = async () => {
    const res = await fetch("http://localhost:5000/api/admin/instructors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-4">
      <h2>Add Instructor</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAdd}>Add Instructor</button>
    </div>
  );
}
