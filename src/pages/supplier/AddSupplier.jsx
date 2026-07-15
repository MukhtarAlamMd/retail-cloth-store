import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../services/SupplierService";

const AddSupplier = () => {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    supplierName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================
  // Validation
  // ==========================
  const validateForm = () => {
    const newErrors = {};

    if (!supplier.supplierName.trim()) {
      newErrors.supplierName = "Supplier Name is required";
    }

    if (!supplier.contactPerson.trim()) {
      newErrors.contactPerson = "Contact Person is required";
    }

    if (!supplier.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(supplier.mobile)) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits";
    }

    if (!supplier.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(supplier.email)
    ) {
      newErrors.email = "Invalid Email";
    }

    if (!supplier.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!supplier.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!supplier.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!supplier.pinCode.trim()) {
      newErrors.pinCode = "PIN Code is required";
    } else if (!/^[0-9]{6}$/.test(supplier.pinCode)) {
      newErrors.pinCode = "PIN Code must be exactly 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Save Supplier
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createSupplier(supplier);

      alert("Supplier added successfully.");

      navigate("/suppliers");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unable to add supplier.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add Supplier</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Supplier Name</label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="supplierName"
                  className={`form-control ${
                    errors.supplierName ? "is-invalid" : ""
                  }`}
                  value={supplier.supplierName}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.supplierName}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Contact Person</label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="contactPerson"
                  className={`form-control ${
                    errors.contactPerson ? "is-invalid" : ""
                  }`}
                  value={supplier.contactPerson}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.contactPerson}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Mobile</label>

              <div className="col-md-9">
                <input
                  type="text"
                  maxLength="10"
                  name="mobile"
                  className={`form-control ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                  value={supplier.mobile}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.mobile}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Email</label>

              <div className="col-md-9">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={supplier.email}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.email}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Address</label>

              <div className="col-md-9">
                <textarea
                  rows="3"
                  name="address"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  value={supplier.address}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.address}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">City</label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="city"
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  value={supplier.city}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.city}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">State</label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="state"
                  className={`form-control ${errors.state ? "is-invalid" : ""}`}
                  value={supplier.state}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.state}</div>
              </div>
            </div>

            <div className="row mb-4">
              <label className="col-md-3 col-form-label">PIN Code</label>

              <div className="col-md-9">
                <input
                  type="text"
                  maxLength="6"
                  name="pinCode"
                  className={`form-control ${
                    errors.pinCode ? "is-invalid" : ""
                  }`}
                  value={supplier.pinCode}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.pinCode}</div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary me-2">
                Save Supplier
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/suppliers")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
