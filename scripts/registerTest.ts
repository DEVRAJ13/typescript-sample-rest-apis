import 'dotenv/config'
import { authService } from '../src/services/auth.service'

async function run() {
  try {
    const res = await authService.register({ email: 'cli-test@example.com', password: 'secret123' })
    console.log('Registered:', res)
  } catch (err) {
    console.error('Error:', (err as Error).message)
  }
}

run()
