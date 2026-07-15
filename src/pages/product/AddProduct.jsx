import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/ProductService";
import {
  FaBoxOpen,
  FaTag,
  FaList,
  FaDollarSign,
  FaBoxes,
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    size: "",
    color: "",
    price: "",
    stockQuantity: "",
  });

  const [categoryError, setCategoryError] = useState("");

  const productNames = [
    "Shirt",
    "T-Shirt",
    "Jeans",
    "Trouser",
    "Pant",
    "Kurta",
    "Blazer",
    "Jacket",
    "Sweater",
    "Hoodie",
  ];

  const categories = [
    { id: 1, name: "Men" },
    { id: 2, name: "Women" },
    { id: 3, name: "Kids" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const colors = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Pink",
    "Orange",
    "Brown",
    "Grey",
    "Navy",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCategoryChange = (id) => {
    setProduct({
      ...product,
      categoryId: id,
    });

    setCategoryError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.categoryId) {
      setCategoryError("Please select category.");
      return;
    }

    try {
      await createProduct(product);

      alert("Product added successfully.");

      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    }
  };

  const inputStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  };

  const labelStyle = {
    width: "140px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const fieldStyle = {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add Product</h3>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaBoxOpen /> Product
          </label>

          <select
            name="name"
            value={product.name}
            onChange={handleChange}
            style={fieldStyle}
            required
          >
            <option value="">Select Product</option>

            {productNames.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaList /> Category
          </label>

          <select
            name="categoryId"
            value={product.categoryId}
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
            style={fieldStyle}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {categoryError && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {categoryError}
          </div>
        )}

        {/* Size */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaTag /> Size
          </label>

          <select
            name="size"
            value={product.size}
            onChange={handleChange}
            style={fieldStyle}
            required
          >
            <option value="">Select Size</option>

            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaTag /> Color
          </label>

          <select
            name="color"
            value={product.color}
            onChange={handleChange}
            style={fieldStyle}
            required
          >
            <option value="">Select Color</option>

            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaDollarSign /> Price
          </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            style={fieldStyle}
            placeholder="Enter Price"
            required
          />
        </div>

        {/* Stock */}
        <div style={inputStyle}>
          <label style={labelStyle}>
            <FaBoxes /> Stock
          </label>

          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            style={fieldStyle}
            placeholder="Enter Stock"
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#198754",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
