import { Reflector } from '@nestjs/core'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'

import { AccessTokenGuard } from '@app/iam/authentication/guards/access-token.guard'
import { AuthType } from '@app/iam/authentication/enums/auth-type.enum'
import { AUTH_TYPE_KEY } from '@app/iam/authentication/decorators/auth.decorator'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType: AuthType.Bearer = AuthType.Bearer
  private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: (): boolean | Promise<boolean> | Observable<boolean> => true },
  }

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes: AuthType[] = this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType]
    const guards: CanActivate[] = authTypes.map((type: AuthType) => this.authTypeGuardMap[type]).flat()
    let error: UnauthorizedException = new UnauthorizedException()

    for (const instance of guards) {
      const canActivate: boolean | void | Observable<boolean> = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err): void => {
        error = err
      })

      if (canActivate) {
        return true
      }
    }

    throw error
  }
}
