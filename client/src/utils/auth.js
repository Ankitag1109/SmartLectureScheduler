export const setAdminToken = (token) =>
  localStorage.setItem("adminToken", token);

export const isAdminLoggedIn = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

export const getAdminInfo = () => {
  const data = localStorage.getItem("adminData");
  return data ? JSON.parse(data) : null;
};

export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  window.location.href = "/admin/login";
};

export const setInstructorToken = (token) =>
  localStorage.setItem("instructorToken", token);

export const isInstructorLoggedIn = () => {
  const token = localStorage.getItem("instructorToken");
  return !!token;
};

export const getInstructorInfo = () => {
  const data = localStorage.getItem("instructorData");
  return data ? JSON.parse(data) : null;
};

export const instructorLogout = () => {
  localStorage.removeItem("instructorToken");
  localStorage.removeItem("instructorData");
  window.location.href = "/instructor/login";
};
