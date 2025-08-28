import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

const readProjectsFromFile = () => {
  const fileContent = fs.readFileSync(projectsFilePath, "utf-8");
  return JSON.parse(fileContent);
};

const writeProjectsToFile = (projects: any) => {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id, 10);
    const updatedProjectData = await request.json();
    let projects = readProjectsFromFile();
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);

    if (projectIndex === -1) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    projects[projectIndex] = { ...projects[projectIndex], ...updatedProjectData };
    writeProjectsToFile(projects);

    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id, 10);
    let projects = readProjectsFromFile();
    const filteredProjects = projects.filter((p: any) => p.id !== projectId);

    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    writeProjectsToFile(filteredProjects);

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
