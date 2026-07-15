import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  getAllInventory,
  getLowStock,
  getOutOfStock,
} from "../../services/InventoryService";

import {
  FaBoxes,
  FaSearch,
  FaSyncAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const response = await getAllInventory();

      setInventory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadLowStock = async () => {
    try {
      setLoading(true);

      const response = await getLowStock();

      setInventory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadOutOfStock = async () => {
    try {
      setLoading(true);

      const response = await getOutOfStock();

      setInventory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value) => {
    setFilter(value);

    if (value === "ALL") {
      loadInventory();
    } else if (value === "LOW") {
      loadLowStock();
    } else {
      loadOutOfStock();
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalProducts = inventory.length;

  const totalStock = inventory.reduce(
    (sum, item) => sum + item.stockQuantity,
    0,
  );

  const lowStockCount = inventory.filter(
    (item) => item.stockStatus === "LOW STOCK",
  ).length;

  const outOfStockCount = inventory.filter(
    (item) => item.stockStatus === "OUT OF STOCK",
  ).length;

  const inventoryValue = inventory.reduce(
    (sum, item) => sum + item.price * item.stockQuantity,
    0,
  );

  const badge = (status) => {
    switch (status) {
      case "IN STOCK":
        return (
          <span className="badge bg-success px-3 py-2">
            <FaCheckCircle className="me-1" />
            In Stock
          </span>
        );

      case "LOW STOCK":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">
            <FaExclamationTriangle className="me-1" />
            Low Stock
          </span>
        );

      default:
        return (
          <span className="badge bg-danger px-3 py-2">
            <FaTimesCircle className="me-1" />
            Out Of Stock
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">
            <FaBoxes className="me-2" />
            Inventory Management
          </h2>

          <button className="btn btn-primary" onClick={loadInventory}>
            <FaSyncAlt className="me-2" />
            Refresh
          </button>
        </div>

        <div className="row mb-4">
          <div className="col-lg-3">
            <div className="card shadow border-0 bg-primary text-white">
              <div className="card-body">
                <h6>Total Products</h6>

                <h2>{totalProducts}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card shadow border-0 bg-success text-white">
              <div className="card-body">
                <h6>Total Stock</h6>

                <h2>{totalStock}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card shadow border-0 bg-warning text-dark">
              <div className="card-body">
                <h6>Low Stock</h6>

                <h2>{lowStockCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card shadow border-0 bg-danger text-white">
              <div className="card-body">
                <h6>Out Of Stock</h6>

                <h2>{outOfStockCount}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Card */}

        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-8">
                <label className="form-label fw-semibold">Search Product</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Product Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <label className="form-label fw-semibold">
                  Filter Inventory
                </label>

                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => handleFilter(e.target.value)}
                >
                  <option value="ALL">All Products</option>
                  <option value="LOW">Low Stock</option>
                  <option value="OUT">Out Of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}

        <div className="card shadow border-0">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Inventory List</h5>

              <h5 className="text-success mb-0">
                <FaRupeeSign className="me-1" />

                {inventoryValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h5>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="70">ID</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Size</th>

                    <th>Color</th>

                    <th className="text-end">Price</th>

                    <th className="text-center">Stock</th>

                    <th className="text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>

                        <p className="mt-3 fw-bold text-primary">
                          Loading Inventory...
                        </p>
                      </td>
                    </tr>
                  ) : filteredInventory.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-danger fw-bold py-5"
                      >
                        <h5>No Inventory Found</h5>

                        <p className="mb-0">
                          No products match your search or filter.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item, index) => (
                      <tr key={item.productId}>
                        <td className="fw-bold">{index + 1}</td>

                        <td className="fw-semibold">{item.productName}</td>

                        <td>{item.categoryName}</td>

                        <td>{item.size}</td>

                        <td>{item.color}</td>

                        <td className="text-end fw-bold text-success">
                          ₹ {Number(item.price).toFixed(2)}
                        </td>

                        <td className="text-center fw-bold">
                          {item.stockQuantity}
                        </td>

                        <td className="text-center">
                          {badge(item.stockStatus)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryList;
