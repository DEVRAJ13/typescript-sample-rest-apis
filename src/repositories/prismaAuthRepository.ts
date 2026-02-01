import { prisma } from '../config/prisma'
import { IAuthRepository } from '../interfaces/auth.interface'
import { User } from '../interfaces/user.entity'
import { IUser } from '../interfaces/user.interface'

export class PrismaAuthRepository implements IAuthRepository {
  async create(user: User): Promise<User> {
    const payload = user.toPersistence()

    const created = await prisma.users.create({
      data: {
        email: payload.email,
        password_hash: payload.password,
        full_name: payload.name ?? null,
        role: payload.role as any
      }
    })

    const data: IUser = {
      id: created.id,
      email: created.email,
      password: created.password_hash,
      fullName: created.full_name ?? undefined,
      role: created.role,
      createdAt: created.created_at
    }

    return new User(data as any)
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.users.findUnique({ where: { email } })
    if (!found) return null

    const data: IUser = {
      id: found.id,
      email: found.email,
      password: found.password_hash,
      fullName: found.full_name ?? undefined,
      role: found.role,
      createdAt: found.created_at
    }

    return new User(data as any)
  }
}

export const prismaAuthRepository = new PrismaAuthRepository()
