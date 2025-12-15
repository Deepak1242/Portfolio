import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";

interface Props {
  src: string;
  title: string;
  description: string;
  githubLink?: string;
  liveDemoLink?: string;
  technologies?: string[];
  date?: string;
}

const ProjectCard = ({
  src,
  title,
  description,
  githubLink,
  liveDemoLink,
  technologies,
  date,
}: Props) => {
  return (
    <div className="relative z-[30] overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] flex flex-col h-full">
      <div className="relative w-full bg-gray-800 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={src}
          alt={title}
          width={800}
          height={450}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMkEwRTYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+';
          }}
        />
      </div>

      <div className="relative p-4 flex flex-col flex-grow">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-purple-300 flex-grow">{description}</p>

        {technologies && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-gray-700 text-white text-xs rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-[40] text-white hover:text-purple-500 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={24} />
              </a>
            )}
            {liveDemoLink && (
              <a 
                href={liveDemoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-[40] px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
          </div>
          {date && <p className="text-xs text-gray-400">{date}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
