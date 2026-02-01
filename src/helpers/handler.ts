import { Response } from 'express'
import { ResponseStatusCode } from './helper'

export const successResponse = <T>(
  message: string,
  data: T,
  res: Response
): Response => {
  return res.status(ResponseStatusCode.SUCCESS).json({
    status: 'success',
    message,
    data
  })
}

export const failureResponse = <T>(
  message: string,
  data: T,
  res: Response,
  statusCode = ResponseStatusCode.INTERNAL_SERVER_ERROR
): Response => {
  return res.status(statusCode).json({
    status: 'failure',
    message,
    data
  })
}

export const insufficientParameters = (res: Response): Response => {
  return res.status(ResponseStatusCode.BAD_REQUEST).json({
    status: 'failure',
    message: 'Insufficient parameters',
    data: {}
  })
}

export const dbError = (err: unknown, res: Response): Response => {
  return res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'failure',
    message: 'MySQL database error',
    data: err
  })
}
