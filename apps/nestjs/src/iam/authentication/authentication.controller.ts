import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'

import { AuthenticationService } from '@app/iam/authentication/authentication.service'
import { SignInDto } from '@app/iam/authentication/dto/sign-in.dto'
import { SignUpDto } from '@app/iam/authentication/dto/sign-up.dto'
import { RefreshTokenDto } from '@app/iam/authentication/dto/refresh-token.dto'
import { GenerateTokensResponse } from '@app/iam/authentication/interfaces/generate-tokens-response.interface'
import { Auth } from '@app/iam/authentication/decorators/auth.decorator'
import { AuthType } from '@app/iam/authentication/enums/auth-type.enum'

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return await this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<GenerateTokensResponse> {
    return await this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto): Promise<GenerateTokensResponse> {
    return await this.authService.refreshTokens(refreshTokenDto)
  }
}
