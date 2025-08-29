"use client";
import { useState, useEffect } from "react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  credentialId: string | null;
  credentialUrl: string | null;
  issueDate: string;
  createdAt: string;
  updatedAt: string;
}

const CertificationManager = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isEditing, setIsEditing] = useState<Certification | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fetchCertifications = async () => {
    const res = await fetch("/api/certifications");
    const data = await res.json();
    setCertifications(data);
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      try {
        await fetch(`/api/certifications/${id}`, { method: "DELETE" });
        fetchCertifications();
      } catch (error) {
        console.error("Error deleting certification:", error);
      }
    }
  };

  const handleEdit = (certification: Certification) => {
    setIsEditing(certification);
    setImagePreview(certification.imageUrl);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/certificate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setImagePreview(imageUrl);
      } catch (error) {
        alert('Failed to upload image');
      }
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const certificationData = {
      title: formData.get("title") as string,
      issuer: formData.get("issuer") as string,
      issueDate: formData.get("issueDate") as string,
      credentialId: (formData.get("credentialId") as string) || null,
      credentialUrl: (formData.get("credentialUrl") as string) || null,
      imageUrl: imagePreview || (formData.get("imageUrl") as string),
    };

    const url = isEditing?.id ? `/api/certifications/${isEditing.id}` : "/api/certifications";
    const method = isEditing?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificationData),
      });

      if (response.ok) {
        setIsEditing(null);
        setImagePreview("");
        fetchCertifications();
        e.currentTarget.reset();
        alert(isEditing ? "Certification updated successfully!" : "Certification added successfully!");
      } else {
        const errorData = await response.json();
        alert("Error saving certification: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      alert("Error saving certification");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Certifications</h2>
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Certification" : "Add New Certification"}
        </h3>
        <form onSubmit={handleSave} className="space-y-4 relative z-20">
          <input 
            type="text" 
            name="title" 
            placeholder="Certification Title" 
            defaultValue={isEditing?.title || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            required 
            autoComplete="off"
          />
          <input 
            type="text" 
            name="issuer" 
            placeholder="Issuing Organization" 
            defaultValue={isEditing?.issuer || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            required 
            autoComplete="off"
          />
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Certificate Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
              disabled={uploadingImage}
            />
            {uploadingImage && (
              <p className="text-sm text-blue-400">Uploading image...</p>
            )}
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-32 h-20 object-cover rounded" />
            )}
            {!imagePreview && isEditing?.imageUrl && (
              <img src={isEditing.imageUrl} alt="Current" className="w-32 h-20 object-cover rounded" />
            )}
          </div>
          <input 
            type="date" 
            name="issueDate" 
            defaultValue={isEditing?.issueDate || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            required 
            autoComplete="off"
          />
          <input 
            type="text" 
            name="credentialId" 
            placeholder="Credential ID (optional)" 
            defaultValue={isEditing?.credentialId || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            autoComplete="off"
          />
          <input 
            type="url" 
            name="credentialUrl" 
            placeholder="Credential URL (optional)" 
            defaultValue={isEditing?.credentialUrl || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            autoComplete="off"
          />
          <div className="flex gap-4 relative z-30">
            <button type="submit" className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors font-medium">
              {isEditing ? "Save Changes" : "Add Certification"}
            </button>
            {isEditing && (
              <button type="button" onClick={() => setIsEditing(null)} className="px-6 py-3 bg-gray-600 rounded hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {certifications.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No certifications found. Add your first certification above.</p>
        ) : (
          certifications.map((cert) => (
            <div key={cert.id} className="bg-[#1a1a2e] p-4 rounded-lg border border-[#2A0E61]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">{cert.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    {cert.issueDate && <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>}
                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                  </div>
                  {cert.credentialUrl && (
                    <div className="mt-2">
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline text-xs"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                  {cert.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        className="w-24 h-16 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(cert)} 
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cert.id)} 
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificationManager;
