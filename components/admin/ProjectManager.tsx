"use client";
import { useState, useEffect } from "react";

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

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<Project | null>(null);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setIsEditing(project);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProject = {
      ...isEditing,
      title: formData.get("title"),
      description: formData.get("description"),
      src: formData.get("src"),
      githubLink: formData.get("githubLink"),
      liveDemoLink: formData.get("liveDemoLink"),
      technologies: (formData.get("technologies") as string).split(",").map(t => t.trim()),
      date: formData.get("date"),
    };

    const url = isEditing?.id ? `/api/projects/${isEditing.id}` : "/api/projects";
    const method = isEditing?.id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    });

    setIsEditing(null);
    fetchProjects();
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          {/* Add all form fields here */}
          <input type="text" name="title" placeholder="Title" defaultValue={isEditing?.title} className="w-full p-2 bg-[#0c0c1b] rounded" required />
          <textarea name="description" placeholder="Description" defaultValue={isEditing?.description} className="w-full p-2 bg-[#0c0c1b] rounded" required />
          <input type="text" name="src" placeholder="Image Path (e.g., /project.png)" defaultValue={isEditing?.src} className="w-full p-2 bg-[#0c0c1b] rounded" required />
          <input type="text" name="githubLink" placeholder="GitHub Link" defaultValue={isEditing?.githubLink} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <input type="text" name="liveDemoLink" placeholder="Live Demo Link" defaultValue={isEditing?.liveDemoLink} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <input type="text" name="technologies" placeholder="Technologies (comma-separated)" defaultValue={isEditing?.technologies.join(", ")} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <input type="date" name="date" defaultValue={isEditing?.date} className="w-full p-2 bg-[#0c0c1b] rounded" />
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
              {isEditing ? "Save Changes" : "Add Project"}
            </button>
            {isEditing && (
              <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#1a1a2e] p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-bold">{project.title}</h4>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
