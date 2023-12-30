import {TabsItem} from './tabs-item'
import {IconName} from '@shared/ui'

interface Tab {
  label: string
  value: string
  iconName: IconName
}

const tabs: Tab[] = [
  {label: 'Chart', value: 'chart', iconName: 'chart'},
  {label: 'Table', value: 'table', iconName: 'table'}
]

export function Tabs() {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {tabs.map(({label, value, iconName}) => (
        <TabsItem key={value} label={label} iconName={iconName} isActive={value === 'chart'} onClick={() => {}} />
      ))}
    </div>
  )
}
