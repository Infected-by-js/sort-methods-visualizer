import {twMerge} from 'tailwind-merge'
import {Icon, IconName} from '@shared/ui'

interface Props {
  iconName: IconName
  label: string
  isActive: boolean
  onClick: () => void
}

export function TabsItem({iconName, label, isActive, onClick}: Props) {
  return (
    <a onClick={onClick} role="tab" className={twMerge('tab space-x-2', isActive ? 'tab-active' : '')}>
      <Icon size="sm" name={iconName} />
      <span>{label}</span>
    </a>
  )
}
