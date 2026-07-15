import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getAllCategories,
  deleteCategory,
} from "../../services/CategoryService";

import {
  FaTags,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaFolderOpen,
} from "react-icons/fa";

const CategoryList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      alert("Category deleted successfully.");

      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Unable to delete category.");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow-lg border-0">
          {/* Header */}

          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0">
                <FaTags className="me-2" />
                Category Management
              </h3>

              <small>Manage all product categories</small>
            </div>

            <div>
              <button
                className="btn btn-light me-2"
                onClick={() => navigate("/add-category")}
              >
                <FaPlus className="me-2" />
                Add Category
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
                    placeholder="Search Category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Table */}

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="80">ID</th>

                    <th>Category Name</th>

                    <th>Description</th>

                    <th width="250">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>

                        <td>
                          <span className="fw-bold text-primary">
                            <FaFolderOpen className="me-2" />
                            {category.name}
                          </span>
                        </td>

                        <td>
                          {category.description ? (
                            category.description
                          ) : (
                            <span className="text-muted">No Description</span>
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              navigate(`/view-category/${category.id}`)
                            }
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/edit-category/${category.id}`)
                            }
                          >
                            <FaEdit className="me-1" />
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-5">
                        <FaFolderOpen
                          size={60}
                          className="text-secondary mb-3"
                        />

                        <h5 className="text-muted">No Categories Found</h5>

                        <p className="text-muted">
                          Click <strong>Add Category</strong> to create your
                          first category.
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
                Total Categories : {filteredCategories.length}
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

export default CategoryList;
