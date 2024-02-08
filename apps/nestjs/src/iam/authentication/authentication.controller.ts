import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'

import { AuthenticationService } from '@app/iam/authentication/authentication.service'
import { SignInDto } from '@app/iam/authentication/dto/sign-in.dto'
import { SignUpDto } from '@app/iam/authentication/dto/sign-up.dto'
import { RefreshTokenDto } from '@app/iam/authentication/dto/refresh-token.dto'
import { Auth } from '@app/iam/authentication/decorators/auth.decorator'
import { AuthType } from '@app/iam/authentication/enums/auth-type.enum'

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto)
  }
}
