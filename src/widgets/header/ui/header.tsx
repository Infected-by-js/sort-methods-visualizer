import {ThemeSwitch} from '@features/change-theme'
import {twMerge} from 'tailwind-merge'

interface HeaderProps {
  className?: string
}

export function Header({className}: HeaderProps) {
  return (
    <header className={twMerge('w-full flex items-center justify-between bg-base-100 px-4 py-2', className)}>
      <h1 className="uppercase text-md">Sort Algorithms Visualizer</h1>

      <ThemeSwitch />
    </header>
  )
}
