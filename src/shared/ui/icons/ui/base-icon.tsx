import {twMerge} from 'tailwind-merge'
import type {IconName, IconSize} from '../model/types'
import {icons} from '../model/icons-list'

type BaseIconProps = {
  name: IconName
  size?: IconSize
  className?: string
}

const iconSizeToClassName: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  xxs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

export function BaseIcon({name, size = 'md', className}: BaseIconProps) {
  const Icon = icons[name]

  if (!Icon) {
    console.error(`Icon "${name}" not exist`)
    return null
  }

  return <Icon className={twMerge(iconSizeToClassName[size], className)} />
}
