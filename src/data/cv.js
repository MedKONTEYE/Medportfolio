// Toutes les données du site viennent d'ici. Modifiez ce fichier pour mettre à jour le contenu.

export const profile = {
  firstName: 'Mohamed',
  lastName: 'Konteye',
  title: 'Ingénieur Réseaux & Cybersécurité',
  subtitle: "Doctorant IA & Cybersécurité à l'UADB, certifié CompTIA Security+",
  tagline: "Détection d'attaques avancées, tests d'intrusion, réponse aux incidents.",
  email: 'mohamed.konteye@uadb.edu.sn',
  phone: '+221 77 040 89 15',
  phoneHref: '+221770408915',
  location: 'Kaolack, Sénégal',
  linkedin: 'https://linkedin.com/in/mohamed-konteye-b7569a257',
  linkedinLabel: 'linkedin.com/in/mohamed-konteye-b7569a257',
  // À remplacer par l'adresse exacte de la chaîne (par exemple https://www.youtube.com/@...).
  youtube: 'https://www.youtube.com/results?search_query=KONTECH',
  youtubeLabel: 'KONTECH',
}

export const skills = [
  {
    id: 'reseaux',
    name: 'Réseaux',
    tools: ['TCP/IP', 'OSPF', 'EIGRP', 'BGP', 'VLAN', 'MPLS', 'SDN', 'NDN/DTN', 'Équipements Cisco'],
  },
  {
    id: 'securite-reseau',
    name: 'Sécurité réseau',
    tools: ['Pare-feu', 'IDS/IPS', 'OpenVPN', 'IPsec', 'ACL', 'DMZ'],
  },
  {
    id: 'pentest',
    name: 'Pentest & audit',
    tools: ['Kali Linux', 'Nmap', 'Metasploit', 'Burp Suite'],
  },
  {
    id: 'ia',
    name: 'IA & détection',
    tools: ['ML/DL', 'Analyse comportementale', "Détection d'anomalies", 'APT'],
  },
  {
    id: 'siem',
    name: 'SIEM & monitoring',
    tools: ['ELK', 'Centreon', 'Zabbix', 'Nagios'],
  },
  {
    id: 'crypto',
    name: 'Cryptographie',
    tools: ['PKI', 'TLS/SSL', 'AES', 'RSA', 'Chiffrement symétrique', 'Chiffrement asymétrique'],
  },
  {
    id: 'cloud',
    name: 'Cloud security',
    tools: ['AWS IAM', 'Security Groups', 'CloudTrail', 'AWS Shield'],
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    tools: ['MITRE ATT&CK', 'OWASP Top 10', 'ISO 27001', 'IAM'],
  },
  {
    id: 'scripting',
    name: 'Scripting & simulation',
    tools: ['Python', 'Matlab', 'Bash', 'Ansible', 'GNS3', 'Packet Tracer', 'EVE-NG', 'VMware'],
  },
]

// Du plus récent au plus ancien. kind : recherche | ctf | defi | enseignement | dev
export const kindLabels = {
  recherche: 'Recherche',
  ctf: 'Compétition',
  defi: "Défi d'innovation",
  enseignement: 'Enseignement',
  dev: 'Développement',
}

export const timeline = [
  {
    id: 'fic2026',
    kind: 'defi',
    period: '2026',
    title: 'FORCE-N Innovation Challenge (FIC2026)',
    org: 'FORCE-N / UN-CHK',
    text: "Participation avec SEN SmartRigole, un site web qui aide les services des collectivités à détecter plus tôt les risques de débordement des caniveaux, pour intervenir avant que la situation ne devienne critique.",
  },
  {
    id: 'detecthack',
    kind: 'ctf',
    period: '24–25 avril 2026',
    title: "CTF DETECT'HACK",
    org: 'GOMYCODE',
    text: "Trois scénarios : injection SQL, phishing PAPS avec traçage d'IP, et ransomware Ashia avec récupération de fichiers.",
  },
  {
    id: 'teranga',
    kind: 'ctf',
    period: '27–28 mars 2026',
    title: 'CTF défensif Teranga Shield',
    org: 'FORCE-N / UN-CHK',
    text: 'Forensic, analyse de logs en contexte SOC, gestion d’incidents et application de la réglementation sénégalaise sur les données.',
  },
  {
    id: 'recherche',
    kind: 'recherche',
    period: '2025',
    title: 'Chercheur, sécurité des réseaux embarqués (IA)',
    org: 'Université Alioune Diop, Bambey',
    text: "Mémoire sur la planification de trajectoire de drones sensibles à l'environnement pour une livraison de cargaison. Master 2 soutenu en décembre 2025, mention Bien.",
    figures: [
      { value: '−35 %', label: "d'incidents avec l'algorithme sécurisé DTN/IoT" },
      { value: '92 %', label: 'de fiabilité en simulation urbaine' },
    ],
  },
  {
    id: 'formateur',
    kind: 'enseignement',
    period: "2022 à aujourd'hui",
    title: 'Formateur, cybersécurité et réseaux',
    org: 'Université Alioune Diop / KONTECH',
    text: 'Tutoriels YouTube, animation de panels en cybersécurité et encadrement de projets IoT sécurisés.',
    figures: [
      { value: '50+', label: 'étudiants sensibilisés' },
      { value: '10+', label: 'projets IoT sécurisés encadrés' },
    ],
  },
  {
    id: 'iot',
    kind: 'dev',
    period: '2022–2023',
    title: 'Développeur IoT sécurisé',
    org: 'Université Alioune Diop, Bambey',
    text: "Architecture IoT sécurisée (authentification, chiffrement) et contrôle d'accès mobile. Mention Très Bien.",
  },
]

