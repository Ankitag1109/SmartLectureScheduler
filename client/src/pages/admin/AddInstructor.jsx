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
