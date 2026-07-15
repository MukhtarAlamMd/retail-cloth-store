package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.ProductDTO;
import com.clothstore.retail_cloth_store.dto.ReportDto;

import java.util.List;

public interface ReportService {

    ReportDto getDashboardReport();

    ReportDto getProfitLossReport();

    Double getTotalSales();

    Double getTotalRevenue();

    List<ReportDto> getSalesReport();

    List<ReportDto> getSalesByCustomer(Long customerId);

    List<ReportDto> getPurchaseReport();

    List<ReportDto> getPurchaseBySupplier(Long supplierId);

    List<ProductDTO> getInventoryReport();

    List<ReportDto> getLowStockReport();

    List<ReportDto> getCustomerReport();

    List<ReportDto> getSupplierReport();

    List<ReportDto> getEmployeeReport();

    List<ReportDto> getAttendanceReport();

    List<ReportDto> getPayrollReport();

    List<ReportDto> getLeaveReport();

    List<ReportDto> getExpenseReport();


}