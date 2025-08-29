import { PrismaClient } from '@prisma/client'
import { createAdmin } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  try {
    await createAdmin('admin@example.com', 'admin123', 'Admin User')
    console.log('Admin user created successfully')
  } catch (error) {
    console.log('Admin user might already exist')
  }

  // Create sample projects
  const sampleProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js and PostgreSQL',
      image: '/project1.jpg',
      gitUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      image: '/project2.jpg',
      gitUrl: 'https://github.com/example/taskapp',
      liveUrl: 'https://taskapp-demo.vercel.app',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      featured: true
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts',
      image: '/project3.jpg',
      gitUrl: 'https://github.com/example/weather',
      liveUrl: 'https://weather-demo.vercel.app',
      technologies: ['Vue.js', 'Express.js', 'OpenWeather API'],
      featured: false
    }
  ]

  for (const project of sampleProjects) {
    await prisma.project.create({
      data: project
    })
  }

  // Create sample certifications
  const sampleCertifications = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      imageUrl: '/cert1.jpg',
      credentialUrl: 'https://aws.amazon.com/certification/',
      issueDate: new Date('2023-01-15')
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      imageUrl: '/cert2.jpg',
      credentialUrl: 'https://developers.facebook.com/certification/',
      issueDate: new Date('2023-03-20')
    }
  ]

  for (const cert of sampleCertifications) {
    await prisma.certification.create({
      data: cert
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
