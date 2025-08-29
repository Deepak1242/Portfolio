import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { message: "Error fetching resumes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, fileUrl, fileName } = await request.json();
    
    // Set all other resumes to inactive if this is the first one
    const existingResumes = await prisma.resume.findMany();
    const isFirst = existingResumes.length === 0;
    
    const newResume = await prisma.resume.create({
      data: {
        title,
        fileUrl,
        fileName,
        isActive: isFirst // First resume is automatically active
      }
    });
    
    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { message: "Error creating resume" },
      { status: 500 }
    );
  }
}
