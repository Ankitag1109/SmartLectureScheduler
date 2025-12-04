// src/pages/RoleBasedLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleBasedLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Determine API endpoint based on role
      const endpoint =
        role === "admin"
          ? "http://localhost:5000/api/admin/login"
          : "http://localhost:5000/api/instructor/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token and user info in localStorage based on role
      if (role === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "instructor");
        localStorage.setItem("instructorData", JSON.stringify(data.instructor));
        localStorage.setItem("name", data.instructor.name);
        navigate("/instructor/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RoleBasedLogin;
