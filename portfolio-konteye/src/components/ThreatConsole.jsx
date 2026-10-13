import { useCallback, useEffect, useRef, useState } from 'react'
import { bus } from '../lib/bus.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const SAFE = [
  ['443', 'HTTPS'],
  ['53', 'DNS'],
  ['80', 'HTTP'],
  ['25', 'SMTP'],
  ['22', 'SSH'],
]
const RISKY = [
  ['445', 'SMB'],
  ['3389', 'RDP'],
  ['22', 'SSH'],
]
const RANGES = { ok: [0.03, 0.34], warn: [0.42, 0.72], bad: [0.78, 0.97] }
const LABELS = { ok: 'Normal', warn: 'Suspect', bad: 'Isolé' }
const MAX_ROWS = 6
const POINTS = 36

const rand = (a, b) => a + Math.random() * (b - a)
const int = (a, b) => Math.floor(rand(a, b + 1))
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const pad = (n) => String(n).padStart(2, '0')
const stamp = () => {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
const verdict = (score) => (score < 0.4 ? 'ok' : score < 0.75 ? 'warn' : 'bad')

function makeRow(kind, id) {
  const [lo, hi] = RANGES[kind]
  const pool = kind === 'ok' ? SAFE : kind === 'warn' ? [...SAFE, ...RISKY] : RISKY
  const [port, service] = pick(pool)
  return {
    id,
    kind,
    score: rand(lo, hi),
    src: `10.0.${int(1, 6)}.${int(10, 240)}`,
    dst: `10.0.0.${int(2, 30)}`,
    port,
    service,
    time: stamp(),
  }
}

function seedRows() {
  return ['ok', 'ok', 'warn', 'ok', 'bad', 'ok'].map((kind, i) => makeRow(kind, -i - 1))
}

function seedSeries() {
  return Array.from({ length: POINTS }, (_, i) => {
    if (i === 11) return 0.55
    if (i === 26) return 0.88
    return rand(0.06, 0.3)
  })
}

const W = 320
const H = 46

export default function ThreatConsole() {
  const reduced = useReducedMotion()
  const idRef = useRef(0)
  const [rows, setRows] = useState(seedRows)
  const [series, setSeries] = useState(seedSeries)

  const push = useCallback((kind) => {
    idRef.current += 1
    const row = makeRow(kind, idRef.current)
    setRows((prev) => [row, ...prev].slice(0, MAX_ROWS))
    setSeries((prev) => [...prev.slice(1), row.score])
  }, [])

  useEffect(() => {
    if (reduced) return undefined
    let timer = 0
    const loop = () => {
      const r = Math.random()
      push(r < 0.84 ? 'ok' : 'warn')
      timer = setTimeout(loop, rand(1000, 1900))
    }
    timer = setTimeout(loop, 900)
    const off = bus.on((event) => {
      if (event.type === 'threat') push('bad')
    })
    return () => {
      clearTimeout(timer)
      off()
    }
  }, [reduced, push])

  const pts = series.map((v, i) => [(i / (POINTS - 1)) * W, H - 3 - v * (H - 6)])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H} Z`
  const thresholdY = H - 3 - 0.75 * (H - 6)
  const [lastX, lastY] = pts[pts.length - 1]
  const lastKind = verdict(series[series.length - 1])

  return (
    <div className="console">
      <div className="console__head">
        <p className="console__title">Flux réseau analysés</p>
        <p className="console__badge">
          <span className="console__live" />
          Démonstration, données simulées
        </p>
      </div>

      <div className="console__spark">
        <div className="console__spark-label">
          <span>Score d’anomalie</span>
          <span>{series[series.length - 1].toFixed(2)}</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="console__chart" focusable="false">
          <line x1="0" x2={W} y1={thresholdY} y2={thresholdY} className="console__threshold" />
          <path d={area} className="console__area" />
          <path d={line} className="console__line" />
          <circle cx={lastX} cy={lastY} r="3.5" className={`console__dot console__dot--${lastKind}`} />
        </svg>
      </div>

      <ul className="console__rows">
        {rows.map((row) => (
          <li key={row.id} className={`console__row console__row--${row.kind}`}>
            <span className="console__route">
              {row.src} → {row.dst}:{row.port}
            </span>
            <span className={`chip chip--${row.kind}`}>{LABELS[row.kind]}</span>
            <span className="console__meta">
              <span>{row.service}</span>
              <span>{row.time}</span>
              <span>score {row.score.toFixed(2)}</span>
            </span>
          </li>
        ))}
      </ul>

      <ul className="console__legend">
        <li>
          <span className="chip chip--ok">Normal</span> sous 0,40
        </li>
        <li>
          <span className="chip chip--warn">Suspect</span> de 0,40 à 0,75
        </li>
        <li>
          <span className="chip chip--bad">Isolé</span> au-dessus de 0,75
        </li>
      </ul>
    </div>
  )
}
