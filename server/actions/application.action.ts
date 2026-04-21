import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { applicationService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await applicationService.getById(id)
    }
    const query = getQuery(event)
    const candidateId = query.candidateId as string
    if (candidateId) {
      return await applicationService.listByCandidate(candidateId, query as any)
    }
    return await applicationService.listAll(query as any)
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.candidateId || !body.companyId || !body.position) {
      throw new ValidationError('Campos obrigatórios ausentes: candidateId, companyId, position.')
    }
    return await applicationService.create(body)
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await applicationService.update(id, body)
  }

  if (method === 'DELETE') {
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await applicationService.delete(id)
  }
})
