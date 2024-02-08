import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HashingModule } from '@app/lib/hashing/hashing.module'
import { UsersService } from '@app/resources/users/users.service'
import { UsersController } from '@app/resources/users/users.controller'
import { HashingProvider } from '@app/lib/hashing/enums/hashing-provider.enum'
import { User } from '@app/resources/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule.register(HashingProvider.BCRYPT)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