export const projects = [
  {
    id: 'domotique',
    title: "Audit d'une architecture domotique",
    text: "Recherche de vulnérabilités sur un système de maison connectée et de ses équipements.",
    tags: ['Audit', 'Vulnérabilités', 'Domotique'],
  },
  {
    id: 'siem',
    title: 'SIEM Elasticsearch et Kibana',
    text: 'Collecte et visualisation de journaux pour détecter les anomalies sur le réseau.',
    tags: ['Elasticsearch', 'Kibana', 'SIEM'],
  },
  {
    id: 'vpn',
    title: 'OpenVPN et politiques IPsec',
    text: 'Mise en place de tunnels chiffrés avec OpenVPN et de politiques IPsec pour sécuriser les échanges.',
    tags: ['OpenVPN', 'IPsec', 'VPN'],
  },
  {
    id: 'dtn',
    title: 'Protocole sécurisé DTN/NDN pour drones',
    text: 'Communication sécurisée entre drones sur des réseaux tolérants aux délais (DTN) et à données nommées (NDN).',
    tags: ['DTN', 'NDN', 'Drones'],
  },
]

export const education = [
  {
    period: '2025, en cours',
    title: 'Doctorat (D1), Cybersécurité et IA',
    school: 'Université Alioune Diop, Bambey',
  },
  {
    period: '2025',
    title: 'Master 2, Systèmes et Réseaux',
    school: 'Université Alioune Diop, Bambey',
    note: 'Mention Bien',
  },
  {
    period: '2022',
    title: 'Licence, Systèmes, Réseaux et Télécoms',
    school: 'Université Alioune Diop, Bambey',
    note: 'Mention Très Bien',
  },
  {
    period: '2019',
    title: 'Baccalauréat S2',
    school: 'Lycée Valdiodio Ndiaye, Kaolack',
  },
]

export const certifications = [
  { year: '2026', name: 'Cybercrime', issuer: 'UNODC' },
  { year: '2026', name: 'Opération Teranga Shield (CTF)', issuer: 'FORCE-N' },
  { year: '2026', name: "DETECT'HACK (CTF)", issuer: 'GOMYCODE' },
  { year: '2025', name: 'CompTIA Security+', issuer: 'GOMYCODE' },
  { year: '2024', name: 'Junior Cybersecurity Analyst', issuer: 'FORCE-N' },
  { year: '2024', name: 'AWS Cloud Essentials', issuer: 'LeCloudFacile.com' },
  { year: '2024', name: 'DevOps on AWS', issuer: 'Coursera' },
  { year: '2023', name: 'Networking & Security', issuer: 'Coursera' },
  { year: '2023', name: 'AI for Everyone', issuer: 'FORCE-N' },
  { year: '2022', name: 'Digital Marketing', issuer: 'FORCE-N' },
]

export const languages = [
  { name: 'Wolof', level: 'langue maternelle' },
  { name: 'Français', level: 'courant' },
  { name: 'Anglais', level: 'professionnel' },
]

export const softSkills = [
  'Rigueur analytique',
  'Recherche académique',
  'Gestion des risques',
  'Veille menaces (threat intelligence)',
  'Esprit critique',
  'Pédagogie',
]
