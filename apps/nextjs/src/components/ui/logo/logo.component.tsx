'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Badge from '@components/ui/badge'
import { ThemeColor } from '@/enums/theme-color.enum'
import { ROUTES } from '@/constants/routes.constants'

const Logo = () => {
  const router = useRouter()

  const handleClick = (): void => {
    router.push(ROUTES.ROOT)
  }

  return (
    <div className="flex items-center gap-3 hover:cursor-pointer" onClick={handleClick}>
      <Image src="/images/logo.png" alt="AutoAdvisor" width={40} height={40} />
      <Badge themeColor={ThemeColor.ACCENT}>alpha</Badge>
    </div>
  )
}

export default Logo
