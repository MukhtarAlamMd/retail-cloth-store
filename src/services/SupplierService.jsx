import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/suppliers";

// ==========================
// Get All Suppliers
// ==========================
export const getAllSuppliers = () => {
  return API.get(API_URL);
};

// ==========================
// Get Supplier By ID
// ==========================
export const getSupplierById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// ==========================
// Create Supplier
// ==========================
export const createSupplier = (supplier) => {
  return API.post(API_URL, supplier);
};

// ==========================
// Update Supplier
// ==========================
export const updateSupplier = (id, supplier) => {
  return API.put(`${API_URL}/${id}`, supplier);
};

// ==========================
// Delete Supplier
// ==========================
export const deleteSupplier = (id) => {
  return API.delete(`${API_URL}/${id}`);
};
