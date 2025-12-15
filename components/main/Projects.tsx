"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "../sub/ProjectCard";
import ProjectCardSkeleton from "../sub/ProjectCardSkeleton";

interface Project {
  id: string;
  imageUrl: string | null;
  title: string;
  description: string;
  githubUrl: string | null;
  demoUrl: string | null;
  technologies: string[];
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center py-10"
      id="projects"
    >
      <div className="text-center mb-16 relative z-[20]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          My Projects
        </h1>
        <div className="w-[100px] h-[4px] bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full blur-[1px] mb-8" />
        <p className="text-lg text-purple-200 max-w-2xl mx-auto">
          Explore my latest work and creative solutions
        </p>
      </div>
      
      <div className="w-full max-w-7xl mx-auto relative z-[30]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {loading ? (
            // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-purple-300 text-lg">No projects available yet.</p>
            </div>
          ) : (
            projects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project.id}
                src={project.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMkEwRTYxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+'}
                title={project.title}
                description={project.description}
                githubLink={project.githubUrl || undefined}
                liveDemoLink={project.demoUrl || undefined}
                technologies={project.technologies}
              />
            ))
          )}
        </div>
      </div>
      
      {projects.length > 6 && (
        <div className="mt-5">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Projects
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;
