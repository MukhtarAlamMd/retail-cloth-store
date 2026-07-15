import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../services/CustomerService";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!customer.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!customer.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!customer.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!customer.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(customer.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(customer.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!customer.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!customer.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!customer.pinCode.trim()) {
      newErrors.pinCode = "PIN Code is required";
    } else if (!/^[0-9]{6}$/.test(customer.pinCode)) {
      newErrors.pinCode = "PIN Code must be exactly 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Keep your existing handleChange, handleSubmit,
  // and the entire JSX below unchanged.

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createCustomer(customer);

      alert("Customer added successfully.");

      navigate("/customers");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Failed to add customer.");
      } else {
        alert("Server error.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add Customer</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-md-3 col-form-label">First Name</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={customer.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Last Name</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={customer.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Gender</label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  name="gender"
                  value={customer.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Mobile</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={customer.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Email</label>

              <div className="col-md-9">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Address</label>

              <div className="col-md-9">
                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">City</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">State</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={customer.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <label className="col-md-3 col-form-label">PIN Code</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  name="pinCode"
                  value={customer.pinCode}
                  onChange={handleChange}
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary me-2">
                Save Customer
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/customers")}
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

export default AddCustomer;
