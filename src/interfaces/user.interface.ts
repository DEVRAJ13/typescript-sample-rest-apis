import { users_role, users_device_type, users_notify_status } from '@prisma/client'

export interface IUser {
  id?: bigint
  email: string
  password?: string
  passwordHash?: string
  fullName?: string
  companyName?: string
  role: users_role
  phoneNo?: string
  timezone?: string
  deviceType?: users_device_type
  notifyStatus?: users_notify_status
  createdAt?: Date
}
