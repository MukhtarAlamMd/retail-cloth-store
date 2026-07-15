import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../services/CategoryService";

const ViewCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

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

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">View Category</h3>
        </div>

        <div className="card-body">
          {/* Category ID */}

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Category ID</label>

            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                value={category.id}
                readOnly
              />
            </div>
          </div>

          {/* Category Name */}

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Category Name</label>

            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                value={category.name}
                readOnly
              />
            </div>
          </div>

          {/* Description */}

          <div className="row mb-4">
            <label className="col-md-3 fw-bold">Description</label>

            <div className="col-md-9">
              <textarea
                className="form-control"
                rows="4"
                value={category.description}
                readOnly
              />
            </div>
          </div>

          {/* Back Button */}

          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/categories")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
