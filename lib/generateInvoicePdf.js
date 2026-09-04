import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { company } from "./siteData";

function formatKES(amount) {
  const n = Number(amount || 0);
  return `KES ${n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

// Generates and downloads a PDF for the given invoice record.
// `invoice` is the row shape returned by the /api/invoices endpoints.
export function downloadInvoicePdf(invoice) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;

  // Header / letterhead
  doc.setFillColor(63, 122, 52); // brand-500
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(company.fullName, marginX, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(company.address, marginX, 58);
  doc.text(`${company.phone}  |  ${company.email}`, marginX, 72);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", pageWidth - marginX, 50, { align: "right" });

  // Invoice meta + bill-to
  doc.setTextColor(20, 35, 26);
  let y = 120;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Bill To", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 16;
  doc.text(invoice.client_name || "—", marginX, y);
  if (invoice.client_phone) {
    y += 14;
    doc.text(invoice.client_phone, marginX, y);
  }
  if (invoice.client_email) {
    y += 14;
    doc.text(invoice.client_email, marginX, y);
  }
  if (invoice.client_address) {
    y += 14;
    doc.text(invoice.client_address, marginX, y);
  }

  const metaX = pageWidth - marginX;
  let metaY = 120;
  const metaRow = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(label, metaX - 140, metaY);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), metaX, metaY, { align: "right" });
    metaY += 16;
  };
  metaRow("Invoice #:", invoice.invoice_number || "—");
  metaRow("Issue Date:", formatDate(invoice.issue_date));
  metaRow("Due Date:", formatDate(invoice.due_date));
  metaRow("Status:", (invoice.status || "draft").toUpperCase());

  // Line items table
  const items = Array.isArray(invoice.items) ? invoice.items : [];
  const tableStartY = Math.max(y, metaY) + 30;

  autoTable(doc, {
    startY: tableStartY,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: items.map((item) => [
      item.description || "—",
      String(item.quantity ?? 0),
      formatKES(item.unitPrice),
      formatKES(Number(item.quantity || 0) * Number(item.unitPrice || 0)),
    ]),
    styles: { font: "helvetica", fontSize: 10, cellPadding: 8 },
    headStyles: { fillColor: [63, 122, 52], textColor: [255, 255, 255] },
    margin: { left: marginX, right: marginX },
  });

  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : tableStartY + 40;

  // Totals
  let totalsY = finalY + 24;
  const totalsX = pageWidth - marginX;
  const totalRow = (label, value, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 12 : 10);
    doc.text(label, totalsX - 160, totalsY);
    doc.text(formatKES(value), totalsX, totalsY, { align: "right" });
    totalsY += bold ? 20 : 16;
  };
  totalRow("Subtotal", invoice.subtotal);
  if (Number(invoice.tax) > 0) totalRow("Tax", invoice.tax);
  totalRow("Total Due", invoice.total, true);

  // Notes
  if (invoice.notes) {
    totalsY += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Notes", marginX, totalsY);
    doc.setFont("helvetica", "normal");
    const noteLines = doc.splitTextToSize(invoice.notes, pageWidth - marginX * 2);
    doc.text(noteLines, marginX, totalsY + 14);
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Thank you for choosing ${company.fullName}. Please send payment confirmation to ${company.email}.`,
    pageWidth / 2,
    pageHeight - 30,
    { align: "center" }
  );

  doc.save(`${invoice.invoice_number || "invoice"}.pdf`);
}
