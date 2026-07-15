import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getAllCustomers,
  deleteCustomer,
} from "../../services/CustomerService";

import {
  FaUsers,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getAllCustomers();
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      setCustomers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await deleteCustomer(id);
      alert("Customer deleted successfully.");
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete customer.");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      `${customer.firstName || ""} ${customer.lastName || ""}`
        .toLowerCase()
        .includes(keyword) ||
      (customer.mobile || "").includes(search) ||
      (customer.email || "").toLowerCase().includes(keyword) ||
      (customer.city || "").toLowerCase().includes(keyword) ||
      (customer.state || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0">
                <FaUsers className="me-2" />
                Customer Management
              </h3>

              <small>Manage all registered customers</small>
            </div>

            <div>
              <button
                className="btn btn-light me-2"
                onClick={() => navigate("/add-customer")}
              >
                <FaPlus className="me-2" />
                Add Customer
              </button>
            </div>
          </div>

          <div className="card-body">
            {/* Statistics */}

            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body text-center">
                    <FaUsers size={35} />

                    <h3 className="mt-2">{filteredCustomers.length}</h3>

                    <h6>Total Customers</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}

            <div className="row mb-4">
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name, Email, Mobile, City..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Customer Table */}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="70">ID</th>

                    <th>Name</th>

                    <th>Gender</th>

                    <th>Mobile</th>

                    <th>Email</th>

                    <th>City</th>

                    <th>State</th>

                    <th width="260">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                              style={{
                                width: "45px",
                                height: "45px",
                                fontSize: "18px",
                              }}
                            >
                              <FaUserCircle />
                            </div>

                            <div>
                              <div className="fw-bold">
                                {customer.firstName} {customer.lastName}
                              </div>

                              <small className="text-muted">Customer</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          {customer.gender === "Male" ? (
                            <span className="badge bg-primary">Male</span>
                          ) : customer.gender === "Female" ? (
                            <span className="badge bg-danger">Female</span>
                          ) : (
                            <span className="badge bg-secondary">Other</span>
                          )}
                        </td>

                        <td>{customer.mobile}</td>

                        <td>{customer.email}</td>

                        <td>{customer.city}</td>

                        <td>{customer.state}</td>

                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              navigate(`/view-customer/${customer.id}`)
                            }
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/edit-customer/${customer.id}`)
                            }
                          >
                            <FaEdit className="me-1" />
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(customer.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <FaUsers size={60} className="text-secondary mb-3" />

                        <h4 className="text-muted">No Customers Found</h4>

                        <p className="text-muted">
                          Click <strong>Add Customer</strong> to register your
                          first customer.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="fw-bold text-primary">
                Total Customers : {filteredCustomers.length}
              </div>

              <div>
                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Previous
                </button>

                <button
                  className="btn btn-outline-primary btn-sm mx-2"
                  disabled
                >
                  1
                </button>

                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerList;
