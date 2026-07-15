import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  listEmployees,
  deleteEmployee,
  searchEmployee,
} from "../../services/EmployeeService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    listEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    deleteEmployee(employeeId)
      .then(() => {
        loadEmployees();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      loadEmployees();
      return;
    }

    searchEmployee(search)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="card shadow">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <FaUsers className="me-2" />
              Employee Management
            </h4>

            {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
              <Link to="/add-employee" className="btn btn-light">
                <FaPlus className="me-2" />
                Add Employee
              </Link>
            )}
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th width="220">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>{employee.employeeId}</td>

                      <td>{employee.employeeCode}</td>

                      <td>
                        {employee.firstName} {employee.lastName}
                      </td>

                      <td>{employee.department}</td>

                      <td>{employee.designation}</td>

                      <td>{employee.phone}</td>

                      <td>₹ {employee.salary}</td>

                      <td>
                        <span
                          className={`badge ${
                            employee.status === "Active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/view-employee/${employee.employeeId}`}
                          className="btn btn-info btn-sm me-2"
                        >
                          <FaEye />
                        </Link>

                        {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
                          <>
                            <Link
                              to={`/edit-employee/${employee.employeeId}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              <FaEdit />
                            </Link>

                            {role === "ROLE_ADMIN" && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(employee.employeeId)
                                }
                              >
                                <FaTrash />
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeList;
