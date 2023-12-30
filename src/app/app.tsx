import {RootPage} from '@pages/root'
import {ThemeProvider} from '@features/change-theme'

export function App() {
  return (
    <ThemeProvider>
      <RootPage />
    </ThemeProvider>
  )
}
