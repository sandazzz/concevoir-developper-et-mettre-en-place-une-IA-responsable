# Formation IA Responsable

Formation interactive sur la conception et le déploiement d'une Intelligence Artificielle responsable, éco-conçue et frugale.

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://votre-username.github.io/ia-responsable/)

## Aperçu

Cette formation d'une journée permet aux équipes techniques et produit d'acquérir les compétences pour concevoir des solutions IA sobres et durables. Elle inclut des arbres de décision interactifs, des cas pratiques et des ressources concrètes.

## Contenu de la formation

| Module | Thème | Description |
|--------|-------|-------------|
| 01 | **Introduction** | Contexte, enjeux environnementaux et définitions |
| 02 | **Cadrage** | Évaluer la pertinence du recours à l'IA |
| 03 | **Données** | Qualité, quantité et réutilisation |
| 04 | **Modèles** | Choisir le bon modèle pour le bon usage |
| 05 | **Entraînement & Inférence** | Optimiser les phases énergivores |
| 06 | **Infrastructure** | Choix du cloud et des ressources |
| 07 | **Mesure** | Piloter l'impact carbone |
| 08 | **Fin de vie** | Désactivation et réutilisation |

## Fonctionnalités

- **Arbres de décision interactifs** : Évaluez vos besoins en IA de manière ludique
- **Progression visuelle** : Suivez votre avancement dans la formation
- **Responsive** : Accessible sur desktop, tablette et mobile
- **Accessible** : Navigation clavier, structure sémantique, contrastes optimisés
- **SEO optimisé** : Schema.org, balises meta, URLs descriptives
- **Mode impression** : Export PDF propre pour formation présentielle

## Déploiement rapide

### Option 1 : GitHub Pages (recommandé)

1. Forkez ce repository
2. Allez dans **Settings** > **Pages**
3. Source : sélectionnez `main` branch et `/` (root)
4. Votre site sera accessible à `https://votre-username.github.io/ia-responsable/`

### Option 2 : Serveur local

```bash
# Cloner le repository
git clone https://github.com/votre-username/ia-responsable.git
cd ia-responsable

# Serveur Python
python -m http.server 8000

# Ou avec Node.js
npx serve .
```

Ouvrez http://localhost:8000

### Option 3 : Netlify / Vercel

Glissez-déposez le dossier sur [Netlify Drop](https://app.netlify.com/drop) ou connectez votre repo GitHub à Vercel.

## Structure du projet

```
ia-responsable/
├── index.html          # Page unique avec tout le contenu
├── styles.css          # Styles CSS (responsive, dark mode ready)
├── script.js           # Interactions JS (vanilla, sans dépendance)
├── images/             # Ressources visuelles
├── README.md           # Ce fichier
├── LICENSE             # Licence CC BY-SA 4.0
└── .github/
    └── CONTRIBUTING.md # Guide de contribution
```

## Personnalisation

### Adapter à votre organisation

1. Modifiez le logo dans `index.html` (recherchez `logo-icon`)
2. Ajustez les couleurs dans `styles.css` (variables CSS `:root`)
3. Ajoutez vos ressources internes dans la section "Ressources"

### Couleurs principales

```css
:root {
    --color-primary: #2d6a4f;      /* Vert principal */
    --color-secondary: #74c69d;    /* Vert clair */
    --color-accent: #52b788;       /* Accent */
}
```

## Ressources externes incluses

- [GreenIT.fr](https://www.greenit.fr/) - Communauté du numérique responsable
- [ADEME](https://www.ademe.fr/) - Agence de la transition écologique
- [MiNumEco](https://ecoresponsable.numerique.gouv.fr/) - Mission interministérielle
- [EcoLogits Calculator](https://huggingface.co/spaces/genai-impact/ecologits-calculator) - Impact des requêtes IA
- [ML CO2 Impact](https://mlco2.github.io/impact/) - Calculateur empreinte ML
- [The Shift Project](https://theshiftproject.org/) - Rapports Lean ICT

## Contribuer

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](.github/CONTRIBUTING.md) pour les guidelines.

### Idées d'amélioration

- [ ] Ajouter un quiz de fin de formation
- [ ] Traduire en anglais
- [ ] Ajouter des animations supplémentaires
- [ ] Créer une version dark mode
- [ ] Intégrer des vidéos explicatives

## Licence

Ce contenu est sous licence [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

Vous êtes libre de :
- **Partager** — copier et redistribuer le matériel
- **Adapter** — remixer, transformer et créer à partir du matériel

Sous les conditions suivantes :
- **Attribution** — Vous devez créditer l'œuvre
- **Partage dans les mêmes conditions** — Si vous modifiez, vous devez distribuer sous la même licence

## Crédits

Contenu original adapté pour une diffusion publique et générique.

---

**Made with 🌱 for a sustainable AI future**
