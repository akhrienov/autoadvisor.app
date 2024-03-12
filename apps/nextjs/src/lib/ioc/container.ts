import 'reflect-metadata'
import { Container } from 'inversify'

import { IUsersService } from '@services/users/interfaces/user-service.interface'
import { IAuthorizationService } from '@services/authorization/interfaces/authorization-service.interface'
import { UsersService } from '@services/users/users.service'
import { AuthorizationService } from '@services/authorization/authorization.service'

const container: Container = new Container()

container.bind<IUsersService>('IUsersService').to(UsersService).inSingletonScope()
container.bind<IAuthorizationService>('IAuthorizationService').to(AuthorizationService).inSingletonScope()

export { container }
