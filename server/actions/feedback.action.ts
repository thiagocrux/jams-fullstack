import { useContainer } from '../infrastructure/container'
import { ValidationError } from '../domain/errors'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { feedbackService } = useContainer()
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    if (id) {
      return await feedbackService.getById(id)
    }
    const query = getQuery(event)
    const stepId = query.stepId as string
    if (stepId) {
      return await feedbackService.listByStep(stepId, query as any)
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.stepId || !body.title) {
      throw new ValidationError('Campos obrigatórios ausentes: stepId, title.')
    }
    return await feedbackService.create(body)
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await feedbackService.update(id, body)
  }

  if (method === 'DELETE') {
    if (!id) {
      throw new ValidationError('ID é obrigatório.')
    }
    return await feedbackService.delete(id)
  }
})
