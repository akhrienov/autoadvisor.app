import { FC, ButtonHTMLAttributes } from 'react'

export enum ButtonSize {
  XS,
  SM,
  LG,
}

export enum ButtonColorScheme {
  PRIMARY,
  SECONDARY,
  SLATE_200,
  SLATE_800,
  ACCENT,
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

const COLOR_MAP = {
  [ButtonColorScheme.PRIMARY]: 'btn-primary',
  [ButtonColorScheme.SECONDARY]: 'btn-secondary',
  [ButtonColorScheme.SLATE_200]: 'btn-slate-200',
  [ButtonColorScheme.SLATE_800]: 'btn-slate-800',
  [ButtonColorScheme.ACCENT]: 'btn-accent',
  [ButtonColorScheme.INFO]: 'btn-info',
  [ButtonColorScheme.SUCCESS]: 'btn-success',
  [ButtonColorScheme.WARNING]: 'btn-warning',
  [ButtonColorScheme.ERROR]: 'btn-error',
}

const SIZE_MAP = {
  [ButtonSize.XS]: 'btn-xs',
  [ButtonSize.SM]: 'btn-sm',
  [ButtonSize.LG]: 'btn-lg',
}

type ButtonProps = {
  colorScheme?: ButtonColorScheme
  size?: ButtonSize
  block?: boolean
  outline?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ colorScheme, size, block = false, outline = false, children, ...props }) => {
  const layoutClass: string = 'btn'
  const colorClass: string = colorScheme ? COLOR_MAP[colorScheme] : 'btn-primary'
  const sizeClass: string = size ? SIZE_MAP[size] : ''
  const outlineClass: string = outline ? 'btn-outline' : ''
  const blockClass: string = block ? 'btn-block' : ''

  return (
    <button className={`${layoutClass} ${colorClass} ${sizeClass} ${outlineClass} ${blockClass}`} {...props}>
      {children}
    </button>
  )
}

export default Button
