import { hash } from 'bcrypt'

import { prisma } from '../../../../database/prismaClient'

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    if (!username || !password) {
      throw new Error('Username and password must not be empty')
    }

    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    })

    if (deliverymanExists) {
      throw new Error('Deliveryman already exists')
    }

    const hashPassword = await hash(password, 10)
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    })

    return deliveryman
  }
}
