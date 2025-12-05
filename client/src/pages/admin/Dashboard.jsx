import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("home");

  // Stats
  const [stats, setStats] = useState({
    admins: 1,
    instructors: 0,
    courses: 0,
    lectures: 0,
  });

  // Data arrays
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  // Form states
  const [instrName, setInstrName] = useState("");
  const [instrEmail, setInstrEmail] = useState("");
  const [instrPassword, setInstrPassword] = useState("");

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseInstructorId, setCourseInstructorId] = useState("");

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDate, setLectureDate] = useState("");
  const [lectureCourseId, setLectureCourseId] = useState("");
  const [lectureInstructorId, setLectureInstructorId] = useState("");

  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const token = localStorage.getItem("token"); // ✅ token

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // -------------------- FETCH FUNCTIONS --------------------
  const fetchInstructors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/instructors", {
        headers,
      });
      const data = await res.json();
      setInstructors(Array.isArray(data) ? data : []);
      return Array.isArray(data) ? data.length : 0;
    } catch (err) {
      console.error("Fetch instructors error:", err);
      return 0;
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/courses", {
        headers,
      });
      const data = await res.json();
      const safeCourses = Array.isArray(data)
        ? data.map((c) => ({
            ...c,
            instructor: c.instructor || { name: "N/A" },
          }))
        : [];
      setCourses(safeCourses);
      return safeCourses.length;
    } catch (err) {
      console.error("Fetch courses error:", err);
      return 0;
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/lectures", {
        headers,
      });
      const data = await res.json();
      setLectures(Array.isArray(data) ? data : []);
      return Array.isArray(data) ? data.length : 0;
    } catch (err) {
      console.error("Fetch lectures error:", err);
      return 0;
    }
  };

  const fetchDashboard = async () => {
    const [instrCount, courseCount, lectureCount] = await Promise.all([
      fetchInstructors(),
      fetchCourses(),
      fetchLectures(),
    ]);
    setStats({
      admins: 1,
      instructors: instrCount,
      courses: courseCount,
      lectures: lectureCount,
    });
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchDashboard();
    }
  }, [token]);

  // -------------------- ADD FUNCTIONS --------------------
  const handleAddInstructor = async () => {
    if (!instrName || !instrEmail || !instrPassword)
      return showMessage("Please fill all fields", "error");

    try {
      const res = await fetch("http://localhost:5000/api/admin/instructors", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: instrName,
          email: instrEmail,
          password: instrPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        return showMessage(data.message || "Failed to add instructor", "error");

      showMessage("Instructor added successfully");
      setInstrName("");
      setInstrEmail("");
      setInstrPassword("");
      fetchDashboard();
    } catch (err) {
      console.error(err);
      showMessage("Failed to add instructor", "error");
    }
  };

  const handleAddCourse = async () => {
    if (!courseTitle || !courseDesc || !courseInstructorId)
      return showMessage("Please fill all fields", "error");

    try {
      const res = await fetch("http://localhost:5000/api/admin/courses", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: courseTitle,
          description: courseDesc,
          instructor: courseInstructorId,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        return showMessage(data.message || "Failed to add course", "error");

      showMessage("Course added successfully");
      setCourseTitle("");
      setCourseDesc("");
      setCourseInstructorId("");
      fetchDashboard();
    } catch (err) {
      console.error(err);
      showMessage("Failed to add course", "error");
    }
  };

  const handleAddLecture = async () => {
    if (
      !lectureTitle ||
      !lectureDate ||
      !lectureCourseId ||
      !lectureInstructorId
    )
      return showMessage("Please fill all fields", "error");

    const conflict = lectures.find(
      (l) =>
        l.instructor?._id === lectureInstructorId &&
        new Date(l.date).toDateString() === new Date(lectureDate).toDateString()
    );
    if (conflict)
      return showMessage(
        "Instructor already has a lecture on this day!",
        "error"
      );

    try {
      const res = await fetch("http://localhost:5000/api/admin/lectures", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: lectureTitle,
          date: lectureDate,
          course: lectureCourseId,
          instructor: lectureInstructorId,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        return showMessage(data.message || "Failed to add lecture", "error");

      showMessage("Lecture added successfully");
      setLectureTitle("");
      setLectureDate("");
      setLectureCourseId("");
      setLectureInstructorId("");
      fetchDashboard();
    } catch (err) {
      console.error(err);
      showMessage("Failed to add lecture", "error");
    }
  };

  // -------------------- UI --------------------
  const menuBtn =
    "w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition";

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
              <h1 className="text-4xl font-bold mb-3">Welcome, Admin 👋</h1>
              <p className="text-lg opacity-90">
                Manage instructors, courses & lectures seamlessly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[stats.instructors, stats.courses, stats.lectures].map(
                (v, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white shadow rounded-xl border hover:shadow-lg transition"
                  >
                    <h3 className="text-gray-500">
                      {["Instructors", "Courses", "Lectures"][i]}
                    </h3>
                    <p className="text-4xl font-bold text-indigo-600">{v}</p>
                  </div>
                )
              )}
            </div>
            <div className="bg-white p-6 shadow rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">
                Latest Lectures
              </h2>
              <ul className="divide-y">
                {lectures.slice(0, 5).map((l) => (
                  <li key={l._id} className="py-3">
                    <span className="font-semibold">{l.title}</span> —{" "}
                    {l.course?.title || "N/A"} | {l.instructor?.name || "N/A"} |{" "}
                    {new Date(l.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "addInstructor":
        return (
          <div className="max-w-xl bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Add Instructor
            </h2>
            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Name"
              value={instrName}
              onChange={(e) => setInstrName(e.target.value)}
            />
            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Email"
              value={instrEmail}
              onChange={(e) => setInstrEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 border rounded mb-3"
              placeholder="Password"
              value={instrPassword}
              onChange={(e) => setInstrPassword(e.target.value)}
            />
            <button
              onClick={handleAddInstructor}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Add Instructor
            </button>
          </div>
        );
      case "instructorList":
        return (
          <div className="bg-white p-6 rounded-xl shadow max-w-xl">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Instructor List
            </h2>
            <ul className="divide-y">
              {instructors.map((i) => (
                <li key={i._id} className="py-3">
                  {i.name} — {i.email}
                </li>
              ))}
            </ul>
          </div>
        );
      case "addCourse":
        return (
          <div className="max-w-xl bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Add Course
            </h2>
            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 border rounded mb-3"
              placeholder="Course Description"
              value={courseDesc}
              onChange={(e) => setCourseDesc(e.target.value)}
            />
            <select
              className="w-full p-3 border rounded mb-3"
              value={courseInstructorId}
              onChange={(e) => setCourseInstructorId(e.target.value)}
            >
              <option value="">Select Instructor</option>
              {instructors.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddCourse}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Add Course
            </button>
          </div>
        );
      case "courseList":
        return (
          <div className="bg-white p-6 rounded-xl shadow max-w-xl">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Course List
            </h2>
            <ul className="divide-y">
              {courses.map((c) => (
                <li key={c._id} className="py-3">
                  {c.title} — Instructor: {c.instructor?.name || "N/A"}
                </li>
              ))}
            </ul>
          </div>
        );
      case "addLecture":
        const availableInstructors = instructors.filter((i) => {
          if (!lectureDate) return true;
          return !lectures.find(
            (l) =>
              l.instructor?._id === i._id &&
              new Date(l.date).toDateString() ===
                new Date(lectureDate).toDateString()
          );
        });
        return (
          <div className="max-w-xl bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              Add Lecture
            </h2>
            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Lecture Title"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-3 border rounded mb-3"
              value={lectureDate}
              onChange={(e) => setLectureDate(e.target.value)}
            />
            <select
              className="w-full p-3 border rounded mb-3"
              value={lectureCourseId}
              onChange={(e) => setLectureCourseId(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 border rounded mb-3"
              value={lectureInstructorId}
              onChange={(e) => setLectureInstructorId(e.target.value)}
            >
              <option value="">Select Instructor</option>
              {availableInstructors.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
            {lectureDate && availableInstructors.length === 0 && (
              <p className="text-red-500 mb-3">
                No instructors available on this date!
              </p>
            )}
            <button
              onClick={handleAddLecture}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
              Add Lecture
            </button>
          </div>
        );
      case "lectureList":
        return (
          <div className="bg-white p-6 rounded-xl shadow max-w-xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              Lecture List
            </h2>
            <ul className="divide-y">
              {lectures.map((l) => (
                <li key={l._id} className="py-3">
                  {l.title} — {l.course?.title || "N/A"} —{" "}
                  {l.instructor?.name || "N/A"} —{" "}
                  {new Date(l.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white p-6 shadow-lg border-r">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Admin Panel</h1>
        <div className="space-y-2">
          <button className={menuBtn} onClick={() => setActivePage("home")}>
            Dashboard
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("addInstructor")}
          >
            Add Instructor
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("instructorList")}
          >
            Instructor List
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("addCourse")}
          >
            Add Course
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("courseList")}
          >
            Course List
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("addLecture")}
          >
            Add Lecture
          </button>
          <button
            className={menuBtn}
            onClick={() => setActivePage("lectureList")}
          >
            Lecture List
          </button>
          <button
            className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-10">{renderPage()}</div>
      {message.text && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-xl text-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
