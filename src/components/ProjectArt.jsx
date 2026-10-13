// Quatre schémas SVG, un par projet. Ils sont fixes par défaut
// et s'animent au survol de la carte (voir styles.css, classe .anim).

function Domotique() {
  const devices = [
    { x: 92, y: 150, label: 'Caméra' },
    { x: 268, y: 150, label: 'Serrure' },
    { x: 180, y: 84, label: 'Thermostat' },
  ]
  return (
    <svg viewBox="0 0 360 200" focusable="false">
      <defs>
        <clipPath id="art-house-clip">
          <path d="M56 112 L180 28 L304 112 V180 H56 Z" />
        </clipPath>
      </defs>
      <path className="art__line" d="M56 112 L180 28 L304 112 V180 H56 Z" strokeWidth="2" />
      <g clipPath="url(#art-house-clip)">
        <rect className="anim art__sweep" x="40" y="36" width="280" height="8" />
      </g>
      {devices.map((d) => (
        <g key={d.label}>
          <path className="art__sig" d={`M180 146 L${d.x} ${d.y}`} strokeDasharray="3 5" />
          <circle cx={d.x} cy={d.y} r="8" fill="var(--panel)" stroke="var(--signal)" strokeWidth="1.5" />
          <text className="art__t" x={d.x} y={d.y + 24} textAnchor="middle">
            {d.label}
          </text>
        </g>
      ))}
      <rect x="142" y="132" width="76" height="30" rx="4" fill="var(--panel)" stroke="var(--signal)" strokeWidth="1.5" />
      <text className="art__t art__t--ice" x="180" y="151" textAnchor="middle">
        Passerelle
      </text>
    </svg>
  )
}

function Siem() {
  const bars = [34, 52, 40, 64, 46, 100]
  return (
    <svg viewBox="0 0 360 200" focusable="false">
      {[56, 96, 136].map((y) => (
        <g key={y}>
          <rect x="20" y={y - 6} width="60" height="12" rx="2" fill="var(--panel)" />
          <rect x="26" y={y - 2} width="28" height="4" rx="2" fill="var(--line)" />
          <path className="anim art__flow" d={`M84 ${y} L126 100`} />
        </g>
      ))}
      <text className="art__t" x="50" y="176" textAnchor="middle">
        Journaux
      </text>

      <rect x="126" y="68" width="104" height="64" rx="4" fill="var(--panel)" stroke="var(--signal)" strokeWidth="1.5" />
      <text className="art__t art__t--ice" x="178" y="104" textAnchor="middle">
        Elasticsearch
      </text>
      <path className="anim art__flow" d="M230 100 L262 100" />

      <rect x="262" y="40" width="82" height="116" rx="4" fill="var(--panel)" stroke="var(--line)" strokeWidth="1.5" />
      {bars.map((v, i) => {
        const height = (v / 100) * 76
        const last = i === bars.length - 1
        return (
          <rect
            key={v + i}
            className={last ? 'anim art__alert' : undefined}
            x={272 + i * 11.5}
            y={146 - height}
            width="8"
            height={height}
            fill={last ? 'var(--warn)' : 'var(--signal)'}
            opacity={last ? 1 : 0.7}
          />
        )
      })}
      <text className="art__t" x="303" y="176" textAnchor="middle">
        Kibana
      </text>
    </svg>
  )
}

function Vpn() {
  return (
    <svg viewBox="0 0 360 200" focusable="false">
      {/* Poste */}
      <rect x="22" y="74" width="62" height="40" rx="3" fill="var(--panel)" stroke="var(--line)" strokeWidth="1.5" />
      <path className="art__line" d="M14 122 H92" strokeWidth="2" />
      <text className="art__t" x="53" y="146" textAnchor="middle">
        Poste
      </text>

      {/* Tunnel */}
      <rect x="100" y="86" width="160" height="28" rx="14" fill="rgba(127,214,234,0.08)" stroke="var(--signal)" strokeWidth="1.5" />
      <path className="anim art__flow art__flow--fast" d="M118 100 H242" />
      <rect x="168" y="90" width="24" height="20" rx="4" fill="var(--ink)" stroke="var(--ice)" strokeWidth="1.5" />
      <path d="M174 90 v-5 a6 6 0 0 1 12 0 v5" fill="none" stroke="var(--ice)" strokeWidth="1.5" />
      <text className="art__t art__t--ice" x="180" y="70" textAnchor="middle">
        IPsec
      </text>
      <text className="art__t" x="180" y="136" textAnchor="middle">
        OpenVPN
      </text>

      {/* Réseau interne */}
      {[62, 88, 114].map((y) => (
        <rect key={y} x="276" y={y} width="62" height="20" rx="3" fill="var(--panel)" stroke="var(--line)" strokeWidth="1.5" />
      ))}
      {[72, 98, 124].map((y) => (
        <circle key={y} cx="288" cy={y} r="2.5" fill="var(--ok)" />
      ))}
      <text className="art__t" x="307" y="156" textAnchor="middle">
        Réseau interne
      </text>
    </svg>
  )
}

function Drone({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className="art__sig" d="M-9 -9 L9 9 M9 -9 L-9 9" strokeWidth="2" />
      {[
        [-10, -10],
        [10, -10],
        [-10, 10],
        [10, 10],
      ].map(([dx, dy]) => (
        <circle key={`${dx}${dy}`} cx={dx} cy={dy} r="4.5" fill="var(--ink)" stroke="var(--signal)" strokeWidth="1.5" />
      ))}
      <rect x="-3.5" y="-3.5" width="7" height="7" rx="1.5" fill="var(--ice)" />
    </g>
  )
}

function Dtn() {
  return (
    <svg viewBox="0 0 360 200" focusable="false">
      <path className="art__sig" d="M60 120 L180 70 L300 120" strokeDasharray="4 6" />
      <Drone x={60} y={120} />
      <circle cx="180" cy="70" r="10" fill="var(--panel)" stroke="var(--signal)" strokeWidth="1.5" />
      <rect x="288" y="108" width="24" height="24" rx="3" fill="var(--panel)" stroke="var(--line)" strokeWidth="1.5" />
      <rect className="anim art__bundle" x="-5" y="-5" width="10" height="10" rx="2" fill="var(--ok)" />
      <text className="art__t" x="60" y="154" textAnchor="middle">
        Drone
      </text>
      <text className="art__t" x="180" y="48" textAnchor="middle">
        Relais
      </text>
      <text className="art__t" x="300" y="154" textAnchor="middle">
        Destination
      </text>
      <text className="art__t art__t--ice" x="180" y="184" textAnchor="middle">
        stocker, porter, transmettre
      </text>
    </svg>
  )
}

const ART = { domotique: Domotique, siem: Siem, vpn: Vpn, dtn: Dtn }

export default function ProjectArt({ id }) {
  const Art = ART[id]
  return Art ? <Art /> : null
}
