import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: 'Token missing!' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(
      token,
      '430244540aa38ff181545cb0d539f788'
    ) as IPayload
    request.id_deliveryman = sub

    return next()
  } catch {
    return response.status(403).json({ message: 'Invalid token!' })
  }
}
