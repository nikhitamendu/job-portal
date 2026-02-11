import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find Your Dream Job <br /> Build Your Career
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Explore opportunities, apply easily, and grow your career
              with trusted companies.
            </p>

            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>

              <Link
                to="/register"
                className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Job search illustration"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="1000+" subtitle="Jobs Available" />
          <StatCard title="500+" subtitle="Companies Hiring" />
          <StatCard title="10k+" subtitle="Active Job Seekers" />
        </div>
      </section>

      {/* ================= ACTION SECTION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600">
            Simple tools to help you move forward in your career
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            img="https://static.vecteezy.com/system/resources/previews/040/158/453/non_2x/looking-for-a-new-job-career-or-job-search-looking-for-opportunities-looking-for-job-vacancies-free-vector.jpg"
            title="Browse Jobs"
            desc="Search and apply for jobs that match your skills and interests."
            link="/jobs"
            btn="Explore Jobs"
          />

          <ActionCard
            img="https://easy.jobs/wp-content/uploads/2021/04/How-To-Write-A-Great-Job-Posting-With-Examples.png"
            title="Post a Job"
            desc="Hire top talent by posting job openings easily."
            link="/post-job"
            btn="Post Job"
          />

          <ActionCard
            img="https://cdn.sanity.io/images/jow1kam4/production/2b1271c56cc216b6087da7ed29ed9d9aa973289c-2940x1588.png?w=3840&q=75&fit=clip&auto=format"
            title="Your Profile"
            desc="Manage your profile and track job applications."
            link="/profile"
            btn="View Profile"
          />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-3">
          Ready to take the next step?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of job seekers building their careers
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
}

/* ================= SMALL REUSABLE COMPONENTS ================= */

function StatCard({ title, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
      <h2 className="text-3xl font-bold text-blue-600">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
}

function ActionCard({ img, title, desc, link, btn }) {
  return (
    <div className="border rounded-xl p-6 text-center hover:shadow-md transition">
      <img
        src={img}
        alt={title}
        className="h-32 mx-auto mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link
        to={link}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {btn}
      </Link>
    </div>
  );
}
