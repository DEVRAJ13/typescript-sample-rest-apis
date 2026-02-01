import 'dotenv/config'
import { app } from './config/app';
import { env } from './config/env'
import { prisma } from './config/prisma'

export const startServer = () => {
  const server = app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`)
  })

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down...`)
    server.close(async () => {
      try {
        await prisma.$disconnect()
        console.log('Prisma disconnected')
      } catch (err) {
        console.error('Error disconnecting Prisma', err)
      } finally {
        process.exit(0)
      }
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

startServer()
