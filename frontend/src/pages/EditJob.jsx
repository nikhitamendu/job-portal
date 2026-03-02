import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      const job =data.job;
      setForm({
        ...data,
        skillsRequired: data.skillsRequired?.join(", ") || ""
      });
    } catch (err) {
  console.log("UPDATE ERROR:", err.response?.data);
  toast.error(err.response?.data?.message || "Failed to update job");
}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm({
        ...form,
        [parent]: { ...form[parent], [child]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        skillsRequired: form.skillsRequired
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      };

      await api.put(`/jobs/${id}`, payload);

      toast.success("Job updated successfully 🎉");
      navigate("/recruiter/dashboard");

    } catch (err) {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input label="Job Title" name="title" value={form.title} onChange={handleChange} />

          <Textarea label="Job Description" name="description" value={form.description} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="City" name="location.city" value={form.location?.city || ""} onChange={handleChange} />
            <Input label="Country" name="location.country" value={form.location?.country || ""} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Minimum Salary" name="salary.min" value={form.salary?.min || ""} onChange={handleChange} type="number" />
            <Input label="Maximum Salary" name="salary.max" value={form.salary?.max || ""} onChange={handleChange} type="number" />
          </div>

          <Select name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </Select>

          <Input
            label="Skills Required (comma separated)"
            name="skillsRequired"
            value={form.skillsRequired}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Updating..." : "Update Job"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* Reusable Components */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded mt-1" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <textarea {...props} rows="4" className="w-full border px-3 py-2 rounded mt-1" />
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">Experience Level</label>
      <select {...props} className="w-full border px-3 py-2 rounded mt-1">
        {children}
      </select>
    </div>
  );
}