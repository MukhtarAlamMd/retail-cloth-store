# 🛍️ Retail Cloth Store Management System

> A Full Stack Retail Cloth Store Management System built using **Spring Boot**, **React.js**, **MySQL**, and **JWT Authentication**. This application automates day-to-day retail store operations such as employee management, inventory, sales, purchases, payroll, attendance, suppliers, customers, and reporting.

---

# 📌 Project Overview

The **Retail Cloth Store Management System** is an enterprise-level web application designed to simplify and automate clothing retail business operations.

It provides a secure, scalable, and user-friendly platform for managing products, employees, customers, suppliers, inventory, purchases, sales, payroll, attendance, expenses, and reports.

The project follows a clean layered architecture using **Spring Boot REST APIs** for the backend and **React.js** for the frontend with **JWT Authentication** and **Role-Based Authorization**.

---

# 🚀 Key Features

## 🔐 Authentication & Security

- JWT Authentication
- Spring Security
- Role-Based Access Control (RBAC)
- Secure REST APIs
- Password Encryption

---

## 📊 Dashboard

- Business Overview
- Employee Statistics
- Product Statistics
- Sales Summary
- Purchase Summary
- Inventory Summary

---

## 👨‍💼 Employee Management

- Add Employee
- Update Employee
- Delete Employee
- Search Employee
- Employee Details
- Employee Status
- Employee Code Management

---

## 🏢 Department Management

- Create Department
- Update Department
- Delete Department
- Search Department

---

## 💼 Designation Management

- Create Designation
- Update Designation
- Delete Designation
- Search Designation

---

## 👕 Product Management

- Add Product
- Update Product
- Delete Product
- Product Categories
- Product Colors
- Product Sizes
- Stock Quantity Management

---

## 📦 Inventory Management

- Current Stock
- Low Stock Monitoring
- Product Availability

---

## 🚚 Supplier Management

- Add Supplier
- Update Supplier
- Delete Supplier
- Supplier Search

---

## 👥 Customer Management

- Customer Registration
- Customer Details
- Customer Search

---

## 🛒 Purchase Management

- Purchase Entry
- Supplier Purchase
- Purchase History

---

## 💰 Sales Management

- Sales Entry
- Customer Billing
- Invoice Management
- Sales History

---

## 🕒 Attendance Management

- Employee Check In
- Employee Check Out
- Attendance Tracking
- Attendance Reports

---

## 💵 Payroll Management

- Basic Salary
- Bonus
- Deduction
- Net Salary Calculation
- Payroll Reports

---

## 📝 Leave Management

- Leave Request
- Leave Approval
- Leave History

---

## 💸 Expense Management

- Expense Categories
- Daily Expenses
- Monthly Expenses

---

## 📈 Reports

- Employee Report
- Sales Report
- Purchase Report
- Inventory Report
- Payroll Report
- Attendance Report

---

# 🏗️ System Architecture

```
                React.js Frontend
                        │
                        │ REST API
                        ▼
               Spring Boot Backend
                        │
              Spring Security + JWT
                        │
                        ▼
                  MySQL Database
```

---

# 🛠️ Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven
- REST API

---

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- React Icons

---

## Database

- MySQL

---

## Development Tools

- IntelliJ IDEA
- VS Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```
Retail-Cloth-Store
│
├── Backend
│   ├── Controller
│   ├── DTO
│   ├── Entity
│   ├── Repository
│   ├── Service
│   ├── ServiceImpl
│   ├── Mapper
│   ├── Security
│   ├── Configuration
│   ├── Exception
│   └── Utility
│
├── Frontend
│   ├── Components
│   ├── Pages
│   ├── Layout
│   ├── Services
│   ├── Routes
│   ├── Assets
│   └── Context
│
└── README.md
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/MukhtarAlamMd/retail-cloth-store.git
```

---

# Backend Setup

```bash
cd retail-cloth-store
```

Configure your MySQL database inside

```
application.properties
```

Run Backend

```bash
mvn spring-boot:run
```

Backend URL

```
http://localhost:8081
```

---

# Frontend Setup

```bash
cd retail-cloth-store-ui
```

Install Dependencies

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# 🔐 Authentication

The application uses

- Spring Security
- JWT Authentication
- Role-Based Authorization

Available Roles

- ADMIN
- MANAGER
- EMPLOYEE

---

# 🌟 Project Highlights

- Enterprise-Level Architecture
- Clean Layered Architecture
- RESTful APIs
- JWT Authentication
- Role-Based Security
- Responsive UI
- CRUD Operations
- Exception Handling
- Validation
- Professional Folder Structure
- Production-Ready Coding Standards

---

# 📸 Screenshots

## Login Page

<img width="597" height="635" alt="image" src="https://github.com/user-attachments/assets/efd1ed73-1eee-4997-a67e-39c681a571f7" />

<img width="449" height="332" alt="image" src="https://github.com/user-attachments/assets/8ce1f880-487f-4266-afe0-f319fe4196af" />

## Dashboard

<img width="1141" height="643" alt="image" src="https://github.com/user-attachments/assets/2f606495-1bf8-45fc-91a5-fb6eb86be34a" />


---

## Employee Module

<img width="1213" height="645" alt="image" src="https://github.com/user-attachments/assets/4f6d01e3-600a-42ef-84c3-d0a2b913fdac" />


---

## Product Module

<img width="1125" height="615" alt="image" src="https://github.com/user-attachments/assets/a0891759-e64c-4f1b-bc41-dee9da0294a2" />


---

## Inventory Module

<img width="1127" height="623" alt="image" src="https://github.com/user-attachments/assets/05a581b7-ba85-4c8d-9bd0-b728a44e6697" />


---

## Payroll Module

<img width="1167" height="648" alt="image" src="https://github.com/user-attachments/assets/e880d69c-5972-4f40-b3de-eb036a02a74f" />


---

## Reports Module
<img width="1251" height="636" alt="image" src="https://github.com/user-attachments/assets/aea6a07b-4cfe-41ff-9dd0-6c98a553102c" />


---

# 🚧 Project Status

✅ Authentication Module

✅ Dashboard

✅ Department Management

✅ Designation Management

✅ Employee Management

✅ Product Management

🚧 Supplier Module

🚧 Customer Module

🚧 Purchase Module

🚧 Sales Module

🚧 Inventory Module

🚧 Payroll Module

🚧 Reports Module

> This project is currently under active development.

---

# 🚀 Future Enhancements

- Barcode Scanner
- QR Code Billing
- PDF Invoice Generation
- Excel Export
- Email Notifications
- SMS Notifications
- Docker Deployment
- Cloud Deployment
- Microservices Architecture
- Payment Gateway Integration

---

# 💼 Skills Demonstrated

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- REST API Development
- Hibernate
- Spring Data JPA
- React.js
- React Router
- Axios
- Bootstrap
- MySQL
- Git & GitHub
- Clean Architecture
- CRUD Operations
- Exception Handling
- Validation
- Responsive UI Design

---

# 👨‍💻 About the Developer

**Mohammad Alam**

Java Full Stack Developer

### Technical Skills

- Java
- Spring Boot
- Spring Security
- React.js
- MySQL
- Hibernate
- REST APIs
- JWT Authentication
- Bootstrap
- Git
- GitHub

---

# 📬 Contact

**Mohammad Alam**

📧 Email: mdjavadeveloper@gmail.com

🔗 GitHub: https://github.com/MukhtarAlamMd

---

# 📄 License

This project is created for educational, learning, and portfolio purposes.

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Thank you for visiting this repository!
