import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

export class Routes {
  private router = Router()

  constructor() {
    this.register()
  }

  private register(): void {
    this.router.post('/auth/register', authController.register)
    this.router.post('/auth/login', authController.login)
    if (process.env.NODE_ENV !== 'production') {
      this.router.get('/debug/users', authController.listUsers)
    }
  }

  public getRouter(): Router {
    return this.router
  }
}
