import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { stepService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await stepService.getById(id)
    }
    const query = getQuery(event)
    const applicationId = query.applicationId as string
    if (applicationId) {
      return await stepService.listByApplication(applicationId, query as any)
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.applicationId || !body.name) {
      throw new ValidationError('Campos obrigatórios ausentes: applicationId, name.')
    }
    return await stepService.create(body)
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await stepService.update(id, body)
  }

  if (method === 'DELETE') {
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await stepService.delete(id)
  }
})
