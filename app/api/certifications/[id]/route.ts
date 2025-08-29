import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, issuer, issueDate, credentialId, credentialUrl, imageUrl } = await request.json()

    const updatedCertification = await prisma.certification.update({
      where: { id: params.id },
      data: {
        title,
        issuer,
        imageUrl: imageUrl || '',
        credentialId: credentialId || null,
        credentialUrl: credentialUrl || null,
        issueDate: new Date(issueDate)
      }
    })

    return NextResponse.json(updatedCertification)
  } catch (error) {
    console.error('Error updating certification:', error)
    return NextResponse.json(
      { message: "Error updating certification" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.certification.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: "Certification deleted successfully" })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return NextResponse.json(
      { message: "Error deleting certification" },
      { status: 500 }
    )
  }
}
