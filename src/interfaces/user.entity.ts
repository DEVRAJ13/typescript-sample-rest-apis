import bcrypt from 'bcrypt'
import { IUser } from './user.interface'

export class User {
  private _id?: number
  private _email: string
  private _password: string
  private _name: string
  private _role: 'ADMIN' | 'USER'
  private _createdAt?: Date

  constructor(data: IUser) {
    this._id = typeof data.id === 'bigint' ? Number(data.id) : data.id
    this._email = data.email
    this._password = data.password ?? ''
    this._name = (data as any).name ?? ''
    if (data.role === 'ADMIN' || data.role === 'USER') {
      this._role = data.role
    } else {
      this._role = 'USER'
    }
    this._createdAt = data.createdAt
  }

  // getters
  get id() { return this._id }
  get email() { return this._email }
  get name() { return this._name }
  get role() { return this._role }
  get createdAt() { return this._createdAt }

  // setters
  set password(value: string) {
    if (value.length < 6) throw new Error('Weak password')
    this._password = bcrypt.hashSync(value, 10)
  }

  async comparePassword(raw: string) {
    return bcrypt.compare(raw, this._password)
  }

  toPersistence() {
    return {
      email: this._email,
      password: this._password,
      name: this._name,
      role: this._role
    }
  }
}
