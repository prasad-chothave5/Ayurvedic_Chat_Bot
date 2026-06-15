import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { path: "/survey", label: "Symptoms", emoji: "🔍" },
  { path: "/dosha", label: "Dosha Quiz", emoji: "🌀" },
  { path: "/bmi", label: "BMI", emoji: "⚖️" },
  { path: "/season", label: "Season Diet", emoji: "🌦️" },
  { path: "/yoga", label: "Yoga", emoji: "🧘" },
  { path: "/tips", label: "Tips", emoji: "💡" },
  { path: "/chat", label: "AI Chat", emoji: "💬" },
  { path: "/report", label: "PDF", emoji: "📥" },
  { path: "/profile", label: "Profile", emoji: "👤" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #F0DFC8",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 20px rgba(160,82,45,0.08)"
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        maxWidth: 1100, margin: "0 auto", padding: "0 1rem"
      }}>

        {/* Logo */}
        <div onClick={() => navigate("/survey")} style={{
          display: "flex", alignItems: "center", gap: 8,
          cursor: "pointer", padding: "12px 0",
          marginRight: 12, flexShrink: 0
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #A0522D, #6B3A1F)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 18,
            boxShadow: "0 4px 12px rgba(160,82,45,0.3)"
          }}>🌿</div>
          <span style={{
            fontSize: 15, fontWeight: 700, color: "#6B3A1F",
            fontFamily: "'Lora', serif", letterSpacing: 0.3
          }}>AyurAI</span>
        </div>

        {/* Links */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: 2, overflowX: "auto", flex: 1,
          scrollbarWidth: "none"
        }}>
          {links.map(l => {
            const active = location.pathname === l.path;
            return (
              <button key={l.path} onClick={() => navigate(l.path)} style={{
                padding: "8px 10px", border: "none",
                background: active ? "#FDF0E4" : "none",
                color: active ? "#A0522D" : "#8B6347",
                fontWeight: active ? 600 : 400,
                fontSize: 12.5, cursor: "pointer",
                whiteSpace: "nowrap", borderRadius: 10,
                transition: "all 0.2s",
                fontFamily: "'Poppins', sans-serif",
                display: "flex", alignItems: "center", gap: 5
              }}>
                <span>{l.emoji}</span>
                <span>{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}