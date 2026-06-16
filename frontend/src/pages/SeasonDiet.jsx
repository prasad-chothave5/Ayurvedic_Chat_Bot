import React, { useState } from "react";
import Navbar from "../components/Navbar";

const seasons = {
  Summer: {
    emoji: "☀️", dosha: "Pitta", color: "#E74C3C",
    eat: ["Coconut water", "Cucumber", "Watermelon", "Mint", "Coriander", "Pomegranate", "Sweet fruits", "Cold milk"],
    avoid: ["Spicy food", "Alcohol", "Fried food", "Sour food", "Red meat", "Excessive salt"],
    herbs: ["Amla", "Shatavari", "Coriander", "Fennel"],
    tip: "Stay cool, avoid direct sunlight between 12-4pm. Wear light cotton clothes."
  },
  Monsoon: {
    emoji: "🌧️", dosha: "Vata", color: "#3498DB",
    eat: ["Warm soups", "Ginger tea", "Turmeric milk", "Light cooked food", "Honey", "Garlic", "Tulsi tea"],
    avoid: ["Raw salads", "Leafy greens", "Cold drinks", "Street food", "Fermented food", "Dairy excess"],
    herbs: ["Tulsi", "Ginger", "Giloy", "Turmeric"],
    tip: "Immunity is low in monsoon. Drink boiled water and avoid getting wet."
  },
  Winter: {
    emoji: "❄️", dosha: "Kapha", color: "#2980B9",
    eat: ["Sesame", "Jaggery", "Ghee", "Warm soups", "Root vegetables", "Nuts", "Dates", "Ginger"],
    avoid: ["Cold drinks", "Ice cream", "Raw food", "Light salads", "Dairy excess", "Sugar"],
    herbs: ["Ashwagandha", "Shilajit", "Triphala", "Cinnamon"],
    tip: "Exercise more in winter. Oil massage (Abhyanga) with sesame oil keeps body warm."
  },
  Autumn: {
    emoji: "🍂", dosha: "Vata+Pitta", color: "#E67E22",
    eat: ["Sweet potatoes", "Pumpkin", "Warm grains", "Ghee", "Sesame", "Cooked apples", "Warm milk"],
    avoid: ["Cold food", "Raw vegetables", "Beans", "Dry food", "Spicy food"],
    herbs: ["Triphala", "Ashwagandha", "Brahmi", "Licorice"],
    tip: "Transition season — build immunity now. Practice regular sleep schedule."
  }
};

export default function SeasonDiet() {
  const [selected, setSelected] = useState("Summer");
  const s = seasons[selected];

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>
        <h2 style={{ color: "#6B3A1F", marginBottom: 4 }}>🌦️ Season Based Diet</h2>
        <p style={{ color: "#8B6347", marginBottom: 24, fontSize: 14 }}>Get Ayurvedic diet recommendations based on current season</p>

        {/* Season Selector */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {Object.keys(seasons).map(season => (
            <button key={season} onClick={() => setSelected(season)} style={{
              padding: "10px 20px", borderRadius: 20, border: "1px solid",
              borderColor: selected === season ? "#A0522D" : "#E0C9A6",
              background: selected === season ? "#A0522D" : "white",
              color: selected === season ? "white" : "#6B3A1F",
              cursor: "pointer", fontSize: 14, fontWeight: 500
            }}>
              {seasons[season].emoji} {season}
            </button>
          ))}
        </div>

        {/* Dosha Badge */}
        <div className="card" style={{ marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>{s.emoji}</div>
          <h3 style={{ color: "#6B3A1F", margin: "8px 0" }}>{selected} Season</h3>
          <span className="tag">Dominant Dosha: {s.dosha}</span>
          <p style={{ marginTop: 12, fontSize: 14, color: "#6B3A1F", fontStyle: "italic" }}>"{s.tip}"</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div className="card">
            <h4 style={{ color: "#27500A", marginBottom: 10 }}>✅ Eat These</h4>
            {s.eat.map((f, i) => <p key={i} style={{ fontSize: 13, color: "#3B2A1A", lineHeight: 2 }}>• {f}</p>)}
          </div>
          <div className="card">
            <h4 style={{ color: "#993C1D", marginBottom: 10 }}>❌ Avoid These</h4>
            {s.avoid.map((f, i) => <p key={i} style={{ fontSize: 13, color: "#993C1D", lineHeight: 2 }}>• {f}</p>)}
          </div>
        </div>

        <div className="card">
          <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>🌱 Recommended Herbs</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {s.herbs.map((h, i) => (
              <span key={i} style={{ background: "#EAF3DE", color: "#27500A", padding: "4px 12px", borderRadius: 20, fontSize: 13 }}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}