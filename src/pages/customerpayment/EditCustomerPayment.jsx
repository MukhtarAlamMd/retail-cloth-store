import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getCustomerPaymentById,
  updateCustomerPayment,
} from "../../services/CustomerPaymentService";

import { getAllCustomers } from "../../services/CustomerService";

import { FaSave, FaArrowLeft, FaMoneyCheckAlt } from "react-icons/fa";

const EditCustomerPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);

  const [payment, setPayment] = useState({
    customerId: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
    referenceNumber: "",
    remarks: "",
  });

  useEffect(() => {
    loadCustomers();
    loadPayment();
  }, []);

  const loadCustomers = () => {
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  };

  const loadPayment = () => {
    getCustomerPaymentById(id)
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const updatePayment = (e) => {
    e.preventDefault();

    updateCustomerPayment(id, payment)
      .then(() => {
        alert("Customer Payment Updated Successfully");
        navigate("/customer-payments");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to update customer payment.");
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-warning">
            <h4 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              Edit Customer Payment
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={updatePayment}>
              {/* Customer */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Customer</label>

                <div className="col-sm-9">
                  <select
                    className="form-select"
                    name="customerId"
                    value={payment.customerId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Customer</option>

                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amount */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Amount</label>

                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={payment.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Date */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Payment Date</label>

                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="paymentDate"
                    value={payment.paymentDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Payment Method
                </label>

                <div className="col-sm-9">
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
              </div>

              {/* Reference */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Reference No</label>

                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="referenceNumber"
                    value={payment.referenceNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Remarks */}

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Remarks</label>

                <div className="col-sm-9">
                  <textarea
                    rows="3"
                    className="form-control"
                    name="remarks"
                    value={payment.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Buttons */}

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/customer-payments")}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>

                <button type="submit" className="btn btn-warning">
                  <FaSave className="me-2" />
                  Update Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditCustomerPayment;
