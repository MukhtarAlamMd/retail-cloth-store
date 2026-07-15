import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getExpenseReport } from "../../services/ReportService";
import { FaMoneyBillWave } from "react-icons/fa";

const ExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await getExpenseReport();
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.expenseAmount || 0),
    0,
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="mb-4 text-primary">
          <FaMoneyBillWave className="me-2" />
          Expense Report
        </h2>

        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            Total Expense :
            <strong className="ms-2">₹ {totalExpense.toFixed(2)}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Expense Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={expense.expenseId}>
                      <td>{index + 1}</td>

                      <td>{expense.expenseName}</td>

                      <td>{expense.expenseCategory}</td>

                      <td>₹ {expense.expenseAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpenseReport;
