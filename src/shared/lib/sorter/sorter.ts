import {SortController} from './sort-controller'
import {
  SortErrorCallback,
  SortEventAction,
  SortEventCallback,
  SortMethodName,
  SortProcessAction,
  SortStep,
  SortStepCallback
} from './types'

export interface Sorter {
  setData(data: number[]): void
  setMethod(method: SortMethodName): void
  setDelay(value: number): void

  start(): void
  pause(): void
  reset(): void
  shuffle(): void

  onStep(callback: SortStepCallback): void
  onStarted(callback: SortEventCallback): void
  onPaused(callback: SortEventCallback): void
  onEnded(callback: SortEventCallback): void
  onReset(callback: SortEventCallback): void
  onError(callback: SortErrorCallback): void
}

export class Sorter implements Sorter {
  private data: number[] = []
  private dataOriginal: number[] = []
  private sortController: SortController
  private isCreated: boolean = false
  private method: SortMethodName | null = null
  private delay: number = 0
  private onStartedCallback: SortEventCallback | null = null
  private onPausedCallback: SortEventCallback | null = null
  private onEndedCallback: SortEventCallback | null = null
  private onResetCallback: SortEventCallback | null = null
  private onErrorCallback: SortErrorCallback | null = null
  private onStepCallback: SortStepCallback | null = null

  constructor() {
    this.sortController = new SortController(this.handleSortEvent.bind(this), () => this.delay)
  }

  get isPaused(): boolean {
    return this.sortController.isPaused
  }

  get items(): number[] {
    return this.data
  }

  get itemsOriginal(): number[] {
    return this.dataOriginal
  }

  private init() {
    this.sortController = new SortController(this.handleSortEvent.bind(this), () => this.delay)
  }

  private destroy() {
    this.isCreated = false
    this.sortController.destroy()
  }

  private async handleSortEvent(step: SortStep): Promise<void> {
    if (step.action === 'begin') this.onStartedCallback?.(this.data)
    else if (step.action === 'end') this.onEndedCallback?.(this.data)
    else if (step.action === 'error') this.onErrorCallback?.()
    else this.onStepCallback?.(step as SortProcessAction | SortEventAction)
  }

  public setData(data: number[]): void {
    if (this.isCreated) return

    this.data = [...data]
    this.dataOriginal = [...data]
  }

  public setMethod(method: SortMethodName): void {
    if (this.isCreated) return
    this.method = method
  }

  public setDelay(value: number): void {
    this.delay = value
  }

  public start = (): void => {
    if (!this.method) {
      console.error('Method not set')
      return
    }

    if (!this.isCreated) {
      this.isCreated = true

      this.sortController
        .init(this.method, this.data) //* after all events
        .then(() => {
          this.destroy()
          this.init()
        })
      return
    }

    this.sortController
      .runSort() //
      .then(() => this.onStartedCallback?.(this.data))
  }

  public pause = (): void => {
    this.sortController
      .pauseSort() //
      .then(() => this.onPausedCallback?.(this.data))
  }

  public reset = (): void => {
    this.data = [...this.dataOriginal]

    this.onResetCallback?.(this.data)

    this.destroy()
    this.init()
  }

  public shuffle = (): void => {
    const data = this.sortController.shuffle(this.data)

    this.data = data
    this.dataOriginal = data

    this.reset()
  }

  //* callbacks
  public onStep(callback: SortStepCallback): void {
    this.onStepCallback = callback
  }

  public onStarted(callback: SortEventCallback): void {
    this.onStartedCallback = callback
  }

  public onPaused(callback: SortEventCallback): void {
    this.onPausedCallback = callback
  }

  public onEnded(callback: SortEventCallback): void {
    this.onEndedCallback = callback
  }

  public onReset(callback: SortEventCallback): void {
    this.onResetCallback = callback
  }

  public onError(callback: SortErrorCallback): void {
    this.onErrorCallback = callback
  }
}
