import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReportExport = () => {
  const [forecast, setForecast] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios.post("http://localhost:5000/api/forecast/month", { month })
      .then(res => setForecast(res.data))
      .catch(err => console.error("Failed to fetch forecast", err));
  }, [month]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Forecast Report - Month ${month}`, 14, 15);
    
    autoTable(doc, {
      head: [["Day", "Predicted Sales", "Predicted Waste"]],
      body: forecast.breakdown.map((d) => [
        d.day,
        d.predicted_sales,
        d.predicted_food_waste
      ])
    });

    doc.save(`forecast_report_month_${month}.pdf`);
  };

  const exportToCSV = () => {
    const rows = [
      ["Day", "Predicted Sales", "Predicted Waste"],
      ...forecast.breakdown.map((d) => [
        d.day,
        d.predicted_sales,
        d.predicted_food_waste
      ])
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `forecast_report_month_${month}.csv`;
    link.click();
  };

  return (
    <div className="report-page">
      <h2>📄 Reports & Export</h2>

      <label>Select Month:
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </label>

      {forecast && (
        <>
          <button onClick={exportToPDF}>Export as PDF</button>
          <button onClick={exportToCSV} style={{ marginLeft: "1rem" }}>Export as CSV</button>
        </>
      )}
    </div>
  )
}

export default ReportExport