const W = 900
const H = 460
const CX = W / 2
const CY = H / 2
const RX = 250
const RY = 160

// Coupe un libellé en deux lignes équilibrées pour tenir dans le nœud central.
function splitLabel(text) {
  const words = text.split(' ')
  if (words.length < 2) return [text]
  let best = 1
  let gap = Infinity
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ').length
    const b = words.slice(i).join(' ').length
    if (Math.abs(a - b) < gap) {
      gap = Math.abs(a - b)
      best = i
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

export default function SkillGraph({ category }) {
  const count = category.tools.length
  const points = category.tools.map((tool, i) => {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2
    return { tool, angle, x: CX + Math.cos(angle) * RX, y: CY + Math.sin(angle) * RY }
  })
  const lines = splitLabel(category.name)

  return (
    <svg className="graph" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <ellipse className="graph__orbit" cx={CX} cy={CY} rx={RX} ry={RY} />
      <g key={category.id}>
        {points.map((p, i) => {
          const cos = Math.cos(p.angle)
          const anchor = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle'
          const dx = anchor === 'start' ? 16 : anchor === 'end' ? -16 : 0
          const dy = anchor === 'middle' ? (Math.sin(p.angle) < 0 ? -16 : 30) : 6
          return (
            <g key={p.tool} style={{ '--d': `${60 + i * 55}ms` }}>
              <path className="graph__edge" d={`M${CX} ${CY} L${p.x} ${p.y}`} pathLength="1" />
              <circle className="graph__node" cx={p.x} cy={p.y} r="6.5" />
              <text className="graph__label" x={p.x + dx} y={p.y + dy} textAnchor={anchor}>
                {p.tool}
              </text>
            </g>
          )
        })}
        <circle className="graph__hub" cx={CX} cy={CY} r="72" />
        <text className="graph__hub-label" x={CX} y={lines.length === 1 ? CY + 7 : CY - 4} textAnchor="middle">
          {lines.map((line, i) => (
            <tspan key={line} x={CX} dy={i === 0 ? 0 : 24}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    </svg>
  )
}
