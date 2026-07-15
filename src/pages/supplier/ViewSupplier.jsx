import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierById } from "../../services/SupplierService";

const ViewSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    supplierName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    status: "",
  });

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    try {
      const response = await getSupplierById(id);
      setSupplier(response.data);
    } catch (error) {
      console.error("Error loading supplier:", error);
      alert("Unable to load supplier details.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">View Supplier</h3>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Supplier Name</label>
            <div className="col-md-9">{supplier.supplierName}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Contact Person</label>
            <div className="col-md-9">{supplier.contactPerson}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Mobile</label>
            <div className="col-md-9">{supplier.mobile}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Email</label>
            <div className="col-md-9">{supplier.email}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">GST Number</label>
            <div className="col-md-9">{supplier.gstNumber}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Address</label>
            <div className="col-md-9">{supplier.address}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">City</label>
            <div className="col-md-9">{supplier.city}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">State</label>
            <div className="col-md-9">{supplier.state}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">PIN Code</label>
            <div className="col-md-9">{supplier.pinCode}</div>
          </div>

          <div className="row mb-4">
            <label className="col-md-3 fw-bold">Status</label>
            <div className="col-md-9">
              {supplier.status === "ACTIVE" ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-danger">Inactive</span>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/suppliers")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;
