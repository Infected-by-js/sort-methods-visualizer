import {SortAsyncGenerator, SortMethodName} from './types'
import {SortHelper} from './sort-helper'

export interface SortMethodStrategy {
  sort(method: SortMethodName, array: number[]): SortAsyncGenerator
}

export class SortMethodStrategy {
  private sortAlgorithms: Record<SortMethodName, (array: number[]) => SortAsyncGenerator>

  constructor(private sortHelper: SortHelper) {
    this.sortHelper = sortHelper

    this.sortAlgorithms = {
      bubble: this.bubbleSort.bind(this)
    }
  }

  public async *sort(method: SortMethodName, array: number[]): SortAsyncGenerator {
    if (this.sortAlgorithms[method]) {
      yield* this.sortAlgorithms[method](array)
    } else {
      console.error(`Sorting method '${method}' not supported.`)
    }
  }

  private async *bubbleSort(array: number[]): SortAsyncGenerator {
    let i, j

    for (i = 0; i < array.length; i++) {
      for (j = 0; j < array.length - i - 1; j++) {
        yield* this.sortHelper.compare(j, j + 1)

        if (array[j] > array[j + 1]) {
          yield* this.sortHelper.swap(array, j, j + 1)
        }
      }

      yield* this.sortHelper.sort(j)
    }
  }
}
