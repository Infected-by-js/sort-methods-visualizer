import {SortAsyncGenerator} from './types'

export interface SortHelper {
  delay(): Promise<void>
  shuffle(array: number[]): number[]
  swap(array: number[], ...positions: number[]): SortAsyncGenerator
  compare(...positions: number[]): SortAsyncGenerator
  sort(position: number): SortAsyncGenerator
}

export class SortHelper implements SortHelper {
  private delayGetter: () => number

  constructor(delayGetter: () => number) {
    this.delayGetter = delayGetter.bind(this)
  }

  delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delayGetter()))
  }

  shuffle(array: number[]): number[] {
    const arrayCopy = [...array]

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
    }

    return arrayCopy
  }

  async *swap(array: number[], indexA: number, indexB: number): SortAsyncGenerator {
    yield {action: 'swap', positions: [indexA, indexB], type: 'start'}
    await this.delay()
    ;[array[indexA], array[indexB]] = [array[indexB], array[indexA]]

    yield {action: 'swap', positions: [indexA, indexB], type: 'end'}
    await this.delay()
  }

  async *compare(...positions: number[]): SortAsyncGenerator {
    yield {action: 'compare', positions, type: 'start'}
    await this.delay()
    yield {action: 'compare', positions, type: 'end'}
    await this.delay()
  }

  async *sort(position: number): SortAsyncGenerator {
    yield {action: 'sort', position}
  }
}
