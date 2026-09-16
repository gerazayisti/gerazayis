# Faculté des Sciences UY1 — nouveau site (Next.js)

Refonte de la page d'accueil de facsciences.uy1.cm, sur la structure de gabarit du
site de l'International Islamic University Dubai, avec la palette du site actuel :
**violet royal**, **noir/blanc**, **bleu**.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Choix de design

- **Couleurs** — `royal` (violet, 50→900) comme couleur primaire, `azure` (bleu) comme
  accent secondaire, `ink` (noir) pour les fonds sombres et le texte. Réglages dans
  `tailwind.config.ts`.
- **Typographies** — Newsreader (serif, italique) pour les titres : clin d'œil aux
  Annales de la Faculté des Sciences publiées par l'établissement. IBM Plex Sans pour
  le corps de texte et l'interface. IBM Plex Mono pour les sigles de départements
  (BC, IN, MA…) et les données chiffrées — cohérent avec l'identité "Sciences".
- **Motif visuel** — orbites et nœuds en SVG sur les fonds sombres (hero, bandeau
  actualités), plutôt qu'une photo de stock générique : un choix qui vient du sujet
  (sciences physiques) plutôt qu'un gabarit par défaut.
- **Photos** — les visuels de départements viennent directement des médias déjà en
  ligne sur facsciences.uy1.cm (photos réelles des départements, pas de stock). Le
  Département de Chimie Inorganique n'a pas de photo dédiée sur l'ancien site : la
  carte bascule automatiquement sur un médaillon avec le sigle.

## Mapping gabarit IIUD → contenu Faculté des Sciences

| Bloc IIUD | Bloc Faculté des Sciences |
|---|---|
| Hero + accès rapides (Admission/Research/Faculty/Events) | Hero + accès rapides (Admission/Recherche/Départements/Événements) |
| Our Success Stories | Chiffres clés (1962, 10 départements, 2 campus, 3 vice-décanats) |
| Stay in touch with updates | Bandeau "Restez informés" (communiqués + événement en avant) |
| Bloc Admission (violet) | Espace Étudiant (admission, scolarité, LMD, bourses…) |
| Find your way | Nos départements (10 départements + formation Énergie Renouvelable) |
| Search for a course | Rechercher une formation |
| Research and Publication | Recherche & publications |
| More about IIUD | En savoir plus sur la Faculté |
| Introducing the Graduates | Distinctions & rayonnement scientifique (prix réels obtenus par la faculté) |

## À faire avant mise en production

- [ ] Rapatrier les images de département dans `/public/departements/` (actuellement
      pointées vers `facsciences.uy1.cm/wp-content/uploads/...`, à ne garder qu'en
      transition — voir `next.config.mjs`).
- [ ] Confirmer les codes hex exacts du violet royal / bleu auprès de la charte
      graphique officielle si elle existe (valeurs actuelles choisies à l'œil dans
      `tailwind.config.ts`, section `royal` / `azure`).
- [ ] Créer les pages listées dans `lib/content.ts` (`/departements/[slug]`,
      `/espace-etudiant/...`, `/recherches/...`, etc.) — seule la page d'accueil est
      construite pour l'instant.
- [ ] Brancher le formulaire de recherche de formations et le formulaire de contact
      sur un vrai backend (actuellement des coquilles statiques).
- [ ] Vérifier l'accessibilité clavier et le contraste sur les nouvelles teintes une
      fois les couleurs de marque confirmées.

## Source du contenu

Toutes les données de `lib/content.ts` (départements, contacts, actualités, axes de
recherche, distinctions) viennent de la collecte effectuée sur facsciences.uy1.cm —
voir `facsciences-uy1-contenu.md` fourni précédemment.
