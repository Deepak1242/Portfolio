import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const activeResume = await prisma.resume.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    });
    
    if (!activeResume) {
      return NextResponse.json(
        { message: "No active resume found" },
        { status: 404 }
      );
    }
    
    // Add cache control headers to prevent caching
    return NextResponse.json(activeResume, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching active resume:', error);
    return NextResponse.json(
      { message: "Error fetching active resume" },
      { status: 500 }
    );
  }
}
