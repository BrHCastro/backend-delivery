import { prisma } from '../../../../database/prismaClient'

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = prisma.clients.findMany({
      where: {
        id: id_client,
      },
      select: {
        id: true,
        username: true,
        deliveries: {
          select: {
            id: true,
            item_name: true,
          },
        },
      },
    })

    return deliveries
  }
}
