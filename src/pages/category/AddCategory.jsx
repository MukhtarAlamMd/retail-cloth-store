import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/CategoryService";

const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory({
      ...category,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // ==========================
  // Validation
  // ==========================
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!category.name.trim()) {
      newErrors.name = "Category Name is required";
      valid = false;
    }

    if (!category.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  // ==========================
  // Save Category
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createCategory(category);

      alert("Category added successfully.");

      navigate("/categories");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unable to add category.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add Category</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Category Name */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Category Name</label>

              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={category.name}
                  onChange={handleChange}
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
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                />

                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </div>

            {/* Buttons */}

            <div className="text-center">
              <button type="submit" className="btn btn-primary me-2">
                Save Category
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

export default AddCategory;
