import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    admins: 1,
    instructors: 0,
    courses: 0,
    lectures: 0,
  });

  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  const [instrName, setInstrName] = useState("");
  const [instrEmail, setInstrEmail] = useState("");

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

  // FETCH FUNCTIONS
  const fetchInstructors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/instructors");
      if (!res.ok) throw new Error("Failed to fetch instructors");
      const data = await res.json();
      setInstructors(data);
      return data.length;
    } catch (err) {
      showMessage(err.message, "error");
      return 0;
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
      return data.length;
    } catch (err) {
      showMessage(err.message, "error");
      return 0;
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/lectures");
      if (!res.ok) throw new Error("Failed to fetch lectures");
      const data = await res.json();
      setLectures(data);
      return data.length;
    } catch (err) {
      showMessage(err.message, "error");
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
    fetchDashboard();
  }, []);

  // ADD HANDLERS
  const handleAddInstructor = async () => {
    if (!instrName || !instrEmail)
      return showMessage("Please fill all fields", "error");
    try {
      const res = await fetch("http://localhost:5000/api/admin/instructors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: instrName, email: instrEmail }),
      });
      if (!res.ok) throw new Error("Failed to add instructor");
      showMessage("Instructor added successfully");
      setInstrName("");
      setInstrEmail("");
      fetchDashboard();
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleAddCourse = async () => {
    if (!courseTitle || !courseDesc || !courseInstructorId)
      return showMessage("Please fill all fields", "error");
    try {
      const res = await fetch("http://localhost:5000/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          description: courseDesc,
          instructorId: courseInstructorId,
        }),
      });
      if (!res.ok) throw new Error("Failed to add course");
      showMessage("Course added successfully");
      setCourseTitle("");
      setCourseDesc("");
      setCourseInstructorId("");
      fetchDashboard();
    } catch (err) {
      showMessage(err.message, "error");
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

    // Check if instructor already has a lecture on this date
    const conflict = lectures.find(
      (l) =>
        l.instructorId?._id === lectureInstructorId &&
        new Date(l.date).toDateString() === new Date(lectureDate).toDateString()
    );

    if (conflict) {
      return showMessage(
        `Instructor already has a lecture on ${new Date(
          lectureDate
        ).toLocaleDateString()}`,
        "error"
      );
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: lectureTitle,
          date: lectureDate,
          courseId: lectureCourseId,
          instructorId: lectureInstructorId,
        }),
      });
      if (!res.ok) throw new Error("Failed to add lecture");

      showMessage("Lecture added successfully");
      setLectureTitle("");
      setLectureDate("");
      setLectureCourseId("");
      setLectureInstructorId("");
      fetchDashboard();
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* NAVBAR */}
      {/* NAVBAR */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex flex-wrap justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>

        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          {[
            { label: "Admins", value: stats.admins },
            { label: "Instructors", value: stats.instructors },
            { label: "Courses", value: stats.courses },
            { label: "Lectures", value: stats.lectures },
          ].map((box, idx) => (
            <div
              key={idx}
              className="bg-white text-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center min-w-[90px]"
            >
              <p className="text-sm font-medium">{box.label}</p>
              <p className="text-2xl font-bold">{box.value}</p>
            </div>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("token"); // remove JWT token
              window.location.href = "/login"; // redirect to login page
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all ml-4"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message.text && (
        <div
          className={`mx-6 mt-6 p-3 rounded-lg text-center font-medium ${
            message.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } shadow-md`}
        >
          {message.text}
        </div>
      )}

      {/* ADD FORMS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Instructor */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            Add Instructor
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={instrName}
            onChange={(e) => setInstrName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={instrEmail}
            onChange={(e) => setInstrEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleAddInstructor}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            Add Instructor
          </button>
        </div>

        {/* Course */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Add Course
          </h2>
          <input
            type="text"
            placeholder="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <textarea
            placeholder="Description"
            value={courseDesc}
            onChange={(e) => setCourseDesc(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <select
            value={courseInstructorId}
            onChange={(e) => setCourseInstructorId(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
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
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
          >
            Add Course
          </button>
        </div>

        {/* Lecture */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Add Lecture
          </h2>
          <input
            type="text"
            placeholder="Lecture Title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="date"
            value={lectureDate}
            onChange={(e) => setLectureDate(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <select
            value={lectureCourseId}
            onChange={(e) => setLectureCourseId(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <select
            value={lectureInstructorId}
            onChange={(e) => setLectureInstructorId(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="">Select Instructor</option>
            {instructors.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddLecture}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-all"
          >
            Add Lecture
          </button>
        </div>
      </div>

      {/* LISTS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Instructors */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            Instructors
          </h2>
          <ul className="max-h-64 overflow-auto divide-y divide-gray-200">
            {instructors.map((i) => (
              <li key={i._id} className="py-2">
                {i.name} - {i.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Courses</h2>
          <ul className="max-h-64 overflow-auto divide-y divide-gray-200">
            {courses.map((c) => (
              <li key={c._id} className="py-2">
                {c.title} - Instructor: {c.instructorId?.name || "N/A"}
              </li>
            ))}
          </ul>
        </div>

        {/* Lectures */}
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Lectures
          </h2>
          <ul className="max-h-64 overflow-auto divide-y divide-gray-200">
            {lectures.map((l) => (
              <li key={l._id} className="py-2">
                {l.title} - Course: {l.courseId?.title || "N/A"} - Instructor:{" "}
                {l.instructorId?.name || "N/A"} -{" "}
                {new Date(l.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
