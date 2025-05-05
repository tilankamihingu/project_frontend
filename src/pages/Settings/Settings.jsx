import React, { useState } from "react";
// import "./Settings.css";

const Settings = () => {
  const [targetWaste, setTargetWaste] = useState(5); // %
  const [pricingStrategy, setPricingStrategy] = useState("conservative");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const handleSave = () => {
    alert("✅ Settings saved! (In a real app this would be stored in DB)");
  };

  return (
    <div className="settings-page">
      <h2>⚙️ Settings & Configuration</h2>

      <div className="setting">
        <label>♻️ Target Food Waste (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={targetWaste}
          onChange={(e) => setTargetWaste(Number(e.target.value))}
        />
      </div>

      <div className="setting">
        <label>💰 Pricing Strategy</label>
        <select
          value={pricingStrategy}
          onChange={(e) => setPricingStrategy(e.target.value)}
        >
          <option value="conservative">Conservative</option>
          <option value="aggressive">Aggressive</option>
          <option value="balanced">Balanced</option>
        </select>
      </div>

      <div className="setting">
        <label>🔔 Enable Alerts</label>
        <input
          type="checkbox"
          checked={alertsEnabled}
          onChange={() => setAlertsEnabled(!alertsEnabled)}
        />
      </div>

      <button onClick={handleSave}>Save Settings</button>
    </div>
  )
}

export default Settings