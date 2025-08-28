"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CertificationCard from "../sub/CertificationCard";

interface Certification {
  id: number;
  name: string;
  organization: string;
  date: string;
  credentialId: string;
  certificateLink: string;
}

const Certifications = () => {
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
    <div
      className="flex flex-col items-center justify-center py-20"
      id="certifications"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Certifications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-10">
        {certifications.slice(0, 4).map((cert) => (
          <CertificationCard
            key={cert.id}
            name={cert.name}
            organization={cert.organization}
            date={cert.date}
            credentialId={cert.credentialId}
            certificateLink={cert.certificateLink}
          />
        ))}
      </div>
      {certifications.length > 4 && (
        <Link
          href="/certifications"
          className="mt-10 px-6 py-3 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          See More
        </Link>
      )}
    </div>
  );
};

export default Certifications;
