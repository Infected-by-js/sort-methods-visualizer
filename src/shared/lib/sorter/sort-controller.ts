import {SortAsyncGenerator, SortMethodName, SortStep} from './types'
import {SortHelper} from './sort-helper'
import {SortMethodStrategy} from './sort-method-strategy'

type SortEventHandler = (action: SortStep, delay: () => Promise<void>) => Promise<void>

export interface SortController {
  init(method: SortMethodName, array: number[]): Promise<void>
  destroy(): void
  runSort(): Promise<void>
  pauseSort(): Promise<void>
  shuffle(array: number[]): number[]
  isPaused: boolean
}

export class SortController implements SortController {
  private sortHelper: SortHelper
  private sortMethodStrategy: SortMethodStrategy
  private sortEventHandler: (step: SortStep) => Promise<void>
  private resumePromise: () => void = () => {}
  private generator: SortAsyncGenerator | null = null
  public isPaused: boolean = false

  constructor(eventHandler: SortEventHandler, delayGetter: () => number) {
    this.sortHelper = new SortHelper(delayGetter)
    this.sortMethodStrategy = new SortMethodStrategy(this.sortHelper)

    this.sortEventHandler = async (step: SortStep) => {
      await eventHandler.call(this, step, this.sortHelper.delay.bind(this.sortHelper))
    }
  }

  private async waitToResume(): Promise<void> {
    return new Promise((resolve) => {
      this.resumePromise = resolve
    })
  }

  public async init(method: SortMethodName, array: number[]): Promise<void> {
    try {
      this.generator = this.sortMethodStrategy.sort(method, array)

      await this.sortEventHandler({action: 'begin'})

      let step = await this.generator!.next()

      while (!step.done) {
        if (this.isPaused) await this.waitToResume()

        await this.sortEventHandler(step.value)
        step = await this.generator!.next()
      }

      await this.sortEventHandler({action: 'end'})
      this.pauseSort()
    } catch {
      this.sortEventHandler({action: 'error'})
    }
  }

  public destroy() {
    this.isPaused = false
    this.resumePromise = () => {}
    this.generator?.return()
    this.generator = null
  }

  public async runSort(): Promise<void> {
    if (!this.isPaused) return

    this.isPaused = false
    this.resumePromise()
  }

  public async pauseSort(): Promise<void> {
    if (this.isPaused) return
    this.isPaused = true
  }

  public shuffle(array: number[]): number[] {
    return this.sortHelper.shuffle(array)
  }
}
