import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { HashingService } from '@app/lib/hashing/hashing.service'
import { CreateUserDto } from '@app/resources/users/dto/create-user.dto'
import { UpdateUserDto } from '@app/resources/users/dto/update-user.dto'
import { User } from '@app/resources/users/entities/user.entity'
import { SqlErrorCode } from '@app/db/postgres/enums/sql-error-code.enum'
import { ERROR_MESSAGES } from '@app/resources/users/users.constants'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService
  ) {}

  async create({ email, password }: CreateUserDto): Promise<User> {
    try {
      const user: User = new User()

      user.email = email
      user.password = await this.hashingService.hash(password)

      await this.usersRepository.save(user)

      return user
    } catch (error) {
      if (error.code === SqlErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_CONFLICT)
      }

      throw error
    }
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
