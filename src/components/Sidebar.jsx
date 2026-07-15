import { NavLink, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

import {
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaUser,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaWarehouse,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartBar,
  FaUserShield,
  FaHandHoldingUsd,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [reportOpen, setReportOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white ${isActive ? "bg-primary rounded fw-bold" : ""}`;

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="text-center mb-4">Retail Store</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-1">
          <NavLink to="/dashboard" className={linkClass}>
            <FaHome className="me-2" />
            Dashboard
          </NavLink>
        </li>

        {/* Department List */}
        <li className="nav-item mb-2">
          <NavLink to="/departments" className="nav-link text-white">
            <FaBuilding className="me-2" />
            Departments
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/products" className={linkClass}>
            <FaBoxOpen className="me-2" />
            Products
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/categories" className={linkClass}>
            <FaTags className="me-2" />
            Categories
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/customers" className={linkClass}>
            <FaUsers className="me-2" />
            Customers
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/employees" className={linkClass}>
            <FaUser className="me-2" />
            Employees
          </NavLink>
        </li>

        <NavLink to="/designations" className="nav-link text-white">
          <FaBriefcase className="me-2" />
          Designations
        </NavLink>

        <li className="nav-item mb-1">
          <NavLink to="/suppliers" className={linkClass}>
            <FaTruck className="me-2" />
            Suppliers
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/purchases" className={linkClass}>
            <FaShoppingCart className="me-2" />
            Purchases
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/sales" className={linkClass}>
            <FaCashRegister className="me-2" />
            Sales
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/expenses" className={linkClass}>
            <FaMoneyBillWave className="me-2" />
            Expenses
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/inventory" className={linkClass}>
            <FaWarehouse className="me-2" />
            Inventory
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/supplier-payments" className={linkClass}>
            <FaMoneyBillWave className="me-2" />
            Supplier Payments
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/customer-payments" className={linkClass}>
            <FaHandHoldingUsd className="me-2" />
            Customer Payments
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink to="/attendance" className={linkClass}>
            <FaClipboardCheck className="me-2" />
            Attendance
          </NavLink>
        </li>

        <li className="nav-item">
          <Link to="/payroll" className="nav-link">
            <FaMoneyCheckAlt className="me-2" />
            Payroll
          </Link>
        </li>

        {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
          <li className="nav-item mb-1">
            <NavLink to="/leave" className={linkClass}>
              <FaCalendarAlt className="me-2" />
              Leave Management
            </NavLink>
          </li>
        )}

        {role === "ROLE_EMPLOYEE" && (
          <>
            <li className="nav-item mb-1">
              <NavLink to="/my-attendance" className={linkClass}>
                <FaClipboardCheck className="me-2" />
                My Attendance
              </NavLink>
            </li>

            <li className="nav-item mb-1">
              <NavLink to="/my-leave" className={linkClass}>
                <FaCalendarAlt className="me-2" />
                My Leave
              </NavLink>
            </li>
          </>
        )}

        <li className="nav-item mb-1">
          <button
            className="btn btn-dark text-white w-100 d-flex justify-content-between align-items-center"
            onClick={() => setReportOpen(!reportOpen)}
          >
            <span>
              <FaChartBar className="me-2" />
              Reports
            </span>

            {reportOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </li>

        {reportOpen && (
          <>
            <li className="nav-item">
              <NavLink
                to="/reports/sales"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Sales Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/purchases"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Purchase Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/inventory"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Inventory Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/customers"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Customer Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/suppliers"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Supplier Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/employees"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Employee Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/attendance"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Attendance Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/payroll"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Payroll Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/leave"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Leave Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reports/expenses"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Expense Report
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/reports/profit-loss"
                className={({ isActive }) =>
                  `nav-link text-white ps-5 ${isActive ? "bg-primary rounded fw-bold" : ""}`
                }
              >
                Profit & Loss Report
              </NavLink>
            </li>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <li className="nav-item mb-1">
            <NavLink to="/users" className={linkClass}>
              <FaUserShield className="me-2" />
              Users
            </NavLink>
          </li>
        )}

        <hr className="border-light" />

        <li className="nav-item">
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
