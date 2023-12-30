import {twMerge} from 'tailwind-merge'
import {ReactNode, HTMLProps} from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  tooltip?: string
  tooltipClassName?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  className?: string
}

export function Button({children, tooltip, className, tooltipClassName, ...rest}: Props) {
  return tooltip ? (
    <div className={twMerge('tooltip', tooltipClassName)} data-tip={tooltip}>
      <button className={twMerge('btn btn-sm', className)} {...rest}>
        {children}
      </button>
    </div>
  ) : (
    <button className={twMerge('btn btn-sm', className)} {...rest}>
      {children}
    </button>
  )
}
