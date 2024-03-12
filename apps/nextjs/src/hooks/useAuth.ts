import { container } from '@lib/ioc/container'

import { IUsersService } from '@services/users/interfaces/user-service.interface'

export const useAuth = () => {
  const usersService: IUsersService = container.get<IUsersService>('IUsersService')
  const user = {} // auth.getUser()

  const login = async (email: string, password: string) => {
    // const user = await auth.login(email, password)
    // setUser(user)
  }

  const signup = async (email: string, password: string) => {
    // await auth.logout()
    // setUser(null)
    await usersService.createUser()
  }

  const logout = async () => {
    // await auth.logout()
    // setUser(null)
  }

  return { user, login, signup, logout }
}
