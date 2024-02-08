import { Exclude, Expose } from 'class-transformer'

export class UserDto {
  @Expose()
  id: string

  @Expose()
  firstName: string | null

  @Expose()
  lastName: string | null

  @Expose()
  email: string

  @Exclude()
  password: string

  @Expose()
  phone: string | null

  @Expose()
  role: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Exclude()
  deletedAt: Date

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
}
