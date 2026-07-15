import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllSuppliers,
  deleteSupplier,
} from "../../services/SupplierService";

import {
  FaTruck,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaMapMarkerAlt,
  FaPhone,
  FaSyncAlt,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";

const SupplierList = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);

      const response = await getAllSuppliers();

      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?"))
      return;

    try {
      await deleteSupplier(id);

      loadSuppliers();
    } catch (error) {
      console.error(error);

      alert("Unable to delete supplier");
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalCities = useMemo(() => {
    return new Set(suppliers.map((s) => s.city)).size;
  }, [suppliers]);

  const totalContacts = suppliers.length;

  return (
    <div className="container-fluid py-4">
      {/* HEADER */}

      <div
        className="p-4 rounded-4 shadow-lg mb-4 text-white"
        style={{
          background: "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h2 className="fw-bold">
              <FaTruck className="me-2" />
              Supplier Management
            </h2>

            <p className="mb-0">
              Manage suppliers, contacts and business information
            </p>
          </div>

          <div className="mt-3">
            <button
              className="btn btn-light fw-bold me-2"
              onClick={() => navigate("/add-supplier")}
            >
              <FaPlus className="me-2" />
              Add Supplier
            </button>

            <button
              className="btn btn-dark"
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeft className="me-2" />
              Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* CARDS */}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body d-flex justify-content-between">
              <div>
                <p className="text-muted mb-1">Total Suppliers</p>

                <h2 className="fw-bold text-primary">{suppliers.length}</h2>
              </div>

              <FaBuilding size={45} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body d-flex justify-content-between">
              <div>
                <p className="text-muted mb-1">Total Cities</p>

                <h2 className="fw-bold text-success">{totalCities}</h2>
              </div>

              <FaMapMarkerAlt size={45} className="text-success" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body d-flex justify-content-between">
              <div>
                <p className="text-muted mb-1">Contacts</p>

                <h2 className="fw-bold text-warning">{totalContacts}</h2>
              </div>

              <FaPhone size={45} className="text-warning" />
            </div>
          </div>
        </div>
      </div>
      {/* SEARCH + ACTION BAR */}

      <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-body">
          <div className="row align-items-center g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search supplier by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => setSearch("")}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-6 text-md-end">
              <button
                className="btn btn-outline-primary"
                onClick={loadSuppliers}
              >
                <FaSyncAlt className="me-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUPPLIER TABLE */}

      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-white border-0 py-3">
          <h4 className="fw-bold text-primary mb-0">
            <FaUsers className="me-2" />
            Supplier List
          </h4>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead
                className="text-white"
                style={{
                  background: "linear-gradient(90deg,#0d6efd,#6610f2)",
                }}
              >
                <tr>
                  <th>#</th>

                  <th>Supplier</th>

                  <th>Contact Person</th>

                  <th>Mobile</th>

                  <th>Email</th>

                  <th>Location</th>

                  <th>Status</th>

                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="spinner-border text-primary"></div>

                      <p className="mt-3 fw-bold">Loading Suppliers...</p>
                    </td>
                  </tr>
                ) : filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <FaTruck size={50} className="text-secondary mb-3" />

                      <h5 className="text-muted">No Supplier Found</h5>
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((supplier, index) => (
                    <tr key={supplier.id} className="supplier-row">
                      <td className="fw-bold">{index + 1}</td>

                      <td>
                        <div className="fw-bold">{supplier.supplierName}</div>

                        <small className="text-muted">ID : {supplier.id}</small>
                      </td>

                      <td>{supplier.contactPerson || "N/A"}</td>

                      <td>
                        <FaPhone className="text-success me-2" />

                        {supplier.mobile}
                      </td>

                      <td>{supplier.email}</td>

                      <td>
                        <FaMapMarkerAlt className="text-danger me-2" />
                        {supplier.city},{supplier.state}
                      </td>

                      <td>
                        <span className="badge bg-success px-3 py-2">
                          Active
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-info btn-sm rounded-circle me-2"
                          title="View Supplier"
                          onClick={() =>
                            navigate(`/view-supplier/${supplier.id}`)
                          }
                        >
                          <FaEye />
                        </button>

                        <button
                          className="btn btn-warning btn-sm rounded-circle me-2"
                          title="Edit Supplier"
                          onClick={() =>
                            navigate(`/edit-supplier/${supplier.id}`)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm rounded-circle"
                          title="Delete Supplier"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* FOOTER SUMMARY */}

        <div className="card-footer bg-light rounded-bottom-4">
          <div className="d-flex justify-content-between align-items-center">
            <strong className="text-primary">
              Total Suppliers :
              <span className="ms-2">{filteredSuppliers.length}</span>
            </strong>

            <small className="text-muted">Showing registered suppliers</small>
          </div>
        </div>
      </div>

      {/* END */}
    </div>
  );
};

export default SupplierList;
