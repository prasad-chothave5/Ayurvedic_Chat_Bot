import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const tips = [
  { time: "5:00 AM", emoji: "🌅", title: "Wake Up Early", tip: "Ayurveda recommends waking up before sunrise (Brahma Muhurta). This time is ideal for meditation and yoga.", dosha: "All" },
  { time: "6:00 AM", emoji: "💧", title: "Drink Warm Water", tip: "Start your day with 2 glasses of warm water. Add lemon and honey for detox. This activates digestive system.", dosha: "All" },
  { time: "6:30 AM", emoji: "🧘", title: "Practice Yoga", tip: "30 minutes of yoga and pranayama boosts immunity, reduces stress and balances all three Doshas.", dosha: "All" },
  { time: "7:00 AM", emoji: "🛢️", title: "Oil Pulling", tip: "Swish 1 tablespoon of sesame or coconut oil in mouth for 10-15 minutes. Removes toxins and improves oral health.", dosha: "Vata" },
  { time: "8:00 AM", emoji: "🍳", title: "Eat Breakfast", tip: "Have a warm, nourishing breakfast. Avoid cold cereals. Prefer cooked oats, upma, or poha with ghee.", dosha: "All" },
  { time: "12:00 PM", emoji: "☀️", title: "Biggest Meal at Noon", tip: "Digestion is strongest at noon. Have your largest meal between 12-1 PM when Pitta (fire) is highest.", dosha: "Pitta" },
  { time: "3:00 PM", emoji: "🌿", title: "Herbal Tea", tip: "Have a cup of ginger-tulsi-honey tea. Avoid coffee and sugar. This boosts afternoon energy naturally.", dosha: "All" },
  { time: "6:00 PM", emoji: "🚶", title: "Evening Walk", tip: "A 20-minute walk after sunset helps digest dinner and reduces Kapha. Reduces blood sugar naturally.", dosha: "Kapha" },
  { time: "7:00 PM", emoji: "🍲", title: "Light Dinner", tip: "Eat light dinner before 7 PM. Avoid heavy, oily food at night. Soup or khichdi is ideal.", dosha: "All" },
  { time: "9:00 PM", emoji: "📵", title: "Digital Detox", tip: "Stop using phone/screens by 9 PM. Blue light disturbs sleep hormones. Read a book instead.", dosha: "Vata" },
  { time: "10:00 PM", emoji: "🌙", title: "Sleep Early", tip: "Ayurveda recommends sleeping by 10 PM. Massage feet with sesame oil for better sleep and stress relief.", dosha: "All" },
];

export default function WellnessTips() {
  const [todayTip, setTodayTip] = useState(0);

  useEffect(() => {
    const day = new Date().getDate();
    setTodayTip(day % tips.length);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>
        <h2 style={{ color: "#6B3A1F", marginBottom: 4 }}>💡 Daily Wellness Tips</h2>
        <p style={{ color: "#8B6347", marginBottom: 24, fontSize: 14 }}>Ayurvedic daily routine (Dinacharya) for perfect health</p>

        {/* Today's Tip */}
        <div style={{ background: "linear-gradient(135deg, #A0522D, #6B3A1F)", borderRadius: 16, padding: "1.5rem", marginBottom: 24, color: "white" }}>
          <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>⭐ TODAY'S TIP</p>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{tips[todayTip].emoji}</div>
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>{tips[todayTip].title}</h3>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6 }}>{tips[todayTip].tip}</p>
          <span style={{ marginTop: 12, display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>
            🕐 {tips[todayTip].time}
          </span>
        </div>

        {/* All Tips */}
        <h3 style={{ color: "#6B3A1F", marginBottom: 16 }}>📅 Complete Daily Routine</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tips.map((t, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px" }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{t.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <h4 style={{ color: "#6B3A1F", fontSize: 14 }}>{t.title}</h4>
                  <span style={{ fontSize: 11, color: "#8B6347" }}>{t.time}</span>
                </div>
                <p style={{ fontSize: 13, color: "#5A3A1A", lineHeight: 1.5 }}>{t.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}