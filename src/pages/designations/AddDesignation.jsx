import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

import { createDesignation } from "../../services/DesignationService";
import { listDepartments } from "../../services/DepartmentService";

import {
  FaBriefcase,
  FaBuilding,
  FaSave,
  FaArrowLeft,
  FaCode,
  FaInfoCircle,
} from "react-icons/fa";

const AddDesignation = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

  const [designation, setDesignation] = useState({
    designationCode: "",

    designationName: "",

    departmentId: "",

    description: "",

    status: "Active",
  });

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

  const handleChange = (e) => {
    setDesignation({
      ...designation,

      [e.target.name]: e.target.value,
    });
  };

  const saveDesignation = (e) => {
    e.preventDefault();

    setLoading(true);

    createDesignation(designation)
      .then(() => {
        alert("Designation Added Successfully.");

        navigate("/designations");
      })

      .catch((error) => {
        console.log(error);

        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Unable to save designation.");
        }
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
              <FaBriefcase className="me-2" />
              Add Designation
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={saveDesignation}>
              <div className="row">
                {/* Designation Code */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaCode className="me-2" />
                    Designation Code
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="designationCode"
                    value={designation.designationCode}
                    onChange={handleChange}
                    placeholder="Enter designation code"
                    required
                  />
                </div>

                {/* Designation Name */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaBriefcase className="me-2" />
                    Designation Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="designationName"
                    value={designation.designationName}
                    onChange={handleChange}
                    placeholder="Enter designation name"
                    required
                  />
                </div>

                {/* Department */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaBuilding className="me-2" />
                    Department
                  </label>

                  <select
                    className="form-select"
                    name="departmentId"
                    value={designation.departmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={designation.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </select>
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
                    value={designation.description}
                    onChange={handleChange}
                    placeholder="Enter designation description"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}

              <div className="mt-4 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  <FaSave className="me-2" />

                  {loading ? "Saving..." : "Save Designation"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/designations")}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddDesignation;
