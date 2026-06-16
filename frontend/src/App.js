import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import BMI from "./pages/BMI";
import SeasonDiet from "./pages/SeasonDiet";
import Yoga from "./pages/Yoga";
import WellnessTips from "./pages/WellnessTips";
import PDFReport from "./pages/PDFReport";
import DoshaQuiz from "./pages/DoshaQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/season" element={<SeasonDiet />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/tips" element={<WellnessTips />} />
        <Route path="/report" element={<PDFReport />} />
        <Route path="/dosha" element={<DoshaQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;