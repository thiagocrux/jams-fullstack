import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { companyService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await companyService.getById(id)
    }
    const query = getQuery(event)
    return await companyService.listAll(query as any)
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.name) {
      throw new ValidationError('O campo name é obrigatório.')
    }
    return await companyService.create(body)
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await companyService.update(id, body)
  }

  if (method === 'DELETE') {
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await companyService.delete(id)
  }
})
