import React, { useEffect, useState } from "react";
import axios from "axios";

const AIInsights = () => {

  const [forecast, setForecast] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios.post("http://localhost:5000/api/forecast/month", { month })
      .then(res => setForecast(res.data))
      .catch(err => console.error("Failed to fetch forecast", err));
  }, [month]);

  const simulateInsight = () => {
    return {
      mostSold: "Kottu",
      leastSold: "String Hoppers",
      priceTip: "Increase price of Fried Rice by 5% due to high demand.",
      wasteTip: "Reduce portion size of Egg Hopper on weekends.",
    };
  };

  const insights = forecast ? simulateInsight() : null;

  return (
    <div className="insights-page">
      <h2>🧠 AI Insights & Recommendations</h2>

      <label>Select Month:
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </label>

      {forecast && insights && (
        <div className="insights-box">
          <div className="card">
            <h4>🔥 Most Sold Item</h4>
            <p>{insights.mostSold}</p>
          </div>
          <div className="card">
            <h4>❄️ Least Sold Item</h4>
            <p>{insights.leastSold}</p>
          </div>
          <div className="card">
            <h4>💰 AI Pricing Suggestion</h4>
            <p>{insights.priceTip}</p>
          </div>
          <div className="card">
            <h4>♻️ Waste Reduction Tip</h4>
            <p>{insights.wasteTip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIInsights