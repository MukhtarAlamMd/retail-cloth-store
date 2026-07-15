import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getLeaveReport } from "../../services/ReportService";

import {
  FaCalendarAlt,
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

const LeaveReport = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const [search, setSearch] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  useEffect(() => {
    filterLeaves();
  }, [leaves, search, leaveType, leaveStatus, fromDate, toDate]);

  const loadLeaves = async () => {
    try {
      const response = await getLeaveReport();

      console.log(response.data[0]);
      console.log(JSON.stringify(response.data[0], null, 2));

      setLeaves(response.data);

      setFilteredLeaves(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterLeaves = () => {
    let list = [...leaves];

    if (search !== "") {
      list = list.filter(
        (item) =>
          (item.employeeName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (item.employeeCode || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (leaveType !== "") {
      list = list.filter((item) => item.leaveType === leaveType);
    }

    if (leaveStatus !== "") {
      list = list.filter((item) => item.leaveStatus === leaveStatus);
    }

    if (fromDate !== "") {
      list = list.filter((item) => item.fromDate >= fromDate);
    }

    if (toDate !== "") {
      list = list.filter((item) => item.toDate <= toDate);
    }

    setFilteredLeaves(list);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeaves);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "Leave_Report.xlsx");
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text("Leave Report", 14, 15);

    autoTable(pdf, {
      head: [["Employee", "Leave Type", "From", "To", "Days", "Status"]],
      body: filteredLeaves.map((item) => [
        item.employeeName,
        item.leaveType,
        item.fromDate,
        item.toDate,
        item.totalDays,
        item.leaveStatus,
      ]),
    });

    pdf.save("Leave_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByEmployee = () => {
    const sorted = [...filteredLeaves];

    sorted.sort((a, b) =>
      (a.employeeName || "").localeCompare(b.employeeName || ""),
    );

    setFilteredLeaves(sorted);
  };

  const approvedCount = useMemo(
    () =>
      filteredLeaves.filter((item) => item.leaveStatus === "APPROVED").length,

    [filteredLeaves],
  );

  const pendingCount = useMemo(
    () =>
      filteredLeaves.filter((item) => item.leaveStatus === "PENDING").length,

    [filteredLeaves],
  );

  const rejectedCount = useMemo(
    () =>
      filteredLeaves.filter((item) => item.leaveStatus === "REJECTED").length,

    [filteredLeaves],
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaCalendarAlt className="me-2" />
          Leave Report
        </h2>

        {/* Dashboard + Filters + Table in Part 2 */}

        {/* Dashboard */}

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Requests</h6>

                <h2 className="text-primary">{filteredLeaves.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Approved</h6>

                <h2 className="text-success">{approvedCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Pending</h6>

                <h2 className="text-warning">{pendingCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Rejected</h6>

                <h2 className="text-danger">{rejectedCount}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <FaFilter className="me-2" />
              Leave Filters
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
                <label className="form-label">Leave Type</label>

                <select
                  className="form-select"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="">All</option>

                  <option value="CASUAL">Casual</option>

                  <option value="SICK">Sick</option>

                  <option value="EARNED">Earned</option>

                  <option value="MATERNITY">Maternity</option>

                  <option value="PATERNITY">Paternity</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  value={leaveStatus}
                  onChange={(e) => setLeaveStatus(e.target.value)}
                >
                  <option value="">All</option>

                  <option value="APPROVED">Approved</option>

                  <option value="PENDING">Pending</option>

                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">From</label>

                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">To</label>

                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-md-1 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={sortByEmployee}
                >
                  Sort
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

        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Leave Records</h5>

            <strong>Total : {filteredLeaves.length}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Employee Code</th>

                    <th>Employee Name</th>

                    <th>Leave Type</th>

                    <th>From Date</th>

                    <th>To Date</th>

                    <th>Total Days</th>

                    <th>Status</th>

                    <th>Reason</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeaves.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center text-danger py-4">
                        No Leave Record Found
                      </td>
                    </tr>
                  ) : (
                    filteredLeaves.map((leave, index) => (
                      <tr key={leave.id}>
                        <td>{index + 1}</td>

                        <td>{leave.employeeCode}</td>

                        <td>
                          <strong>{leave.employeeName}</strong>
                        </td>

                        <td>{leave.leaveType}</td>

                        <td>{leave.fromDate}</td>

                        <td>{leave.toDate}</td>

                        <td>{leave.totalDays}</td>

                        <td>
                          {leave.leaveStatus === "APPROVED" ? (
                            <span className="badge bg-success">Approved</span>
                          ) : leave.leaveStatus === "PENDING" ? (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          ) : (
                            <span className="badge bg-danger">Rejected</span>
                          )}
                        </td>

                        <td>{leave.reason || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="6">Leave Summary</th>

                    <th>
                      {filteredLeaves.reduce(
                        (total, item) => total + Number(item.totalDays || 0),

                        0,
                      )}
                    </th>

                    <th>{approvedCount} Approved</th>

                    <th>Total Requests : {filteredLeaves.length}</th>
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
                <h6 className="text-muted">Total Requests</h6>

                <h3 className="text-primary">{filteredLeaves.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Approved</h6>

                <h3 className="text-success">{approvedCount}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Pending</h6>

                <h3 className="text-warning">{pendingCount}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Rejected</h6>

                <h3 className="text-danger">{rejectedCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveReport;
