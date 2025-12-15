"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/sub/ProjectCard";
import Link from "next/link";

interface Project {
  id: number;
  src: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemoLink: string;
  technologies: string[];
  date: string;
}

const AllProjectsPage = () => {
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
    <div className="min-h-screen bg-[#030014] text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          All Projects
        </h1>
        <Link
          href="/"
          className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          &larr; Back to Home
        </Link>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-[30]">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            src={project.src}
            title={project.title}
            description={project.description}
            githubLink={project.githubLink}
            liveDemoLink={project.liveDemoLink}
            technologies={project.technologies}
            date={project.date}
          />
        ))}
      </main>
    </div>
  );
};

export default AllProjectsPage;
