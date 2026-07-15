import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAttendance from "./pages/attendance/AddAttendance";
import SupplierPaymentList from "./pages/supplierpayment/SupplierPaymentList";
import AddSupplierPayment from "./pages/supplierpayment/AddSupplierPayment";
import EditSupplierPayment from "./pages/supplierpayment/EditSupplierPayment";
import ViewSupplierPayment from "./pages/supplierpayment/ViewSupplierPayment";

import AttendanceList from "./pages/attendance/AttendanceList";

import EditAttendance from "./pages/attendance/EditAttendance";
import ViewAttendance from "./pages/attendance/ViewAttendance";

import Reports from "./pages/reports/Reports";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InventoryList from "./pages/inventory/InventoryList";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Product
import ProductList from "./pages/product/ProductList";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import ViewProduct from "./pages/product/ViewProduct";

// Category
import CategoryList from "./pages/category/CategoryList";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import ViewCategory from "./pages/category/ViewCategory";

// Customer
import CustomerList from "./pages/customer/CustomerList";
import AddCustomer from "./pages/customer/AddCustomer";
import EditCustomer from "./pages/customer/EditCustomer";
import ViewCustomer from "./pages/customer/ViewCustomer";

// Supplier
import SupplierList from "./pages/supplier/SupplierList";
import AddSupplier from "./pages/supplier/AddSupplier";
import EditSupplier from "./pages/supplier/EditSupplier";
import ViewSupplier from "./pages/supplier/ViewSupplier";

// Purchase
import PurchaseList from "./pages/purchase/PurchaseList";
import AddPurchase from "./pages/purchase/AddPurchase";
import EditPurchase from "./pages/purchase/EditPurchase";
import ViewPurchase from "./pages/purchase/ViewPurchase";

// Sale
import SalesList from "./pages/sale/SalesList";
import AddSale from "./pages/sale/AddSale";
import EditSale from "./pages/sale/EditSale";
import ViewSale from "./pages/sale/ViewSale";

// Expense
import ExpenseList from "./pages/expense/ExpenseList";
import AddExpense from "./pages/expense/AddExpense";
import EditExpense from "./pages/expense/EditExpense";
import ViewExpense from "./pages/expense/ViewExpense";
import MyLeave from "./pages/leave/MyLeave";
import MyAttendance from "./pages/attendance/MyAttendance";

// User
import UserList from "./pages/user/UserList";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ViewUser from "./pages/user/ViewUser";

import LeaveList from "./pages/leave/LeaveList";
import AddLeave from "./pages/leave/AddLeave";
import EditLeave from "./pages/leave/EditLeave";
import ViewLeave from "./pages/leave/ViewLeave";

// Security
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import CustomerPaymentList from "./pages/customerpayment/CustomerPaymentList";
import AddCustomerPayment from "./pages/customerpayment/AddCustomerPayment";
import EditCustomerPayment from "./pages/customerpayment/EditCustomerPayment";
import ViewCustomerPayment from "./pages/customerpayment/ViewCustomerPayment";

import EmployeeList from "./pages/employee/EmployeeList";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import ViewEmployee from "./pages/employee/ViewEmployee";

import PayrollList from "./pages/payroll/PayrollList";
import AddPayroll from "./pages/payroll/AddPayroll";
import EditPayroll from "./pages/payroll/EditPayroll";
import ViewPayroll from "./pages/payroll/ViewPayroll";

import AddDepartment from "./pages/department/AddDepartment";
import DepartmentList from "./pages/department/DepartmentList";
import EditDepartment from "./pages/department/EditDepartment";
import ViewDepartment from "./pages/department/ViewDepartment";

import DesignationList from "./pages/designations/DesignationList";
import AddDesignation from "./pages/designations/AddDesignation";
import EditDesignation from "./pages/designations/EditDesignation";
import ViewDesignation from "./pages/designations/ViewDesignation";

