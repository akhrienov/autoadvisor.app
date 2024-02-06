import { Injectable, Inject, UnauthorizedException, ConflictException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { randomUUID } from 'crypto'

import { HashingService } from '@app/lib/hashing/hashing.service'
import { RefreshTokenIdsStorage } from '@app/iam/authentication/storages/refresh-token-ids.storage'
import { User } from '@app/resources/users/entities/user.entity'
import { SignInDto } from '@app/iam/authentication/dto/sign-in.dto'
import { SignUpDto } from '@app/iam/authentication/dto/sign-up.dto'
import { RefreshTokenDto } from '@app/iam/authentication/dto/refresh-token.dto'
import { SqlErrorCode } from '@app/db/postgres/enums/sql-error-code.enum'
import { ActiveUserData } from '@app/iam/authentication/interfaces/active-user-data.interface'
import { GenerateTokensResponse } from '@app/iam/authentication/interfaces/generate-tokens-response.interface'
import { InvalidateRefreshTokenException } from '@app/iam/authentication/exceptions/invalidate-refresh-token.exception'
import { ERROR_MESSAGES } from '@app/iam/authentication/authentication.constants'
import { jwtConfig } from '@app/config'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {}

  async signUp({ email, password }: SignUpDto): Promise<void> {
    try {
      const user: User = new User()

      user.email = email
      user.password = await this.hashingService.hash(password)

      await this.usersRepository.save(user)
    } catch (error) {
      if (error.code === SqlErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_CONFLICT)
      }

      throw error
    }
  }

  async signIn({ email, password }: SignInDto): Promise<GenerateTokensResponse> {
    const user: User | null = await this.usersRepository.findOneBy({ email })

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.CREDENTIALS_INCORRECT)
    }

    const isPasswordValid: boolean = await this.hashingService.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.CREDENTIALS_INCORRECT)
    }

    return await this.generateTokens(user)
  }

  async refreshTokens({ refreshToken }: RefreshTokenDto): Promise<GenerateTokensResponse> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
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

  async generateTokens(user: User): Promise<GenerateTokensResponse> {
    const refreshTokenId = randomUUID()
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
        role: user.role,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ])

    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId)

    return { accessToken, refreshToken }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T): Promise<any> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      }
    )
  }
}
