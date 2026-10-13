import Logo from './Logo.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'

const LINKS = [
  { id: 'parcours', label: 'Parcours' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'formation', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]
const IDS = ['accueil', ...LINKS.map((l) => l.id)]

export default function Nav() {
  const active = useActiveSection(IDS)

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#accueil" aria-label="Mohamed Konteye, retour à l'accueil">
          <Logo />
          <span className="nav__name">Mohamed Konteye</span>
        </a>
        <nav className="nav__menu" aria-label="Navigation principale">
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? 'is-active' : undefined}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
