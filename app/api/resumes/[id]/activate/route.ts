import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First, set all resumes to inactive
    await prisma.resume.updateMany({
      data: { isActive: false }
    });
    
    // Then set the selected resume as active
    const updatedResume = await prisma.resume.update({
      where: { id: params.id },
      data: { isActive: true }
    });
    
    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Error activating resume:', error);
    return NextResponse.json(
      { message: "Error activating resume" },
      { status: 500 }
    );
  }
}
