import { ApiSuccessResponse } from '@/interfaces/api-responses.interface'
import { SignupData } from '@services/authorization/interfaces/signup-data.interface'

export interface IAuthorizationService {
  login(email: string, password: string): Promise<any>
  logout(): Promise<void>
  signup(email: string, password: string): Promise<ApiSuccessResponse<SignupData>>
}
