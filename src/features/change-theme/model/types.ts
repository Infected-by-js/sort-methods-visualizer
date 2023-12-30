export type Theme = 'light' | 'dark'

export type Context = {
  theme: Theme
  onToggleTheme: () => void
  setTheme: (theme: Theme) => void
}
