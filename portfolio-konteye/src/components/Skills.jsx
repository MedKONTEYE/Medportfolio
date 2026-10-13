import { useRef, useState } from 'react'
import SkillGraph from './SkillGraph.jsx'
import { skills } from '../data/cv.js'

export default function Skills() {
  const [activeId, setActiveId] = useState(skills[0].id)
  const tabRefs = useRef([])
  const current = skills.find((s) => s.id === activeId)

  const onKeyDown = (event, index) => {
    let next = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % skills.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + skills.length) % skills.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = skills.length - 1
    else return
    event.preventDefault()
    setActiveId(skills[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="competences" className="section section--deep">
      <div className="container">
        <header className="section__head">
          <h2>Compétences</h2>
          <p>Choisissez un domaine pour voir les protocoles et les outils que je maîtrise.</p>
        </header>

        <div className="skills">
          <div className="skills__tabs" role="tablist" aria-orientation="vertical" aria-label="Domaines de compétences">
            {skills.map((skill, i) => (
              <button
                key={skill.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${skill.id}`}
                aria-selected={skill.id === activeId}
                aria-controls="skills-panel"
                tabIndex={skill.id === activeId ? 0 : -1}
                className="skills__tab"
                onClick={() => setActiveId(skill.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span>{skill.name}</span>
                <span className="skills__count">{skill.tools.length}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" id="skills-panel" aria-labelledby={`tab-${current.id}`} className="skills__panel">
            <SkillGraph category={current} />
            <ul className="skills__list">
              {current.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
