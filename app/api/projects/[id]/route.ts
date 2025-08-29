import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, imageUrl, githubUrl, demoUrl, technologies, featured } = await request.json()

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        description,
        imageUrl: imageUrl || '',
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        technologies,
        featured: featured || false
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    )
  }
}
