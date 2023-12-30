export type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
export type IconName = 'moon' | 'sun' | 'play' | 'pause' | 'shuffle' | 'chart' | 'table' | 'reset'

export type IconProps = {
  className?: string
}

export type Icons = {
  [key in IconName]: React.ComponentType<IconProps>
}
