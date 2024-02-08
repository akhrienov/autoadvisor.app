import { Injectable, Inject, UnauthorizedException, ConflictException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { randomUUID } from 'crypto'
import { plainToClass } from 'class-transformer'

import { HashingService } from '@app/lib/hashing/hashing.service'
import { RefreshTokenIdsStorage } from '@app/iam/authentication/storages/refresh-token-ids.storage'
import { User } from '@app/resources/users/entities/user.entity'
import { UserDto } from '@app/resources/users/dto/user.dto'
import { SignInDto } from '@app/iam/authentication/dto/sign-in.dto'
import { SignUpDto } from '@app/iam/authentication/dto/sign-up.dto'
import { RefreshTokenDto } from '@app/iam/authentication/dto/refresh-token.dto'
import { SqlErrorCode } from '@app/db/postgres/enums/sql-error-code.enum'
import { ActiveUserData } from '@app/iam/interfaces/active-user-data.interface'
import { InvalidateRefreshTokenException } from '@app/iam/authentication/exceptions/invalidate-refresh-token.exception'
import { ERROR_MESSAGES } from '@app/iam/authentication/constants'
import { jwtConfiguration } from '@app/config/configurations'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {}

  async signUp({ email, password }: SignUpDto) {
    try {
      const user: User = new User()

      user.email = email
      user.password = await this.hashingService.hash(password)

      await this.usersRepository.save(user)

      const userDto: UserDto = plainToClass(UserDto, user, { excludeExtraneousValues: true })
      const tokens = await this.generateTokens(user)

      return {
        user: userDto,
        tokens,
      }
    } catch (error) {
      if (error.code === SqlErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_CONFLICT)
      }

      throw error
    }
  }

  async signIn({ email, password }: SignInDto) {
    const user: User | null = await this.usersRepository.findOneBy({ email })

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.CREDENTIALS_INCORRECT)
    }

    const isPasswordValid: boolean = await this.hashingService.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.CREDENTIALS_INCORRECT)
    }

    const userDto: UserDto = plainToClass(UserDto, user, { excludeExtraneousValues: true })
    const tokens = await this.generateTokens(user)

    return {
      user: userDto,
      tokens,
    }
  }

  async refreshTokens({ refreshToken }: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshToken, {
        secret: this.jwtConfig.secret,
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
      })

      const user: User = await this.usersRepository.findOneByOrFail({ id: sub })
      const isValid: boolean = await this.refreshTokenIdsStorage.validate(user.id, refreshTokenId)

      if (!isValid) {
        throw new UnauthorizedException(ERROR_MESSAGES.REFRESH_TOKEN_INVALID)
      }

      await this.refreshTokenIdsStorage.invalidate(user.id)

      return await this.generateTokens(user)
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenException) {
        throw new UnauthorizedException(ERROR_MESSAGES.REFRESH_TOKEN_INVALID)
      }

      throw new UnauthorizedException()
    }
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID()
    const [access, refresh] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfig.accessTokenTtl, {
        email: user.email,
        role: user.role,
      }),
      this.signToken(user.id, this.jwtConfig.refreshTokenTtl, {
        refreshTokenId,
      }),
    ])

    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId)

    return { access, refresh }
  }

  private async signToken<T>(userId: string, expiresIn: number | string, payload?: T): Promise<any> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
        secret: this.jwtConfig.secret,
        expiresIn,
      }
    )
  }
}
