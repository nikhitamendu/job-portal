import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    employmentType: "",
    workplaceType: "",
    location: { city: "", country: "" },
    salary: { min: "", max: "" },
    experienceLevel: "",
    skillsRequired: ""
  });

  const [loading, setLoading] = useState(false);

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

      await api.post("/jobs", payload);

      toast.success("Job created successfully 🎉");
      navigate("/recruiter/dashboard");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input label="Job Title" name="title" value={form.title} onChange={handleChange} required />

          <Textarea label="Job Description" name="description" value={form.description} onChange={handleChange} required />

          <div className="grid grid-cols-2 gap-4">
            <Select label="Employment Type" name="employmentType" value={form.employmentType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </Select>

            <Select label="Workplace Type" name="workplaceType" value={form.workplaceType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="City" name="location.city" value={form.location.city} onChange={handleChange} />
            <Input label="Country" name="location.country" value={form.location.country} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Minimum Salary" name="salary.min" value={form.salary.min} onChange={handleChange} type="number" />
            <Input label="Maximum Salary" name="salary.max" value={form.salary.max} onChange={handleChange} type="number" />
          </div>

          {/* <Input label="Experience Level" name="experienceLevel" value={form.experienceLevel} onChange={handleChange} /> */}
          <Select
  label="Experience Level"
  name="experienceLevel"
  value={form.experienceLevel}
  onChange={handleChange}
>
  <option value="">Select</option>
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
            className={`w-full py-2 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Job"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* Reusable Inputs */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded-md mt-1"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        {...props}
        rows="4"
        className="w-full border px-3 py-2 rounded-md mt-1"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        {...props}
        className="w-full border px-3 py-2 rounded-md mt-1"
      >
        {children}
      </select>
    </div>
  );
}