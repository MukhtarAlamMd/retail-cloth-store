import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";

import { getDepartmentById } from "../../services/DepartmentService";

import { FaBuilding, FaCode, FaInfoCircle, FaArrowLeft } from "react-icons/fa";

const ViewDepartment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [department, setDepartment] = useState({});

  useEffect(() => {
    loadDepartment();
  }, [id]);

  const loadDepartment = () => {
    getDepartmentById(id)
      .then((response) => {
        setDepartment(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white">
            <h3>
              <FaBuilding className="me-2" />
              Department Details
            </h3>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="fw-bold">
                  <FaCode className="me-2" />
                  Department Code
                </label>

                <p className="form-control">{department.departmentCode}</p>
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">
                  <FaBuilding className="me-2" />
                  Department Name
                </label>

                <p className="form-control">{department.departmentName}</p>
              </div>

              <div className="col-md-12 mb-3">
                <label className="fw-bold">
                  <FaInfoCircle className="me-2" />
                  Description
                </label>

                <p className="form-control">{department.description}</p>
              </div>

              <div className="col-md-6">
                <label className="fw-bold">Status</label>

                <p className="form-control">{department.status}</p>
              </div>
            </div>

            <button
              className="btn btn-secondary mt-3"
              onClick={() => navigate("/departments")}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewDepartment;
