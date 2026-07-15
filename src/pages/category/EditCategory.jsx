import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
} from "../../services/CategoryService";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // ==========================
  // Load Category
  // ==========================
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const response = await getCategoryById(id);

      setCategory(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load category.");
    }
  };

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
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

    if (!category.name.trim()) {
      newErrors.name = "Category Name is required";
    }

    if (!category.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Update Category
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await updateCategory(id, category);

      alert("Category updated successfully.");

      navigate("/categories");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unable to update category.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3 className="mb-0">Edit Category</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Category Name */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Category Name</label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />

                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>

            {/* Description */}

            <div className="row mb-4">
              <label className="col-md-3 col-form-label">Description</label>

              <div className="col-md-9">
                <textarea
                  rows="4"
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />

                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </div>

            {/* Buttons */}

            <div className="text-center">
              <button type="submit" className="btn btn-warning me-2">
                Update Category
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/categories")}
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

export default EditCategory;
