import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

import {
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");

  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalPurchases: 0,
    totalSales: 0,
    totalExpenses: 0,
    totalUsers: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    loadDashboard();

    loadMonthlySales();
  }, []);

  function loadDashboard() {
    axios
      .get("http://localhost:8081/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadMonthlySales() {
    axios
      .get("http://localhost:8081/api/analytics/monthly-sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const labels = response.data.map((item) => item.month);

        const data = response.data.map((item) => item.totalSales);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Monthly Sales",
              data: data,
              borderColor: "#0d6efd",
              backgroundColor: "#0d6efd",
              tension: 0.4,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const Card = ({ title, value, color, icon }) => (
    <div className="col-md-3 mb-4">
      <div className={`card bg-${color} text-white shadow`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6>{title}</h6>
              <h3>{value}</h3>
            </div>

            <div style={{ fontSize: "40px" }}>{icon}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      <div className="row">
        <Card
          title="Products"
          value={dashboard.totalProducts}
          color="primary"
          icon={<FaBoxOpen />}
        />

        <Card
          title="Categories"
          value={dashboard.totalCategories}
          color="success"
          icon={<FaTags />}
        />

        <Card
          title="Customers"
          value={dashboard.totalCustomers}
          color="warning"
          icon={<FaUsers />}
        />

        <Card
          title="Suppliers"
          value={dashboard.totalSuppliers}
          color="danger"
          icon={<FaTruck />}
        />

        <Card
          title="Purchases"
          value={dashboard.totalPurchases}
          color="secondary"
          icon={<FaShoppingCart />}
        />

        <Card
          title="Sales"
          value={dashboard.totalSales}
          color="info"
          icon={<FaCashRegister />}
        />

        <Card
          title="Expenses"
          value={dashboard.totalExpenses}
          color="dark"
          icon={<FaMoneyBillWave />}
        />

        {role === "ROLE_ADMIN" && (
          <Card
            title="Users"
            value={dashboard.totalUsers}
            color="primary"
            icon={<FaUserShield />}
          />
        )}
      </div>

      <div className="card shadow mt-4">
        <div className="card-header">
          <h5 className="mb-0">Monthly Sales</h5>
        </div>

        <div className="card-body">
          <Line data={chartData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
