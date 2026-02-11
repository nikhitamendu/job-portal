import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  /* ================= STATE ================= */

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: "",
    phone: "",
    role: "Job Seeker",
  });

  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  /* ================= MODALS ================= */

  const [editBasic, setEditBasic] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editEducation, setEditEducation] = useState(false);

  /* ================= PROFILE COMPLETION ================= */

  const completionFields = [
    profile.name,
    profile.location,
    profile.phone,
    skills.length > 0,
    experience.length > 0,
    education.length > 0,
  ];

  const completed = completionFields.filter(Boolean).length;
  const completionPercent = Math.round(
    (completed / completionFields.length) * 100
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* ================= PROFILE COMPLETION ================= */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">Profile Completion</span>
            <span>{completionPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Complete your profile to attract recruiters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ================= LEFT CARD ================= */}
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {profile.name ? profile.name[0] : "U"}
            </div>

            <h2 className="text-xl font-bold mt-4">
              {profile.name || "Your Name"}
            </h2>
            <p className="text-gray-500 text-sm">{profile.role}</p>

            <button
              onClick={() => setEditBasic(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Edit Basic Info
            </button>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="md:col-span-2 space-y-6">

            {/* BASIC INFO */}
            <Card title="Basic Information" onEdit={() => setEditBasic(true)}>
              <Info label="Email" value={profile.email} />
              <Info label="Location" value={profile.location || "—"} />
              <Info label="Phone" value={profile.phone || "—"} />
            </Card>

            {/* SKILLS */}
            <Card title="Skills" onEdit={() => setEditSkills(true)}>
              {skills.length === 0 ? (
                <Empty text="No skills added yet" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            {/* EXPERIENCE */}
            <Card
              title="Experience"
              onEdit={() => setEditExperience(true)}
              editText="Add Experience"
            >
              {experience.length === 0 ? (
                <Empty text="No experience added yet" />
              ) : (
                experience.map((e, i) => (
                  <Block
                    key={i}
                    title={`${e.role} – ${e.company}`}
                    sub={e.duration}
                    desc={e.desc}
                  />
                ))
              )}
            </Card>

            {/* EDUCATION */}
            <Card
              title="Education"
              onEdit={() => setEditEducation(true)}
              editText="Add Education"
            >
              {education.length === 0 ? (
                <Empty text="No education added yet" />
              ) : (
                education.map((e, i) => (
                  <Block
                    key={i}
                    title={e.degree}
                    sub={`${e.institute} • ${e.year}`}
                  />
                ))
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {editBasic && (
        <BasicModal
          data={profile}
          onClose={() => setEditBasic(false)}
          onSave={setProfile}
        />
      )}

      {editSkills && (
        <SkillsModal
          data={skills}
          onClose={() => setEditSkills(false)}
          onSave={setSkills}
        />
      )}

      {editExperience && (
        <ExperienceModal
          onClose={() => setEditExperience(false)}
          onSave={(exp) => setExperience([...experience, exp])}
        />
      )}

      {editEducation && (
        <EducationModal
          onClose={() => setEditEducation(false)}
          onSave={(edu) => setEducation([...education, edu])}
        />
      )}
    </div>
  );
}

/* ================= REUSABLE ================= */

function Card({ title, children, onEdit, editText = "Edit" }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:underline"
          >
            {editText}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-sm text-gray-500">{text}</p>;
}

function Block({ title, sub, desc }) {
  return (
    <div className="mb-4">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{sub}</p>
      {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}
    </div>
  );
}

/* ================= MODALS ================= */

function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function BasicModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data);
  return (
    <Modal
      title="Edit Basic Info"
      onClose={onClose}
      onSave={() => onSave(form)}
    >
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
    </Modal>
  );
}

function SkillsModal({ data, onClose, onSave }) {
  const [value, setValue] = useState(data.join(", "));
  return (
    <Modal
      title="Edit Skills"
      onClose={onClose}
      onSave={() => onSave(value.split(",").map(s => s.trim()).filter(Boolean))}
    >
      <Input label="Skills (comma separated)" value={value} onChange={(e) => setValue(e.target.value)} />
    </Modal>
  );
}

function ExperienceModal({ onClose, onSave }) {
  const [form, setForm] = useState({ role: "", company: "", duration: "", desc: "" });
  return (
    <Modal title="Add Experience" onClose={onClose} onSave={() => onSave(form)}>
      <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <Input label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
      <Input label="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
    </Modal>
  );
}

function EducationModal({ onClose, onSave }) {
  const [form, setForm] = useState({ degree: "", institute: "", year: "" });
  return (
    <Modal title="Add Education" onClose={onClose} onSave={() => onSave(form)}>
      <Input label="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
      <Input label="Institute" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} />
      <Input label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
    </Modal>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded-md" />
    </div>
  );
}
