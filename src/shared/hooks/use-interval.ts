import {useRef, useEffect} from 'react'

export const useInterval = (callback: () => void = () => {}, isTicking: boolean) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (isTicking) timerRef.current = setInterval(callback, 1000)
    else clear()

    return clear
  }, [callback, isTicking])
}
