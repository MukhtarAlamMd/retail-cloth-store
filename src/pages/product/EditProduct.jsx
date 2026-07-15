import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById, updateProduct } from "../../services/ProductService";

import { getAllCategories } from "../../services/CategoryService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    size: "",
    color: "",
    price: "",
    stockQuantity: "",
  });

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);
  const loadProduct = async () => {
    try {
      const response = await getProductById(id);

      console.log("Product:", response.data);

      setProduct({
        name: response.data.name ?? "",
        categoryId: String(
          response.data.categoryId ?? response.data.category?.id ?? "",
        ),
        size: response.data.size ?? "",
        color: response.data.color ?? "",
        price: response.data.price ?? "",
        stockQuantity: response.data.stockQuantity ?? "",
      });
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, product);

      alert("Product updated successfully.");

      navigate("/products");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Edit Product</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                name="categoryId"
                value={String(product.categoryId)}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Size</label>

              <input
                type="text"
                className="form-control"
                name="size"
                value={product.size}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Color</label>

              <input
                type="text"
                className="form-control"
                name="color"
                value={product.color}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock Quantity</label>

              <input
                type="number"
                className="form-control"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning">
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
