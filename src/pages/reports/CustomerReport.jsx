import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getCustomerReport } from "../../services/ReportService";

import {
  FaUsers,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaFilter,
  FaSortAlphaDown,
} from "react-icons/fa";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CustomerReport = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, search, city, state]);

  const loadCustomers = async () => {
    try {
      const response = await getCustomerReport();
      console.log(response.data);

      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCustomers = () => {
    let list = [...customers];

    if (search !== "") {
      list = list.filter(
        (customer) =>
          (customer.firstName + " " + customer.lastName)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          customer.mobile.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (city !== "") {
      list = list.filter((customer) => customer.city === city);
    }

    if (state !== "") {
      list = list.filter((customer) => customer.state === state);
    }

    setFilteredCustomers(list);
  };

  const cities = useMemo(() => {
    return [...new Set(customers.map((c) => c.city))];
  }, [customers]);

  const states = useMemo(() => {
    return [...new Set(customers.map((c) => c.state))];
  }, [customers]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "Customer_Report.xlsx");
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text("Customer Report", 14, 15);

    autoTable(pdf, {
      head: [["Name", "Mobile", "Email", "City", "State"]],
      body: filteredCustomers.map((customer) => [
        customer.firstName + " " + customer.lastName,
        customer.mobile,
        customer.email,
        customer.city,
        customer.state,
      ]),
    });

    pdf.save("Customer_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByName = () => {
    const sorted = [...filteredCustomers];

    sorted.sort((a, b) =>
      (a.firstName + " " + a.lastName).localeCompare(
        b.firstName + " " + b.lastName,
      ),
    );

    setFilteredCustomers(sorted);
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-primary mb-4">
          <FaUsers className="me-2" />
          Customer Report
        </h2>

        {/* Dashboard */}

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow">
              <div className="card-body text-center">
                <h6>Total Customers</h6>

                <h2>{filteredCustomers.length}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Search</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    className="form-control"
                    placeholder="Name, Email, Mobile"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  <FaFilter className="me-2" />
                  City
                </label>

                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">All Cities</option>

                  {cities
                    .filter((c) => c && c.trim() !== "")
                    .map((c, index) => (
                      <option key={`city-${index}-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">State</label>

                <select
                  className="form-select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">All States</option>

                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
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

        {/* Action Buttons */}

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

        {/* Customer Table */}

        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Customer List</h5>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Name</th>

                    <th>Mobile</th>

                    <th>Email</th>

                    <th>City</th>

                    <th>State</th>

                    <th>Address</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-danger">
                        No Customer Found
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer, index) => (
                      <tr key={customer.customerId}>
                        <td>{index + 1}</td>

                        <td>
                          {customer.firstName} {customer.lastName}
                        </td>

                        <td>{customer.mobile}</td>

                        <td>{customer.email}</td>

                        <td>{customer.city}</td>

                        <td>{customer.state}</td>

                        <td>{customer.address}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerReport;
