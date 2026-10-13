import NetworkField from './NetworkField.jsx'
import ThreatConsole from './ThreatConsole.jsx'
import DecryptText from './DecryptText.jsx'
import { profile } from '../data/cv.js'

export default function Hero() {
  return (
    <section id="accueil" className="hero">
      <NetworkField className="hero__field" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__name">
            <span className="hero__line">
              <DecryptText text={profile.firstName} delay={150} />
            </span>
            <span className="hero__line">
              <DecryptText text={profile.lastName} delay={450} />
            </span>
          </h1>
          <p className="hero__role">{profile.title}</p>
          <p className="hero__sub">{profile.subtitle}</p>
          <p className="hero__tag">{profile.tagline}</p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#parcours">
              Voir le parcours
            </a>
            <a className="btn btn--line" href="#contact">
              Me contacter
            </a>
          </div>
        </div>

        <div className="hero__console">
          <p className="sr-only">
            Démonstration visuelle : des flux réseau simulés sont classés en normal, suspect ou isolé par un
            modèle de détection comportementale.
          </p>
          <div aria-hidden="true">
            <ThreatConsole />
          </div>
        </div>
      </div>
    </section>
  )
}
