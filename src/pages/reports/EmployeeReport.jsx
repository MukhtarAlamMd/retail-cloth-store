import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getEmployeeReport } from "../../services/ReportService";

import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaSortAlphaDown,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    filterEmployees();
  }, [employees, search, department, designation, status]);

  const loadEmployees = async () => {
    try {
      const response = await getEmployeeReport();
      console.log(response.data);

      setEmployees(response.data);

      setFilteredEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filterEmployees = () => {
    let list = [...employees];

    if (search !== "") {
      list = list.filter(
        (employee) =>
          (employee.employeeCode || "")

            .toLowerCase()

            .includes(search.toLowerCase()) ||
          (employee.firstName + " " + employee.lastName)

            .toLowerCase()

            .includes(search.toLowerCase()) ||
          (employee.phone || "")

            .toLowerCase()

            .includes(search.toLowerCase()) ||
          (employee.email || "")

            .toLowerCase()

            .includes(search.toLowerCase()),
      );
    }

    if (department !== "") {
      list = list.filter((employee) => employee.department === department);
    }

    if (designation !== "") {
      list = list.filter((employee) => employee.designation === designation);
    }

    if (status !== "") {
      list = list.filter((employee) => employee.status === status);
    }

    setFilteredEmployees(list);
  };

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],

    [employees],
  );

  const designations = useMemo(
    () => [...new Set(employees.map((employee) => employee.designation))],

    [employees],
  );

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,

      worksheet,

      "Employees",
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",

      type: "array",
    });

    saveAs(
      new Blob([excelBuffer]),

      "Employee_Report.xlsx",
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text(
      "Employee Report",

      14,

      15,
    );

    autoTable(pdf, {
      head: [
        [
          "Code",
          "Employee",
          "Department",
          "Designation",
          "Phone",
          "Salary",
          "Status",
        ],
      ],

      body: filteredEmployees.map((employee) => [
        employee.employeeCode,

        employee.firstName + " " + employee.lastName,

        employee.department,

        employee.designation,

        employee.phone,

        employee.salary,

        employee.status,
      ]),
    });

    pdf.save("Employee_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByName = () => {
    const sorted = [...filteredEmployees];

    sorted.sort((a, b) =>
      (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName),
    );

    setFilteredEmployees(sorted);
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaUsers className="me-2" />
          Employee Report
        </h2>

        {/* Dashboard and Filters in Part 2 */}
        {/* Dashboard */}

        <div className="row justify-content-between g-3 mb-4">
          <div className="col-lg-2 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h6>Total Employees</h6>
                <h2 className="text-primary mb-0">
                  {filteredEmployees.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h6>Active Employees</h6>
                <h2 className="text-success mb-0">
                  {
                    filteredEmployees.filter(
                      (e) => (e.status || "").trim().toLowerCase() === "active",
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h6>Inactive Employees</h6>
                <h2 className="text-danger mb-0">
                  {
                    filteredEmployees.filter(
                      (e) =>
                        (e.status || "").trim().toLowerCase() === "inactive",
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h6>Average Salary</h6>
                <h5 className="text-primary text-nowrap mb-0">
                  ₹
                  {filteredEmployees.length === 0
                    ? "0.00"
                    : (
                        filteredEmployees.reduce(
                          (sum, e) => sum + Number(e.salary || 0),
                          0,
                        ) / filteredEmployees.length
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </h5>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h6>Total Salary</h6>
                <h5 className="text-warning text-nowrap mb-0">
                  ₹
                  {filteredEmployees
                    .reduce(
                      (sum, employee) => sum + Number(employee.salary || 0),
                      0,
                    )
                    .toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/*    end Dashboard */}
        {/* Filters */}

        <div className="card shadow border-0 mb-2">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <FaFilter className="me-2" />
              Filters
            </h5>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Search</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    className="form-control"
                    placeholder="Code / Name / Phone"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label">Department</label>

                <select
                  className="form-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>

                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Designation</label>

                <select
                  className="form-select"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option value="">All</option>

                  {designations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All</option>

                  <option value="ACTIVE">Active</option>

                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-primary w-100" onClick={sortByName}>
                  <FaSortAlphaDown className="me-2" />
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

        {/* Employee Table - Part 3 */}
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Employee List</h5>

            <strong>Total : {filteredEmployees.length}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Code</th>

                    <th>Name</th>

                    <th>Department</th>

                    <th>Designation</th>

                    <th>Phone</th>

                    <th>Email</th>

                    <th>Salary</th>

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center text-danger py-4">
                        No Employee Found
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee, index) => (
                      <tr key={employee.employeeId}>
                        <td>{index + 1}</td>

                        <td>{employee.employeeCode}</td>

                        <td>
                          <strong>
                            {employee.firstName ?? ""},{employee.lastName ?? ""}
                          </strong>
                        </td>

                        <td>{employee.department}</td>

                        <td>{employee.designation}</td>

                        <td>{employee.phone}</td>

                        <td>{employee.email}</td>

                        <td className="text-end">
                          ₹
                          {Number(employee.salary || 0).toLocaleString(
                            "en-IN",

                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </td>

                        <td>
                          {employee.status === "ACTIVE" ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Inactive</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="7" className="text-end">
                      Total Salary
                    </th>

                    <th className="text-end text-success">
                      ₹
                      {filteredEmployees

                        .reduce(
                          (sum, employee) => sum + Number(employee.salary || 0),

                          0,
                        )

                        .toLocaleString(
                          "en-IN",

                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                    </th>

                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeReport;
