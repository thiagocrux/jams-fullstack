import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body) // DEBUG

  // Acessa o primeiro arquivo do array files
  const file = body.files?.[0]

  if (!file?.content) {
    return { error: 'Arquivo não enviado corretamente.' }
  }

  const base64Data = file.content.split(',')[1]
  const buffer = Buffer.from(base64Data, 'base64')
  const targetPath = join(process.cwd(), 'prisma', file.name)
  writeFileSync(targetPath, buffer)

  return { success: true, path: targetPath }
})
