import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/dashboard";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard = () => API.get(API_URL, getConfig());

export const getMonthlySales = () => {
  return API.get(`${BASE_URL}/analytics/monthly-sales`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
};
