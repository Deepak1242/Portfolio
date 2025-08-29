import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const activeResume = await prisma.resume.findFirst({
      where: { isActive: true }
    });
    
    if (!activeResume) {
      return NextResponse.json(
        { message: "No active resume found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(activeResume);
  } catch (error) {
    console.error('Error fetching active resume:', error);
    return NextResponse.json(
      { message: "Error fetching active resume" },
      { status: 500 }
    );
  }
}
