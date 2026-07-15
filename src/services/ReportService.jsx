import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/reports";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Dashboard
export const getDashboardReport = () =>
  API.get(`${API_URL}/dashboard`, authHeader());

// Sales
export const getSalesReport = () => API.get(`${API_URL}/sales`, authHeader());

// Purchases

export const getPurchaseReport = (start, end) => {
  return API.get(
    `${API_URL}/purchases`,

    {
      params: {
        start,
        end,
      },

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
// Inventory
export const getInventoryReport = () =>
  API.get(`${API_URL}/inventory`, authHeader());

// Customers
export const getCustomerReport = () =>
  API.get(`${API_URL}/customers`, authHeader());

// Suppliers
export const getSupplierReport = () =>
  API.get(`${API_URL}/suppliers`, authHeader());

// Employees
export const getEmployeeReport = () =>
  API.get(`${API_URL}/employees`, authHeader());

// Attendance
export const getAttendanceReport = () =>
  API.get(`${API_URL}/attendance`, authHeader());

// Payroll
export const getPayrollReport = () =>
  API.get(`${API_URL}/payroll`, authHeader());

// Leave
export const getLeaveReport = () => API.get(`${API_URL}/leave`, authHeader());

// Expenses
export const getExpenseReport = () =>
  API.get(`${API_URL}/expenses`, authHeader());

// Profit & Loss
export const getProfitLossReport = () =>
  API.get(`${API_URL}/profit-loss`, authHeader());
