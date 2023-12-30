interface Props {
  title: string
  value: string | number
  desc?: string
}

export function StatsItem({title, value, desc}: Props) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  )
}
