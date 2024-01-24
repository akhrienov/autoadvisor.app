import ThemeSwitcher from '@/components/ui/theme-switcher/theme-switcher.component'
import Logo from '@/components/ui/logo/logo.component'

const NavBar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1 items-start">
          <Logo />
        </div>
        <div className="flex flex-1 justify-end">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
