import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

const SalesPrediction = () => {
  const [fileName, setFileName] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const EXPECTED_FIELDS = [
    "staff_count", "inventory_level",
    "kottu_sold", "kottu_waste",
    "rice_and_curry_sold", "rice_and_curry_waste",
    "string_hoppers_sold", "string_hoppers_waste",
    "fried_rice_sold", "fried_rice_waste",
    "egg_hopper_sold", "egg_hopper_waste",
    "month", "day_of_week"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const raw = results.data;

        // Validate column headers
        const keys = Object.keys(raw[0]);
        const missing = EXPECTED_FIELDS.filter(field => !keys.includes(field));
        if (missing.length > 0) {
          setError("Missing required columns: " + missing.join(", "));
          setLoading(false);
          return;
        }

        try {
          const predictions = await Promise.all(
            raw.map(async (row) => {
              const features = EXPECTED_FIELDS.map(f => Number(row[f]));
              const response = await axios.post("http://localhost:5001/predict", { features });
              return {
                ...row,
                predicted_sales: response.data.predicted_sales,
                predicted_food_waste: response.data.predicted_food_waste
              };
            })
          );
          setParsedData(raw);
          setPredictedData(predictions);
        } catch (err) {
          setError("Prediction failed: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="sales-prediction-page">
      {/* <div>Upload a CSV file containing your restaurant's daily operational data (e.g., staff count, food items sold, inventory, etc.).
          Our AI model will analyze each row and predict:

          📈 Expected sales revenue

          🗑️ Estimated food waste

          This helps you forecast outcomes for future days, simulate special event periods (e.g., December), and improve planning to reduce waste and boost profits.

          ⚠️ Your CSV file must include 14 specific columns — see format below or download a sample.</div> */}
          <div className="sales-prediction-description">
  <h2>📄 Sales Prediction via CSV</h2>
  <p>
    Upload a <strong>CSV file</strong> containing your <em>planned or simulated restaurant data</em> for future days.
    This AI tool will analyze each row and predict:
    <ul>
      <li>📈 <strong>Expected Sales</strong> – How much you’re likely to sell</li>
      <li>🗑️ <strong>Predicted Food Waste</strong> – How much food may be wasted</li>
    </ul>
    You can use this to:
    <ul>
      <li>✅ Plan for holidays, busy seasons (e.g. Christmas)</li>
      <li>✅ Decide staffing, inventory, and food prep levels</li>
      <li>✅ Simulate different “what-if” scenarios</li>
    </ul>
  </p>
  <p>
    ⚠️ <strong>Your CSV file must include exactly 14 columns</strong>: 
    <code>staff_count, inventory_level, kottu_sold, kottu_waste, rice_and_curry_sold, rice_and_curry_waste, string_hoppers_sold, string_hoppers_waste, fried_rice_sold, fried_rice_waste, egg_hopper_sold, egg_hopper_waste, month, day_of_week</code>
  </p>
  <p>
    📥 Download a <a href="/sample.csv" download>sample CSV file</a> to test this feature easily.
  </p>
</div>


      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {fileName && <p>📁 Uploaded: {fileName}</p>}

      {loading && <p>⏳ Generating predictions...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {predictedData.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>📊 Preview First 5 Rows with Predictions</h4>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                {Object.keys(predictedData[0]).map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {predictedData.slice(0, 5).map((row, rowIndex) => (
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
  );
};

export default SalesPrediction;
