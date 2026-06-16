import React, { useState } from "react";
import Navbar from "../components/Navbar";

const yogaData = {
  Vata: {
    color: "#3498DB",
    poses: [
      { name: "Child's Pose", sanskrit: "Balasana", duration: "5 min", benefit: "Calms nervous system, reduces anxiety" },
      { name: "Mountain Pose", sanskrit: "Tadasana", duration: "3 min", benefit: "Grounding, improves balance and stability" },
      { name: "Seated Forward Bend", sanskrit: "Paschimottanasana", duration: "4 min", benefit: "Stretches spine, calms mind" },
      { name: "Corpse Pose", sanskrit: "Shavasana", duration: "10 min", benefit: "Deep relaxation, reduces stress" },
    ]
  },
  Pitta: {
    color: "#E74C3C",
    poses: [
      { name: "Moon Salutation", sanskrit: "Chandra Namaskar", duration: "10 min", benefit: "Cooling effect, reduces body heat" },
      { name: "Boat Pose", sanskrit: "Navasana", duration: "3 min", benefit: "Strengthens core, improves digestion" },
      { name: "Cobra Pose", sanskrit: "Bhujangasana", duration: "3 min", benefit: "Opens chest, reduces acidity" },
      { name: "Fish Pose", sanskrit: "Matsyasana", duration: "4 min", benefit: "Cools Pitta, opens throat chakra" },
    ]
  },
  Kapha: {
    color: "#27AE60",
    poses: [
      { name: "Sun Salutation", sanskrit: "Surya Namaskar", duration: "15 min", benefit: "Energizes body, burns fat, boosts metabolism" },
      { name: "Warrior Pose", sanskrit: "Virabhadrasana", duration: "5 min", benefit: "Builds strength, increases energy" },
      { name: "Bridge Pose", sanskrit: "Setu Bandha", duration: "4 min", benefit: "Stimulates thyroid, reduces weight" },
      { name: "Camel Pose", sanskrit: "Ustrasana", duration: "3 min", benefit: "Opens chest, energizes body" },
    ]
  }
};

export default function Yoga() {
  const [dosha, setDosha] = useState("Vata");
  const y = yogaData[dosha];

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>
        <h2 style={{ color: "#6B3A1F", marginBottom: 4 }}>🧘 Yoga Recommendations</h2>
        <p style={{ color: "#8B6347", marginBottom: 24, fontSize: 14 }}>Yoga poses based on your Dosha type</p>

        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {["Vata", "Pitta", "Kapha"].map(d => (
            <button key={d} onClick={() => setDosha(d)} style={{
              flex: 1, padding: "10px", borderRadius: 10, border: "1px solid",
              borderColor: dosha === d ? "#A0522D" : "#E0C9A6",
              background: dosha === d ? "#A0522D" : "white",
              color: dosha === d ? "white" : "#6B3A1F",
              cursor: "pointer", fontSize: 14, fontWeight: 500
            }}>{d}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {y.poses.map((pose, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: y.color + "22",
                color: y.color, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0, fontWeight: 600
              }}>{i + 1}</div>
              <div>
                <h4 style={{ color: "#6B3A1F", marginBottom: 2 }}>{pose.name}</h4>
                <p style={{ fontSize: 12, color: "#8B6347", fontStyle: "italic", marginBottom: 4 }}>{pose.sanskrit} • {pose.duration}</p>
                <p style={{ fontSize: 13, color: "#3B2A1A" }}>✅ {pose.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16, background: "#F5E6C8", border: "none" }}>
          <p style={{ fontSize: 14, color: "#6B3A1F", textAlign: "center" }}>
            🌅 Best time to practice: <strong>6:00 AM - 8:00 AM</strong><br/>
            Practice on empty stomach for best results!
          </p>
        </div>
      </div>
    </div>
  );
}