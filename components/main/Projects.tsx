"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../sub/ProjectCard";
import Link from "next/link";

interface Project {
  id: number;
  src: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemoLink: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-10">
        {projects.slice(0, 4).map((project) => (
          <ProjectCard
            key={project.id}
            src={project.src}
            title={project.title}
            description={project.description}
            githubLink={project.githubLink}
            liveDemoLink={project.liveDemoLink}
          />
        ))}
      </div>
      {projects.length > 4 && (
        <Link
          href="/projects"
          className="mt-10 px-6 py-3 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          See More
        </Link>
      )}
    </div>
  );
};

export default Projects;
