import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function createAdmin(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password)
  return prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  })

  if (!admin) {
    return null
  }

  const isValid = await verifyPassword(password, admin.password)
  if (!isValid) {
    return null
  }

  const token = generateToken({ id: admin.id, email: admin.email })
  return { admin: { id: admin.id, email: admin.email, name: admin.name }, token }
}
