// Un « M » dessiné comme un petit réseau : cinq nœuds reliés.
const POINTS = [
  [5, 26],
  [5, 7],
  [16, 18],
  [27, 7],
  [27, 26],
]

export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <polyline
        points={POINTS.map((p) => p.join(',')).join(' ')}
        stroke="var(--signal)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {POINTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="var(--ice)" />
      ))}
    </svg>
  )
}
