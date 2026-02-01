import { Request, Response } from 'express'
import { insufficientParameters, successResponse, failureResponse } from '../helpers/handler'
import { authService } from '../services/auth.service'
import { prisma } from '../config/prisma'

export class AuthController {
  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password, name } = req.body
      if (!email || !password) return insufficientParameters(res)

      const user = await authService.register({ email, password, name })
      return successResponse('User registered', user, res)
    } catch (err) {
      return failureResponse('Registration failed', { message: (err as Error).message }, res)
    }
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body
      if (!email || !password) return insufficientParameters(res)

      const data = await authService.login({ email, password })
      return successResponse('Login successful', data, res)
    } catch (err) {
      return failureResponse('Login failed', { message: (err as Error).message }, res)
    }
  }

  // Dev-only: list users from DB
  public listUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await prisma.users.findMany({ select: { id: true, email: true, full_name: true, role: true, created_at: true } })
      return successResponse('Users list', users, res)
    } catch (err) {
      return failureResponse('Failed to fetch users', { message: (err as Error).message }, res)
    }
  }
}

export const authController = new AuthController()
