import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";

import { getDesignationById } from "../../services/DesignationService";

import {
  FaBriefcase,
  FaBuilding,
  FaArrowLeft,
  FaCode,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const ViewDesignation = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [designation, setDesignation] = useState({
    designationCode: "",

    designationName: "",

    departmentName: "",

    description: "",

    status: "",
  });

  useEffect(() => {
    loadDesignation();
  }, [id]);

  const loadDesignation = () => {
    getDesignationById(id)
      .then((response) => {
        setDesignation(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-info text-white">
            <h3 className="mb-0">
              <FaBriefcase className="me-2" />
              View Designation
            </h3>
          </div>

          <div className="card-body">
            <div className="row">
              {/* Designation Code */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaCode className="me-2" />
                  Designation Code
                </label>

                <div className="form-control bg-light">
                  {designation.designationCode}
                </div>
              </div>

              {/* Designation Name */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaBriefcase className="me-2" />
                  Designation Name
                </label>

                <div className="form-control bg-light">
                  {designation.designationName}
                </div>
              </div>

              {/* Department */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaBuilding className="me-2" />
                  Department
                </label>

                <div className="form-control bg-light">
                  {designation.departmentName}
                </div>
              </div>

              {/* Status */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaCheckCircle className="me-2" />
                  Status
                </label>

                <div>
                  <span
                    className={`badge fs-6 ${
                      designation.status === "Active"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {designation.status}
                  </span>
                </div>
              </div>

              {/* Description */}

              <div className="col-md-12 mb-3">
                <label className="form-label fw-bold">
                  <FaInfoCircle className="me-2" />
                  Description
                </label>

                <div
                  className="form-control bg-light"
                  style={{ minHeight: "120px" }}
                >
                  {designation.description || "No description available."}
                </div>
              </div>
            </div>

            {/* Action Button */}

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/designations")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewDesignation;
