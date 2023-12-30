import {twMerge} from 'tailwind-merge'

type Item<T> = {
  value: T
  label: string
}

interface Props<T> {
  title?: string
  items: Item<T>[]
  onSelectItem: (value: T) => void
  className?: string
}

export function Combobox<T>({title, items, className, onSelectItem}: Props<T>) {
  return (
    <div className="space-y-2">
      {title && <div className="text-xs ">{title}</div>}

      <select
        onChange={(e) => onSelectItem(items[Number(e.target.value)].value)}
        className={twMerge('select select-bordered border-neutral select-sm w-full  max-w-md', className)}
      >
        {title && <option disabled>{title}</option>}
        {items.map(({value, label}, index) => (
          <option key={String(value)} value={index}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
