import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpense, updateExpense } from "../../services/ExpenseService";

import {
  FaMoneyBillWave,
  FaTags,
  FaRupeeSign,
  FaCalendarAlt,
  FaStickyNote,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const EditExpense = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    expenseName: "",
    category: "",
    amount: "",
    description: "",
    expenseDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getExpense(id)
      .then((response) => {
        setExpense(response.data);
      })
      .catch((error) => {
        console.error(error);

        alert("Unable to load expense.");
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setExpense({
      ...expense,

      [name]: value,
    });
  }

  function validate() {
    let temp = {};

    if (!expense.expenseName.trim()) {
      temp.expenseName = "Expense Name is required.";
    }

    if (!expense.category.trim()) {
      temp.category = "Category is required.";
    }

    if (!expense.amount || Number(expense.amount) <= 0) {
      temp.amount = "Valid amount is required.";
    }

    if (!expense.expenseDate) {
      temp.expenseDate = "Expense Date is required.";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  }

  function updateExistingExpense(e) {
    e.preventDefault();

    if (!validate()) return;

    updateExpense(id, expense)
      .then(() => {
        alert("Expense updated successfully.");

        navigate("/expenses");
      })

      .catch((error) => {
        console.error(error);

        alert("Unable to update expense.");
      });
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Edit Expense</h3>
        </div>

        <div className="card-body">
          <form onSubmit={updateExistingExpense}>
            {/* Expense Name */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">
                <FaMoneyBillWave className="me-2" />
                Expense Name
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  name="expenseName"
                  value={expense.expenseName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.expenseName ? "is-invalid" : ""
                  }`}
                />

                <div className="invalid-feedback">{errors.expenseName}</div>
              </div>
            </div>

            {/* Category */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">
                <FaTags className="me-2" />
                Category
              </label>

              <div className="col-md-9">
                <select
                  name="category"
                  value={expense.category}
                  onChange={handleChange}
                  className={`form-select ${
                    errors.category ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Category</option>

                  <option>Rent</option>

                  <option>Salary</option>

                  <option>Transport</option>

                  <option>Electricity</option>

                  <option>Maintenance</option>

                  <option>Internet</option>

                  <option>Marketing</option>

                  <option>Miscellaneous</option>
                </select>

                <div className="invalid-feedback">{errors.category}</div>
              </div>
            </div>

            {/* Amount */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">
                <FaRupeeSign className="me-2" />
                Amount
              </label>

              <div className="col-md-9">
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  }`}
                />

                <div className="invalid-feedback">{errors.amount}</div>
              </div>
            </div>

            {/* Expense Date */}

            <div className="row mb-3">
              <label className="col-md-3 col-form-label">
                <FaCalendarAlt className="me-2" />
                Expense Date
              </label>

              <div className="col-md-9">
                <input
                  type="date"
                  name="expenseDate"
                  value={expense.expenseDate}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.expenseDate ? "is-invalid" : ""
                  }`}
                />

                <div className="invalid-feedback">{errors.expenseDate}</div>
              </div>
            </div>

            {/* Description */}

            <div className="row mb-4">
              <label className="col-md-3 col-form-label">
                <FaStickyNote className="me-2" />
                Description
              </label>

              <div className="col-md-9">
                <textarea
                  rows="4"
                  name="description"
                  value={expense.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-warning me-3">
                <FaSave className="me-2" />
                Update Expense
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/expenses")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
