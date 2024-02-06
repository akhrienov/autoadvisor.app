import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { RedisModule } from '@app/db/redis/redis.module'
import { AuthenticationService } from '@app/iam/authentication/authentication.service'
import { HashingService } from '@app/lib/hashing/hashing.service'
import { BcryptService } from '@app/lib/hashing/bcrypt.service'
import { RefreshTokenIdsStorage } from '@app/iam/authentication/storages/refresh-token-ids.storage'
import { AuthenticationController } from '@app/iam/authentication/authentication.controller'
import { AccessTokenGuard } from '@app/iam/authentication/guards/access-token.guard'
import { AuthenticationGuard } from '@app/iam/authentication/guards/authentication.guard'
import { User } from '@app/resources/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, RedisModule],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
    AuthenticationService,
    RefreshTokenIdsStorage,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
