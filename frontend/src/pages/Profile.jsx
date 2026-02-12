import { useState, useEffect } from "react";
import axios from "../services/api";

export default function Profile() {

  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);

  const [editBasic, setEditBasic] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editEducation, setEditEducation] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await axios.get("/users/profile");
    setProfile(data.user);
    setCompletion(data.completion);
  };

  if (!profile) return <div className="p-10">Loading...</div>;

  /* ================= SAVE FUNCTIONS ================= */

  const updateProfile = async (updatedFields) => {
    const { data } = await axios.put("/users/profile", updatedFields);
    setProfile(data.user);
    setCompletion(data.completion);
  };

  /* ================= RESUME ================= */

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    await axios.post("/users/upload-resume", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    await fetchProfile();
    e.target.value = null;
  };

  const handleDeleteResume = async () => {
    await axios.delete("/users/delete-resume");
    await fetchProfile();
  };

  /* ================= DELETE GENERIC ================= */

  const handleDeleteItem = async (field, index) => {
    const updated = profile[field].filter((_, i) => i !== index);
    await updateProfile({ [field]: updated });
  };
  /* ================= PROFILE PICTURE ================= */

const handleProfilePicUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profilePic", file);

  await axios.post("/users/upload-profile-pic", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  await fetchProfile();
  e.target.value = null;
};

const handleDeleteProfilePic = async () => {
  await axios.delete("/users/delete-profile-pic");
  await fetchProfile();
};


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* Completion */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
        {/* LEFT */}
<div className="bg-white rounded-xl border p-6 text-center">

  <div className="relative w-24 h-24 mx-auto">
    {profile.profilePicFileId ? (
      <img
        src={`http://localhost:5000/api/users/file/${profile.profilePicFileId}`}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border"
      />
    ) : (
      <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
        {profile.name?.[0] || "U"}
      </div>
    )}

    <label className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer text-xs shadow">
      ✎
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        className="hidden"
      />
    </label>
  </div>

  {profile.profilePicFileId && (
    <button
      onClick={handleDeleteProfilePic}
      className="mt-2 text-red-600 text-sm"
    >
      Remove Photo
    </button>
  )}

  <h2 className="mt-4 font-bold text-lg">{profile.name}</h2>
  <p className="text-gray-500 text-sm">{profile.role}</p>

  <button
    onClick={() => setEditBasic(true)}
    className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
  >
    Edit Basic Info
  </button>

