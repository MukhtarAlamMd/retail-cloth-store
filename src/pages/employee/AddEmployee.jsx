import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import { createEmployee } from "../../services/EmployeeService";

import { FaUserPlus, FaSave, FaArrowLeft } from "react-icons/fa";

const AddEmployee = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployee = (e) => {
    e.preventDefault();

    createEmployee(employee)
      .then(() => {
        alert("Employee added successfully.");
        navigate("/employees");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to save employee.");
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaUserPlus className="me-2" />
              Add Employee
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={saveEmployee}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee Code</label>

                  <input
                    type="text"
                    className="form-control"
                    name="employeeCode"
                    value={employee.employeeCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label>

                  <select
                    className="form-select"
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Birth</label>

                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={employee.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Department</label>

                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Designation</label>

                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Salary</label>

                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Joining Date</label>

                  <input
                    type="date"
                    className="form-control"
                    name="joiningDate"
                    value={employee.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label">Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={employee.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/employees")}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>

                <button type="submit" className="btn btn-primary">
                  <FaSave className="me-2" />
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddEmployee;
