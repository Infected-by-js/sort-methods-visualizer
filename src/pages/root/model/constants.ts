import {SortMethodName} from '@shared/lib/sorter'

type SortMethod = {
  label: string
  value: SortMethodName
}

export const sortingAlgorithms: SortMethod[] = [
  {label: 'Bubble', value: 'bubble'}
  // {label: 'Selection', value: 'selection'}
  // {label: 'Insertion', value: 'insertion'},
  // {label: 'Shell', value: 'shell'},
  // {label: 'Merge', value: 'merge'},
  // {label: 'Quick', value: 'quick'},
  // {label: 'Heap', value: 'heap'},
  // {label: 'Counting', value: 'counting'},
]

export const itemsCountLimits = [
  {label: '5', value: '5'},
  {label: '25', value: '25'},
  {label: '50', value: '50'},
  {label: '100', value: '100'}
]
