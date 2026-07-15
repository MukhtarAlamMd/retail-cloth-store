import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getSupplierPaymentById,
  updateSupplierPayment,
} from "../../services/SupplierPaymentService";

import { getAllSuppliers } from "../../services/SupplierService";

const EditSupplierPayment = () => {
  const { id } = useParams();

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

    loadPayment();
  }, []);

  const loadSuppliers = () => {
    getAllSuppliers()
      .then((res) => {
        setSuppliers(res.data);
      })

      .catch(console.error);
  };

  const loadPayment = () => {
    getSupplierPaymentById(id)
      .then((res) => {
        setPayment(res.data);
      })

      .catch(console.error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayment({
      ...payment,

      [name]: value,
    });
  };

  const update = (e) => {
    e.preventDefault();

    updateSupplierPayment(id, payment)
      .then(() => {
        alert("Payment Updated Successfully");

        navigate("/supplier-payments");
      })

      .catch(console.error);
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-warning">
            <h3>Edit Supplier Payment</h3>
          </div>

          <div className="card-body">
            <form onSubmit={update}>
              <div className="mb-3">
                <label>Supplier</label>

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
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Amount</label>

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
                <label>Payment Date</label>

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
                <label>Payment Method</label>

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
                <label>Reference Number</label>

                <input
                  className="form-control"
                  name="referenceNumber"
                  value={payment.referenceNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Remarks</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="remarks"
                  value={payment.remarks}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-warning me-2" type="submit">
                Update
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

export default EditSupplierPayment;
