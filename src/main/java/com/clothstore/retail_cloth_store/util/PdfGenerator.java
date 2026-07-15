package com.clothstore.retail_cloth_store.util;

import com.clothstore.retail_cloth_store.dto.InvoiceDto;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class PdfGenerator {

    public static ByteArrayInputStream invoicePdf(
            InvoiceDto invoice) {

        Document document = new Document();

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            document.add(
                    new Paragraph(
                            "XYZ RETAIL CLOTH STORE"));

            document.add(new Paragraph(" "));

            document.add(
                    new Paragraph(
                            "Invoice No : "
                                    + invoice.getInvoiceNumber()));

            document.add(
                    new Paragraph(
                            "Date : "
                                    + invoice.getInvoiceDate()));

            document.add(
                    new Paragraph(
                            "Customer : "
                                    + invoice.getCustomerName()));

            document.add(
                    new Paragraph(
                            "Mobile : "
                                    + invoice.getCustomerMobile()));

            document.add(new Paragraph(" "));

            document.add(
                    new Paragraph(
                            "Product : "
                                    + invoice.getProductName()));

            document.add(
                    new Paragraph(
                            "Quantity : "
                                    + invoice.getQuantity()));

            document.add(
                    new Paragraph(
                            "Price : ₹"
                                    + invoice.getUnitPrice()));

            document.add(new Paragraph(" "));

            document.add(
                    new Paragraph(
                            "Subtotal : ₹"
                                    + invoice.getSubtotal()));

            document.add(
                    new Paragraph(
                            "Discount : ₹"
                                    + invoice.getDiscount()));

            document.add(
                    new Paragraph(
                            "GST : ₹"
                                    + invoice.getGst()));

            document.add(
                    new Paragraph(
                            "Grand Total : ₹"
                                    + invoice.getGrandTotal()));

            document.add(new Paragraph(" "));

            document.add(
                    new Paragraph(
                            "Thank You"));

            document.add(
                    new Paragraph(
                            "Visit Again"));

            document.close();

        }

        catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(
                out.toByteArray());
    }

}