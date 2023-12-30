import {Icon} from '@shared/ui'
import {useTheme} from '../model/use-theme'

export function ThemeSwitch() {
  const {theme, onToggleTheme} = useTheme()

  return (
    <label className=" swap swap-rotate">
      <input type="checkbox" defaultChecked={theme === 'dark'} onClick={onToggleTheme} />
      <Icon name="moon" size="md" className="swap-on" />
      <Icon name="sun" size="md" className="swap-off" />
    </label>
  )
}
