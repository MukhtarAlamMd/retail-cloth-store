import API from "./AxiosConfig";

const REST_API_BASE_URL = "http://localhost:8081/api/expenses";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ==============================
// Get All Expenses
// ==============================
export const listExpenses = () => API.get(REST_API_BASE_URL, getAuthConfig());

// ==============================
// Get Expense By Id
// ==============================
export const getExpense = (expenseId) =>
  API.get(`${REST_API_BASE_URL}/${expenseId}`, getAuthConfig());

// ==============================
// Create Expense
// ==============================
export const createExpense = (expense) =>
  API.post(REST_API_BASE_URL, expense, getAuthConfig());

// ==============================
// Update Expense
// ==============================
export const updateExpense = (expenseId, expense) =>
  API.put(`${REST_API_BASE_URL}/${expenseId}`, expense, getAuthConfig());

// ==============================
// Delete Expense
// ==============================
export const deleteExpense = (expenseId) =>
  API.delete(`${REST_API_BASE_URL}/${expenseId}`, getAuthConfig());
