import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

import { getCustomerPaymentById } from "../../services/CustomerPaymentService";

import { FaArrowLeft, FaMoneyCheckAlt } from "react-icons/fa";

const ViewCustomerPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [payment, setPayment] = useState({
    customerName: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    referenceNumber: "",
    remarks: "",
  });

  useEffect(() => {
    loadPayment();
  }, []);

  const loadPayment = () => {
    getCustomerPaymentById(id)
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              View Customer Payment
            </h4>
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 fw-bold">Customer</label>

              <div className="col-sm-9">{payment.customerName}</div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 fw-bold">Amount</label>

              <div className="col-sm-9">₹ {payment.amount}</div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 fw-bold">Payment Date</label>

              <div className="col-sm-9">{payment.paymentDate}</div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 fw-bold">Payment Method</label>

              <div className="col-sm-9">{payment.paymentMethod}</div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 fw-bold">Reference Number</label>

              <div className="col-sm-9">{payment.referenceNumber || "-"}</div>
            </div>

            <div className="row mb-4">
              <label className="col-sm-3 fw-bold">Remarks</label>

              <div className="col-sm-9">{payment.remarks || "-"}</div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/customer-payments")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewCustomerPayment;
