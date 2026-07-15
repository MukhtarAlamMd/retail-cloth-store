import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/ProductService";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    categoryName: "",
    size: "",
    color: "",
    price: "",
    stockQuantity: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id);

      setProduct({
        id: response.data.id,
        name: response.data.name,
        categoryName:
          response.data.categoryName || response.data.category?.name || "",
        size: response.data.size,
        color: response.data.color,
        price: response.data.price,
        stockQuantity: response.data.stockQuantity,
      });
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3>View Product</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th width="30%">Product ID</th>
                <td>{product.id}</td>
              </tr>

              <tr>
                <th>Product Name</th>
                <td>{product.name}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{product.categoryName}</td>
              </tr>

              <tr>
                <th>Size</th>
                <td>{product.size}</td>
              </tr>

              <tr>
                <th>Color</th>
                <td>{product.color}</td>
              </tr>

              <tr>
                <th>Price</th>
                <td>₹ {product.price}</td>
              </tr>

              <tr>
                <th>Stock Quantity</th>
                <td>{product.stockQuantity}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/products")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
