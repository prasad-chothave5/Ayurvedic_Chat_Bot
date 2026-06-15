import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/survey");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6EC 0%, #F5E0C0 50%, #EDD5A3 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", position: "relative", overflow: "hidden"
    }}>

      {/* Decorative Circles */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: "rgba(160,82,45,0.08)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -120, left: -120, width: 450, height: 450, borderRadius: "50%", background: "rgba(160,82,45,0.06)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "40%", left: -80, width: 250, height: 250, borderRadius: "50%", background: "rgba(107,142,35,0.06)", zIndex: 0 }} />

      {/* Main Card */}
      <div style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        borderRadius: 28, padding: "3rem 2.5rem",
        maxWidth: 440, width: "100%",
        boxShadow: "0 20px 60px rgba(160,82,45,0.18)",
        border: "1px solid rgba(245,230,200,0.9)",
        position: "relative", zIndex: 1
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            margin: "0 auto 16px",
            background: "linear-gradient(135deg, #A0522D, #6B3A1F)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, boxShadow: "0 10px 30px rgba(160,82,45,0.35)"
          }}>🌿</div>
          <h1 style={{
            fontFamily: "'Lora', serif", fontSize: 26,
            fontWeight: 600, color: "#6B3A1F", marginBottom: 8
          }}>
            Ayurvedic Health System
          </h1>
          <p style={{ color: "#8B6347", fontSize: 14, lineHeight: 1.7 }}>
            Ancient wisdom meets modern AI for<br />personalized wellness guidance
          </p>
        </div>

        {/* Features List */}
        <div style={{
          background: "#FFFBF5", borderRadius: 16,
          padding: "1rem 1.2rem", marginBottom: "1.8rem",
          border: "1px solid #F5E6C8"
        }}>
          {[
            { emoji: "🔍", text: "AI-powered symptom analysis" },
            { emoji: "🌱", text: "Personalized herbal remedies" },
            { emoji: "🥗", text: "Custom diet & lifestyle tips" },
            { emoji: "📊", text: "Track your health history" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center",
              gap: 12, padding: "8px 0",
              borderBottom: i < 3 ? "1px solid #F5E6C8" : "none"
            }}>
              <span style={{ fontSize: 20 }}>{f.emoji}</span>
              <p style={{ fontSize: 13, color: "#5A3A1A", fontWeight: 400 }}>{f.text}</p>
            </div>
          ))}
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} disabled={loading} style={{
          width: "100%", padding: "15px", borderRadius: 14,
          background: loading
            ? "#C49A6C"
            : "linear-gradient(135deg, #A0522D, #8B4513)",
          color: "white", border: "none", fontSize: 16,
          fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Poppins', sans-serif",
          boxShadow: "0 6px 20px rgba(160,82,45,0.35)",
          transition: "all 0.3s",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 10
        }}>
          {loading ? "⏳ Signing in..." : "🔐  Continue with Google"}
        </button>

        <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#B08060" }}>
          🔒 Secure • Private • Free to use
        </p>
      </div>
    </div>
  );
}