import { PrismaClient } from '@prisma/client'

class PrismaService {
  private static instance: PrismaClient

  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient()
    }
    return this.instance
  }
}

export const prisma = PrismaService.getInstance()
