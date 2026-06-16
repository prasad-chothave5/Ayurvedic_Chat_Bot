import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const symptomsList = [
  "bloating", "gas", "constipation", "acidity", "headache",
  "fatigue", "anxiety", "insomnia", "joint pain", "dry skin",
  "hair fall", "weight gain", "cough", "cold", "nausea",
  "back pain", "stress", "oily skin", "low energy", "fever"
];

export default function Survey() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggle = (s) => {
    setSelected(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async () => {
    if (selected.length < 2) {
      alert("Please select at least 2 symptoms!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", { symptoms: selected });
      navigate("/results", { state: res.data });
    } catch (err) {
      alert("Error connecting to AI server. Make sure Flask is running!");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">

        <div className="page-header">
          <span className="emoji">🔍</span>
          <h2>Check Your Symptoms</h2>
          <p>Select your symptoms and get personalized Ayurvedic recommendations</p>
        </div>

        {/* Selected count badge */}
        {selected.length > 0 && (
          <div style={{
            background: "linear-gradient(135deg, #A0522D, #8B4513)",
            color: "white", borderRadius: 12, padding: "10px 16px",
            marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontSize: 14 }}>✅ {selected.length} symptom{selected.length > 1 ? "s" : ""} selected</span>
            <button onClick={() => setSelected([])} style={{
              background: "rgba(255,255,255,0.2)", border: "none",
              color: "white", padding: "4px 10px", borderRadius: 8,
              cursor: "pointer", fontSize: 12
            }}>Clear all</button>
          </div>
        )}

        {/* Symptoms Grid */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h4 style={{ color: "#6B3A1F", marginBottom: 16, fontSize: 15 }}>Select all that apply:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {symptomsList.map(s => (
              <button key={s} onClick={() => toggle(s)} style={{
                padding: "8px 18px", borderRadius: 25, border: "1.5px solid",
                borderColor: selected.includes(s) ? "#A0522D" : "#E0C9A6",
                background: selected.includes(s)
                  ? "linear-gradient(135deg, #A0522D, #8B4513)"
                  : "white",
                color: selected.includes(s) ? "white" : "#6B3A1F",
                cursor: "pointer", fontSize: 13, fontWeight: 500,
                transition: "all 0.2s", fontFamily: "'Poppins', sans-serif",
                boxShadow: selected.includes(s) ? "0 4px 12px rgba(160,82,45,0.3)" : "none"
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Selected symptoms */}
        {selected.length > 0 && (
          <div className="card" style={{ marginBottom: 20, background: "#FFFBF5" }}>
            <p style={{ color: "#8B6347", fontSize: 13, marginBottom: 8 }}>Your symptoms:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {selected.map((s, i) => (
                <span key={i} className="tag">{s} ✕</span>
              ))}
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit}
          disabled={loading} style={{ width: "100%", padding: "15px", fontSize: 16 }}>
          {loading ? "⏳ Analyzing with AI..." : "🔍 Get Ayurvedic Recommendation"}
        </button>

        <button onClick={() => navigate("/chat")} style={{
          width: "100%", marginTop: 12, padding: "13px",
          background: "white", color: "#A0522D",
          border: "2px solid #A0522D", borderRadius: 12,
          fontSize: 15, cursor: "pointer", fontWeight: 500,
          fontFamily: "'Poppins', sans-serif", transition: "all 0.2s"
        }}>
          💬 Chat with Ayurvedic AI Instead
        </button>
      </div>
    </div>
  );
}