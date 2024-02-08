import { IsEmail, MinLength } from 'class-validator'

import { MIN_PASSWORD_LENGTH } from '@app/resources/users/users.constants'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(MIN_PASSWORD_LENGTH)
  password: string
}
