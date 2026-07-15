import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  getDepartmentById,
  updateDepartment,
} from "../../services/DepartmentService";

import {
  FaBuilding,
  FaSave,
  FaArrowLeft,
  FaCode,
  FaInfoCircle,
} from "react-icons/fa";

const EditDepartment = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState({
    departmentCode: "",

    departmentName: "",

    description: "",

    status: "Active",
  });

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = () => {
    getDepartmentById(id)
      .then((response) => {
        setDepartment(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setDepartment({
      ...department,

      [e.target.name]: e.target.value,
    });
  };

  const updateDepartmentRecord = (e) => {
    e.preventDefault();

    setLoading(true);

    updateDepartment(id, department)
      .then(() => {
        alert("Department Updated Successfully.");

        navigate("/departments");
      })

      .catch((error) => {
        console.log(error);

        alert("Unable to Update Department.");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-warning text-dark">
            <h3 className="mb-0">
              <FaBuilding className="me-2" />
              Edit Department
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={updateDepartmentRecord}>
              <div className="row"></div>

              <div className="row">
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
                    value={department.departmentCode}
                    onChange={handleChange}
                    placeholder="Enter department code"
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
                    value={department.departmentName}
                    onChange={handleChange}
                    placeholder="Enter department name"
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
                    value={department.description}
                    onChange={handleChange}
                    placeholder="Enter department description"
                  ></textarea>
                </div>

                {/* Status */}
                <div className="col-md-6 mb-3">
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
              </div>

              <div className="mt-4 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  <FaSave className="me-2" />

                  {loading ? "Updating..." : "Update Department"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/departments")}
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

export default EditDepartment;
