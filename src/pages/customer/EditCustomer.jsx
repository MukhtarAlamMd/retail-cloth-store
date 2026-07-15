import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer,
} from "../../services/CustomerService";

const EditCustomer = () => {
  const { id } = useParams();

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

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const response = await getCustomerById(id);

      setCustomer(response.data);
    } catch (error) {
      console.error(error);

      alert("Unable to load customer.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCustomer(id, customer);

      alert("Customer updated successfully.");

      navigate("/customers");
    } catch (error) {
      console.error(error);

      alert("Unable to update customer.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Edit Customer</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={customer.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={customer.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>

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

              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile</label>

                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={customer.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={customer.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">PIN Code</label>

                <input
                  type="text"
                  className="form-control"
                  name="pinCode"
                  value={customer.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Address</label>

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

            <button type="submit" className="btn btn-warning">
              Update Customer
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/customers")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
