import API from "./AxiosConfig";

const REST_API_BASE_URL = "http://localhost:8081/api/users";

// =============================
// JWT Header
// =============================
const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// =============================
// Get All Users
// =============================
export const listUsers = () => API.get(REST_API_BASE_URL, getAuthConfig());

// =============================
// Get User By Id
// =============================
export const getUser = (userId) =>
  API.get(`${REST_API_BASE_URL}/${userId}`, getAuthConfig());

// =============================
// Create User
// =============================
export const createUser = (user) =>
  API.post(REST_API_BASE_URL, user, getAuthConfig());

// =============================
// Update User
// =============================
export const updateUser = (userId, user) =>
  API.put(`${REST_API_BASE_URL}/${userId}`, user, getAuthConfig());

// =============================
// Delete User
// =============================
export const deleteUser = (userId) =>
  API.delete(`${REST_API_BASE_URL}/${userId}`, getAuthConfig());
