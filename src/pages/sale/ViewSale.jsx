import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSaleById } from "../../services/SaleService";

const ViewSale = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [sale, setSale] = useState(null);

  useEffect(() => {
    loadSale();
  }, []);

  const loadSale = async () => {
    try {
      const response = await getSaleById(id);

      setSale(response.data);
    } catch (error) {
      console.error(error);

      alert("Failed to load sale.");
    }
  };

  if (!sale) {
    return (
      <div className="container mt-4">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Sale Details</h3>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Invoice :</strong> {sale.invoiceNumber}
            </div>

            <div className="col-md-6">
              <strong>Customer :</strong> {sale.customerName}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Sale Date :</strong> {sale.saleDate}
            </div>

            <div className="col-md-6">
              <strong>Payment Status :</strong> {sale.paymentStatus}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <strong>Grand Total :</strong> ₹{sale.grandTotal}
            </div>
          </div>

          <h5>Sale Items</h5>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Product</th>

                <th>Quantity</th>

                <th>Price</th>

                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {sale.items?.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>

                  <td>{item.quantity}</td>

                  <td>₹{item.sellingPrice}</td>

                  <td>₹{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/sales")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSale;
