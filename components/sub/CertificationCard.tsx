import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  certificateLink?: string;
  imageUrl?: string;
}

const CertificationCard = ({
  name,
  organization,
  date,
  credentialId,
  certificateLink,
  imageUrl,
}: Props) => {
  return (
    <div className="relative z-[30] overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] flex flex-col h-full">
      <div className="relative w-full h-48 bg-gray-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-48 bg-gradient-to-br from-purple-900 to-purple-700 flex flex-col items-center justify-center text-white">
                    <svg class="w-12 h-12 mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="text-sm font-medium">No Preview Available</span>
                    <span class="text-xs opacity-75 mt-1">Certificate Image</span>
                  </div>
                `;
              }
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-900 to-purple-700 flex flex-col items-center justify-center text-white">
            <svg className="w-12 h-12 mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span className="text-sm font-medium">No Preview Available</span>
            <span className="text-xs opacity-75 mt-1">Certificate Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
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
              className="relative z-[40] px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

export default CertificationCard;
