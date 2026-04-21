import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { sessionService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await sessionService.getById(id)
    }
    const query = getQuery(event)
    const candidateId = query.candidateId as string
    if (candidateId) {
      return await sessionService.listByCandidate(candidateId, query as any)
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.candidateId || !body.expiresAt) {
      throw new ValidationError('Campos obrigatórios ausentes: candidateId, expiresAt.')
    }
    return await sessionService.create(body)
  }

  if (method === 'DELETE') {
    if (id) {
      return await sessionService.delete(id)
    }
    const query = getQuery(event)
    const candidateId = query.candidateId as string
    if (!candidateId) {
      throw new ValidationError('O candidateId é obrigatório para limpar sessões.')
    }
    return await sessionService.clearExpired(candidateId)
  }
})
