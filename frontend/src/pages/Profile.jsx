import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    fetchHistory();
  // eslint-disable-next-line
  }, []);

  const fetchHistory = async () => {
  try {
    const q = query(
      collection(db, "history"),
      where("uid", "==", auth.currentUser.uid)
    );
    const snap = await getDocs(q);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Sort by date manually
    data.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
    setHistory(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
  setLoading(false);
};

  const deleteRecord = async (id) => {
    await deleteDoc(doc(db, "history", id));
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const doshaCount = history.reduce((acc, h) => {
    acc[h.dosha] = (acc[h.dosha] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>

        {/* Profile Card */}
        <div className="card" style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={user?.photoURL} alt="profile"
            style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 12, border: "3px solid #F5E6C8" }} />
          <h3 style={{ color: "#6B3A1F", fontSize: 20 }}>{user?.displayName}</h3>
          <p style={{ color: "#8B6347", fontSize: 14 }}>{user?.email}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 600, color: "#A0522D" }}>{history.length}</p>
              <p style={{ fontSize: 12, color: "#8B6347" }}>Total Checks</p>
            </div>
            {Object.entries(doshaCount).map(([dosha, count]) => (
              <div key={dosha} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 600, color: "#A0522D" }}>{count}</p>
                <p style={{ fontSize: 12, color: "#8B6347" }}>{dosha}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosha Chart */}
        {history.length > 0 && (
          <div className="card" style={{ marginBottom: 16 }}>
            <h4 style={{ color: "#6B3A1F", marginBottom: 12 }}>📊 Your Dosha Pattern</h4>
            {Object.entries(doshaCount).map(([dosha, count]) => {
              const pct = Math.round((count / history.length) * 100);
              const color = dosha === "Vata" ? "#3498DB" : dosha === "Pitta" ? "#E74C3C" : "#27AE60";
              return (
                <div key={dosha} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#6B3A1F" }}>{dosha}</span>
                    <span style={{ fontSize: 13, color: "#8B6347" }}>{pct}%</span>
                  </div>
                  <div style={{ background: "#F5E6C8", borderRadius: 20, height: 8 }}>
                    <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 20, transition: "width 1s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* History */}
        <h3 style={{ color: "#6B3A1F", marginBottom: 12 }}>📋 Check History</h3>

        {loading ? (
          <p style={{ color: "#8B6347", textAlign: "center" }}>Loading history...</p>
        ) : history.length === 0 ? (
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ color: "#8B6347" }}>No history yet!</p>
            <button className="btn-primary" onClick={() => navigate("/survey")} style={{ marginTop: 12 }}>
              Start First Check
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {history.map((h, i) => (
              <div key={h.id} className="card" style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h4 style={{ color: "#A0522D", marginBottom: 4 }}>{h.disease}</h4>
                    <span className="tag" style={{ fontSize: 11 }}>{h.dosha}</span>
                    <p style={{ fontSize: 12, color: "#8B6347", marginTop: 6 }}>
                      {h.createdAt?.toDate?.()?.toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      }) || "Just now"}
                    </p>
                  </div>
                  <button onClick={() => deleteRecord(h.id)} style={{
                    background: "none", border: "none", color: "#993C1D",
                    cursor: "pointer", fontSize: 18
                  }}>🗑️</button>
                </div>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {(h.herbs || []).slice(0, 3).map((herb, j) => (
                    <span key={j} style={{
                      background: "#EAF3DE", color: "#27500A",
                      padding: "2px 8px", borderRadius: 20, fontSize: 11
                    }}>{herb}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logout */}
        <button onClick={handleLogout} style={{
          width: "100%", padding: "12px", background: "white",
          color: "#993C1D", border: "2px solid #993C1D",
          borderRadius: 8, fontSize: 15, cursor: "pointer", fontWeight: 500
        }}>
          🚪 Logout
        </button>

      </div>
    </div>
  );
}
