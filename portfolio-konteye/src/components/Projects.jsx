import ProjectArt from './ProjectArt.jsx'
import { projects } from '../data/cv.js'

export default function Projects() {
  return (
    <section id="projets" className="section">
      <div className="container">
        <header className="section__head">
          <h2>Projets</h2>
          <p>Quatre réalisations en réseau et en sécurité. Sur ordinateur, passez la souris sur un schéma pour l’animer.</p>
        </header>

        <ul className="projects">
          {projects.map((project) => (
            <li key={project.id} className="proj">
              <div className="proj__art" aria-hidden="true">
                <ProjectArt id={project.id} />
              </div>
              <div className="proj__body">
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
