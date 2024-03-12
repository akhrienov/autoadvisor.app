import { BaseEntity } from '@/interfaces/base-entity.interface'

export interface User extends BaseEntity {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
}
