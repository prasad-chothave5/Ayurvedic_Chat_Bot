import React, { useState } from "react";
import Navbar from "../components/Navbar";

const questions = [
  {
    question: "What is your body frame?",
    options: [
      { text: "Thin, light, hard to gain weight", dosha: "Vata" },
      { text: "Medium, muscular, athletic build", dosha: "Pitta" },
      { text: "Large, heavy, gain weight easily", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your skin type?",
    options: [
      { text: "Dry, rough, thin, cool to touch", dosha: "Vata" },
      { text: "Oily, sensitive, warm, prone to acne", dosha: "Pitta" },
      { text: "Thick, smooth, oily, cool and pale", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your hair?",
    options: [
      { text: "Dry, frizzy, thin, breaks easily", dosha: "Vata" },
      { text: "Fine, oily, early greying or hair loss", dosha: "Pitta" },
      { text: "Thick, oily, wavy, lustrous", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your appetite?",
    options: [
      { text: "Irregular, variable, forget to eat", dosha: "Vata" },
      { text: "Strong, get angry if meals are delayed", dosha: "Pitta" },
      { text: "Steady, can skip meals easily", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your digestion?",
    options: [
      { text: "Irregular, gas, bloating, constipation", dosha: "Vata" },
      { text: "Strong, acidity, loose stools sometimes", dosha: "Pitta" },
      { text: "Slow but steady, rarely upset", dosha: "Kapha" }
    ]
  },
  {
    question: "How do you sleep?",
    options: [
      { text: "Light sleeper, wake up easily, insomnia", dosha: "Vata" },
      { text: "Moderate sleep, wake up hot or thirsty", dosha: "Pitta" },
      { text: "Deep heavy sleeper, hard to wake up", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your mind and memory?",
    options: [
      { text: "Learn fast, forget fast, creative", dosha: "Vata" },
      { text: "Sharp, focused, good memory, logical", dosha: "Pitta" },
      { text: "Slow to learn but never forgets", dosha: "Kapha" }
    ]
  },
  {
    question: "How do you handle stress?",
    options: [
      { text: "Anxious, worried, nervous, overthink", dosha: "Vata" },
      { text: "Angry, irritable, critical, judgmental", dosha: "Pitta" },
      { text: "Withdrawn, depressed, comfort eating", dosha: "Kapha" }
    ]
  },
  {
    question: "What is your energy level?",
    options: [
      { text: "Bursts of energy then exhausted", dosha: "Vata" },
      { text: "Moderate steady energy all day", dosha: "Pitta" },
      { text: "Slow to start but good stamina", dosha: "Kapha" }
    ]
  },
  {
    question: "How is your body temperature?",
    options: [
      { text: "Always feel cold, love warm weather", dosha: "Vata" },
      { text: "Feel hot, sweat easily, hate heat", dosha: "Pitta" },
      { text: "Comfortable in most temperatures", dosha: "Kapha" }
    ]
  }
];

const doshaInfo = {
  Vata: {
    color: "#3498DB",
    emoji: "🌬️",
    element: "Air + Space",
    qualities: "Creative, Quick, Enthusiastic, Changeable",
    strengths: ["Creative and artistic", "Quick learner", "Enthusiastic and energetic", "Adaptable to change"],
    challenges: ["Anxiety and worry", "Irregular digestion", "Insomnia", "Fatigue from overactivity"],
    diet: ["Warm, cooked, oily foods", "Sweet, sour, salty tastes", "Warm milk with spices", "Rice, wheat, dairy"],
    avoid: ["Cold, dry, raw foods", "Bitter and astringent tastes", "Beans and lentils", "Cold drinks"],
    herbs: ["Ashwagandha", "Brahmi", "Triphala", "Shatavari", "Sesame"],
    routine: "Sleep by 10 PM, oil massage daily, meditation, gentle yoga"
  },
  Pitta: {
    color: "#E74C3C",
    emoji: "🔥",
    element: "Fire + Water",
    qualities: "Intelligent, Sharp, Ambitious, Focused",
    strengths: ["Sharp intellect", "Natural leader", "Strong digestion", "Goal-oriented"],
    challenges: ["Anger and irritability", "Skin inflammation", "Perfectionism", "Overheating"],
    diet: ["Cool, refreshing foods", "Sweet, bitter, astringent tastes", "Coconut water, cucumber", "Milk, ghee, sweet fruits"],
    avoid: ["Spicy, oily, fried foods", "Alcohol and caffeine", "Sour and salty excess", "Red meat"],
    herbs: ["Amla", "Shatavari", "Brahmi", "Neem", "Coriander"],
    routine: "Exercise in cool morning, meditation, avoid midday sun, bedtime by 10 PM"
  },
  Kapha: {
    color: "#27AE60",
    emoji: "🌊",
    element: "Earth + Water",
    qualities: "Calm, Stable, Loyal, Nurturing",
    strengths: ["Calm and stable nature", "Strong immunity", "Good stamina", "Loyal and caring"],
    challenges: ["Weight gain", "Sluggish metabolism", "Depression", "Attachment and possessiveness"],
    diet: ["Light, warm, spicy foods", "Pungent, bitter, astringent tastes", "Ginger tea, honey", "Light grains, vegetables"],
    avoid: ["Heavy, oily, cold foods", "Sweet, sour, salty excess", "Dairy and sweets", "Cold drinks"],
    herbs: ["Guggul", "Trikatu", "Turmeric", "Ginger", "Triphala"],
    routine: "Wake up early (5-6 AM), vigorous exercise, stay active, avoid daytime naps"
  }
};

export default function DoshaQuiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ Vata: 0, Pitta: 0, Kapha: 0 });
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (dosha) => {
    setSelected(dosha);
    setTimeout(() => {
      const newScores = { ...scores, [dosha]: scores[dosha] + 1 };
      setScores(newScores);

      if (current + 1 >= questions.length) {
        const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
        setResult({ dosha: winner, scores: newScores });
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 400);
  };

  const reset = () => {
    setCurrent(0);
    setScores({ Vata: 0, Pitta: 0, Kapha: 0 });
    setResult(null);
    setSelected(null);
  };

  const progress = ((current) / questions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "2rem 1rem" }}>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48 }}>🌀</div>
          <h2 style={{ color: "#6B3A1F", fontSize: 22 }}>Discover Your Dosha</h2>
          <p style={{ color: "#8B6347", fontSize: 14 }}>Answer 10 questions to find your Ayurvedic body type</p>
        </div>

        {!result ? (
          <>
            {/* Progress Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#8B6347" }}>Question {current + 1} of {questions.length}</span>
                <span style={{ fontSize: 13, color: "#A0522D", fontWeight: 600 }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ background: "#F5E6C8", borderRadius: 20, height: 8 }}>
                <div style={{ width: progress + "%", height: "100%", background: "#A0522D", borderRadius: 20, transition: "width 0.4s" }} />
              </div>
            </div>

            {/* Question */}
            <div className="card" style={{ marginBottom: 20, textAlign: "center" }}>
              <h3 style={{ color: "#6B3A1F", fontSize: 18, lineHeight: 1.5 }}>
                {questions[current].question}
              </h3>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {questions[current].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.dosha)} style={{
                  padding: "14px 18px", borderRadius: 12, border: "1.5px solid",
                  borderColor: selected === opt.dosha ? "#A0522D" : "#E0C9A6",
                  background: selected === opt.dosha ? "#A0522D" : "white",
                  color: selected === opt.dosha ? "white" : "#3B2A1A",
                  cursor: "pointer", fontSize: 14, textAlign: "left",
                  transition: "all 0.2s", lineHeight: 1.5
                }}>
                  {["A", "B", "C"][i]}. {opt.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Result */}
            <div style={{
              background: `linear-gradient(135deg, ${doshaInfo[result.dosha].color}, ${doshaInfo[result.dosha].color}99)`,
              borderRadius: 16, padding: "1.5rem", textAlign: "center",
              marginBottom: 20, color: "white"
            }}>
              <div style={{ fontSize: 56 }}>{doshaInfo[result.dosha].emoji}</div>
              <h2 style={{ fontSize: 28, margin: "8px 0" }}>You are {result.dosha}!</h2>
              <p style={{ fontSize: 14, opacity: 0.9 }}>Element: {doshaInfo[result.dosha].element}</p>
              <p style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>{doshaInfo[result.dosha].qualities}</p>
            </div>

            {/* Score Breakdown */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h4 style={{ color: "#6B3A1F", marginBottom: 12 }}>📊 Your Score Breakdown</h4>
              {Object.entries(result.scores).map(([dosha, score]) => {
                const pct = Math.round((score / questions.length) * 100);
                const color = dosha === "Vata" ? "#3498DB" : dosha === "Pitta" ? "#E74C3C" : "#27AE60";
                return (
                  <div key={dosha} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#6B3A1F", fontWeight: dosha === result.dosha ? 600 : 400 }}>
                        {dosha === result.dosha ? "👑 " : ""}{dosha}
                      </span>
                      <span style={{ fontSize: 13, color: "#8B6347" }}>{score}/{questions.length} ({pct}%)</span>
                    </div>
                    <div style={{ background: "#F5E6C8", borderRadius: 20, height: 8 }}>
                      <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 20 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strengths */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>💪 Your Strengths</h4>
              {doshaInfo[result.dosha].strengths.map((s, i) => (
                <p key={i} style={{ fontSize: 13, color: "#3B2A1A", lineHeight: 2 }}>✅ {s}</p>
              ))}
            </div>

            {/* Challenges */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h4 style={{ color: "#993C1D", marginBottom: 10 }}>⚠️ Watch Out For</h4>
              {doshaInfo[result.dosha].challenges.map((c, i) => (
                <p key={i} style={{ fontSize: 13, color: "#993C1D", lineHeight: 2 }}>⚡ {c}</p>
              ))}
            </div>

            {/* Diet */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div className="card">
                <h4 style={{ color: "#27500A", marginBottom: 10 }}>🥗 Best Foods</h4>
                {doshaInfo[result.dosha].diet.map((d, i) => (
                  <p key={i} style={{ fontSize: 12, color: "#3B2A1A", lineHeight: 2 }}>✅ {d}</p>
                ))}
              </div>
              <div className="card">
                <h4 style={{ color: "#993C1D", marginBottom: 10 }}>❌ Avoid</h4>
                {doshaInfo[result.dosha].avoid.map((a, i) => (
                  <p key={i} style={{ fontSize: 12, color: "#993C1D", lineHeight: 2 }}>✗ {a}</p>
                ))}
              </div>
            </div>

            {/* Herbs */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>🌱 Best Herbs for You</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {doshaInfo[result.dosha].herbs.map((h, i) => (
                  <span key={i} style={{
                    background: "#EAF3DE", color: "#27500A",
                    padding: "4px 12px", borderRadius: 20, fontSize: 13
                  }}>{h}</span>
                ))}
              </div>
            </div>

            {/* Routine */}
            <div className="card" style={{ marginBottom: 20, background: "#F5E6C8", border: "none" }}>
              <h4 style={{ color: "#6B3A1F", marginBottom: 8 }}>🧘 Daily Routine for You</h4>
              <p style={{ fontSize: 14, color: "#3B2A1A", lineHeight: 1.7 }}>
                💡 {doshaInfo[result.dosha].routine}
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn-primary" onClick={reset} style={{ width: "100%" }}>
                🔄 Retake Quiz
              </button>
              <button onClick={() => window.location.href = "/survey"} style={{
                width: "100%", padding: "12px", background: "white",
                color: "#A0522D", border: "2px solid #A0522D",
                borderRadius: 8, fontSize: 15, cursor: "pointer"
              }}>
                🔍 Check Symptoms Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}