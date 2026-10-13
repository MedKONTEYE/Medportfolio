# Portfolio de Mohamed Konteye

Site personnel en React (Vite) : réseau animé en canvas, console de détection simulée, parcours, compétences interactives, projets illustrés et contact.

## Lancer en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173. Pour tester la version de production :

```bash
npm run build
npm run preview
```

## Modifier le contenu

Tout le texte du CV est dans un seul fichier : `src/data/cv.js` (profil, compétences, parcours, projets, formation, certifications, contact).

À faire avant la mise en ligne :

- Remplacer `youtube` dans `src/data/cv.js` par l'adresse exacte de la chaîne KONTECH (le lien actuel mène à une recherche YouTube).
- Décider si le numéro de téléphone doit rester visible publiquement. Pour le retirer, supprimez le bloc « Téléphone » dans `src/components/Contact.jsx`.

## Publier sur GitHub

1. Créez un dépôt vide sur https://github.com/new (par exemple `portfolio`), sans README ni .gitignore.
2. Dans ce dossier :

```bash
git init
git add .
git commit -m "Premier commit : portfolio"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/portfolio.git
git push -u origin main
```

## Mettre en ligne sur Vercel

1. Allez sur https://vercel.com/new et connectez votre compte GitHub.
2. Importez le dépôt `portfolio`. Vercel détecte Vite tout seul : commande de build `npm run build`, dossier de sortie `dist`.
3. Cliquez sur **Deploy**. Le site est en ligne en environ une minute, avec une adresse `*.vercel.app`.

Ensuite, chaque `git push` sur `main` redéploie le site automatiquement.

Sans passer par GitHub, vous pouvez aussi déployer depuis le terminal :

```bash
npx vercel
```

## Structure

```
src/
  data/cv.js            contenu du CV
  components/           sections et animations
  hooks/                préférences de mouvement, section active
  lib/bus.js            lien entre le réseau animé et la console
  styles.css            design complet
```

## Accessibilité

- Le site respecte `prefers-reduced-motion` : animations coupées, réseau figé.
- Navigation au clavier complète, y compris les onglets de compétences (flèches, Début, Fin).
- La console de détection est une démonstration : ses données sont simulées et signalées comme telles.
