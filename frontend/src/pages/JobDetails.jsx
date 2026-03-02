import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const { data } = await api.get(`/jobs/${id}`);
    setJob(data);
  };

  if (!job) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="mb-4">{job.description}</p>

      <div className="space-y-2 text-sm">
        <p><strong>Employment:</strong> {job.employmentType}</p>
        <p><strong>Workplace:</strong> {job.workplaceType}</p>
        <p><strong>Experience:</strong> {job.experienceLevel}</p>
        <p><strong>Salary:</strong> {job.salary?.min} - {job.salary?.max}</p>
      </div>
    </div>
  );
}