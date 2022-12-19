import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prismaClient'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    if (!username || !password) {
      throw new Error('Username and password must not be empty')
    }

    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    })

    if (!client) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, '430244540aa38ff181545cb0d539f038', {
      subject: client.id,
      expiresIn: '1d',
    })

    return { token }
  }
}
