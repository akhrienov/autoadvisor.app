import { FC } from 'react'
import * as HeroIconsOutline from '@heroicons/react/24/outline'
import * as HeroIconsSolid from '@heroicons/react/24/solid'

export enum HeroIconTypes {
  OUTLINE,
  SOLID,
}

type HeroIconProps = {
  icon: string
  type: HeroIconTypes
  className?: string
}

const HeroIcon: FC<HeroIconProps> = ({
  icon = 'LockClosedIcon',
  type = HeroIconTypes.OUTLINE,
  className = '',
}): JSX.Element => {
  const { ...heroiconsOutline } = HeroIconsOutline
  const { ...heroiconsSolid } = HeroIconsSolid

  // @ts-ignore
  const Icon = type === HeroIconTypes.OUTLINE ? heroiconsOutline[icon] : heroiconsSolid[icon]

  return <Icon className={className} />
}

export default HeroIcon
