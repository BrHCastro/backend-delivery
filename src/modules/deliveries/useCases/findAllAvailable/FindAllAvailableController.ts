import { Request, Response } from 'express'
import { FindAllAvailableUseCase } from './FindAllAvailableUseCase'

export class FindAllAvalibleController {
  async handle(request: Request, response: Response) {
    const findAllAvailableUseCase = new FindAllAvailableUseCase()

    const deliveries = await findAllAvailableUseCase.execute()

    response.json(deliveries)
  }
}
