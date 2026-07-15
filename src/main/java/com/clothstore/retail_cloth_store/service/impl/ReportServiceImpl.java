package com.clothstore.retail_cloth_store.service.impl;


import com.clothstore.retail_cloth_store.dto.ProductDTO;
import com.clothstore.retail_cloth_store.dto.ReportDto;
import com.clothstore.retail_cloth_store.entity.Employee;
import com.clothstore.retail_cloth_store.entity.Sale;
import com.clothstore.retail_cloth_store.mapper.EmployeeMapper;
import com.clothstore.retail_cloth_store.repository.*;
import com.clothstore.retail_cloth_store.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final EmployeeMapper employeeMapper;

    private final SaleRepository saleRepository;
    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final ExpenseRepository expenseRepository;
    private final AttendanceRepository attendanceRepository;
    private final PayrollRepository payrollRepository;
    private final LeaveRepository leaveRepository;
    @Override
    public ReportDto getDashboardReport() {

        long employees = employeeRepository.count();

        long products = productRepository.count();

        long customers = customerRepository.count();

        long suppliers = supplierRepository.count();

        long sales = saleRepository.count();

        long purchases = purchaseRepository.count();

        long expenses = expenseRepository.count();

        return ReportDto.builder()

                .reportName("Dashboard Report")

                .totalRecords(
                        employees +
                                products +
                                customers +
                                suppliers +
                                sales +
                                purchases +
                                expenses
                )

                .build();
    }

    @Override
    public Double getTotalRevenue() {

        Double revenue = saleRepository.getTotalRevenue();

        return revenue == null ? 0.0 : revenue;
    }

    @Override
    public Double getTotalSales() {

        Double totalSales = saleRepository.getTotalRevenue();

        return totalSales == null ? 0.0 : totalSales;
    }

    @Override
    public List<ReportDto> getSupplierReport() {

        return supplierRepository.findAll()
                .stream()
                .map(supplier -> ReportDto.builder()

                        .supplierId(supplier.getId())

                        .supplierName(supplier.getSupplierName())

                        .contactPerson(supplier.getContactPerson())

                        .mobile(supplier.getMobile())

                        .email(supplier.getEmail())

                        .gstNumber(supplier.getGstNumber())

                        .city(supplier.getCity())

                        .state(supplier.getState())

                        .address(supplier.getAddress())

                        .totalPurchaseAmount(
                                purchaseRepository
                                        .getTotalPurchaseBySupplier(supplier.getId())
                        )

                        .build())

                .toList();
    }

    @Override
    public List<ReportDto> getCustomerReport() {

        return customerRepository.findAll()
                .stream()
                .map(customer -> ReportDto.builder()

                        .customerId(customer.getId())

                        .firstName(customer.getFirstName())

                        .lastName(customer.getLastName())

                        .customerName(
                                customer.getFirstName() + " " + customer.getLastName()
                        )

                        .mobile(customer.getMobile())

                        .email(customer.getEmail())

                        .city(customer.getCity())

                        .state(customer.getState())

                        .address(customer.getAddress())

                        .build())

                .toList();
    }




    @Override
    public List<ReportDto> getLowStockReport() {

        return productRepository.findAll()
                .stream()

                .filter(product -> product.getStockQuantity() <= 10)

                .map(product -> ReportDto.builder()

                        .productId(product.getId())

                        .productName(product.getName())

                        .stockQuantity(product.getStockQuantity())

                        .build())

                .toList();
    }

    @Override
    public ReportDto getProfitLossReport() {

        Double income = saleRepository.getTotalRevenue();

        Double expense = expenseRepository.getTotalExpense()
                + purchaseRepository.getTotalPurchaseCost();

        if (income == null) {
            income = 0.0;
        }

        if (expense == null) {
            expense = 0.0;
        }

        return ReportDto.builder()

                .reportName("Profit & Loss Report")

                .totalIncome(income)

                .totalExpense(expense)

                .profit(income - expense)

                .build();
    }
    @Override
    public List<ReportDto> getEmployeeReport() {

        return employeeRepository.findAll()
                .stream()
                .map(employee -> ReportDto.builder()

                        .employeeId(employee.getId())

                        .employeeCode(employee.getEmployeeCode())

                        .firstName(employee.getFirstName())

                        .lastName(employee.getLastName())

                        .phone(employee.getPhone())

                        .email(employee.getEmail())

                        .department(employee.getDepartment())

                        .designation(employee.getDesignation())

                        .status(employee.getStatus())

                        .basicSalary(employee.getSalary())

                        .build())

                .toList();
    }
    @Override
    public List<ReportDto> getAttendanceReport() {

        return attendanceRepository.findAll()
                .stream()
                .map(attendance -> {

                    Employee employee = attendance.getEmployee();

                    return ReportDto.builder()

                            .attendanceId(attendance.getId())

                            .attendanceDate(attendance.getAttendanceDate())

                            .attendanceStatus(attendance.getStatus())

                            .checkIn(attendance.getCheckInTime())

                            .checkOut(attendance.getCheckOutTime())

                            .remarks(attendance.getRemarks())

                            .employeeId(employee.getId())

                            .employeeCode(employee.getEmployeeCode())

                            .firstName(employee.getFirstName())

                            .lastName(employee.getLastName())

                            .build();

                })
                .toList();
    }
    @Override
    public List<ReportDto> getExpenseReport() {

        return expenseRepository.findAll()
                .stream()
                .map(expense -> ReportDto.builder()
                        .expenseId(expense.getId())
                        .expenseName(expense.getExpenseName())
                        .expenseCategory(expense.getCategory())
                        .expenseAmount(expense.getAmount())
                        .build())
                .toList();
    }

    @Override
    public List<ReportDto> getPayrollReport() {

        return payrollRepository.findAll()
                .stream()
                .map(payroll -> {

                    Employee employee = payroll.getEmployee();

                    return ReportDto.builder()

                            .payrollId(payroll.getId())

                            .employeeId(employee.getId())

                            .employeeCode(employee.getEmployeeCode())

                            .employeeName(
                                    employee.getFirstName() + " " +
                                            employee.getLastName()
                            )

                            .department(employee.getDepartment())

                            .designation(employee.getDesignation())

                            .month(payroll.getMonth())

                            .year(payroll.getYear())

                            .basicSalary(payroll.getBasicSalary())

                            .bonus(payroll.getBonus())

                            .deduction(payroll.getDeduction())

                            .netSalary(payroll.getNetSalary())

                            .paymentDate(payroll.getPaymentDate())

                            .paymentStatus(payroll.getPaymentStatus())

                            .build();

                })
                .toList();
    }

    @Override
    public List<ReportDto> getLeaveReport() {

        return leaveRepository.findAll()
                .stream()
                .map(leave -> {

                    Employee employee = leave.getEmployee();

                    return ReportDto.builder()

                            .leaveId(leave.getId())

                            .employeeId(employee.getId())

                            .employeeCode(employee.getEmployeeCode())

                            .employeeName(
                                    employee.getFirstName() + " " +
                                            employee.getLastName()
                            )

                            .department(employee.getDepartment())

                            .designation(employee.getDesignation())

                            .leaveType(leave.getLeaveType())

                            .fromDate(leave.getFromDate())

                            .toDate(leave.getToDate())

                            .totalDays(leave.getTotalDays())

                            .reason(leave.getReason())

                            .leaveStatus(leave.getStatus().name())

                            .build();

                })
                .toList();
    }
    @Override
    public List<ReportDto> getSalesReport() {

        return saleRepository.findAll()

                .stream()

                .map(this::convertSaleToReport)

                .toList();

    }

    @Override
    public List<ReportDto> getSalesByCustomer(Long customerId) {

        return saleRepository.findByCustomer_Id(customerId)

                .stream()

                .map(this::convertSaleToReport)

                .toList();

    }

    private ReportDto convertSaleToReport(Sale sale) {

        return ReportDto.builder()

                .saleId(sale.getId())

                .invoiceNumber(sale.getInvoiceNumber())

                .customerName(
                        sale.getCustomer().getFirstName()
                                + " "
                                + sale.getCustomer().getLastName()
                )

                .saleDate(sale.getSaleDate())

                .totalAmount(sale.getGrandTotal())

                .paymentStatus(sale.getPaymentStatus())

                .build();
    }
    public List<ReportDto> getPurchaseReport() {

        return purchaseRepository.findAll()
                .stream()
                .map(purchase -> ReportDto.builder()

                        .purchaseId(purchase.getId())

                        .purchaseDate(
                                purchase.getPurchaseDate().toLocalDate().atStartOfDay()
                        )

                        .supplierName(
                                purchase.getSupplier().getSupplierName()
                        )

                        .totalAmount(
                                purchase.getTotalCost()
                        )

                        .build())

                .toList();
    }


    @Override
    public List<ProductDTO> getInventoryReport() {

        return productRepository.findAll()
                .stream()
                .map(product -> ProductDTO.builder()

                        .id(product.getId())

                        .name(product.getName())

                        .categoryId(product.getCategory().getId())

                        .categoryName(product.getCategory().getName())

                        .size(product.getSize())

                        .color(product.getColor())

                        .price(product.getPrice())

                        .stockQuantity(product.getStockQuantity())

                        .build())

                .toList();
    }
    @Override
    public List<ReportDto> getPurchaseBySupplier(Long supplierId) {

        return purchaseRepository.findBySupplierId(supplierId)
                .stream()
                .map(purchase -> ReportDto.builder()

                        .purchaseId(purchase.getId())

                        .purchaseDate(
                                purchase.getPurchaseDate().toLocalDate().atStartOfDay()
                        )

                        .supplierName(
                                purchase.getSupplier().getSupplierName()
                        )

                        .totalAmount(
                                purchase.getTotalCost()
                        )

                        .build())

                .toList();
    }




}