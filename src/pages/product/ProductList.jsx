import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaBoxes,
} from "react-icons/fa";

import Layout from "../../components/Layout";

import { getAllProducts, deleteProduct } from "../../services/ProductService";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts(currentPage, pageSize);

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("Product deleted successfully.");

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Unable to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        {/* Header */}

        <div className="card shadow-lg border-0 mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0">
                <FaBoxOpen className="me-2" />
                Product Management
              </h3>

              <small>Total Products : {products.length}</small>
            </div>

            <div>
              <button
                className="btn btn-light me-2"
                onClick={() => navigate("/add-product")}
              >
                <FaPlus className="me-2" />
                Add Product
              </button>
            </div>
          </div>

          <div className="card-body">
            {/* Search */}

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product Table */}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>

                    <th>Name</th>

                    <th>Category</th>

                    <th>Size</th>

                    <th>Color</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                    <th width="260">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>

                        <td>
                          <strong>{product.name}</strong>
                        </td>

                        <td>{product.categoryName}</td>

                        <td>{product.size}</td>

                        <td>{product.color}</td>

                        <td>
                          <strong className="text-success">
                            ₹ {product.price}
                          </strong>
                        </td>

                        <td>{product.stockQuantity}</td>

                        <td>
                          {product.stockQuantity > 20 ? (
                            <span className="badge bg-success">In Stock</span>
                          ) : product.stockQuantity > 0 ? (
                            <span className="badge bg-warning text-dark">
                              Low Stock
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              Out of Stock
                            </span>
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              navigate(`/view-product/${product.id}`)
                            }
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/edit-product/${product.id}`)
                            }
                          >
                            <FaEdit className="me-1" />
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <FaBoxes size={40} className="text-secondary mb-3" />

                        <h5>No Products Found</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <strong>Total Products :</strong> {filteredProducts.length}
              </div>

              <div>
                <button
                  className="btn btn-outline-primary me-2"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>

                <span className="fw-bold">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-primary ms-2"
                  disabled={currentPage + 1 >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
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

export default ProductList;