import SalesReport from "./pages/reports/SalesReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import InventoryReport from "./pages/reports/InventoryReport";
import CustomerReport from "./pages/reports/CustomerReport";
import SupplierReport from "./pages/reports/SupplierReport";
import EmployeeReport from "./pages/reports/EmployeeReport";
import AttendanceReport from "./pages/reports/AttendanceReport";
import PayrollReport from "./pages/reports/PayrollReport";
import LeaveReport from "./pages/reports/LeaveReport";
import ExpenseReport from "./pages/reports/ExpenseReport";
import ProfitLossReport from "./pages/reports/ProfitLossReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reports/sales" element={<SalesReport />} />

        <Route path="/reports/purchases" element={<PurchaseReport />} />

        <Route path="/reports/inventory" element={<InventoryReport />} />

        <Route path="/reports/customers" element={<CustomerReport />} />

        <Route path="/reports/suppliers" element={<SupplierReport />} />

        <Route path="/reports/employees" element={<EmployeeReport />} />

        <Route path="/reports/attendance" element={<AttendanceReport />} />

        <Route path="/reports/payroll" element={<PayrollReport />} />

        <Route path="/reports/leave" element={<LeaveReport />} />

        <Route path="/reports/expenses" element={<ExpenseReport />} />

        <Route path="/reports/profit-loss" element={<ProfitLossReport />} />

        <Route path="/designations" element={<DesignationList />} />
        <Route path="/add-designation" element={<AddDesignation />} />
        <Route path="/edit-designation/:id" element={<EditDesignation />} />
        <Route path="/view-designation/:id" element={<ViewDesignation />} />

        <Route path="/departments" element={<DepartmentList />} />

        <Route path="/add-department" element={<AddDepartment />} />

        <Route path="/edit-department/:id" element={<EditDepartment />} />

        <Route path="/view-department/:id" element={<ViewDepartment />} />
        {/* Payroll */}

        <Route path="/payroll" element={<PayrollList />} />

        <Route path="/add-payroll" element={<AddPayroll />} />

        <Route path="/edit-payroll/:id" element={<EditPayroll />} />

        <Route path="/view-payroll/:id" element={<ViewPayroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <AttendanceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-attendance"
          element={
            <PrivateRoute>
              <MyAttendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-leave"
          element={
            <PrivateRoute>
              <MyLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <PrivateRoute>
              <LeaveList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-leave"
          element={
            <PrivateRoute>
              <AddLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-leave/:id"
          element={
            <PrivateRoute>
              <EditLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-leave/:id"
          element={
            <PrivateRoute>
              <ViewLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-attendance"
          element={
            <PrivateRoute>
              <AddAttendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-attendance/:id"
          element={
            <PrivateRoute>
              <EditAttendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-attendance/:id"
          element={
            <PrivateRoute>
              <ViewAttendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-employee/:id"
          element={
            <PrivateRoute>
              <ViewEmployee />
            </PrivateRoute>
          }
        />

        <Route path="/customer-payments" element={<CustomerPaymentList />} />

        <Route path="/add-customer-payment" element={<AddCustomerPayment />} />

        <Route
          path="/edit-customer-payment/:id"
          element={<EditCustomerPayment />}
        />

        <Route
          path="/view-customer-payment/:id"
          element={<ViewCustomerPayment />}
        />

        {/* Supplier Payment */}

        <Route
          path="/supplier-payments"
          element={
            <PrivateRoute>
              <SupplierPaymentList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-supplier-payment"
          element={
            <PrivateRoute>
              <AddSupplierPayment />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-supplier-payment/:id"
          element={
            <PrivateRoute>
              <EditSupplierPayment />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-supplier-payment/:id"
          element={
            <PrivateRoute>
              <ViewSupplierPayment />
            </PrivateRoute>
          }
        />

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryList />
            </PrivateRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <Dashboard />
            </RoleRoute>
          }
        />

        {/* ================= PRODUCTS ================= */}
        <Route
          path="/products"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <ProductList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AddProduct />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <EditProduct />
            </RoleRoute>
          }
        />

        <Route
          path="/view-product/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <ViewProduct />
            </RoleRoute>
          }
        />

        {/* ================= CATEGORIES ================= */}

        <Route
          path="/categories"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <CategoryList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-category"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AddCategory />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-category/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <EditCategory />
            </RoleRoute>
          }
        />

        <Route
          path="/view-category/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <ViewCategory />
            </RoleRoute>
          }
        />

        {/* ================= CUSTOMERS ================= */}

        <Route
          path="/customers"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <CustomerList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-customer"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddCustomer />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-customer/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <EditCustomer />
            </RoleRoute>
          }
        />

        <Route
          path="/view-customer/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ViewCustomer />
            </RoleRoute>
          }
        />

        {/* ================= SUPPLIERS ================= */}

        <Route
          path="/suppliers"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <SupplierList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-supplier"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddSupplier />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-supplier/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <EditSupplier />
            </RoleRoute>
          }
        />

        <Route
          path="/view-supplier/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ViewSupplier />
            </RoleRoute>
          }
        />

        {/* ================= PURCHASES ================= */}

        <Route
          path="/purchases"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <PurchaseList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-purchase"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddPurchase />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-purchase/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <EditPurchase />
            </RoleRoute>
          }
        />

        <Route
          path="/view-purchase/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ViewPurchase />
            </RoleRoute>
          }
        />

        {/* ================= SALES ================= */}

        <Route
          path="/sales"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <SalesList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-sale"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddSale />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-sale/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <EditSale />
            </RoleRoute>
          }
        />

        <Route
          path="/view-sale/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ViewSale />
            </RoleRoute>
          }
        />

        {/* ================= EXPENSES ================= */}

        <Route
          path="/expenses"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ExpenseList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-expense"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddExpense />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-expense/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <EditExpense />
            </RoleRoute>
          }
        />

        <Route
          path="/view-expense/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <ViewExpense />
            </RoleRoute>
          }
        />

        {/* ================= USERS ================= */}

        <Route
          path="/users"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <UserList />
            </RoleRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <AddUser />
            </RoleRoute>
          }
        />

        <Route
          path="/edit-user/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <EditUser />
            </RoleRoute>
          }
        />

        <Route
          path="/view-user/:id"
          element={
            <RoleRoute allowedRoles={["ROLE_ADMIN"]}>
              <ViewUser />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
