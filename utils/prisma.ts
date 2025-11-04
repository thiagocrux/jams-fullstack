import pkg from '@prisma/client'
const { PrismaClient } = pkg

let prisma: InstanceType<typeof PrismaClient>

declare global {
  var __prisma: InstanceType<typeof PrismaClient> | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
  }

  prisma = global.__prisma
}

export default prisma
