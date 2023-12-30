import {useState, useCallback, useMemo} from 'react'
import {useInterval} from './use-interval'

type State = 'idle' | 'running' | 'paused'

type UseTimer = {
  state: State
  elapsedTime: number
  isTicking: boolean
  start: () => void
  pause: () => void
  reset: () => void
}

export const useTimer = (): UseTimer => {
  const [state, setState] = useState<State>('idle')
  const [elapsedTime, setElapsedTime] = useState(0)

  const isTicking = useMemo(() => state === 'running', [state])

  useInterval(() => {
    if (state === 'running') setElapsedTime((prev) => prev + 1)
  }, isTicking)

  const start = useCallback(() => setState('running'), [])
  const pause = useCallback(() => setState('paused'), [])
  const reset = useCallback(() => {
    setState('idle')
    setElapsedTime(0)
  }, [])

  return {
    state,
    elapsedTime,
    isTicking,
    start,
    pause,
    reset
  }
}
