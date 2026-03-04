# Guide de contribution

Merci de votre intérêt pour améliorer cette formation sur l'IA responsable !

## Comment contribuer

### Signaler un problème

1. Vérifiez que le problème n'a pas déjà été signalé dans les [Issues](../../issues)
2. Créez une nouvelle issue avec un titre descriptif
3. Décrivez le problème, les étapes pour le reproduire et le comportement attendu

### Proposer une amélioration

1. Forkez le repository
2. Créez une branche pour votre modification (`git checkout -b feature/ma-amelioration`)
3. Effectuez vos modifications
4. Testez localement avec un serveur HTTP
5. Commitez vos changements (`git commit -m "Ajout de..."`)
6. Poussez vers votre fork (`git push origin feature/ma-amelioration`)
7. Ouvrez une Pull Request

## Bonnes pratiques

### Code

- **HTML** : Utilisez des balises sémantiques (`<article>`, `<section>`, `<nav>`)
- **CSS** : Utilisez les variables CSS existantes (`:root`)
- **JS** : Vanilla JS uniquement, pas de framework
- **Accessibilité** : Testez la navigation clavier, les contrastes

### Contenu

- Gardez un ton professionnel et factuel
- Citez vos sources pour les données chiffrées
- Évitez le jargon non expliqué
- Privilégiez les exemples concrets

### Commits

Format recommandé :
```
type(scope): description courte

Description longue si nécessaire
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`

## Structure du projet

```
├── index.html      # Contenu principal
├── styles.css      # Styles (variables en haut)
├── app.js          # # Point d'entrée JS : initialise les features (navigation, scroll, animations, calculs, arbre de décision) - vanilla, sans dépendance
├── src/            # Fichiers source JS (features, utils, tests Vitest)
└── images/         # Ressources visuelles
```

## Tests locaux

Installez node v25.2.1 et pnpm

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement Vite
pnpm run dev

#Lancer les tests
pnpm run test
```

## Questions ?

Ouvrez une issue avec le label `question`.

---

Merci de contribuer à un numérique plus responsable !
