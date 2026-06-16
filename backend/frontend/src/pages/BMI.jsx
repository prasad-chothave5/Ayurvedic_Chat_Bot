import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = (w / (h * h)).toFixed(1);
    let category = "", dosha = "", color = "", tips = [];

    if (bmi < 18.5) {
      category = "Underweight"; color = "#E67E22"; dosha = "Vata Imbalance";
      tips = ["Eat calorie-rich foods like ghee, nuts, dates", "Have warm milk with ashwagandha daily", "Avoid skipping meals", "Do gentle yoga like child's pose"];
    } else if (bmi < 25) {
      category = "Normal Weight"; color = "#27AE60"; dosha = "Balanced Dosha";
      tips = ["Maintain your current diet", "Continue regular exercise", "Seasonal diet changes recommended", "Practice pranayama daily"];
    } else if (bmi < 30) {
      category = "Overweight"; color = "#E67E22"; dosha = "Kapha Imbalance";
      tips = ["Drink warm water with lemon in morning", "Avoid dairy and fried food", "Try Guggul and Triphala herbs", "Walk 30 minutes daily"];
    } else {
      category = "Obese"; color = "#E74C3C"; dosha = "Kapha Imbalance";
      tips = ["Consult an Ayurvedic doctor", "Start with light diet — soups and salads", "Avoid sugar and processed food", "Practice Surya Namaskar daily"];
    }
    setResult({ bmi, category, dosha, color, tips });
  };

  const getScore = (bmi) => {
    if (bmi >= 18.5 && bmi < 25) return 100;
    if (bmi >= 25 && bmi < 30) return 60;
    if (bmi < 18.5) return 50;
    return 30;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem 1rem" }}>
        <h2 style={{ color: "#6B3A1F", marginBottom: 4 }}>⚖️ BMI Calculator</h2>
        <p style={{ color: "#8B6347", marginBottom: 24, fontSize: 14 }}>Calculate your BMI and get Ayurvedic health score</p>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: "#6B3A1F", fontWeight: 500 }}>Weight (kg)</label>
            <input value={weight} onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 65" type="number"
              style={{ width: "100%", padding: "10px 14px", marginTop: 6, borderRadius: 8, border: "1px solid #E0C9A6", fontSize: 15, background: "#FDF6EC" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: "#6B3A1F", fontWeight: 500 }}>Height (cm)</label>
            <input value={height} onChange={e => setHeight(e.target.value)}
              placeholder="e.g. 170" type="number"
              style={{ width: "100%", padding: "10px 14px", marginTop: 6, borderRadius: 8, border: "1px solid #E0C9A6", fontSize: 15, background: "#FDF6EC" }} />
          </div>
          <button className="btn-primary" onClick={calculate} style={{ width: "100%" }}>
            Calculate BMI & Health Score
          </button>
        </div>

        {result && (
          <>
            <div className="card" style={{ marginBottom: 16, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#8B6347" }}>Your BMI</p>
              <h2 style={{ fontSize: 48, color: result.color, margin: "8px 0" }}>{result.bmi}</h2>
              <span className="tag" style={{ background: result.color + "22", color: result.color }}>{result.category}</span>
              <p style={{ marginTop: 12, fontSize: 14, color: "#6B3A1F" }}>Dosha: <strong>{result.dosha}</strong></p>

              {/* Health Score Bar */}
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, color: "#8B6347", marginBottom: 6 }}>Health Score</p>
                <div style={{ background: "#F5E6C8", borderRadius: 20, height: 12, overflow: "hidden" }}>
                  <div style={{ width: getScore(result.bmi) + "%", height: "100%", background: result.color, borderRadius: 20, transition: "width 1s" }} />
                </div>
                <p style={{ fontSize: 18, fontWeight: 600, color: result.color, marginTop: 6 }}>{getScore(result.bmi)}/100</p>
              </div>
            </div>

            <div className="card">
              <h4 style={{ color: "#6B3A1F", marginBottom: 12 }}>🌿 Ayurvedic Recommendations</h4>
              {result.tips.map((t, i) => (
                <p key={i} style={{ fontSize: 14, color: "#3B2A1A", lineHeight: 2 }}>✅ {t}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}