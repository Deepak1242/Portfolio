"use client";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<Project | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setIsEditing(project);
    setImagePreview(project.imageUrl || "");
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/project', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setImagePreview(imageUrl);
      } catch (error) {
        alert('Failed to upload image');
      }
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const techString = formData.get("technologies") as string;
    const technologies = techString ? techString.split(",").map(t => t.trim()).filter(t => t.length > 0) : [];

    const projectData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: imagePreview || (formData.get("imageUrl") as string),
      githubUrl: formData.get("githubUrl") as string || null,
      demoUrl: formData.get("demoUrl") as string || null,
      technologies: technologies,
      featured: formData.get("featured") === "on",
    };

    const url = isEditing?.id ? `/api/projects/${isEditing.id}` : "/api/projects";
    const method = isEditing?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setIsEditing(null);
        setImagePreview("");
        fetchProjects();
        e.currentTarget.reset();
        alert(isEditing ? "Project updated successfully!" : "Project added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error saving project:", errorData);
        alert("Error saving project: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h3>
        <form onSubmit={handleSave} className="space-y-4 relative z-20">
          <input 
            type="text" 
            name="title" 
            placeholder="Project Title" 
            defaultValue={isEditing?.title || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            required 
            autoComplete="off"
          />
          <textarea 
            name="description" 
            placeholder="Project Description" 
            defaultValue={isEditing?.description || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24 relative z-30" 
            required 
            autoComplete="off"
          />
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Project Thumbnail</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
              disabled={uploadingImage}
            />
            {uploadingImage && (
              <p className="text-sm text-blue-400">Uploading image...</p>
            )}
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-32 h-20 object-cover rounded" />
            )}
            {!imagePreview && isEditing?.imageUrl && (
              <img src={isEditing.imageUrl} alt="Current" className="w-32 h-20 object-cover rounded" />
            )}
          </div>
          <input 
            type="url" 
            name="githubUrl" 
            placeholder="GitHub Repository URL" 
            defaultValue={isEditing?.githubUrl || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            autoComplete="off"
          />
          <input 
            type="url" 
            name="demoUrl" 
            placeholder="Live Demo URL" 
            defaultValue={isEditing?.demoUrl || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            autoComplete="off"
          />
          <input 
            type="text" 
            name="technologies" 
            placeholder="Technologies (comma-separated: React, Node.js, MongoDB)" 
            defaultValue={isEditing?.technologies?.join(", ") || ""} 
            className="w-full p-3 bg-[#1a1a2e] border border-[#2A0E61] rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-30" 
            autoComplete="off"
          />
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              name="featured" 
              id="featured"
              defaultChecked={isEditing?.featured || false}
              className="w-4 h-4 text-purple-600 bg-[#1a1a2e] border-[#2A0E61] rounded focus:ring-purple-500 relative z-30" 
            />
            <label htmlFor="featured" className="text-gray-300">Featured Project</label>
          </div>
          <div className="flex gap-4 relative z-30">
            <button type="submit" className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors font-medium">
              {isEditing ? "Save Changes" : "Add Project"}
            </button>
            {isEditing && (
              <button type="button" onClick={() => setIsEditing(null)} className="px-6 py-3 bg-gray-600 rounded hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No projects found. Add your first project above.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-[#1a1a2e] p-4 rounded-lg border border-[#2A0E61]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    {project.featured && (
                      <span className="px-2 py-1 bg-purple-600 text-xs rounded">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-[#0c0c1b] text-xs rounded border border-[#2A0E61]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 text-xs">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        GitHub
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(project)} 
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)} 
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
