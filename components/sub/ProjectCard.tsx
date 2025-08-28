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
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0c0c1b] flex flex-col h-full">
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full h-48 object-cover"
      />

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
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-500">
                <FaGithub size={24} />
              </a>
            )}
            {liveDemoLink && (
              <a href={liveDemoLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
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
