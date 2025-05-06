import React, { useEffect, useState } from "react";
import axios from "axios";

const AIInsights = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    // 1. Fetch real forecast for selected month
    axios.post("http://localhost:5001/api/forecast/month", { month })
      .then(res => setForecast(res.data))
      .catch(err => console.error("Failed to fetch forecast", err));

    // 2. Fetch smart suggestions based on same month
    axios.post("http://localhost:5001/api/smart-suggestions", { month })
      .then(res => setSuggestions(res.data))
      .catch(err => console.error("Smart suggestions error", err));
  }, [month]);

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

      {forecast && forecast.forecast && (
        <div className="card">
          <h4>📊 Forecast Summary for Month {month}</h4>
          <ul>
            {forecast.forecast.map((item, i) => (
              <li key={i}>
                {item.dish}: {item.total_sold} sold, {item.total_waste} waste
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions && (
        <div className="insights-box">
          <div className="card">
            <h4>🌟 Trending Items</h4>
            <ul>
              {suggestions.trending_items.length > 0 ? (
                suggestions.trending_items.map((item, i) => <li key={i}>{item}</li>)
              ) : <li>None this month</li>}
            </ul>
          </div>

          <div className="card">
            <h4>⚠️ Underperforming Items</h4>
            <ul>
              {suggestions.underperforming_items.length > 0 ? (
                suggestions.underperforming_items.map((item, i) => <li key={i}>{item}</li>)
              ) : <li>All dishes performed well</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
