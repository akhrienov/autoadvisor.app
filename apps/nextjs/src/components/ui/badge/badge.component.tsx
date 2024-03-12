import { FC, HTMLAttributes } from 'react'
import { ThemeColor } from '@/enums/theme-color.enum'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  themeColor: ThemeColor
}

const COLOR_MAP: Record<ThemeColor, string> = {
  [ThemeColor.DEFAULT]: '',
  [ThemeColor.PRIMARY]: 'bg-primary/10 text-primary ring-primary/20',
  [ThemeColor.SECONDARY]: 'bg-secondary/10 text-secondary ring-secondary/20',
  [ThemeColor.ACCENT]: 'bg-accent/10 text-accent ring-accent/20',
  [ThemeColor.INFO]: 'bg-info/10 text-info ring-info/20',
  [ThemeColor.SUCCESS]: 'bg-success/10 text-success ring-success/20',
  [ThemeColor.WARNING]: 'bg-warning/10 text-warning ring-warning/20',
  [ThemeColor.ERROR]: 'bg-error/10 text-error ring-error/20',
}

const Badge: FC<BadgeProps> = ({ themeColor = ThemeColor.DEFAULT, children, ...props }) => {
  const layoutClasses: string = 'rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset'
  const finalClasses: string = `${layoutClasses} ${COLOR_MAP[themeColor]}`

  return (
    <span className={finalClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge
