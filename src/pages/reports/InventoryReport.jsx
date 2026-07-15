import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getInventoryReport } from "../../services/ReportService";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FaBoxes,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSortAmountDown,
} from "react-icons/fa";

const LOW_STOCK_LIMIT = 10;

const InventoryReport = () => {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [products, search, category, showLowStock]);

  const loadInventory = async () => {
    try {
      const response = await getInventoryReport();

      setProducts(response.data);

      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterInventory = () => {
    let list = [...products];

    if (search !== "") {
      list = list.filter((product) =>
        (product.name || "").toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "") {
      list = list.filter((product) => product.categoryName === category);
    }

    if (showLowStock) {
      list = list.filter((product) => product.stockQuantity <= LOW_STOCK_LIMIT);
    }

    setFilteredProducts(list);
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.categoryName))];
  }, [products]);

  const sortByName = () => {
    const sorted = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    setFilteredProducts(sorted);
  };

  const exportExcel = () => {
    const excelData = filteredProducts.map((product) => ({
      Product: product.name,

      Category: product.categoryName,

      Size: product.size,

      Color: product.color,

      PurchasePrice: product.purchasePrice,

      SellingPrice: product.sellingPrice,

      Stock: product.stockQuantity,

      InventoryValue:
        (product.purchasePrice || 0) * (product.stockQuantity || 0),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,

      worksheet,

      "Inventory Report",
    );

    const excelBuffer = XLSX.write(
      workbook,

      {
        bookType: "xlsx",
        type: "array",
      },
    );

    const file = new Blob(
      [excelBuffer],

      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    );

    saveAs(file, "Inventory_Report.xlsx");
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
      "Inventory Report",

      14,

      18,
    );

    autoTable(pdf, {
      head: [["Product", "Category", "Purchase", "Selling", "Stock", "Value"]],

      body: filteredProducts.map((product) => [
        product.name,

        product.categoryName,

        product.purchasePrice,

        product.sellingPrice,

        product.stockQuantity,

        (product.purchasePrice || 0) * (product.stockQuantity || 0),
      ]),
    });

    pdf.save("Inventory_Report.pdf");
  };

  const printInventory = () => {
    window.print();
  };

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (p) => p.stockQuantity <= LOW_STOCK_LIMIT,
  ).length;

  return (
    <Layout>
      <div className="container-fluid mt-4"></div>

      <h2 className="fw-bold text-primary mb-4">
        <FaBoxes className="me-2" />
        Inventory Report
      </h2>

      {/* Summary Cards */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Products</h6>

              <h2 className="text-primary">{totalProducts}</h2>
            </div>
          </div>
        </div>

        <div className="col"></div>

        {/* Filter Section */}

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Search Product</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  <FaFilter className="me-2" />
                  Category
                </label>

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showLowStock}
                    onChange={(e) => setShowLowStock(e.target.checked)}
                  />

                  <label className="form-check-label">
                    <FaExclamationTriangle className="text-danger me-2" />
                    Show Low Stock Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Buttons */}

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-primary me-2" onClick={sortByName}>
            <FaSortAmountDown className="me-2" />
            Sort
          </button>

          <button className="btn btn-success me-2" onClick={exportExcel}>
            <FaFileExcel className="me-2" />
            Excel
          </button>

          <button className="btn btn-danger me-2" onClick={exportPDF}>
            <FaFilePdf className="me-2" />
            PDF
          </button>

          <button className="btn btn-dark" onClick={printInventory}>
            <FaPrint className="me-2" />
            Print
          </button>
        </div>

        {/* Inventory Table */}

        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between">
            <h5 className="mb-0">Inventory List</h5>

            <strong>Total Products :{filteredProducts.length}</strong>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Size</th>

                    <th>Color</th>

                    <th className="text-end">Purchase</th>

                    <th className="text-end">Selling</th>

                    <th className="text-center">Stock</th>

                    <th className="text-end">Inventory Value</th>

                    <th className="text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-danger">
                        No Products Found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product, index) => {
                      const stockValue =
                        (product.purchasePrice || 0) *
                        (product.stockQuantity || 0);

                      return (
                        <tr key={product.id}>
                          <td>{index + 1}</td>

                          <td>{product.name}</td>

                          <td>{product.categoryName}</td>

                          <td>{product.size || "-"}</td>

                          <td>{product.color || "-"}</td>

                          <td className="text-end">
                            ₹ {Number(product.purchasePrice || 0).toFixed(2)}
                          </td>

                          <td className="text-end">
                            ₹ {Number(product.sellingPrice || 0).toFixed(2)}
                          </td>

                          <td className="text-center">
                            {product.stockQuantity}
                          </td>

                          <td className="text-end fw-bold">
                            ₹ {stockValue.toFixed(2)}
                          </td>

                          <td className="text-center">
                            {product.stockQuantity <= LOW_STOCK_LIMIT ? (
                              <span className="badge bg-danger">Low Stock</span>
                            ) : (
                              <span className="badge bg-success">In Stock</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Summary */}

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-success">
              <div className="card-body text-center">
                <h6 className="text-success">Total Inventory Value</h6>

                <h3>
                  ₹{" "}
                  {filteredProducts
                    .reduce(
                      (sum, p) =>
                        sum + (p.purchasePrice || 0) * (p.stockQuantity || 0),
                      0,
                    )
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-primary">
              <div className="card-body text-center">
                <h6 className="text-primary">Total Products</h6>

                <h3>{filteredProducts.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-danger">
              <div className="card-body text-center">
                <h6 className="text-danger">Low Stock Products</h6>

                <h3>
                  {
                    filteredProducts.filter(
                      (p) => p.stockQuantity <= LOW_STOCK_LIMIT,
                    ).length
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryReport;
