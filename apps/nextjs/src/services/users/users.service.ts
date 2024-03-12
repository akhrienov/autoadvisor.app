import { injectable } from 'inversify'
import { IUsersService } from '@services/users/interfaces/user-service.interface'

@injectable()
export class UsersService implements IUsersService {
  async createUser(): Promise<void> {
    // TODO: Implement this method
    console.log('Creating user')
  }
}
