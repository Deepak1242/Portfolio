"use client";
import { useState, useEffect } from "react";

const ResumeButton = () => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveResume = async () => {
      try {
        const res = await fetch("/api/resumes/active");
        if (res.ok) {
          const data = await res.json();
          setResumeUrl(data.fileUrl);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveResume();
  }, []);

  if (loading || !resumeUrl) return null;

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
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
    </a>
  );
};

export default ResumeButton;