</div>


          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">

            {/* Basic */}
            <Card title="Basic Information" onEdit={() => setEditBasic(true)}>
              <Info label="Email" value={profile.email} />
              <Info label="Location" value={profile.location || "—"} />
              <Info label="Phone" value={profile.phone || "—"} />
            </Card>

           <Card title="Skills" onEdit={() => setEditSkills(true)}>
  {profile.skills?.length === 0 ? (
    <Empty text="No skills added yet" />
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile.skills.map((skill, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm group"
        >
          {skill}

          <button
            onClick={() => handleDeleteItem("skills", i)}
            className="hidden group-hover:inline text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</Card>


            {/* Experience */}
            <Card title="Experience" onEdit={() => {
              setEditingIndex(null);
              setEditExperience(true);
            }}>
              {profile.experience?.length === 0 ? (
                <Empty text="No experience added yet" />
              ) : (
                profile.experience.map((e, i) => (
                  <ItemRow
                    key={i}
                    text={`${e.role} - ${e.company}`}
                    onEdit={() => {
                      setEditingIndex(i);
                      setEditExperience(true);
                    }}
                    onDelete={() => handleDeleteItem("experience", i)}
                  />
                ))
              )}
            </Card>

            {/* Education */}
            <Card title="Education" onEdit={() => {
              setEditingIndex(null);
              setEditEducation(true);
            }}>
              {profile.education?.length === 0 ? (
                <Empty text="No education added yet" />
              ) : (
                profile.education.map((e, i) => (
                  <ItemRow
                    key={i}
                    text={`${e.degree} - ${e.institute}`}
                    onEdit={() => {
                      setEditingIndex(i);
                      setEditEducation(true);
                    }}
                    onDelete={() => handleDeleteItem("education", i)}
                  />
                ))
              )}
            </Card>

            {/* Resume */}
           <Card title="Resume">
  {profile.resumeFileId ? (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-2 rounded">
        <span className="text-green-700 text-sm font-medium">
          ✔ Resume Uploaded
        </span>

        <div className="space-x-4 text-sm">
          <a
href={`http://localhost:5000/api/users/file/${profile.resumeFileId}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View
          </a>

          <button
            onClick={handleDeleteResume}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Empty text="No resume uploaded" />
  )}

  <label className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm">
    {profile.resumeFileId ? "Replace Resume" : "Upload Resume"}
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={handleResumeUpload}
      className="hidden"
    />
  </label>
</Card>


          </div>
        </div>
      </div>

      {/* MODALS */}
      {editBasic && (
        <BasicModal
          data={profile}
          onClose={() => setEditBasic(false)}
          onSave={(data) => {
            updateProfile(data);
            setEditBasic(false);
          }}
        />
      )}

      {editSkills && (
        <SkillsModal
          data={profile.skills}
          onClose={() => setEditSkills(false)}
          onSave={(skills) => {
            updateProfile({ skills });
            setEditSkills(false);
          }}
        />
      )}

      {editExperience && (
        <ExperienceModal
          data={editingIndex !== null ? profile.experience[editingIndex] : null}
          onClose={() => setEditExperience(false)}
          onSave={(form) => {
            let updated = [...profile.experience];
            if (editingIndex !== null) updated[editingIndex] = form;
            else updated.push(form);

            updateProfile({ experience: updated });
            setEditExperience(false);
            setEditingIndex(null);
          }}
        />
      )}

      {editEducation && (
        <EducationModal
          data={editingIndex !== null ? profile.education[editingIndex] : null}
          onClose={() => setEditEducation(false)}
          onSave={(form) => {
            let updated = [...profile.education];
            if (editingIndex !== null) updated[editingIndex] = form;
            else updated.push(form);

            updateProfile({ education: updated });
            setEditEducation(false);
            setEditingIndex(null);
          }}
        />
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ title, children, onEdit }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        {onEdit && (
          <button onClick={onEdit} className="text-blue-600 text-sm">
            Add / Edit
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
      <p className="text-sm text-gray-500">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-gray-400 text-sm">{text}</p>;
}

function ItemRow({ text, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <span>{text}</span>
      <div className="space-x-3 text-sm">
        {onEdit && (
          <button onClick={onEdit} className="text-blue-600">
            Edit
          </button>
        )}
        <button onClick={onDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl">
        <h2 className="font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
function BasicModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <Modal title="Edit Basic Info" onClose={onClose} onSave={() => onSave(form)}>
      <Input
        label="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Location"
        value={form.location || ""}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <Input
        label="Phone"
        value={form.phone || ""}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
    </Modal>
  );
}
function SkillsModal({ data, onClose, onSave }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue((data || []).join(", "));
  }, [data]);

  return (
    <Modal
      title="Edit Skills"
      onClose={onClose}
      onSave={() =>
        onSave(value.split(",").map((s) => s.trim()).filter(Boolean))
      }
    >
      <Input
        label="Skills (comma separated)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
}
function ExperienceModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(
    data || { role: "", company: "", duration: "", desc: "" }
  );

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  return (
    <Modal title="Experience" onClose={onClose} onSave={() => onSave(form)}>
      <Input
        label="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <Input
        label="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <Input
        label="Duration"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />
      <Input
        label="Description"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />
    </Modal>
  );
}
function EducationModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(
    data || { degree: "", institute: "", year: "" }
  );

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  return (
    <Modal title="Education" onClose={onClose} onSave={() => onSave(form)}>
      <Input
        label="Degree"
        value={form.degree}
        onChange={(e) => setForm({ ...form, degree: e.target.value })}
      />
      <Input
        label="Institute"
        value={form.institute}
        onChange={(e) => setForm({ ...form, institute: e.target.value })}
      />
      <Input
        label="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
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