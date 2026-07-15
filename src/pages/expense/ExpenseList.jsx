import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listExpenses, deleteExpense } from "../../services/ExpenseService";

import {
  FaWallet,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaFileInvoiceDollar,
  FaLayerGroup,
} from "react-icons/fa";

const ExpenseList = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    listExpenses()
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeExpense = (id) => {
    if (!window.confirm("Delete this expense?")) return;

    deleteExpense(id)
      .then(() => {
        loadExpenses();
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to delete expense.");
      });
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.expenseName?.toLowerCase().includes(search.toLowerCase()) ||
      expense.category?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const totalCategories = new Set(filteredExpenses.map((e) => e.category)).size;

  return (
    <div className="container-fluid py-4">
      {/* Header */}

      <div className="card shadow-lg border-0 mb-4">
        <div
          className="card-body text-white"
          style={{
            background: "linear-gradient(135deg,#dc3545,#fd7e14,#ffc107)",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                <FaWallet className="me-2" />
                Expense Management
              </h2>

              <p className="mb-0">Track and manage business expenses.</p>
            </div>

            <div>
              <button
                className="btn btn-light me-2 shadow"
                onClick={() => navigate("/add-expense")}
              >
                <FaPlus className="me-2" />
                Add Expense
              </button>

              <button
                className="btn btn-dark shadow"
                onClick={() => navigate("/dashboard")}
              >
                <FaArrowLeft className="me-2" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaFileInvoiceDollar size={40} className="text-primary mb-3" />

              <h3>{filteredExpenses.length}</h3>

              <p className="text-muted mb-0">Total Expenses</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaLayerGroup size={40} className="text-success mb-3" />

              <h3>{totalCategories}</h3>

              <p className="text-muted mb-0">Categories</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaRupeeSign size={40} className="text-danger mb-3" />

              <h4>₹ {totalAmount.toLocaleString()}</h4>

              <p className="text-muted mb-0">Total Amount</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <FaWallet size={40} className="text-warning mb-3" />

              <h3>{expenses.length}</h3>

              <p className="text-muted mb-0">Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-danger text-white">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Expense or Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Expense Table */}

      <div className="card shadow-lg border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              className="text-white"
              style={{
                background: "linear-gradient(90deg,#dc3545,#fd7e14)",
              }}
            >
              <tr>
                <th>ID</th>

                <th>Expense Name</th>

                <th>Category</th>

                <th>Amount</th>

                <th>Date</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <strong>{expense.id}</strong>
                    </td>

                    <td className="fw-semibold">{expense.expenseName}</td>

                    <td>
                      <span className="badge bg-primary px-3 py-2">
                        {expense.category}
                      </span>
                    </td>

                    <td className="fw-bold text-danger">
                      ₹{" "}
                      {Number(expense.amount || 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td>{expense.expenseDate}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm me-2"
                        title="View"
                        onClick={() => navigate(`/view-expense/${expense.id}`)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        title="Edit"
                        onClick={() => navigate(`/edit-expense/${expense.id}`)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => removeExpense(expense.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <FaWallet size={70} className="text-secondary mb-3" />

                    <h4 className="text-muted">No Expenses Found</h4>

                    <p className="text-muted">
                      Click "Add Expense" to create your first expense.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
