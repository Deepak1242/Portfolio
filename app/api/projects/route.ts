import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Return data in the format expected by the frontend
    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      technologies: project.technologies,
      featured: project.featured,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString()
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: "Error reading projects data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, githubUrl, demoUrl, technologies, featured } = await request.json();

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || '',
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        technologies,
        featured: featured || false
      }
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
