import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&/<>{}[]'

/**
 * Le texte se « déchiffre » de gauche à droite au chargement.
 * Le texte final réserve la place (pas de saut de mise en page) et
 * reste lisible par les lecteurs d'écran.
 */
export default function DecryptText({ text, delay = 0, duration = 1300 }) {
  const reduced = useReducedMotion()
  const [out, setOut] = useState(reduced ? text : '')

  useEffect(() => {
    if (reduced) {
      setOut(text)
      return undefined
    }
    let raf = 0
    let start
    let lastPaint = 0

    const tick = (now) => {
      if (start === undefined) start = now + delay
      if (now >= start) {
        const t = Math.min(1, (now - start) / duration)
        if (now - lastPaint > 40 || t === 1) {
          lastPaint = now
          const settled = Math.floor(t * text.length)
          let s = ''
          for (let i = 0; i < text.length; i++) {
            const ch = text[i]
            s += ch === ' ' || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
          setOut(s)
        }
        if (t >= 1) return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration, reduced])

  return (
    <span className="decrypt">
      <span className="decrypt__ghost" aria-hidden="true">
        {text}
      </span>
      <span className="decrypt__live" aria-hidden="true">
        {out}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
