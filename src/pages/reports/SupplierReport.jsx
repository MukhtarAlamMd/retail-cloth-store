import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getSupplierReport } from "../../services/ReportService";

import {
  FaTruck,
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

const SupplierReport = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  useEffect(() => {
    filterSuppliers();
  }, [suppliers, search, city, state]);

  const loadSuppliers = async () => {
    try {
      const response = await getSupplierReport();

      setSuppliers(response.data);

      setFilteredSuppliers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterSuppliers = () => {
    let list = [...suppliers];

    if (search !== "") {
      list = list.filter(
        (s) =>
          (s.supplierName || "").toLowerCase().includes(search.toLowerCase()) ||
          (s.mobile || "").toLowerCase().includes(search.toLowerCase()) ||
          (s.email || "").toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (city !== "") {
      list = list.filter((s) => s.city === city);
    }

    if (state !== "") {
      list = list.filter((s) => s.state === state);
    }

    setFilteredSuppliers(list);
  };

  const cities = useMemo(() => {
    return [...new Set(suppliers.map((s) => s.city))];
  }, [suppliers]);

  const states = useMemo(() => {
    return [...new Set(suppliers.map((s) => s.state))];
  }, [suppliers]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuppliers);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,

      worksheet,

      "Suppliers",
    );

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",

      type: "array",
    });

    saveAs(
      new Blob([buffer]),

      "Supplier_Report.xlsx",
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text(
      "Supplier Report",

      14,

      15,
    );

    autoTable(pdf, {
      head: [["Supplier", "Contact", "Mobile", "Email", "City"]],

      body: filteredSuppliers.map((s) => [
        s.supplierName,

        s.contactPerson,

        s.mobile,

        s.email,

        s.city,
      ]),
    });

    pdf.save("Supplier_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const sortByName = () => {
    const sorted = [...filteredSuppliers];

    sorted.sort((a, b) => a.supplierName.localeCompare(b.supplierName));

    setFilteredSuppliers(sorted);
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h2 className="fw-bold text-success mb-4">
          <FaTruck className="me-2" />
          Supplier Report
        </h2>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Suppliers</h6>

                <h2>{filteredSuppliers.length}</h2>
              </div>
            </div>
          </div>
        </div>

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
                    placeholder="Supplier, Mobile, Email"
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

                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
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

                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
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

        {/* Supplier Table (Part 2) */}
        <div className="card shadow border-0">
          <div className="card-header bg-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Supplier List</h5>

              <strong>Total : {filteredSuppliers.length}</strong>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Supplier</th>

                    <th>Contact Person</th>

                    <th>Mobile</th>

                    <th>Email</th>

                    <th>GST No.</th>

                    <th>City</th>

                    <th>State</th>

                    <th>Address</th>

                    <th>Purchase Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSuppliers.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-danger">
                        No Supplier Found
                      </td>
                    </tr>
                  ) : (
                    filteredSuppliers.map((supplier, index) => {
                      return (
                        <tr key={supplier.supplierId}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>{supplier.supplierName}</strong>
                          </td>

                          <td>{supplier.contactPerson || "-"}</td>

                          <td>{supplier.mobile}</td>

                          <td>{supplier.email}</td>

                          <td>{supplier.gstNumber || "-"}</td>

                          <td>{supplier.city}</td>

                          <td>{supplier.state}</td>

                          <td>{supplier.address}</td>

                          <td className="text-end">
                            ₹{" "}
                            {Number(supplier.totalPurchaseAmount || 0).toFixed(
                              2,
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>

                <tfoot className="table-light">
                  <tr>
                    <th colSpan="9" className="text-end">
                      Grand Total Purchase
                    </th>

                    <th className="text-end text-success">
                      ₹{" "}
                      {filteredSuppliers

                        .reduce(
                          (sum, supplier) =>
                            sum + Number(supplier.totalPurchaseAmount || 0),

                          0,
                        )

                        .toFixed(2)}
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Suppliers</h6>

                <h3 className="text-primary">{filteredSuppliers.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Purchase Amount</h6>

                <h3 className="text-success">
                  ₹{" "}
                  {filteredSuppliers

                    .reduce(
                      (sum, supplier) =>
                        sum + Number(supplier.totalPurchaseAmount || 0),

                      0,
                    )

                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Average Purchase</h6>

                <h3 className="text-warning">
                  ₹{" "}
                  {filteredSuppliers.length === 0
                    ? "0.00"
                    : (
                        filteredSuppliers.reduce(
                          (sum, supplier) =>
                            sum + Number(supplier.totalPurchaseAmount || 0),

                          0,
                        ) / filteredSuppliers.length
                      ).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplierReport;
