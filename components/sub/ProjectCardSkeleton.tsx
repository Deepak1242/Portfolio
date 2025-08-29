import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-48 bg-gray-800">
        <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="relative p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded w-3/4 animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded w-1/2 animate-shimmer"></div>
        </div>
        
        {/* Technologies skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 bg-[length:200%_100%] rounded-full animate-shimmer"></div>
          <div className="h-6 w-20 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 bg-[length:200%_100%] rounded-full animate-shimmer"></div>
          <div className="h-6 w-14 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 bg-[length:200%_100%] rounded-full animate-shimmer"></div>
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-3 pt-4">
          <div className="h-10 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
          <div className="h-10 w-28 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
