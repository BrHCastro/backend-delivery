import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prismaClient'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    if (!username || !password) {
      throw new Error('Username and password must not be empty')
    }

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, '430244540aa38ff181545cb0d539f788', {
      subject: deliveryman.id,
      expiresIn: '1d',
    })

    return { token }
  }
}
