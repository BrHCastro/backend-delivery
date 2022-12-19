import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    if (!username || !password) {
      throw new Error('Username and password must not be empty')
    }

    const clientExists = await prisma.clients.findFirst({
      where: {
        username,
      },
    })

    if (clientExists) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(password, 10)
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    })

    return client
  }
}
