import { User } from '@services/users/interfaces/user.interface'
import { AuthTokens } from '@services/authorization/interfaces/auth-tokens.interface'

export interface SignupData {
  user: User
  tokens: AuthTokens
}
