import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Timeline from './components/Timeline.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Credentials from './components/Credentials.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data/cv.js'

export default function App() {
  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <Nav />
      <main id="contenu">
        <Hero />
        <Timeline />
        <Skills />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <p>{profile.location}</p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  )
}
