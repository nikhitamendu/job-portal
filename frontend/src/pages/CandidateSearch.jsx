import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   STITCHING TOGETHER THE PREMIUM DESIGN
───────────────────────────────────────────── */
const Style = () => (
  <style>{`
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(15px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .candidate-card {
      animation: fadeSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
      background: white; border: 1px solid #e2e8f0; border-radius: 20px;
      padding: 24px; transition: all 0.3s ease;
      display: flex; flex-direction: column; height: 100%;
    }
    .candidate-card:hover {
      border-color: #94a3b8; shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
      transform: translateY(-4px);
    }
    .skill-chip {
      background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600;
      padding: 4px 10px; border-radius: 8px; border: 1px solid #e2e8f0;
    }
    .find-talent-hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 60px 20px; border-radius: 24px; text-align: center;
      margin-bottom: 40px; position: relative; overflow: hidden;
    }
    .contact-modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
      display: flex; items-center; justify-center; z-index: 100;
    }
    .contact-modal {
      background: white; width: 100%; max-width: 500px; border-radius: 24px;
      padding: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }
  `}</style>
);

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("");
  const [contactModal, setContactModal] = useState(null);
  const [emailForm, setEmailForm] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const fetchCandidates = async (skillQuery = "") => {
    setLoading(true);
    try {
      const { data } = await api.get(`/recruiter/search?skills=${skillQuery}`);
      setCandidates(data.candidates);
    } catch (err) {
      toast.error("Failed to fetch candidates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCandidates(skills);
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/recruiter/contact", {
        candidateId: contactModal._id,
        subject: emailForm.subject,
        message: emailForm.message
      });
      toast.success(`Message sent to ${contactModal.name}!`);
      setContactModal(null);
      setEmailForm({ subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <Style />
      
      {/* ── HERO ── */}
      <div className="find-talent-hero">
        <h1 style={{ color: "white", fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>Discover Top Talent</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "32px", maxWidth: "600px", margin: "0 auto" }}>
          Search for job seekers by skills and connect with them instantly.
        </p>
        
        <form onSubmit={handleSearch} style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search skills (e.g. React, Node.js, Design)..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{
              width: "100%", padding: "16px 24px", paddingRight: "120px", borderRadius: "16px",
              border: "none", fontSize: "16px", outline: "none", background: "white",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
          />
          <button
            type="submit"
            style={{
              position: "absolute", right: "8px", top: "8px", bottom: "8px",
              background: "#2563eb", color: "white", border: "none",
              padding: "0 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* ── RESULTS ── */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          <p style={{ color: "#64748b", marginTop: "16px", fontWeight: 500 }}>Finding matches...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px 0", background: "#f8fafc", borderRadius: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h3 style={{ color: "#1e293b", fontSize: "20px", fontWeight: 700 }}>No candidates found</h3>
          <p style={{ color: "#64748b" }}>Try searching for generic skills like "React" or "JavaScript".</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
          {candidates.map((candidate, idx) => (
            <div key={candidate._id} className="candidate-card" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "16px",
                  background: "#eef2ff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", fontWeight: 800, flexShrink: 0
                }}>
                  {candidate.profilePicFileId ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL}/users/file/${candidate.profilePicFileId}`} 
                      style={{ width: "100%", height: "100%", borderRadius: "16px", objectFit: "cover" }}
                    />
                  ) : candidate.name[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{candidate.name}</h4>
                  <p style={{ color: "#2563eb", fontSize: "13px", fontWeight: 600, margin: "2px 0" }}>{candidate.jobTitle || "Job Seeker"}</p>
                  <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>📍 {candidate.city}, {candidate.country}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px", flex: 1 }}>
                {candidate.skills?.length > 0 ? (
                  candidate.skills.slice(0, 6).map((s, i) => (
                    <span key={i} className="skill-chip">{s}</span>
                  ))
                ) : (
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>No skills listed</span>
                )}
                {candidate.skills?.length > 6 && (
                  <span style={{ fontSize: "11px", color: "#64748b", alignSelf: "center", fontWeight: 600 }}>+{candidate.skills.length - 6} more</span>
                )}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link
                  to={`/profile/${candidate._id}`}
                  style={{
                    flex: 1, textAlign: "center", background: "#f8fafc", color: "#1e293b", border: "1px solid #e2e8f0",
                    padding: "10px", borderRadius: "12px", fontSize: "13px", fontWeight: 700,
                    textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  👁 View Profile
                </Link>
                <button
                  onClick={() => setContactModal(candidate)}
                  style={{
                    flex: 1, background: "#2563eb", color: "white", border: "none",
                    padding: "10px", borderRadius: "12px", fontSize: "13px", fontWeight: 700,
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  💬 Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONTACT MODAL ── */}
      {contactModal && (
        <div className="contact-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setContactModal(null)}>
          <div className="contact-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Message to {contactModal.name}</h3>
              <button onClick={() => setContactModal(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}>✕</button>
            </div>
            
            <form onSubmit={handleContact}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Subject</label>
                <input
                  required
                  className="modal-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "14px" }}
                  placeholder="e.g. Exciting Job Opportunity @ Acme Corp"
                  value={emailForm.subject}
                  onChange={e => setEmailForm({ ...emailForm, subject: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Message</label>
                <textarea
                  required
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "14px", minHeight: "150px", resize: "vertical" }}
                  placeholder="Hi! I saw your profile and skills in React. We have an opening..."
                  value={emailForm.message}
                  onChange={e => setEmailForm({ ...emailForm, message: e.target.value })}
                />
              </div>
              
              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%", background: "#2563eb", color: "white", border: "none",
                  padding: "14px", borderRadius: "14px", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", opacity: sending ? 0.7 : 1
                }}
              >
                {sending ? "Sending Message..." : "Send Secure Email"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
