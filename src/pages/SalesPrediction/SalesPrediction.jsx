import React, { useState } from "react";
import Papa from "papaparse";
// import "./SalesPrediction.css";

const SalesPrediction = () => {
  const [fileName, setFileName] = useState(null);
  const [parsedData, setParsedData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);
        setParsedData(results.data);
      }
    });
  };
  return (
    <div className="sales-prediction-page">
      <h2>📈 Sales Prediction via CSV</h2>

      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {fileName && <p>📁 Uploaded: {fileName}</p>}

      {parsedData.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>📊 Preview First 5 Rows</h4>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                {Object.keys(parsedData[0]).map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((val, cellIndex) => (
                    <td key={cellIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SalesPrediction