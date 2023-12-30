import {FC, PropsWithChildren, useEffect, useMemo, useState} from 'react'
import {Theme} from './types'
import {applyTheme, stateInitializer} from './helpers'
import {ThemeContext} from './theme-context'

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(stateInitializer)

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      onToggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
    }),
    [theme]
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
