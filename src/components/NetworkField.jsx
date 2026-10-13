import { useEffect, useRef } from 'react'
import { bus } from '../lib/bus.js'

const SIGNAL = [127, 214, 234]
const ICE = [227, 240, 245]
const OK = [61, 214, 140]
const BAD = [255, 90, 95]
const TAU = Math.PI * 2

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
const rand = (a, b) => a + Math.random() * (b - a)

/**
 * Réseau vivant plein écran : des paquets circulent de nœud en nœud,
 * le curseur crée des liaisons, et de temps en temps un paquet malveillant
 * (rouge) est repéré puis isolé. Chaque isolement prévient la console.
 */
export default function NetworkField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let builtW = 0
    let builtH = 0
    let nodes = []
    let edges = []
    let adj = []
    let packets = []
    let rings = []
    let tags = []
    let raf = 0
    let last = 0
    let clock = 0
    let spawnIn = 400
    let threatIn = 2400
    let onScreen = true
    let resizeTimer = 0
    const mouse = { x: -9999, y: -9999 }

    function build() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      builtW = w
      builtH = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.max(26, Math.min(90, Math.round((w * h) / 15000)))
      const cols = Math.max(4, Math.round(Math.sqrt(target * (w / h))))
      const rows = Math.max(3, Math.round(target / cols))
      const cw = w / cols
      const ch = h / rows

      nodes = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = (c + 0.2 + Math.random() * 0.6) * cw
          const hy = (r + 0.2 + Math.random() * 0.6) * ch
          nodes.push({
            hx,
            hy,
            x: hx,
            y: hy,
            phase: Math.random() * TAU,
            amp: 4 + Math.random() * 8,
            r: 1.6 + Math.random() * 1.2,
            flash: 0,
            near: 0,
            kind: 'node',
          })
        }
      }

      const order = nodes.map((_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = order[i]
        order[i] = order[j]
        order[j] = tmp
      }
      const hubCount = Math.round(nodes.length * 0.12)
      order.slice(0, hubCount).forEach((i) => {
        nodes[i].kind = 'hub'
        nodes[i].r = 3.2
      })
      order.slice(hubCount, hubCount + 5).forEach((i) => {
        nodes[i].kind = 'sensor'
        nodes[i].r = 3.6
      })

      const maxD = Math.max(cw, ch) * 1.9
      const seen = new Set()
      edges = []
      adj = nodes.map(() => [])
      nodes.forEach((a, i) => {
        const near = []
        nodes.forEach((b, j) => {
          if (i === j) return
          const d = Math.hypot(a.hx - b.hx, a.hy - b.hy)
          if (d < maxD) near.push([d, j])
        })
        near.sort((p, q) => p[0] - q[0])
        near.slice(0, 3).forEach(([, j]) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`
          if (seen.has(key)) return
          seen.add(key)
          const idx = edges.length
          edges.push({ a: i, b: j })
          adj[i].push(idx)
          adj[j].push(idx)
        })
      })

      packets = []
      rings = []
      tags = []
    }

    function place(t) {
      for (const n of nodes) {
        n.x = n.hx + Math.sin(t * 0.00055 + n.phase) * n.amp
        n.y = n.hy + Math.cos(t * 0.00042 + n.phase) * n.amp * 0.8
      }
    }

    function spawn(kind) {
      if (!nodes.length) return
      let start = Math.floor(Math.random() * nodes.length)
      let tries = 0
      while (!adj[start].length && tries++ < 20) start = Math.floor(Math.random() * nodes.length)
      if (!adj[start].length) return
      const edge = adj[start][Math.floor(Math.random() * adj[start].length)]
      packets.push({
        kind,
        edge,
        from: start,
        t: 0,
        speed: kind === 'bad' ? 130 : rand(70, 150),
        hops: kind === 'bad' ? 3 + Math.floor(Math.random() * 3) : 2 + Math.floor(Math.random() * 4),
        col: Math.random() < 0.7 ? SIGNAL : OK,
        done: false,
      })
    }

    function finish(p, nodeIdx) {
      const n = nodes[nodeIdx]
      if (p.kind === 'bad') {
        n.flash = 1
        rings.push({ x: n.x, y: n.y, age: 0, delay: 0, col: BAD })
        rings.push({ x: n.x, y: n.y, age: 0, delay: 0.22, col: SIGNAL })
        tags.push({ idx: nodeIdx, age: 0 })
        bus.emit({ type: 'threat' })
      } else {
        n.flash = Math.max(n.flash, 0.0)
      }
    }

    function advance(dt) {
      for (const p of packets) {
        const ed = edges[p.edge]
        const to = ed.a === p.from ? ed.b : ed.a
        const A = nodes[p.from]
        const B = nodes[to]
        const len = Math.hypot(B.x - A.x, B.y - A.y) || 1
        p.t += (p.speed * dt) / len
        if (p.t >= 1) {
          p.hops -= 1
          if (p.hops <= 0) {
            finish(p, to)
            p.done = true
            continue
          }
          const options = adj[to].filter((i) => i !== p.edge)
          p.edge = options.length ? options[Math.floor(Math.random() * options.length)] : p.edge
          p.from = to
          p.t = 0
        }
      }
      packets = packets.filter((p) => !p.done)

      for (const n of nodes) n.flash = Math.max(0, n.flash - dt * 0.6)
      for (const r of rings) r.age += dt
      rings = rings.filter((r) => r.age < r.delay + 1.3)
      for (const t of tags) t.age += dt
      tags = tags.filter((t) => t.age < 2.4)
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      ctx.lineWidth = 1
      ctx.strokeStyle = rgba(SIGNAL, 0.11)
      ctx.beginPath()
      for (const e of edges) {
        const a = nodes[e.a]
        const b = nodes[e.b]
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
      }
      ctx.stroke()

      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        n.near = d < 150 ? 1 - d / 150 : 0
        if (n.near > 0) {
          ctx.strokeStyle = rgba(SIGNAL, n.near * 0.45)
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const glow = Math.max(n.near, n.flash)
        if (n.kind === 'sensor') {
          const pulse = 5 + Math.sin(clock * 0.002 + n.phase) * 1.6
          ctx.strokeStyle = rgba(SIGNAL, 0.55)
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + pulse, 0, TAU)
          ctx.stroke()
        } else if (n.kind === 'hub') {
          ctx.strokeStyle = rgba(ICE, 0.22)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 4, 0, TAU)
          ctx.stroke()
        }
        const flashing = n.flash > 0.05
        const col = flashing ? BAD : n.kind === 'sensor' ? SIGNAL : ICE
        if (flashing) {
          ctx.fillStyle = rgba(BAD, n.flash * 0.22)
          ctx.beginPath()
          ctx.arc(n.x, n.y, 14 + (1 - n.flash) * 10, 0, TAU)
          ctx.fill()
        }
        ctx.fillStyle = rgba(col, Math.min(1, 0.45 + glow * 0.55))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glow * 1.6, 0, TAU)
        ctx.fill()
      }

      for (const p of packets) {
        const ed = edges[p.edge]
        const to = ed.a === p.from ? ed.b : ed.a
        const A = nodes[p.from]
        const B = nodes[to]
        const x = A.x + (B.x - A.x) * p.t
        const y = A.y + (B.y - A.y) * p.t
        const t0 = Math.max(0, p.t - 0.18)
        const x0 = A.x + (B.x - A.x) * t0
        const y0 = A.y + (B.y - A.y) * t0
        const bad = p.kind === 'bad'
        const col = bad ? BAD : p.col

        const g = ctx.createLinearGradient(x0, y0, x, y)
        g.addColorStop(0, rgba(col, 0))
        g.addColorStop(1, rgba(col, bad ? 0.9 : 0.6))
        ctx.strokeStyle = g
        ctx.lineWidth = bad ? 2 : 1.4
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.fillStyle = rgba(col, 0.18)
        ctx.beginPath()
        ctx.arc(x, y, bad ? 7 : 4.5, 0, TAU)
        ctx.fill()
        ctx.fillStyle = rgba(col, 1)
        ctx.beginPath()
        ctx.arc(x, y, bad ? 2.8 : 1.8, 0, TAU)
        ctx.fill()
      }

      for (const r of rings) {
        const age = r.age - r.delay
        if (age < 0) continue
        const k = age / 1.3
        ctx.strokeStyle = rgba(r.col, (1 - k) * 0.85)
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(r.x, r.y, 8 + k * 70, 0, TAU)
        ctx.stroke()
      }

      ctx.font = '600 12px "Hanken Grotesk", system-ui, sans-serif'
      ctx.textBaseline = 'alphabetic'
      for (const t of tags) {
        const n = nodes[t.idx]
        const a = t.age < 0.2 ? t.age / 0.2 : Math.max(0, 1 - (t.age - 0.2) / 2.2)
        ctx.fillStyle = rgba(BAD, a)
        ctx.fillText('isolé', n.x + 12, n.y - 12)
      }
    }

    function step(now) {
      raf = requestAnimationFrame(step)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      clock += dt * 1000
      place(clock)

      spawnIn -= dt * 1000
      if (spawnIn <= 0) {
        if (packets.length < 22) spawn('ok')
        spawnIn = rand(220, 520)
      }
      threatIn -= dt * 1000
      if (threatIn <= 0) {
        spawn('bad')
        threatIn = rand(4200, 7500)
      }

      advance(dt)
      draw()
    }

    const start = () => {
      if (raf || reduce) return
      last = performance.now()
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }
    const paintStatic = () => {
      place(0)
      draw()
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onOut = (e) => {
      if (!e.relatedTarget) {
        mouse.x = -9999
        mouse.y = -9999
      }
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen && !document.hidden) start()
      else stop()
    })

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const rect = canvas.getBoundingClientRect()
        const sameWidth = Math.abs(rect.width - builtW) < 2
        const similarHeight = Math.abs(rect.height - builtH) < 80
        if (sameWidth && similarHeight) return
        build()
        if (reduce) paintStatic()
      }, 120)
    })

    build()
    if (reduce) paintStatic()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseout', onOut)
    document.addEventListener('visibilitychange', onVisibility)
    io.observe(canvas)
    ro.observe(canvas)

    return () => {
      stop()
      clearTimeout(resizeTimer)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseout', onOut)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
