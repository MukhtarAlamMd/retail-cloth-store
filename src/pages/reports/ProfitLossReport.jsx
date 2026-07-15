import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProfitLossReport } from "../../services/ReportService";
import { FaChartLine } from "react-icons/fa";

const ProfitLossReport = () => {
  const [report, setReport] = useState({
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const response = await getProfitLossReport();
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="text-primary mb-4">
          <FaChartLine className="me-2" />
          Profit & Loss Report
        </h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Total Income</h5>
                <h3 className="text-success">₹ {report.totalIncome}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Total Expense</h5>
                <h3 className="text-danger">₹ {report.totalExpense}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Profit</h5>

                <h3
                  className={
                    report.profit >= 0 ? "text-success" : "text-danger"
                  }
                >
                  ₹ {report.profit}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfitLossReport;
