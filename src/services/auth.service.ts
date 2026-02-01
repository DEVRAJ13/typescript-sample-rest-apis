import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/user.interface'
import { User } from '../interfaces/user.entity'
import { IAuthRepository } from '../interfaces/auth.interface'
import { prismaAuthRepository } from '../repositories/prismaAuthRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export interface RegisterDto {
  email: string
  password: string
  name?: string
}

export interface LoginDto {
  email: string
  password: string
}

export class AuthService {
  private repo: IAuthRepository

  constructor(repo: IAuthRepository = prismaAuthRepository) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set. AuthService requires a database connection.')
    }
    this.repo = repo
  }

  async register(payload: RegisterDto) {
    const existing = await this.repo.findByEmail(payload.email)
    if (existing) throw new Error('User already exists')

    const userData: IUser = {
      email: payload.email,
      password: payload.password as any,
      role: 'USER' as any
    }

    const user = new User(userData)
    // ensure password is hashed and validated
    user.password = payload.password

    const created = await this.repo.create(user)
    return {
      id: created.id,
      email: created.email,
      name: created.name,
      createdAt: created.createdAt
    }
  }

  async login(payload: LoginDto) {
    const user = await this.repo.findByEmail(payload.email)
    if (!user) throw new Error('Invalid credentials')

    const ok = await user.comparePassword(payload.password)
    if (!ok) throw new Error('Invalid credentials')

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    return { token }
  }
}

export const authService = new AuthService()
