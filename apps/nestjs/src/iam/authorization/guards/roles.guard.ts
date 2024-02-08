import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

import { ROLES_KEY } from '@app/iam/authorization/decorators/roles.decorator'
import { REQUEST_USER_KEY } from '@app/iam/constants'
import { Role } from '@app/resources/users/enums/role.enum'
import { ActiveUserData } from '@app/iam/interfaces/active-user-data.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!contextRoles) {
      return true
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY]

    return contextRoles.some((role: Role): boolean => user.role === role)
  }
}
