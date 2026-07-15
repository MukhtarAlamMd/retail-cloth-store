import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

import { getSupplierPaymentById } from "../../services/SupplierPaymentService";

const ViewSupplierPayment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [payment, setPayment] = useState({});

  useEffect(() => {
    getSupplierPaymentById(id)
      .then((res) => {
        setPayment(res.data);
      })

      .catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h3>Supplier Payment Details</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th width="250">Supplier</th>

                  <td>{payment.supplierName}</td>
                </tr>

                <tr>
                  <th>Amount</th>

                  <td>₹ {payment.amount}</td>
                </tr>

                <tr>
                  <th>Payment Date</th>

                  <td>{payment.paymentDate}</td>
                </tr>

                <tr>
                  <th>Payment Method</th>

                  <td>{payment.paymentMethod}</td>
                </tr>

                <tr>
                  <th>Reference Number</th>

                  <td>{payment.referenceNumber}</td>
                </tr>

                <tr>
                  <th>Remarks</th>

                  <td>{payment.remarks}</td>
                </tr>
              </tbody>
            </table>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/supplier-payments")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewSupplierPayment;
