"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CertificationCard from "../sub/CertificationCard";
import CertificationCardSkeleton from "../sub/CertificationCardSkeleton";

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

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch("/api/certifications");
        const data = await res.json();
        // Ensure data is an array before setting it
        setCertifications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setCertifications([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center py-20"
      id="certifications"
    >
      <div className="text-center mb-16 relative z-[20]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          My Certifications
        </h1>
        <div className="w-[100px] h-[4px] bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full blur-[1px] mb-8" />
        <p className="text-lg text-purple-200 max-w-2xl mx-auto">
          Professional certifications and achievements in technology
        </p>
      </div>
      
      <div className="w-full max-w-7xl mx-auto relative z-[30]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {loading ? (
            // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <CertificationCardSkeleton key={index} />
            ))
          ) : (
            certifications.slice(0, 6).map((cert) => (
              <CertificationCard
                key={cert.id}
                name={cert.title}
                organization={cert.issuer}
                date={cert.issueDate}
                credentialId={cert.credentialId || ""}
                certificateLink={cert.credentialUrl || ""}
                imageUrl={cert.imageUrl}
              />
            ))
          )}
        </div>
      </div>
      
      {certifications.length > 6 && (
        <div className="mt-5">
          <Link
            href="/certifications"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Certifications
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Certifications;
