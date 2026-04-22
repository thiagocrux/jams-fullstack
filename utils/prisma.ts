import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function createPrismaClient() {
  const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

let prisma: PrismaClient

declare global {
  var __prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = createPrismaClient()
  }
  prisma = global.__prisma
}

export default prisma
