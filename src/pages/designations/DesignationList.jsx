import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  listDesignations,
  deleteDesignation,
  searchDesignationByName,
  getDesignationsByStatus,
  getDesignationsByDepartment,
} from "../../services/DesignationService";

import { listDepartments } from "../../services/DepartmentService";

import {
  FaBriefcase,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSyncAlt,
} from "react-icons/fa";

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [departmentId, setDepartmentId] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadDesignations();

    loadDepartments();
  }, []);

  const loadDesignations = () => {
    listDesignations()
      .then((response) => {
        setDesignations(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

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
    if (!window.confirm("Are you sure you want to delete this designation?")) {
      return;
    }

    deleteDesignation(id)
      .then(() => {
        loadDesignations();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      loadDesignations();

      return;
    }

    searchDesignationByName(search)
      .then((response) => {
        setDesignations(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusFilter = (value) => {
    setStatus(value);

    if (value === "") {
      loadDesignations();

      return;
    }

    getDesignationsByStatus(value)
      .then((response) => {
        setDesignations(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleDepartmentFilter = (value) => {
    setDepartmentId(value);

    if (value === "") {
      loadDesignations();

      return;
    }

    getDesignationsByDepartment(value)
      .then((response) => {
        setDesignations(response.data);
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
              <FaBriefcase className="me-2" />
              Designation Management
            </h4>

            {(role === "ROLE_ADMIN" || role === "ROLE_HR") && (
              <Link to="/add-designation" className="btn btn-light">
                <FaPlus className="me-2" />
                Add Designation
              </Link>
            )}
          </div>

          <div className="card-body">
            {/* Search & Filter Section */}

            <div className="row mb-4">
              {/* Search */}

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Designation..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Status Filter */}

              <div className="col-lg-3 col-md-6 mb-3">
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

              {/* Department Filter */}

              <div className="col-lg-3 col-md-6 mb-3">
                <select
                  className="form-select"
                  value={departmentId}
                  onChange={(e) => handleDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>

                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh */}

              <div className="col-lg-2 col-md-6 mb-3">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => {
                    setSearch("");

                    setStatus("");

                    setDepartmentId("");

                    loadDesignations();
                  }}
                >
                  <FaSyncAlt className="me-2" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Designation Table */}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="70">ID</th>

                    <th>Code</th>

                    <th>Designation</th>

                    <th>Department</th>

                    <th>Description</th>

                    <th width="120">Status</th>

                    <th width="220" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {designations.length > 0 ? (
                    designations.map((designation) => (
                      <tr key={designation.id}>
                        <td>{designation.id}</td>

                        <td>
                          <strong>{designation.designationCode}</strong>
                        </td>

                        <td>{designation.designationName}</td>

                        <td>{designation.departmentName}</td>

                        <td>{designation.description}</td>

                        <td>
                          <span
                            className={`badge ${
                              designation.status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {designation.status}
                          </span>
                        </td>

                        <td className="text-center">
                          <Link
                            to={`/view-designation/${designation.id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            <FaEye />
                          </Link>

                          {(role === "ROLE_ADMIN" || role === "ROLE_HR") && (
                            <>
                              <Link
                                to={`/edit-designation/${designation.id}`}
                                className="btn btn-warning btn-sm me-2"
                              >
                                <FaEdit />
                              </Link>

                              {role === "ROLE_ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(designation.id)}
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
                      <td colSpan="7" className="text-center text-muted py-4">
                        No Designations Found.
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
                  Total Designations :
                </span>

                <span className="badge bg-primary ms-2 fs-6">
                  {designations.length}
                </span>
              </div>

              <button
                className="btn btn-outline-primary"
                onClick={loadDesignations}
              >
                <FaSyncAlt className="me-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignationList;
