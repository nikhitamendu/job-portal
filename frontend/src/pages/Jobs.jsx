
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../services/api";         // ← authenticated instance (in-memory token)
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const Jobs = () => {
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    employmentType: "",
    workplaceType: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    datePosted: "",
    sort: "newest",
    page: 1,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ── Fetch all jobs (public, no auth needed) ── */
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/jobs`, { params: filters });
      if (Array.isArray(data)) setJobs(data);
      else if (Array.isArray(data.jobs)) setJobs(data.jobs);
      else setJobs([]);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ── Fetch applied job IDs using authenticated api instance ── */
  /* ── Token is stored in-memory via setAccessToken, NOT localStorage ── */
  const fetchAppliedJobs = async () => {
    if (!user || user.role === "recruiter") return;
    try {
      const { data } = await api.get("/applications/my-applications"); // token auto-attached by interceptor
      const ids = new Set(
        data.map((app) => app.job?._id?.toString()).filter(Boolean)
      );
      setAppliedJobIds(ids);
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  useEffect(() => {
    // Wait for auth to finish before fetching — avoids race condition on refresh
    if (authLoading) return;
    fetchAppliedJobs();
  }, [user, authLoading]);

  const employmentTypes = ["Full-time", "Part-time", "Internship", "Contract"];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3.5 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              {jobs.length} Jobs Available
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            Find Your Dream Job
          </h1>
          <p className="text-sm text-white/50 mb-6">
            Browse thousands of opportunities from top companies
          </p>

          {/* Search bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search by title, company, or skill…"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/35 outline-none transition-all focus:bg-white/15 focus:border-white/30 backdrop-blur-sm"
              />
            </div>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-4 py-2.5 text-sm rounded-xl border border-white/15 bg-white/10 text-white/70 outline-none cursor-pointer focus:bg-white/15 backdrop-blur-sm"
            >
              <option value="newest"     className="text-slate-900">Newest</option>
              <option value="oldest"     className="text-slate-900">Oldest</option>
              <option value="salaryHigh" className="text-slate-900">Salary: High</option>
              <option value="salaryLow"  className="text-slate-900">Salary: Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile filter toggle */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full mb-4 py-3 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-slate-700 font-bold"
          >
            <span className="flex items-center gap-2">📂 Filters</span>
            <span>{isFilterOpen ? "▲" : "▼"}</span>
          </button>

          {/* ── Left: Sidebar Filters ── */}
          <div className={`${isFilterOpen ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0 space-y-6`}>
            
            <FilterSection title="Workplace Type">
              {["Remote", "On-site", "Hybrid"].map(type => (
                <FilterPill 
                  key={type} 
                  label={type} 
                  active={filters.workplaceType === type}
                  onClick={() => setFilters({ ...filters, workplaceType: filters.workplaceType === type ? "" : type, page: 1 })}
                />
              ))}
            </FilterSection>

            <FilterSection title="Experience Level">
              {["Entry-level", "Mid-level", "Senior-level", "Executive"].map(lvl => (
                <FilterPill 
                  key={lvl} 
                  label={lvl} 
                  active={filters.experienceLevel === lvl}
                  onClick={() => setFilters({ ...filters, experienceLevel: filters.experienceLevel === lvl ? "" : lvl, page: 1 })}
                />
              ))}
            </FilterSection>

            <FilterSection title="Salary Range">
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500"
                  value={filters.minSalary}
                  onChange={e => setFilters({ ...filters, minSalary: e.target.value, page: 1 })}
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500"
                  value={filters.maxSalary}
                  onChange={e => setFilters({ ...filters, maxSalary: e.target.value, page: 1 })}
                />
              </div>
            </FilterSection>

            <FilterSection title="Date Posted">
              {[
                { label: "Today", value: "today" },
                { label: "Last 3 days", value: "3days" },
                { label: "Last week", value: "week" },
                { label: "Last month", value: "month" },
              ].map(d => (
                <FilterPill 
                  key={d.value} 
                  label={d.label} 
                  active={filters.datePosted === d.value}
                  onClick={() => setFilters({ ...filters, datePosted: filters.datePosted === d.value ? "" : d.value, page: 1 })}
                />
              ))}
            </FilterSection>

            <button 
              onClick={() => setFilters({ search: "", city: "", employmentType: "", workplaceType: "", experienceLevel: "", minSalary: "", maxSalary: "", datePosted: "", sort: "newest", page: 1 })}
              className="w-full py-2.5 text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition"
            >
              Reset All Filters
            </button>
          </div>

          {/* ── Right: Job Cards ── */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            {!loading && jobs.length > 0 && (
              <p className="text-sm text-slate-400 font-medium mb-5">
                Showing <span className="text-slate-700 font-bold">{jobs.length}</span> results
                {filters.search && (
                  <> for <span className="text-blue-700 font-bold"> "{filters.search}"</span></>
                )}
                {appliedJobIds.size > 0 && user?.role !== "recruiter" && (
                  <span className="ml-3 text-emerald-600 font-semibold">
                    · {appliedJobIds.size} applied
                  </span>
                )}
              </p>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Finding jobs…</span>
                </div>
              </div>
            )}

            {/* Empty */}
            {!loading && jobs.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No jobs found</h3>
                <p className="text-sm text-slate-400 mb-5">
                  Try adjusting your search or filters to find more results.
                </p>
                <button
                  onClick={() => setFilters({ search: "", city: "", employmentType: "", workplaceType: "", experienceLevel: "", minSalary: "", maxSalary: "", datePosted: "", sort: "newest", page: 1 })}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm shadow-blue-200 cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Grid */}
            {!loading && jobs.length > 0 && (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isApplied={appliedJobIds.has(job._id?.toString())}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-slate-200 pb-5">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition cursor-pointer
        ${active
          ? "bg-blue-600 border-blue-500 text-white"
          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
        }`}
    >
      {label}
    </button>
  );
}

export default Jobs;
