import { Request, Response } from 'express'
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase'

export class AuthenticateDeliveryController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body
    const authenticateDeliveryUseCase = new AuthenticateDeliverymanUseCase()

    const result = await authenticateDeliveryUseCase.execute({
      username,
      password,
    })

    return response.json(result)
  }
}
