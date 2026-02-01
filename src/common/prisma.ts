import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

export function getPrisma(): PrismaClient {
	if (!prisma) {
		// ensure DATABASE_URL is provided before constructing client
		if (!process.env.DATABASE_URL) {
			throw new Error('Missing DATABASE_URL; Prisma client cannot be initialized')
		}
		prisma = new PrismaClient()
	}
	return prisma
}

export default getPrisma
