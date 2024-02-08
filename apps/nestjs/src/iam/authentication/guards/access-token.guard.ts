import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { Request } from 'express'

import { jwtConfiguration } from '@app/config/configurations'
import { REQUEST_USER_KEY } from '@app/iam/constants'
import { ERROR_MESSAGES } from '@app/iam/authentication/constants'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromRequest(request)

    if (!token) {
      throw new UnauthorizedException(ERROR_MESSAGES.ACCESS_TOKEN_INVALID)
    }

    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verifyAsync(token, this.jwtConfig)
    } catch (err) {
      throw new UnauthorizedException(ERROR_MESSAGES.ACCESS_TOKEN_INVALID)
    }

    return true
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
