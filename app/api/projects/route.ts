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

export async function GET() {
  try {
    const projects = readProjectsFromFile();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading projects data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const projects = readProjectsFromFile();
    newProject.id = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1;
    projects.push(newProject);
    writeProjectsToFile(projects);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
