import API from "./AxiosConfig";

const API_URL = "/api/attendance";

export const listAttendance = () => API.get(API_URL);

export const getAttendanceById = (id) => API.get(`${API_URL}/${id}`);

export const createAttendance = (attendance) => API.post(API_URL, attendance);

export const updateAttendance = (id, attendance) =>
  API.put(`${API_URL}/${id}`, attendance);

export const deleteAttendance = (id) => API.delete(`${API_URL}/${id}`);
export const getAttendanceByEmployee = (employeeId) => {
  return axios.get(`${REST_API_BASE_URL}/employee/${employeeId}`);
};
