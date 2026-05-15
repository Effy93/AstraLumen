# Synthèse du projet AstraLumen

## 1. Vue d'ensemble

AstraLumen est un projet full stack organisé en monorepo avec deux applications indépendantes :

- `client/` : front-end React + TypeScript + Vite
- `server/` : back-end Node.js + Express + TypeScript + MySQL

Le projet est conçu comme une application de journal intime enrichie d'un système de mood, de chronos/timers et de statistiques utilisateur.

---

## 2. Stack technique

### Front-end
- React 19
- TypeScript
- Vite
- React DOM
- React Icons
- ESLint pour la qualité du code

### Back-end
- Node.js / TypeScript
- Express 5
- MySQL (via mysql2/promise)
- JSON Web Tokens (`jsonwebtoken`) pour l'authentification
- `bcrypt` pour le hashage des mots de passe
- `cookie-parser` pour lire les cookies JWT
- `cors` pour autoriser les requêtes depuis le front
- `dotenv` pour charger les variables d'environnement

### Base de données
- MySQL
- Pool de connexions via `mysql2/promise`
- Schéma relationnel avec des tables : `user`, `article`, `chrono_session`, `timer_session`, `stat_mood`, `user_stat_mood`

---

## 3. Architecture du back-end

Le back-end suit un modèle MVC / 3 couches avec :

- `src/models/` : définitions de types TypeScript
- `src/repositories/` : accès direct à la base de données et CRUD
- `src/controllers/` : logique d'API et réponses HTTP
- `src/routes.ts` : définition des routes Express
- `src/middlewares/` : gestion de l'authentification JWT
- `src/db.ts` : configuration de la connexion MySQL

### Flux principal

1. Le client effectue une requête HTTP vers l'API Express.
2. `routes.ts` dispatch la requête vers le contrôleur correspondant.
3. Le contrôleur appelle un repository.
4. Le repository exécute des requêtes SQL sur MySQL.
5. Le contrôleur renvoie des JSON / statuts HTTP.

---

## 4. Architecture du front-end

Le front utilise une architecture de composants React :

- `src/App.tsx` : point d'entrée de l'application
- `src/components/` : structure UI réutilisable
  - `header/` : barre de navigation
  - `buttons/` : mood button et palettes
  - `forms/` : formulaire de connexion
  - `articles/` : affichage et lecture d'articles
  - `chronos/` : gestionnaire de chronos/timers
- `src/components/buttons/MoodButton.tsx` : composant mood existant à transformer en module de thèmes
- `src/hooks/useFetchArticle.ts` : hook custom pour récupérer les articles
- CSS localisés par composant

---

## 5. Bases de données et schéma

### Tables principales

- `user`
  - `id`, `name`, `email`, `password`, `created_at`
- `article`
  - `id`, `title`, `content`, `created_at`, `user_id`
- `chrono_session`
  - `id`, `timer_recorded`, `created_at`, `user_id`
- `timer_session`
  - `id`, `timer_recorded`, `created_at`, `user_id`
- `stat_mood`
  - `id`, `mood`
- `user_stat_mood`
  - table de relation entre utilisateur et mood

### Remarques de conception

- Les dates sont stockées en `BIGINT` (timestamp) pour `created_at`.
- `article.user_id`, `chrono_session.user_id` et `timer_session.user_id` sont des clefs étrangères vers `user.id`.
- Les tables de session sont séparées en `chrono_session` et `timer_session`, ce qui convient si les traitements sont distincts.

---

## 6. User stories identifiées

### User stories publiques
- En tant qu'utilisateur non connecté, je peux créer un compte.
- En tant qu'utilisateur non connecté, je peux me connecter.
- En tant qu'utilisateur non connecté, je peux accéder à la page d'accueil (actuellement vide).
- En tant qu'utilisateur non connecté, je ne peux pas accéder aux fonctionnalités privées.

### User stories authentifiées
- En tant qu'utilisateur connecté, je peux choisir mon humeur.
- En tant qu'utilisateur connecté, mon choix de mood applique automatiquement un thème associé.
- En tant qu'utilisateur connecté, je peux créer un article.
- En tant qu'utilisateur connecté, je peux modifier un article.
- En tant qu'utilisateur connecté, je peux supprimer un article.
- En tant qu'utilisateur connecté, je peux lire mon journal personnel.
- En tant qu'utilisateur connecté, je peux consulter mes sessions chrono/timer.
- En tant qu'utilisateur connecté, je peux voir mes statistiques de mood.

### Mood module
- En tant qu'utilisateur connecté, je peux définir une humeur via le `MoodButton`.
- En fonction du mood choisi, un thème visuel est appliqué à partir des thèmes définis dans `palettes.css` :
  - `joie` → thème `joie`
  - `tristesse` → thème `triste`
  - `fatigue` → thème `vintage`
  - `stress` → thème `cyber`
  - `neon`
  - `calme` → thème `nuage`

### Sécurité
- En tant qu'utilisateur, je veux que mes informations de connexion soient sécurisées.
- En tant qu'utilisateur, je veux que les routes privées soient protégées par JWT.

---

## 7. Vérification de la conception actuelle

### Points positifs
- Séparation claire `controllers / repositories / models`
- Authentification JWT avec cookie `access_token`
- Pattern compatible pour ajouter plus de services métier
- Base de données bien normalisée pour les entités principales
- Front React moderne avec Vite

### Limites à corriger ou améliorer
- Il n'y a pas de couche `services` dédiée : certains contrôleurs effectuent encore directement de la logique métier.
- `UserRepository.create()` retourne une erreur brute sans uniformiser le traitement.
- `verifyToken` recharge l'utilisateur en base via l'email présent dans le JWT ; l'ID seul serait suffisant et plus robuste.
- La route `GET /api/articles/me` renvoie un seul article paginé par défaut (`limit = 1`) : il faut clarifier l'usage.
- `user.controller` renvoie `404` pour des champs manquants alors que `400` serait plus adapté.
- Les routes de logout sont commentées.
- Il n’y a pas d’exemple `.env.example` dans le dossier server visible ici.

---

## 8. Outils et prérequis à installer

### Logiciels nécessaires
- Node.js (préférer la version 20+ compatible avec `tsx` et le setup)
- npm
- MySQL / MariaDB
- IDE / éditeur (VS Code recommandé)
- Git

### Librairies front-end
- `react`, `react-dom`, `react-icons`
- `vite`, `typescript`, `eslint`, `@types/*`

### Librairies back-end
- `express`, `mysql2`, `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`, `dotenv`
- `ts-node-dev`, `tsx`, `typescript`

---

## 9. Commandes de démarrage

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 10. Prochaines améliorations recommandées

- Ajouter une couche `service` entre contrôleurs et repositories.
- Centraliser la gestion des erreurs avec un middleware Express.
- Ajouter des tests unitaires et d'intégration.
- Mettre en place un fichier `.env.example` et des validations de configuration.
- Gérer proprement la déconnexion et le rafraîchissement de JWT.
- Ajouter la pagination complète dans `articles` et support multi-page dans le front.
- Définir un schéma React pour les pages : login, journal, mood, chrono, dashboard statistiques.

---

## 11. Emplacement du fichier

Ce document est placé dans : `server/database/conception/project_summary.md`
