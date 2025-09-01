"use client";
import { useState, useEffect } from "react";

const ResumeButton = () => {
  const [resumeData, setResumeData] = useState<{fileUrl: string, fileName: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveResume = async () => {
      try {
        setLoading(true);
        setError(null);
        // Add timestamp to prevent caching
        const res = await fetch(`/api/resumes/active?t=${Date.now()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          cache: 'no-store',
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.fileUrl) {
            setResumeData({
              fileUrl: data.fileUrl,
              fileName: data.fileName || "resume.pdf"
            });
          } else {
            setError("Resume file URL not found");
          }
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch resume");
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        setError("Network error while fetching resume");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveResume();
  }, []);

  const handleDownload = () => {
    // Open the download endpoint in a new window with timestamp to prevent caching
    window.open(`/api/resumes/download?t=${Date.now()}`, '_blank');
  };

  if (loading) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full opacity-50 cursor-not-allowed"
      >
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </button>
    );
  }

  if (error || !resumeData) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 text-white font-semibold rounded-full opacity-50 cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        {error || "Resume Not Available"}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Resume
    </button>
  );
};

export default ResumeButton;
