interface Props {
  title: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export function Range({min = 20, max = 100, step = 20, title, value, onChange}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-xs ">
        {title}

        <input
          type="range"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          max={max}
          step={step}
          className="range range-xs"
        />
      </label>
    </div>
  )
}
