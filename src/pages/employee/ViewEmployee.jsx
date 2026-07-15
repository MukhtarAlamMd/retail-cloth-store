import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

import { getEmployeeById } from "../../services/EmployeeService";

import {
  FaUser,
  FaIdBadge,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = () => {
    getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">
              <FaUser className="me-2" />
              Employee Details
            </h4>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>
                  <FaIdBadge className="me-2 text-primary" />
                  Employee Code
                </strong>
                <p>{employee.employeeCode}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaUser className="me-2 text-primary" />
                  Full Name
                </strong>
                <p>
                  {employee.firstName} {employee.lastName}
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Gender</strong>
                <p>{employee.gender}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaCalendarAlt className="me-2 text-primary" />
                  Date of Birth
                </strong>
                <p>{employee.dateOfBirth}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaPhone className="me-2 text-success" />
                  Phone
                </strong>
                <p>{employee.phone}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaEnvelope className="me-2 text-danger" />
                  Email
                </strong>
                <p>{employee.email}</p>
              </div>

              <div className="col-md-12 mb-3">
                <strong>
                  <FaMapMarkerAlt className="me-2 text-warning" />
                  Address
                </strong>
                <p>{employee.address}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaBuilding className="me-2 text-primary" />
                  Department
                </strong>
                <p>{employee.department}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaBriefcase className="me-2 text-primary" />
                  Designation
                </strong>
                <p>{employee.designation}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaMoneyBillWave className="me-2 text-success" />
                  Salary
                </strong>
                <p>₹ {employee.salary}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>
                  <FaCalendarAlt className="me-2 text-primary" />
                  Joining Date
                </strong>
                <p>{employee.joiningDate}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status</strong>
                <br />

                <span
                  className={`badge ${
                    employee.status === "Active" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
          </div>

          <div className="card-footer text-end">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/employees")}
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

export default ViewEmployee;
