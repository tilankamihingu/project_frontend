import React from 'react'

const AITips = ({ forecast }) => {
    if (!forecast || !forecast.breakdown) return null;

    const tips = [];

    // 🔍 Tip 1: High sales spike
    const highSalesDays = forecast.breakdown.filter(day => day.predicted_sales > 115000);
    if (highSalesDays.length >= 5) {
        tips.push("📈 Multiple high-sales days detected. Consider increasing staff and inventory on peak days.");
    }

    // 🔍 Tip 2: High waste alert
    const highWasteDays = forecast.breakdown.filter(day => day.predicted_food_waste > 8);
    if (highWasteDays.length >= 5) {
        tips.push("🗑️ Consistent food waste detected. Review portion sizes or prepare less of low-demand items.");
    }

    // 🔍 Tip 3: Understaffed warning (based on logic)
    const underStaffed = forecast.breakdown.filter(d => d.recommended_staff <= 10 && d.predicted_sales > 100000);
    if (underStaffed.length > 3) {
        tips.push("👨‍🍳 Forecast shows high demand with low staff. Consider scheduling more workers.");
    }

    // 🧠 Fallback
    if (tips.length === 0) {
        tips.push("✅ Forecast looks optimal. No immediate actions required.");
    }
  return (
    <div style={{ marginTop: "2rem", background: "#fffbe6", padding: "1rem", borderRadius: "10px" }}>
      <h3>💡 AI Suggestions</h3>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}

export default AITips