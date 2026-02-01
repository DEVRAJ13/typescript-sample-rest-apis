import express, { Application } from 'express';
import cors from 'cors'
import { Routes } from '../routes/route';

class App {
  public app: Application
  private routes: Routes

  constructor() {
    this.app = express()
    this.routes = new Routes()

    this.config()
    this.registerRoutes()
  }

  private config(): void {
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    )
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private registerRoutes(): void {
    this.app.use(this.routes.getRouter())
  }
}

export default App

export const app = new App().app
