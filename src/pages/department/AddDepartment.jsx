import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

import { createDepartment } from "../../services/DepartmentService";

import {
  FaBuilding,
  FaSave,
  FaArrowLeft,
  FaInfoCircle,
  FaCode,
} from "react-icons/fa";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState({
    departmentCode: "",

    departmentName: "",

    description: "",

    status: "Active",
  });

  const handleChange = (e) => {
    setDepartment({
      ...department,

      [e.target.name]: e.target.value,
    });
  };

  const saveDepartment = (e) => {
    e.preventDefault();

    setLoading(true);

    createDepartment(department)
      .then(() => {
        alert("Department Added Successfully.");

        navigate("/departments");
      })

      .catch((error) => {
        console.log(error);

        alert("Unable to Save Department.");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <FaBuilding className="me-2" />
              Add Department
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={saveDepartment}>
              <div className="row"></div>

              {/* Department Code */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaCode className="me-2" />
                  Department Code
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="departmentCode"
                  placeholder="Enter Department Code"
                  value={department.departmentCode}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Department Name */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaBuilding className="me-2" />
                  Department Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  value={department.departmentName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}

              <div className="col-md-12 mb-3">
                <label className="form-label fw-bold">
                  <FaInfoCircle className="me-2" />
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  placeholder="Enter Department Description"
                  value={department.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Status */}

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={department.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="col-md-6">
                {/* Buttons */}

                <div className="col-12">
                  <hr />

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate("/departments")}
                    >
                      <FaArrowLeft className="me-2" />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          Save Department
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddDepartment;
