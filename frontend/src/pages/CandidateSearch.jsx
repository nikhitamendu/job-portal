import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      setCandidates(data.candidates || []);
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
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* ── HERO HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a1f3d] to-slate-900 relative overflow-hidden py-12 sm:py-20 px-4">
        {/* Subtle background effects */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Candidate Discovery</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Find the Perfect <span className="text-blue-500">Talent</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover and connect with top-tier job seekers. Search by skills, experience, or keywords to build your dream team.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-blue-600/20 blur-xl group-focus-within:bg-blue-600/30 transition-all duration-300 opacity-0 group-focus-within:opacity-100" />
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="pl-4 pr-2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Try 'React Developer', 'Node.js', 'UI Design'..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-900 text-sm sm:text-base py-3 px-2"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        
        {/* Results Info */}
        {!loading && candidates.length > 0 && (
          <div className="flex items-center justify-between mb-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-3 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Found <span className="text-blue-600">{candidates.length}</span> potential candidates
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Live Talent Pool
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-6 text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Filtering Talent...</p>
          </div>
        ) : candidates.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-[32px] p-12 sm:p-20 text-center shadow-sm max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl grayscale opacity-50">
              🔍
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">No candidates found</h3>
            <p className="text-slate-500 text-sm sm:text-base mb-8">
              We couldn't find any matches for those skills. Try using broader terms like "Software" or "Design".
            </p>
            <button 
              onClick={() => { setSkills(""); fetchCandidates(""); }}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Candidate Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate, idx) => (
              <div 
                key={candidate._id} 
                className="group relative bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-slate-100 flex items-center justify-center text-2xl font-black text-blue-600 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {candidate.profilePicFileId ? (
                        <img 
                          src={`${import.meta.env.VITE_API_URL}/users/file/${candidate.profilePicFileId}`} 
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        candidate.name[0].toUpperCase()
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {candidate.name}
                    </h4>
                    <p className="text-sm font-semibold text-blue-600 truncate mb-1">
                      {candidate.jobTitle || "Job Seeker"}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {candidate.city ? `${candidate.city}, ${candidate.country}` : "Global"}
                    </div>
                  </div>
                </div>

                {/* Skills Container */}
                <div className="mb-8 min-h-[84px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Competencies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills?.length > 0 ? (
                      candidate.skills.slice(0, 5).map((s, i) => (
                        <span key={i} className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-default">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-300 italic">No skills specified</span>
                    )}
                    {candidate.skills?.length > 5 && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                        +{candidate.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2.5 pt-4 border-t border-slate-50">
                  <Link
                    to={`/profile/${candidate._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm rounded-xl transition-all active:scale-95 no-underline"
                  >
                    <span>View Profile</span>
                  </Link>
                  <button
                    onClick={() => setContactModal(candidate)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                  >
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTACT MODAL ── */}
      {contactModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={(e) => e.target === e.currentTarget && setContactModal(null)}
        >
          <div 
            className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <button 
                onClick={() => setContactModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black">
                  {contactModal.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Connect with {contactModal.name}</h3>
                  <p className="text-blue-100 text-sm font-medium opacity-80">{contactModal.email}</p>
                </div>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleContact} className="p-8 bg-white">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Exciting Opportunity @ ACME Corp"
                    value={emailForm.subject}
                    onChange={e => setEmailForm({ ...emailForm, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Your Message</label>
                  <textarea
                    required
                    placeholder="Briefly explain the role and why they are a great fit..."
                    value={emailForm.message}
                    onChange={e => setEmailForm({ ...emailForm, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm font-semibold text-slate-900 min-h-[160px] resize-none"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <button
                  type="button"
                  onClick={() => setContactModal(null)}
                  className="flex-1 px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-[2] relative overflow-hidden px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 group"
                >
                  <div className={`flex items-center justify-center gap-2 ${sending ? "opacity-0" : "opacity-100"}`}>
                    <span>Send Secure Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  {sending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </div>
              <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Secure encryption enabled · Recruiter Policy Active
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
