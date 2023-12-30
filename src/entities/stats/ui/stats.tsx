import {useMemo} from 'react'
import {StatsItem} from './stats-item'
import {DEFAULT_STATS} from '../model/constants'

interface Props {
  time?: number
  items: number
  swaps: number
  comparisons: number
}

export function Stats({swaps, items, comparisons}: Props) {
  const stats = useMemo(
    () => ({
      time: '0:01s',
      items,
      swaps,
      comparisons
    }),
    [swaps, items, comparisons]
  )

  return (
    <div className="stats shadow border-neutral border">
      {DEFAULT_STATS.map(({title, value}) => (
        <StatsItem key={title} title={title} value={stats[value]} />
      ))}
    </div>
  )
}
