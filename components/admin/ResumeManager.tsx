"use client";
import { useState, useEffect } from "react";

interface Resume {
  id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

const ResumeManager = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [uploading, setUploading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      const data = await res.json();
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeTitle || !resumeUrl) {
      alert("Please provide both title and resume URL");
      return;
    }

    setUploading(true);
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resumeTitle,
          fileUrl: resumeUrl,
          fileName: resumeTitle + ".pdf"
        }),
      });

      if (response.ok) {
        alert("Resume added successfully!");
        setResumeTitle("");
        setResumeUrl("");
        fetchResumes();
      } else {
        alert("Error adding resume");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding resume");
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}/activate`, {
        method: "PUT",
      });

      if (response.ok) {
        alert("Resume set as active!");
        fetchResumes();
      }
    } catch (error) {
      console.error("Error setting active resume:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      try {
        const response = await fetch(`/api/resumes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Resume deleted successfully!");
          fetchResumes();
        }
      } catch (error) {
        console.error("Error deleting resume:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Resume</h2>
      
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Resume</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Resume Title (e.g., 'Software Engineer Resume 2024')"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          
          <div>
            <input
              type="url"
              placeholder="Resume URL (Google Drive, Dropbox, or direct link)"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload your resume to Google Drive or Dropbox and paste the public link here
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
          >
            {uploading ? "Adding..." : "Add Resume"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Resumes</h3>
        {resumes.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No resumes uploaded yet. Add your first resume above.
          </p>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume.id}
              className={`bg-[#1a1a2e] p-4 rounded-lg border ${
                resume.isActive ? "border-purple-500" : "border-[#2A0E61]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-lg">{resume.title}</h4>
                    {resume.isActive && (
                      <span className="px-2 py-1 bg-green-600 text-xs rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View Resume →
                  </a>
                </div>
                <div className="flex gap-2 ml-4">
                  {!resume.isActive && (
                    <button
                      onClick={() => handleSetActive(resume.id)}
                      className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm"
                    >
                      Set Active
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(resume.id)}
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

export default ResumeManager;
