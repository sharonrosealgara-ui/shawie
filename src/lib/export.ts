import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToCSV(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const value = String(row[h] ?? "");
          return value.includes(",") || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(",")
    ),
  ];
  downloadBlob(new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" }), `${filename}.csv`);
}

export function exportToExcel(filename: string, sheetName: string, rows: Record<string, unknown>[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToPDF(title: string, columns: string[], rows: (string | number)[][]) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 14, 18);
  doc.setFontSize(10);
  doc.text(new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }), 14, 25);
  autoTable(doc, {
    startY: 32,
    head: [columns],
    body: rows,
    headStyles: { fillColor: [85, 66, 199] },
    styles: { fontSize: 9 },
  });
  doc.save(`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
