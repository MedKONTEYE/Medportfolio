import { education, certifications, languages, softSkills } from '../data/cv.js'

export default function Credentials() {
  return (
    <section id="formation" className="section section--deep">
      <div className="container">
        <header className="section__head">
          <h2>Formation et certifications</h2>
          <p>Du baccalauréat au doctorat, et dix certifications en cybersécurité, cloud et IA.</p>
        </header>

        <div className="creds">
          <div>
            <h3 className="creds__title">Formation</h3>
            <ol className="edu">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="edu__period">{item.period}</p>
                  <div>
                    <p className="edu__title">{item.title}</p>
                    <p className="edu__school">
                      {item.school}
                      {item.note ? <span className="edu__note">{item.note}</span> : null}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="creds__title">Certifications</h3>
            <table className="ledger">
              <caption className="sr-only">Certifications obtenues</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Année</th>
                  <th scope="col">Certification</th>
                  <th scope="col">Organisme</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert.name}>
                    <td className="ledger__year">{cert.year}</td>
                    <th scope="row" className="ledger__name">
                      {cert.name}
                    </th>
                    <td className="ledger__issuer">{cert.issuer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="extras">
          <div>
            <h3 className="creds__title">Langues</h3>
            <ul className="langs">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <strong>{lang.name}</strong>
                  <span>{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="creds__title">Qualités professionnelles</h3>
            <ul className="tags">
              {softSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
