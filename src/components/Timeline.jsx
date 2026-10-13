import { useEffect, useRef } from 'react'
import { timeline, kindLabels } from '../data/cv.js'

export default function Timeline() {
  const ref = useRef(null)

  // Un paquet descend le long du parcours au rythme du défilement.
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.style.setProperty('--p', '1')
      return undefined
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const probe = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (probe - rect.top) / rect.height))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="parcours" className="section">
      <div className="container">
        <header className="section__head">
          <h2>Parcours</h2>
          <p>
            Recherche, enseignement, compétitions de cybersécurité et défi d’innovation, du plus récent au plus
            ancien.
          </p>
        </header>

        <div className="timeline" ref={ref}>
          <div className="timeline__rail" aria-hidden="true">
            <span className="timeline__fill" />
            <span className="timeline__packet" />
          </div>
          <ol className="timeline__list">
            {timeline.map((entry) => (
              <li key={entry.id} className={`tl tl--${entry.kind}`}>
                <p className="tl__date">{entry.period}</p>
                <span className="tl__mark" aria-hidden="true" />
                <div className="tl__body">
                  <h3>{entry.title}</h3>
                  <p className="tl__meta">
                    <span>{entry.org}</span>
                    <span className="tl__kind">{kindLabels[entry.kind]}</span>
                  </p>
                  <p className="tl__text">{entry.text}</p>
                  {entry.figures && (
                    <ul className="tl__figs">
                      {entry.figures.map((fig) => (
                        <li key={fig.value}>
                          <strong>{fig.value}</strong>
                          <span>{fig.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
