import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import { saveSupplierPayment } from "../../services/SupplierPaymentService";
import { getAllSuppliers } from "../../services/SupplierService";

const AddSupplierPayment = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);

  const [payment, setPayment] = useState({
    supplierId: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
    referenceNumber: "",
    remarks: "",
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = () => {
    getAllSuppliers()
      .then((response) => {
        console.log(response.data);
        setSuppliers(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayment({
      ...payment,

      [name]: value,
    });
  };

  const savePayment = (e) => {
    e.preventDefault();

    saveSupplierPayment(payment)
      .then(() => {
        alert("Supplier Payment Saved Successfully");

        navigate("/supplier-payments");
      })

      .catch((error) => {
        console.error(error);

        alert("Unable to Save Payment");
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>Add Supplier Payment</h3>
          </div>

          <div className="card-body">
            <form onSubmit={savePayment}>
              <div className="mb-3">
                <label className="form-label">Supplier</label>

                <select
                  className="form-select"
                  name="supplierId"
                  value={payment.supplierId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Supplier</option>

                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Amount</label>

                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={payment.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="paymentDate"
                  value={payment.paymentDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>

                <select
                  className="form-select"
                  name="paymentMethod"
                  value={payment.paymentMethod}
                  onChange={handleChange}
                >
                  <option>Cash</option>

                  <option>UPI</option>

                  <option>Card</option>

                  <option>Bank Transfer</option>

                  <option>Cheque</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Reference Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="referenceNumber"
                  value={payment.referenceNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Remarks</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="remarks"
                  value={payment.remarks}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success me-2">
                Save Payment
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/supplier-payments")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSupplierPayment;
