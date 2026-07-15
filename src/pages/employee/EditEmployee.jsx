import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/EmployeeService";
import { FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    designation: "",
    department: "",
    salary: "",
    joiningDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (id) {
      loadEmployee();
    } else {
      alert("Employee ID not found.");
      navigate("/employees");
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await getEmployeeById(id);

      setEmployee({
        ...response.data,
        dateOfBirth: response.data.dateOfBirth
          ? response.data.dateOfBirth.substring(0, 10)
          : "",
        joiningDate: response.data.joiningDate
          ? response.data.joiningDate.substring(0, 10)
          : "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load employee.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const update = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee(id, employee);

      alert("Employee updated successfully.");

      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Unable to update employee.");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow-lg">
          <div className="card-header bg-warning">
            <h4 className="mb-0">
              <FaEdit className="me-2" />
              Edit Employee
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={update}>
              {/* Employee Code */}
              <div className="mb-3">
                <label className="form-label">Employee Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeCode"
                  value={employee.employeeCode}
                  onChange={handleChange}
                />
              </div>

              {/* First Name */}
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={employee.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* DOB */}
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={employee.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                />
              </div>

              {/* Department */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                />
              </div>

              {/* Designation */}
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Joining Date */}
              <div className="mb-3">
                <label className="form-label">Joining Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  rows="3"
                  className="form-control"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/employees")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>

              <button type="submit" className="btn btn-warning">
                <FaSave className="me-2" />
                Update Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditEmployee;
