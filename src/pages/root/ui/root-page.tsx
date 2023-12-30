import {SortMethodName, Sorter} from '@shared/lib/sorter'
import {Button, Combobox, Icon, Tabs, Range} from '@shared/ui'
import {Header} from '@widgets/header'
import {Stats} from '@entities/stats'
import {useEffect, useRef, useState} from 'react'
import {sortingAlgorithms, itemsCountLimits} from '../model/constants'

type Item = {
  id: string
  value: number
  isSelected: boolean
  isComparing: boolean
  isSwapping: boolean
}

const generateArray = (length: number): number[] => {
  return Array.from({length}, () => Math.floor(Math.random() * 100))
}

const generateElements = (values: number[]): Item[] => {
  return values.map((value, inx) => ({
    id: `${value}_${inx}`,
    value,
    isSelected: false,
    isComparing: false,
    isSwapping: false
  }))
}

export function RootPage() {
  const [method, setMethod] = useState<SortMethodName>('bubble')
  const [itemsCount, setItemsCount] = useState(+itemsCountLimits[0].value)
  const [array, setArray] = useState(() => generateElements(generateArray(itemsCount)))
  const [delay, setDelay] = useState(500)
  const [isPaused, setIsPaused] = useState(true)

  const [swaps, setSwaps] = useState(0)
  const [comparisons, setComparisons] = useState(0)

  const sorter = useRef(new Sorter())

  useEffect(() => {
    sorter.current.setMethod(method)
    sorter.current.setData(array.map((item) => item.value))
    sorter.current.setDelay(delay)
  }, [array, method, delay])

  useEffect(() => {
    sorter.current.onStep((step) => {
      console.log(step)
      if (step.action === 'compare') {
        const [indexA, indexB] = step.positions
        const isStart = step.type === 'start'

        setArray((prev) => {
          const newArray = [...prev]

          newArray[indexA].isComparing = isStart
          newArray[indexB].isComparing = isStart

          return newArray
        })

        if (isStart) setComparisons((prev) => prev + 1)
      } else if (step.action === 'swap') {
        const [indexA, indexB] = step.positions
        const isStart = step.type === 'start'

        if (isStart) {
          setArray((prev) => {
            const newArray = [...prev]

            newArray[indexA].isSwapping = isStart
            newArray[indexB].isSwapping = isStart

            return newArray
          })
        } else {
          setArray((prev) => {
            const newArray = [...prev]
            ;[newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]]

            return newArray
          })

          setArray((prev) => {
            const newArray = [...prev]

            newArray[indexA].isSwapping = isStart
            newArray[indexB].isSwapping = isStart

            return newArray
          })

          setSwaps((prev) => prev + 1)
        }
      } else if (step.action === 'sort') {
        setArray((prev) => {
          const newArray = [...prev]

          newArray[step.position].isSelected = true

          return newArray
        })
      }
    })

    sorter.current.onStarted((items) => {
      console.log('started', items)

      setIsPaused(false)
    })

    sorter.current.onPaused((items) => {
      console.log('paused', items)
      setIsPaused(true)
    })

    sorter.current.onEnded((items) => {
      console.log('ended', items)
      setIsPaused(true)
    })

    sorter.current.onReset((originalArray) => {
      setArray(generateElements(originalArray))
      setSwaps(0)
      setComparisons(0)
    })
  }, [])

  const onToggleSort = () => {
    isPaused ? sorter.current.start() : sorter.current.pause()

    setIsPaused(!isPaused)
  }

  const onSelectMethod = (method: SortMethodName) => {
    setMethod(method)
  }

  const onSelectItemsCount = (itemsCount: string) => {
    setSwaps(0)
    setComparisons(0)
    setArray(generateElements(generateArray(+itemsCount)))
  }

  return (
    <>
      <Header />

      <div className="mx-auto px-4 py-2 mt-10 max-w-4xl">
        <div className="flex justify-between items-end">
          <Stats swaps={swaps} comparisons={comparisons} items={array.length} />
          <Tabs />
        </div>

        <div className="mt-10  grid grid-cols-2 gap-10  items-end justify-between">
          <div className="flex gap-8 items-end">
            <Combobox title="Sorting Algorithm:" items={sortingAlgorithms} onSelectItem={onSelectMethod} />
            <Combobox title="Items Count:" items={itemsCountLimits} onSelectItem={onSelectItemsCount} />
            <Range title="Speed" min={1} max={10} step={1} value={delay / 100} onChange={(v) => setDelay(v * 100)} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              tooltip={isPaused ? 'Start' : 'Pause'}
              tooltipClassName="tooltip-primary"
              onClick={onToggleSort}
              className="btn-primary w-24"
            >
              {isPaused ? <Icon size="md" name="play" /> : <Icon size="md" name="pause" />}
            </Button>

            <Button tooltip="Reset" onClick={sorter.current.reset} className="btn-outline w-12">
              <Icon size="md" name="reset" />
            </Button>

            <Button tooltip="Shuffle" onClick={sorter.current.shuffle} className="btn-outline w-12">
              <Icon size="md" name="shuffle" />
            </Button>
          </div>
        </div>

        <div className="mt-6 w-full h-80 bg-base-300 rounded-md flex items-center justify-center gap-4">
          {array.map((item) => (
            <div
              key={item.id}
              className="border p-4 border-red-600 flex items-center justify-center"
              style={{
                backgroundColor: item.isSelected
                  ? 'yellow'
                  : item.isComparing
                  ? 'green'
                  : item.isSwapping
                  ? 'blue'
                  : 'transparent'
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
