import { prisma } from '../../../../database/prismaClient'

export class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
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
