import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/purchases";

// ==========================
// Get All Purchases
// ==========================
export const getAllPurchases = () => {
  return API.get(API_URL);
};

// ==========================
// Get Purchase By ID
// ==========================
export const getPurchaseById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// ==========================
// Create Purchase
// ==========================
export const createPurchase = (purchase) => {
  return API.post(API_URL, purchase);
};

// ==========================
// Update Purchase
// ==========================
export const updatePurchase = (id, purchase) => {
  return API.put(`${API_URL}/${id}`, purchase);
};

// ==========================
// Delete Purchase
// ==========================
export const deletePurchase = (id) => {
  return API.delete(`${API_URL}/${id}`);
};

// ==========================
// Search Purchases
// ==========================
export const searchPurchases = (keyword) => {
  return API.get(`${API_URL}/search?keyword=${keyword}`);
};
