import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/cv.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2400)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section section--contact">
      <div className="container contact">
        <div>
          <h2 className="contact__title">Contact</h2>
          <p className="contact__lead">
            Pour un audit, un projet de recherche, une formation ou un CTF, écrivez-moi.
          </p>
          <a className="contact__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact__actions">
            <a className="btn btn--solid" href={`mailto:${profile.email}`}>
              Écrire un email
            </a>
            <button type="button" className="btn btn--line" onClick={copy}>
              {copied ? 'Adresse copiée' : "Copier l'adresse"}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Adresse email copiée dans le presse-papiers' : ''}
            </span>
          </div>
        </div>

        <dl className="channels">
          <div>
            <dt>Téléphone</dt>
            <dd>
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {profile.linkedinLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt>YouTube</dt>
            <dd>
              <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
                {profile.youtubeLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt>Localisation</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
