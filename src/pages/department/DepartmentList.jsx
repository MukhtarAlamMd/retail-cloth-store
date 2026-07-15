import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  listDepartments,
  deleteDepartment,
  searchDepartmentByName,
  getDepartmentsByStatus,
} from "../../services/DepartmentService";

import {
  FaBuilding,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) {
      return;
    }

    deleteDepartment(id)
      .then(() => {
        loadDepartments();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      loadDepartments();

      return;
    }

    searchDepartmentByName(search)
      .then((response) => {
        setDepartments(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusFilter = (value) => {
    setStatus(value);

    if (value === "") {
      loadDepartments();

      return;
    }

    getDepartmentsByStatus(value)
      .then((response) => {
        setDepartments(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <FaBuilding className="me-2" />
              Department Management
            </h4>

            {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
              <Link to="/add-department" className="btn btn-light">
                <FaPlus className="me-2" />
                Add Department
              </Link>
            )}
          </div>

          <div className="card-body">
            <div className="row mb-4">
              {/* Search */}

              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Status Filter */}

              <div className="col-md-3 mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaFilter />
                  </span>

                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Department Table */}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="70">ID</th>

                    <th>Department Code</th>

                    <th>Department Name</th>

                    <th>Description</th>

                    <th width="120">Status</th>

                    <th width="220" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {departments.length > 0 ? (
                    departments.map((department) => (
                      <tr key={department.id}>
                        <td>{department.id}</td>

                        <td>
                          <strong>{department.departmentCode}</strong>
                        </td>

                        <td>{department.departmentName}</td>

                        <td>{department.description}</td>

                        <td>
                          <span
                            className={`badge ${
                              department.status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {department.status}
                          </span>
                        </td>

                        <td className="text-center">
                          <Link
                            to={`/view-department/${department.id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            <FaEye />
                          </Link>

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              <Link
                                to={`/edit-department/${department.id}`}
                                className="btn btn-warning btn-sm me-2"
                              >
                                <FaEdit />
                              </Link>

                              {role === "ROLE_ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(department.id)}
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No departments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="fw-bold text-primary">
                  Total Departments :
                </span>

                <span className="badge bg-primary ms-2 fs-6">
                  {departments.length}
                </span>
              </div>

              <button
                className="btn btn-outline-primary"
                onClick={loadDepartments}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DepartmentList;
