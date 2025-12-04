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
