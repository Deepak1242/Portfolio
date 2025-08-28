import React from "react";

interface Props {
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  certificateLink?: string;
}

const CertificationCard = ({
  name,
  organization,
  date,
  credentialId,
  certificateLink,
}: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] p-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <p className="mt-2 text-purple-300">{organization}</p>
      <div className="flex-grow"></div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-400">{date}</p>
        {certificateLink && (
          <a
            href={certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
          >
            View Credential
          </a>
        )}
      </div>
      {credentialId && (
        <p className="text-xs text-gray-500 mt-2">
          Credential ID: {credentialId}
        </p>
      )}
    </div>
  );
};

export default CertificationCard;
