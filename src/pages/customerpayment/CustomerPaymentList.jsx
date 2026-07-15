import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getAllCustomerPayments,
  deleteCustomerPayment,
} from "../../services/CustomerPaymentService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const CustomerPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  const loadPayments = () => {
    getAllCustomerPayments()
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const removePayment = (id) => {
    if (window.confirm("Delete this customer payment?")) {
      deleteCustomerPayment(id)
        .then(() => {
          loadPayments();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const customer = payment.customerName || "";

    return customer.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>
            <FaMoneyCheckAlt className="me-2" />
            Customer Payments
          </h3>

          <Link to="/add-customer-payment" className="btn btn-primary">
            <FaPlus className="me-2" />
            Add Payment
          </Link>
        </div>

        <div className="card shadow">
          <div className="card-header bg-white">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search Customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th width="180">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>

                      <td>{payment.customerName}</td>

                      <td>₹ {payment.amount}</td>

                      <td>{payment.paymentDate}</td>

                      <td>{payment.paymentMethod}</td>

                      <td>{payment.referenceNumber}</td>

                      <td>
                        <Link
                          to={`/view-customer-payment/${payment.id}`}
                          className="btn btn-info btn-sm me-2"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/edit-customer-payment/${payment.id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removePayment(payment.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No Customer Payments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerPaymentList;
