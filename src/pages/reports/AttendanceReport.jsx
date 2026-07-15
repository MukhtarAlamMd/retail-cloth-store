import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getAttendanceReport } from "../../services/ReportService";

import {
  FaCalendarCheck,
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

const AttendanceReport = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    filterAttendance();
  }, [attendance, search, status, fromDate, toDate]);

  const loadAttendance = async () => {
    try {
      const response = await getAttendanceReport();

      setAttendance(response.data);

      setFilteredAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAttendance = () => {
    let list = [...attendance];

    if (search !== "") {
      list = list.filter(
        (record) =>
          (record.employeeName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (record.employeeCode || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (status !== "") {
      list = list.filter((record) => record.attendanceStatus === status);
    }

    if (fromDate !== "") {
      list = list.filter((record) => record.attendanceDate >= fromDate);
    }

    if (toDate !== "") {
      list = list.filter((record) => record.attendanceDate <= toDate);
    }

    setFilteredAttendance(list);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAttendance);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "Attendance_Report.xlsx");
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text("Attendance Report", 14, 15);

    autoTable(pdf, {
      head: [["Employee", "Code", "Date", "Status", "Check In", "Check Out"]],
      body: filteredAttendance.map((record) => [
        `${record.firstName || ""} ${record.lastName || ""}`,
        record.employeeCode,
        record.attendanceDate,
        record.attendanceStatus,
        record.checkIn || "-",
        record.checkOut || "-",
      ]),
    });

    pdf.save("Attendance_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByName = () => {
    const sorted = [...filteredAttendance];

    sorted.sort((a, b) =>
      (a.employeeName || "").localeCompare(b.employeeName || ""),
    );

    setFilteredAttendance(sorted);
  };

  const presentCount = useMemo(
    () =>
      filteredAttendance.filter((item) => item.attendanceStatus === "Present")
        .length,

    [filteredAttendance],
  );

  const absentCount = useMemo(
    () =>
      filteredAttendance.filter((item) => item.attendanceStatus === "Absent")
        .length,

    [filteredAttendance],
  );

  const leaveCount = useMemo(
    () =>
      filteredAttendance.filter((item) => item.attendanceStatus === "Leave")
        .length,

    [filteredAttendance],
  );

  const halfDayCount = useMemo(
    () =>
      filteredAttendance.filter((item) => item.attendanceStatus === "Half Day")
        .length,

    [filteredAttendance],
  );

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaCalendarCheck className="me-2" />
          Attendance Report
        </h2>

        {/* Dashboard + Filters + Table in Part 2 */}

        {/* Dashboard */}

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Records</h6>

                <h2 className="text-primary">{filteredAttendance.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Present</h6>

                <h2 className="text-success">{presentCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Absent</h6>

                <h2 className="text-danger">{absentCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Leave</h6>

                <h2 className="text-warning">{leaveCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Half Day</h6>

                <h2 className="text-info">{halfDayCount}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <FaFilter className="me-2" />
              Attendance Filters
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
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">From Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">To Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-primary w-100" onClick={sortByName}>
                  <FaSortAlphaDown className="me-2" />
                  Sort by Name
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

        {/* Attendance Table - Part 3 */}

        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Attendance Records</h5>

            <strong>Total : {filteredAttendance.length}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Employee Code</th>

                    <th>Employee Name</th>

                    <th>Date</th>

                    <th>Status</th>

                    <th>Check In</th>

                    <th>Check Out</th>

                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-danger py-4">
                        No Attendance Record Found
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((record, index) => (
                      <tr key={record.attendanceId || index}>
                        <td>{index + 1}</td>

                        <td>{record.employeeCode}</td>

                        <td>
                          <strong>
                            {record.firstName} {record.lastName}
                          </strong>
                        </td>

                        <td>{record.attendanceDate}</td>

                        <td>
                          {record.attendanceStatus === "Present" && (
                            <span className="badge bg-success">Present</span>
                          )}

                          {record.attendanceStatus === "Absent" && (
                            <span className="badge bg-danger">Absent</span>
                          )}

                          {record.attendanceStatus === "Leave" && (
                            <span className="badge bg-warning text-dark">
                              Leave
                            </span>
                          )}

                          {record.attendanceStatus === "Half Day" && (
                            <span className="badge bg-info">Half Day</span>
                          )}
                        </td>

                        <td>{record.checkIn || "-"}</td>

                        <td>{record.checkOut || "-"}</td>

                        <td>{record.remarks || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="4">Attendance Summary</th>

                    <th>{presentCount} Present</th>

                    <th>{absentCount} Absent</th>

                    <th>{leaveCount} Leave</th>

                    <th>{halfDayCount} Half Day</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Attendance %</h6>

                <h3 className="text-success">
                  {filteredAttendance.length === 0
                    ? "0%"
                    : (
                        (presentCount / filteredAttendance.length) *
                        100
                      ).toFixed(2)}
                  %
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Present Days</h6>

                <h3 className="text-primary">{presentCount}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted">Absent Days</h6>

                <h3 className="text-danger">{absentCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceReport;
