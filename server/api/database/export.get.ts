import { readFileSync, statSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const filePath = join(process.cwd(), 'prisma', 'dev.db')
  try {
    if (!statSync(filePath).isFile()) {
      event.node.res.statusCode = 404
      event.node.res.end('Arquivo não encontrado')
      return
    }
    const fileBuffer = readFileSync(filePath)
    event.node.res.setHeader('Content-Type', 'application/octet-stream')
    event.node.res.setHeader(
      'Content-Disposition',
      'attachment; filename="dev.db"'
    )
    event.node.res.end(fileBuffer)
  } catch (err) {
    event.node.res.statusCode = 500
    event.node.res.end('Erro interno')
  }
})
