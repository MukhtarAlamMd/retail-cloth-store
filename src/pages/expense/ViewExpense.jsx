import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpense } from "../../services/ExpenseService";
import {
  FaMoneyBillWave,
  FaTags,
  FaRupeeSign,
  FaCalendarAlt,
  FaStickyNote,
  FaArrowLeft,
} from "react-icons/fa";

const ViewExpense = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [expense, setExpense] = useState({});

  useEffect(() => {
    loadExpense();
  }, []);

  function loadExpense() {
    getExpense(id)
      .then((response) => {
        setExpense(response.data);
      })

      .catch((error) => {
        console.error(error);

        alert("Unable to load expense.");
      });
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3>Expense Details</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th width="30%">
                  <FaMoneyBillWave className="me-2" />
                  Expense Name
                </th>

                <td>{expense.expenseName}</td>
              </tr>

              <tr>
                <th>
                  <FaTags className="me-2" />
                  Category
                </th>

                <td>{expense.category}</td>
              </tr>

              <tr>
                <th>
                  <FaRupeeSign className="me-2" />
                  Amount
                </th>

                <td>
                  ₹
                  {expense.amount &&
                    Number(expense.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                </td>
              </tr>

              <tr>
                <th>
                  <FaCalendarAlt className="me-2" />
                  Expense Date
                </th>

                <td>{expense.expenseDate}</td>
              </tr>

              <tr>
                <th>
                  <FaStickyNote className="me-2" />
                  Description
                </th>

                <td>{expense.description}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/expenses")}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
