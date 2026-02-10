import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore opportunities, apply easily, and grow your career
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="1000+" subtitle="Jobs Available" />
          <StatCard title="500+" subtitle="Companies" />
          <StatCard title="10k+" subtitle="Users" />
        </div>
      </section>

      {/* ACTION CARDS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Browse Jobs"
            desc="Search and apply for jobs that match your skills"
            link="/jobs"
            btn="Explore Jobs"
          />

          <ActionCard
            title="Post a Job"
            desc="Hire top talent by posting job openings"
            link="/post-job"
            btn="Post Job"
          />

          <ActionCard
            title="Your Profile"
            desc="Manage your profile and track applications"
            link="/profile"
            btn="View Profile"
          />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 text-center text-gray-600">
        <p>
          Ready to take the next step in your career?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Join now
          </Link>
        </p>
      </section>
    </div>
  );
}

/* SMALL REUSABLE COMPONENTS */

function StatCard({ title, subtitle }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-3xl font-bold text-blue-600">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
}

function ActionCard({ title, desc, link, btn }) {
  return (
    <div className="border p-6 rounded shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link
        to={link}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {btn}
      </Link>
    </div>
  );
}
