export type SortMethodName = 'bubble'

export type SortProcessAction = {
  action: 'swap' | 'compare'
  positions: number[]
  type: 'start' | 'end'
}

export type SortEventAction = {
  action: 'sort'
  position: number
}

export type SortStateAction = {
  action: 'begin' | 'end' | 'error'
}

export type SortStep = SortProcessAction | SortEventAction | SortStateAction

export type SortAsyncGenerator = AsyncGenerator<SortStep, void | number, unknown>

export type SortEventCallback = (data: number[]) => Promise<void> | void
export type SortStepCallback = (step: SortProcessAction | SortEventAction) => Promise<void> | void
export type SortErrorCallback = () => Promise<void> | void
