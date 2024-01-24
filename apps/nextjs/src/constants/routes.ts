interface Routes {
  ROOT: string
  AUTH_PAGE: {
    ROOT: string
  }
  DASHBOARD_PAGE: {
    ROOT: string
  }
}

export const ROUTES: Routes = {
  ROOT: '/',
  AUTH_PAGE: {
    ROOT: '/auth',
  },
  DASHBOARD_PAGE: {
    ROOT: '/dashboard',
  },
}
