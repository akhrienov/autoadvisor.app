import { FC, HTMLAttributes } from 'react'

import { ThemeColors } from '@/types'

const COLOR_MAP: Record<ThemeColors, string> = {
  [ThemeColors.DEFAULT]: '',
  [ThemeColors.PRIMARY]: 'bg-primary/10 text-primary ring-primary/20',
  [ThemeColors.SECONDARY]: 'bg-secondary/10 text-secondary ring-secondary/20',
  [ThemeColors.ACCENT]: 'bg-accent/10 text-accent ring-accent/20',
  [ThemeColors.INFO]: 'bg-info/10 text-info ring-info/20',
  [ThemeColors.SUCCESS]: 'bg-success/10 text-success ring-success/20',
  [ThemeColors.WARNING]: 'bg-warning/10 text-warning ring-warning/20',
  [ThemeColors.ERROR]: 'bg-error/10 text-error ring-error/20',
}

type BadgeProps = {
  themeColor: ThemeColors
} & HTMLAttributes<HTMLSpanElement>

const Badge: FC<BadgeProps> = ({ themeColor = ThemeColors.DEFAULT, children, ...props }) => {
  const layoutClasses: string = 'rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset'
  const finalClasses: string = `${layoutClasses} ${COLOR_MAP[themeColor]}`

  return (
    <span className={finalClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge
