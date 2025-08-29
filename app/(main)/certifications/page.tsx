"use client";
import { useEffect, useState } from "react";
import CertificationCard from "@/components/sub/CertificationCard";
import Link from "next/link";

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

const AllCertificationsPage = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      const res = await fetch("/api/certifications");
      const data = await res.json();
      setCertifications(data);
    };
    fetchCertifications();
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          All Certifications
        </h1>
        <Link
          href="/"
          className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          &larr; Back to Home
        </Link>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            name={cert.title}
            organization={cert.issuer}
            date={cert.issueDate}
            credentialId={cert.credentialId || ""}
            certificateLink={cert.credentialUrl || ""}
            imageUrl={cert.imageUrl}
          />
        ))}
      </main>
    </div>
  );
};

export default AllCertificationsPage;
