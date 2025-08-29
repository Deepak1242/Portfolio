import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Return data in the format expected by the frontend
    const formattedCertifications = certifications.map(cert => ({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      imageUrl: cert.imageUrl,
      credentialId: cert.credentialId,
      credentialUrl: cert.credentialUrl,
      issueDate: cert.issueDate.toISOString().split('T')[0],
      createdAt: cert.createdAt.toISOString(),
      updatedAt: cert.updatedAt.toISOString()
    }))

    return NextResponse.json(formattedCertifications)
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json(
      { message: "Error reading certifications data" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, issuer, issueDate, credentialId, credentialUrl, imageUrl } = await request.json()

    const newCertification = await prisma.certification.create({
      data: {
        title,
        issuer,
        imageUrl: imageUrl || '',
        credentialId: credentialId || null,
        credentialUrl: credentialUrl || null,
        issueDate: new Date(issueDate)
      }
    })

    return NextResponse.json(newCertification, { status: 201 })
  } catch (error) {
    console.error('Error creating certification:', error)
    return NextResponse.json(
      { message: "Error creating certification" },
      { status: 500 }
    )
  }
}
