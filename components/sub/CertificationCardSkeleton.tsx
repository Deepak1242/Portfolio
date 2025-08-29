import React from 'react';

const CertificationCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] flex flex-col h-full animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-48 bg-gray-800">
        <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex-1 p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        
        {/* Organization skeleton */}
        <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded w-2/3 animate-shimmer"></div>
        
        {/* Date skeleton */}
        <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded w-1/3 animate-shimmer"></div>
        
        {/* Credential ID skeleton */}
        <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded w-1/2 animate-shimmer"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="p-6 pt-0">
        <div className="h-10 w-full bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 bg-[length:200%_100%] rounded animate-shimmer"></div>
      </div>
    </div>
  );
};

export default CertificationCardSkeleton;
