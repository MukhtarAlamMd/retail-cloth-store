import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import { createCustomerPayment } from "../../services/CustomerPaymentService";
import { getAllCustomers } from "../../services/CustomerService";

import { FaSave, FaArrowLeft, FaMoneyCheckAlt } from "react-icons/fa";

const AddCustomerPayment = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [payment, setPayment] = useState({
    customerId: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
    referenceNumber: "",
    remarks: "",
  });

  const loadCustomers = () => {
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const savePayment = (e) => {
    e.preventDefault();

    createCustomerPayment(payment)
      .then(() => {
        alert("Customer Payment Added Successfully");
        navigate("/customer-payments");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to save customer payment.");
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              Add Customer Payment
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={savePayment}>
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
                        {customer.firstName} {customer.lastName}
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

              {/* Reference Number */}

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
                    className="form-control"
                    rows="3"
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

                <button type="submit" className="btn btn-primary">
                  <FaSave className="me-2" />
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCustomerPayment;
