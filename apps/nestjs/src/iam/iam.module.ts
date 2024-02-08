import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { RedisModule } from '@app/db/redis/redis.module'
import { HashingModule } from '@app/lib/hashing/hashing.module'
import { AuthenticationService } from '@app/iam/authentication/authentication.service'
import { RefreshTokenIdsStorage } from '@app/iam/authentication/storages/refresh-token-ids.storage'
import { AuthenticationController } from '@app/iam/authentication/authentication.controller'
import { AccessTokenGuard } from '@app/iam/authentication/guards/access-token.guard'
import { AuthenticationGuard } from '@app/iam/authentication/guards/authentication.guard'
import { RolesGuard } from '@app/iam/authorization/guards/roles.guard'
import { HashingProvider } from '@app/lib/hashing/enums/hashing-provider.enum'
import { User } from '@app/resources/users/entities/user.entity'
import { UsersModule } from '@app/resources/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,
    RedisModule,
    HashingModule.register(HashingProvider.BCRYPT),
    UsersModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AccessTokenGuard,
    AuthenticationService,
    RefreshTokenIdsStorage,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
