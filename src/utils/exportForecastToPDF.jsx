import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Register plugin here

export function exportForecastToPDF(forecast) {
  if (!forecast) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Monthly AI Forecast Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Month: ${forecast.month}`, 14, 30);
  doc.text(`Total Sales: Rs. ${forecast.total_sales}`, 14, 38);
  doc.text(`Total Waste: ${forecast.total_food_waste} kg`, 14, 46);
  doc.text(`Average Daily Sales: Rs. ${forecast.avg_daily_sales}`, 14, 54);
  doc.text(`Average Daily Waste: ${forecast.avg_daily_waste} kg`, 14, 62);

  const rows = forecast.breakdown.map((item) => [
    item.day,
    item.predicted_sales,
    item.predicted_food_waste,
    item.recommended_staff,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [["Day", "Sales (Rs)", "Waste (kg)", "Staff"]],
    body: rows,
  });

  doc.save("forecast_report.pdf");
}
