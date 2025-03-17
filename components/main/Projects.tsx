import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/cart.png"
          title="React Shopping Cart"
          description="Basic React app with state Management using Redux."
        />
        <ProjectCard
          src="/ai code.png"
          title="Code Helper"
          description="Code Helper is a web app that helps you to write clean optimized code using Ai."
        />
        <ProjectCard
          src="/chat app.png"
          title="Chat App"
          description="Chat App is a react app that helps you to chat with your friends in realtime using socket io."
        />
      </div>
    </div>
  );
};

export default Projects;
