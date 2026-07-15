import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getPayrollReport } from "../../services/ReportService";

import {
  FaMoneyCheckAlt,
  FaSearch,
  FaFilter,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSortAlphaDown,
} from "react-icons/fa";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PayrollReport = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [filteredPayrolls, setFilteredPayrolls] = useState([]);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    loadPayrolls();
  }, []);

  useEffect(() => {
    filterPayrolls();
  }, [payrolls, search, month, year, paymentStatus]);

  const loadPayrolls = async () => {
    try {
      const response = await getPayrollReport();

      console.log(response.data);

      setPayrolls(response.data);

      setFilteredPayrolls(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPayrolls = () => {
    let list = [...payrolls];

    if (search !== "") {
      list = list.filter(
        (payroll) =>
          (payroll.employeeName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (payroll.employeeCode || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (month !== "") {
      list = list.filter((payroll) => payroll.month === month);
    }

    if (year !== "") {
      list = list.filter((payroll) => String(payroll.year) === year);
    }

    if (paymentStatus !== "") {
      list = list.filter((payroll) => payroll.paymentStatus === paymentStatus);
    }

    setFilteredPayrolls(list);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPayrolls);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,

      worksheet,

      "Payroll",
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",

      type: "array",
    });

    saveAs(
      new Blob([excelBuffer]),

      "Payroll_Report.xlsx",
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text(
      "Payroll Report",

      14,

      15,
    );

    autoTable(pdf, {
      head: [
        [
          "Employee",
          "Month",
          "Year",
          "Basic",
          "Bonus",
          "Deduction",
          "Net Salary",
          "Status",
        ],
      ],

      body: filteredPayrolls.map((payroll) => [
        payroll.employeeName,
        payroll.month,
        payroll.year,
        payroll.basicSalary,
        payroll.bonus,
        payroll.deduction,
        payroll.netSalary,
        payroll.paymentStatus,
      ]),
    });

    pdf.save("Payroll_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByEmployee = () => {
    const sorted = [...filteredPayrolls];

    sorted.sort((a, b) =>
      (a.employeeName || "").localeCompare(b.employeeName || ""),
    );

    setFilteredPayrolls(sorted);
  };

  const totalBasicSalary = useMemo(
    () =>
      filteredPayrolls.reduce(
        (sum, p) => sum + Number(p.basicSalary || 0),

        0,
      ),

    [filteredPayrolls],
  );

  const totalBonus = useMemo(
    () =>
      filteredPayrolls.reduce(
        (sum, p) => sum + Number(p.bonus || 0),

        0,
      ),

    [filteredPayrolls],
  );

  const totalDeduction = useMemo(
    () =>
      filteredPayrolls.reduce(
        (sum, p) => sum + Number(p.deduction || 0),

        0,
      ),

    [filteredPayrolls],
  );

  const totalNetSalary = useMemo(
    () =>
      filteredPayrolls.reduce(
        (sum, p) => sum + Number(p.netSalary || 0),

        0,
      ),

    [filteredPayrolls],
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaMoneyCheckAlt className="me-2" />
          Payroll Report
        </h2>

        {/* Dashboard + Filters + Table in Part 2 */}
        {/* Dashboard */}

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Employees</h6>

                <h2 className="text-primary">{filteredPayrolls.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Basic Salary</h6>

                <h3 className="text-success">
                  ₹ {totalBasicSalary.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Bonus</h6>

                <h3 className="text-info">₹ {totalBonus.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Net Salary</h6>

                <h3 className="text-danger">₹ {totalNetSalary.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <FaFilter className="me-2" />
              Payroll Filters
            </h5>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Employee</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    className="form-control"
                    placeholder="Employee Name / Code"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label">Month</label>

                <select
                  className="form-select"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">All</option>

                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Year</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="">All</option>

                  <option value="PAID">PAID</option>

                  <option value="PENDING">PENDING</option>
                </select>
              </div>

              <div className="col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={sortByEmployee}
                >
                  <FaSortAlphaDown className="me-2" />
                  Sort by Employee
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Export Buttons */}

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success me-2" onClick={exportExcel}>
            <FaFileExcel className="me-2" />
            Excel
          </button>

          <button className="btn btn-danger me-2" onClick={exportPDF}>
            <FaFilePdf className="me-2" />
            PDF
          </button>

          <button className="btn btn-dark" onClick={printReport}>
            <FaPrint className="me-2" />
            Print
          </button>
        </div>

        {/* Payroll Table - Part 3 */}
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Payroll Records</h5>

            <strong>Total : {filteredPayrolls.length}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deduction</th>
                    <th>Net Salary</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayrolls.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="text-center text-danger py-4">
                        No Payroll Record Found
                      </td>
                    </tr>
                  ) : (
                    filteredPayrolls.map((payroll, index) => (
                      <tr key={payroll.payrollId}>
                        <td>{index + 1}</td>

                        <td>{payroll.employeeCode}</td>

                        <td>
                          <strong>{payroll.employeeName}</strong>
                        </td>

                        <td>{payroll.department}</td>

                        <td>{payroll.designation}</td>

                        <td>{payroll.month}</td>

                        <td>{payroll.year}</td>

                        <td>₹ {Number(payroll.basicSalary).toFixed(2)}</td>

                        <td className="text-success">
                          ₹ {Number(payroll.bonus).toFixed(2)}
                        </td>

                        <td className="text-danger">
                          ₹ {Number(payroll.deduction).toFixed(2)}
                        </td>

                        <td className="fw-bold text-primary">
                          ₹ {Number(payroll.netSalary).toFixed(2)}
                        </td>

                        <td>{payroll.paymentDate}</td>

                        <td>
                          {payroll.paymentStatus === "PAID" ? (
                            <span className="badge bg-success">PAID</span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              PENDING
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="7">Payroll Summary</th>

                    <th>₹ {totalBasicSalary.toFixed(2)}</th>

                    <th className="text-success">₹ {totalBonus.toFixed(2)}</th>

                    <th className="text-danger">
                      ₹ {totalDeduction.toFixed(2)}
                    </th>

                    <th className="text-primary">
                      ₹ {totalNetSalary.toFixed(2)}
                    </th>

                    <th colSpan="2"></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Employees</h6>

                <h3 className="text-primary">{filteredPayrolls.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Bonus</h6>

                <h3 className="text-success">₹ {totalBonus.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Deduction</h6>

                <h3 className="text-danger">₹ {totalDeduction.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Net Salary Paid</h6>

                <h3 className="text-success">₹ {totalNetSalary.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayrollReport;
