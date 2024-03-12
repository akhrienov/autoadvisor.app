import { injectable } from 'inversify'
import { IAuthorizationService } from '@services/authorization/interfaces/authorization-service.interface'
import { ApiSuccessResponse } from '@/interfaces/api-responses.interface'
import { SignupData } from '@services/authorization/interfaces/signup-data.interface'

@injectable()
export class AuthorizationService implements IAuthorizationService {
  async login(email: string, password: string): Promise<any> {
    console.log('Logging in')
  }

  async logout(): Promise<void> {
    console.log('Logging out')
  }

  async signup(email: string, password: string): Promise<ApiSuccessResponse<SignupData>> {
    console.log('Signing up')
  }
}
