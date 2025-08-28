"use client";
import { useState, useEffect } from "react";

interface Certification {
  id: number;
  name: string;
  organization: string;
  date: string;
  credentialId: string;
  certificateLink: string;
}

const CertificationManager = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isEditing, setIsEditing] = useState<Certification | null>(null);

  const fetchCertifications = async () => {
    const res = await fetch("/api/certifications");
    const data = await res.json();
    setCertifications(data);
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      await fetch(`/api/certifications/${id}`, { method: "DELETE" });
      fetchCertifications();
    }
  };

  const handleEdit = (certification: Certification) => {
    setIsEditing(certification);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedCertification = {
      ...isEditing,
      name: formData.get("name"),
      organization: formData.get("organization"),
      date: formData.get("date"),
      credentialId: formData.get("credentialId"),
      certificateLink: formData.get("certificateLink"),
    };

    const url = isEditing?.id ? `/api/certifications/${isEditing.id}` : "/api/certifications";
    const method = isEditing?.id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCertification),
    });

    setIsEditing(null);
    fetchCertifications();
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Certifications</h2>
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Certification" : "Add New Certification"}
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          <input type="text" name="name" placeholder="Certification Name" defaultValue={isEditing?.name} className="w-full p-2 bg-[#0c0c1b] rounded" required />
          <input type="text" name="organization" placeholder="Issuing Organization" defaultValue={isEditing?.organization} className="w-full p-2 bg-[#0c0c1b] rounded" required />
          <input type="date" name="date" defaultValue={isEditing?.date} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <input type="text" name="credentialId" placeholder="Credential ID" defaultValue={isEditing?.credentialId} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <input type="text" name="certificateLink" placeholder="Certificate Link" defaultValue={isEditing?.certificateLink} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
              {isEditing ? "Save Changes" : "Add Certification"}
            </button>
            {isEditing && (
              <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-[#1a1a2e] p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-bold">{cert.name}</h4>
              <p className="text-sm text-gray-400">{cert.organization}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cert)} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationManager;
