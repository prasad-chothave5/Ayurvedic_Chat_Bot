import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const saved = useRef(false);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;

    const saveToFirestore = async () => {
      if (!state) return;
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in!");
        return;
      }
      try {
        const docRef = await addDoc(collection(db, "history"), {
          uid: user.uid,
          disease: state.disease || "",
          dosha: state.dosha || "",
          herbs: state.herbs || [],
          diet: state.diet || [],
          avoid: state.avoid || [],
          lifestyle: state.lifestyle || "",
          createdAt: serverTimestamp()
        });
        console.log("Saved successfully! ID:", docRef.id);
      } catch (err) {
        console.error("Save error:", err.message);
      }
    };

    saveToFirestore();
  }, [state]);

  if (!state) {
    navigate("/survey");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h2 style={{ color: "#6B3A1F", fontSize: 22 }}>Your Ayurvedic Report</h2>
          <p style={{ color: "#27AE60", fontSize: 14 }}>✅ Report saved to your profile!</p>
        </div>

        <div className="card" style={{ marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#8B6347" }}>Detected Condition</p>
          <h3 style={{ fontSize: 24, color: "#A0522D", margin: "6px 0" }}>{state.disease}</h3>
          <span className="tag">Dosha: {state.dosha}</span>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>🌱 Recommended Herbs</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(state.herbs || []).map((h, i) => (
              <span key={i} style={{
                background: "#EAF3DE", color: "#27500A",
                padding: "4px 12px", borderRadius: 20, fontSize: 13
              }}>{h}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div className="card">
            <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>🥗 Eat These</h4>
            {(state.diet || []).map((d, i) => (
              <p key={i} style={{ fontSize: 13, color: "#3B2A1A", lineHeight: 2 }}>✅ {d}</p>
            ))}
          </div>
          <div className="card">
            <h4 style={{ color: "#993C1D", marginBottom: 10 }}>❌ Avoid</h4>
            {(state.avoid || []).map((a, i) => (
              <p key={i} style={{ fontSize: 13, color: "#993C1D", lineHeight: 2 }}>✗ {a}</p>
            ))}
          </div>
        </div>

        {state.lifestyle && (
          <div className="card" style={{ marginBottom: 16, background: "#F5E6C8", border: "none" }}>
            <h4 style={{ color: "#6B3A1F", marginBottom: 8 }}>🧘 Lifestyle Tip</h4>
            <p style={{ fontSize: 14, color: "#3B2A1A" }}>💡 {state.lifestyle}</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn-primary" onClick={() => navigate("/survey")} style={{ width: "100%" }}>
            🔄 Check Again
          </button>
          <button onClick={() => navigate("/profile")} style={{
            width: "100%", padding: "12px", background: "white",
            color: "#A0522D", border: "2px solid #A0522D",
            borderRadius: 8, fontSize: 15, cursor: "pointer", fontWeight: 500
          }}>
            👤 View My Profile & History
          </button>
          <button onClick={() => navigate("/chat")} style={{
            width: "100%", padding: "12px", background: "white",
            color: "#6B3A1F", border: "1px solid #E0C9A6",
            borderRadius: 8, fontSize: 15, cursor: "pointer"
          }}>
            💬 Ask AI about this condition
          </button>
        </div>
      </div>
    </div>
  );
}