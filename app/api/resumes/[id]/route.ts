import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.resume.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { message: "Error deleting resume" },
      { status: 500 }
    );
  }
}
