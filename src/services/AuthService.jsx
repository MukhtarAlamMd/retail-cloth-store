import API from "./AxiosConfig";

const AUTH_API = "/api/auth";

// Register
export const registerUser = (user) => {
  return API.post(`${AUTH_API}/register`, user);
};

// Login
export const loginUser = (login) => {
  return API.post(`${AUTH_API}/login`, login);
};
