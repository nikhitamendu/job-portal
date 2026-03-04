import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>

      <p className="text-gray-600 mt-1">{job.companyName}</p>

      <div className="flex justify-between text-sm text-gray-500 mt-3">
        <span>{job.city}</span>
        <span>{job.employmentType}</span>
      </div>

      <div className="mt-4">
        <Link
          to={`/jobs/${job._id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;