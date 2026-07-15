import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import {
  FaChartBar,
  FaShoppingCart,
  FaTruckLoading,
  FaBoxes,
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaCalendarAlt,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

import {
  getDashboardReport,
  getProfitLossReport,
} from "../../services/ReportService";

const Reports = () => {
  const [dashboard, setDashboard] = useState({});

  const [profitLoss, setProfitLoss] = useState({});

  useEffect(() => {
    loadDashboard();

    loadProfitLoss();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardReport();

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProfitLoss = async () => {
    try {
      const response = await getProfitLossReport();

      setProfitLoss(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaChartBar className="me-2" />
          Reports Dashboard
        </h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <FaUsers size={35} className="text-primary mb-3" />

                <h6>Total Records</h6>

                <h3>{dashboard.totalRecords || 0}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <FaChartLine size={35} className="text-success mb-3" />

                <h6>Total Income</h6>

                <h3>₹{profitLoss.totalIncome || 0}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <FaWallet size={35} className="text-danger mb-3" />

                <h6>Total Expense</h6>

                <h3>₹{profitLoss.totalExpense || 0}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <FaMoneyBillWave size={35} className="text-warning mb-3" />

                <h6>Profit</h6>

                <h3>₹{profitLoss.profit || 0}</h3>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row g-3">
          <div className="col-md-3">
            <button className="btn btn-outline-primary w-100">
              <FaShoppingCart className="me-2" />
              Sales Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-success w-100">
              <FaTruckLoading className="me-2" />
              Purchase Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-warning w-100">
              <FaBoxes className="me-2" />
              Inventory Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-info w-100">
              <FaUserFriends className="me-2" />
              Customer Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-dark w-100">
              <FaUserTie className="me-2" />
              Supplier Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-secondary w-100">
              <FaClipboardCheck className="me-2" />
              Attendance Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-danger w-100">
              <FaCalendarAlt className="me-2" />
              Leave Report
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-success w-100">
              <FaMoneyBillWave className="me-2" />
              Payroll Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
