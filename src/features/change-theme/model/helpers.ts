import {Storage} from '@shared/lib/persist-storage'
import {isNull} from '@shared/lib/type-guards'
import {Theme} from './types'

export const applyTheme = (theme: Theme) => {
  const root = document.querySelector('html') as HTMLElement

  root.dataset.theme = theme

  Storage.setItem('theme', theme)
}

export const stateInitializer = (initialTheme: Theme = 'light'): Theme => {
  const theme = Storage.getItem<Theme>('theme')

  return isNull(theme) ? initialTheme : theme
}
