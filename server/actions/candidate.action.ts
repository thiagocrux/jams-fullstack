import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { candidateService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await candidateService.getById(id)
    }
    const query = getQuery(event)
    return await candidateService.listAll(query as any)
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.name || !body.email) {
      throw new ValidationError('Campos obrigatórios ausentes: name, email.')
    }
    return await candidateService.create(body)
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await candidateService.update(id, body)
  }

  if (method === 'DELETE') {
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await candidateService.delete(id)
  }
})
