import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

export default function PDFReport() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user = auth.currentUser;
      if (!user) { setLoading(false); return; }

      const q = query(
        collection(db, "history"),
        where("uid", "==", user.uid)
      );
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
      console.log("Fetched records:", data.length);
      setHistory(data);
    } catch (err) {
      console.error("Error:", err.message);
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFillColor(160, 82, 45);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Ayurvedic Health Report", pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient: ${user?.displayName}`, pageWidth / 2, 28, { align: "center" });
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, pageWidth / 2, 36, { align: "center" });

    y = 50;

    // User Info
    doc.setFillColor(245, 230, 200);
    doc.rect(10, y, pageWidth - 20, 22, "F");
    doc.setTextColor(107, 58, 31);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Email: ${user?.email}`, 15, y + 8);
    doc.text(`Total Health Checks: ${history.length}`, 15, y + 16);
    y += 30;

    // Records
    history.forEach((h, index) => {
      if (y > 240) { doc.addPage(); y = 20; }

      // Record Header
      doc.setFillColor(160, 82, 45);
      doc.rect(10, y, pageWidth - 20, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`#${index + 1}  ${h.disease}  |  Dosha: ${h.dosha}`, 15, y + 7);
      y += 14;

      doc.setTextColor(50, 30, 10);
      doc.setFontSize(10);

      // Date
      const date = h.createdAt?.toDate?.()?.toLocaleDateString("en-IN") || "Recent";
      doc.setFont("helvetica", "italic");
      doc.text(`Date: ${date}`, 15, y);
      y += 8;

      // Herbs
      doc.setFont("helvetica", "bold");
      doc.text("Herbs:", 15, y);
      doc.setFont("helvetica", "normal");
      const herbs = (h.herbs || []).map(x => x.trim()).join(", ");
      const herbLines = doc.splitTextToSize(herbs, pageWidth - 40);
      doc.text(herbLines, 40, y);
      y += herbLines.length * 6 + 4;

      // Diet
      doc.setFont("helvetica", "bold");
      doc.text("Eat:", 15, y);
      doc.setFont("helvetica", "normal");
      const diet = (h.diet || []).map(x => x.trim()).join(", ");
      const dietLines = doc.splitTextToSize(diet, pageWidth - 40);
      doc.text(dietLines, 40, y);
      y += dietLines.length * 6 + 4;

      // Avoid
      doc.setFont("helvetica", "bold");
      doc.text("Avoid:", 15, y);
      doc.setFont("helvetica", "normal");
      const avoid = (h.avoid || []).map(x => x.trim()).join(", ");
      const avoidLines = doc.splitTextToSize(avoid, pageWidth - 40);
      doc.text(avoidLines, 40, y);
      y += avoidLines.length * 6 + 4;

      // Lifestyle
      if (h.lifestyle) {
        doc.setFont("helvetica", "bold");
        doc.text("Tip:", 15, y);
        doc.setFont("helvetica", "normal");
        const tipLines = doc.splitTextToSize(h.lifestyle, pageWidth - 40);
        doc.text(tipLines, 40, y);
        y += tipLines.length * 6 + 4;
      }

      // Divider
      doc.setDrawColor(200, 160, 100);
      doc.line(10, y + 2, pageWidth - 10, y + 2);
      y += 12;
    });

    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 100, 60);
      doc.text(
        "AI-Based Ayurvedic Lifestyle Recommendation System | Consult a doctor for medical advice.",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 8,
        { align: "center" }
      );
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, doc.internal.pageSize.getHeight() - 8);
    }

    doc.save(`Ayurvedic_Report_${user?.displayName?.replace(" ", "_")}_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.pdf`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48 }}>📄</div>
          <h2 style={{ color: "#6B3A1F", fontSize: 22 }}>Download Health Report</h2>
          <p style={{ color: "#8B6347", fontSize: 14 }}>Your complete Ayurvedic health history as PDF</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#8B6347" }}>⏳ Loading your history...</p>
        ) : history.length === 0 ? (
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ color: "#8B6347", marginBottom: 16 }}>No history found! Do a symptom check first.</p>
            <button className="btn-primary" onClick={() => window.location.href = "/survey"}>
              🔍 Start Health Check
            </button>
          </div>
        ) : (
          <>
            <div className="card" style={{ marginBottom: 20 }}>
              <h4 style={{ color: "#6B3A1F", marginBottom: 16 }}>📋 Report Preview</h4>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#F5E6C8", borderRadius: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "#6B3A1F" }}>👤 Patient</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#A0522D" }}>{user?.displayName}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#F5E6C8", borderRadius: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "#6B3A1F" }}>📊 Total Checks</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#A0522D" }}>{history.length}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#F5E6C8", borderRadius: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 14, color: "#6B3A1F" }}>📅 Report Date</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#A0522D" }}>{new Date().toLocaleDateString("en-IN")}</span>
              </div>

              <h4 style={{ color: "#6B3A1F", marginBottom: 10 }}>Conditions Detected:</h4>
              {history.map((h, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 10px", borderBottom: "1px solid #F5E6C8"
                }}>
                  <span style={{ fontSize: 13, color: "#3B2A1A" }}>• {h.disease}</span>
                  <span className="tag" style={{ fontSize: 11 }}>{h.dosha}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={downloadPDF} style={{ width: "100%", fontSize: 16, padding: "14px" }}>
              📥 Download PDF Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}