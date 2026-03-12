# AstraLumen 

## 💡 À propos d’AstraLumen

AstraLumen est pour l’instant une **API REST backend** structurée comme un **monolithe 3‑couches avec MVC**, prête à gérer articles, utilisateurs, sessions et statistiques.

À terme, le projet deviendra une **application full stack**, avec un front React, comprenant :

* un **journal personnel**
* un **chrono et un timer**
* une **météo mood**, où le bouton mood change le design du journal
* un **dashboard de statistiques** des sessions, timer et chrono

L’architecture actuelle permet de séparer clairement les responsabilités : accès à la BDD, logique métier, gestion des requêtes HTTP et endpoints, ce qui rend l’application **facile à maintenir et à étendre**.

---

## 📂 Structure du projet

```
AstraLumen (Full Stack)
│
├─ server (API REST)
│   ├─ src/
│   │   ├─ app.ts             # Instance Express (point d'entrée)
│   │   ├─ db.ts              # Connexion MySQL (pool)
│   │   ├─ models/            # Types / interfaces TS
│   │   │    ├─ IArticle.ts
│   │   │    ├─ IUser.ts
│   │   │    ├─ ISession.ts
│   │   │    └─ IStatMood.ts
│   │   ├─ repositories/      # CRUD + accès direct BDD
│   │   │    ├─ ArticleRepository.ts
│   │   │    └─ UserRepository.ts
│   │   ├─ controllers/       # Gestion des requêtes HTTP
│   │   │    ├─ article.controller.ts
│   │   │    ├─ user.controller.ts
│   │   │    └─ auth.controller.ts
│   │   ├─ middlewares/       # Auth, JWT, validation
│   │   │    └─ verifyToken.ts
│   │   └─ route.ts           # Définition des endpoints
│   └─ database/
│       ├─ conception/        # UML : MCD, MLD, MPD, user cases
│       └─ config/            # db.sql + fake_data.sql
│
├─ client (React)
│   ├─ src/
│   │   ├─ App.tsx            # Point d'entrée React
│   │   ├─ index.tsx
│   │   ├─ components/
│   │   │    ├─ header/
│   │   │    │    └─ Header.tsx        # Navbar dynamique 
│   │   │    ├─ buttons/
│   │   │    │    ├─ MoodButton.tsx    # Bouton qui change le thème
│   │   │    │    └─ palettes.css      # Définition des thèmes
│   │   │    ├─ forms/
│   │   │    │    ├─ LoginForm.tsx     # Formulaire de connexion
│   │   │    │    └─ form.css          
│   │   │    └─ articles/
│   │   │         ├─ ArticleViewer.tsx # Journal personnel
│   │   │         └─ article.css       
│   │   ├─ hooks/
│   │   │    └─ useFetchArticle.ts    

```


---

## ⚡ Installation

```bash
git clone <repo-url>
````

### Backend
```bash
cd server
npm install
cp .env.example .env      # Ajouter tes variables d'environnement
npm run dev               # Lancer le serveur en dev
```

### Frontend
```bash
cd client
npm install
npm run dev               # Lancer React en dev
```

Pour le moment, le serveur et le frontend se lancent séparément. La configuration du build sera faite plus tard.
---

## 🚀 Lancer le serveur

```bash
npm run dev       # Serveur en développement
npm run build     # Compiler TypeScript
npm start         # Lancer serveur compilé
```

Le serveur écoute sur le port défini dans `.env` ou sur 4000 par défaut.

---

## 📌 Points clés de l’architecture

* **Models** → structure des données / types TS (`IArticle`, `IUser`, `ISession`, `IStatMood`)
* **Repositories** → CRUD et accès direct à la BDD
* **Controllers** → gestion des requêtes HTTP et codes statut (`200`, `201`, `404`, `500`)
* **Routes** → endpoints Express (`/articles`, `/users/:id`)

**À venir :**

* **Services** → logique métier : pagination, stats, hashage mot de passe, règles spécifiques
* **Middlewares** → auth, validation, logging, gestion des erreurs
* **Utils** → fonctions réutilisables : génération de token, formatage de dates, helpers

---

## 📌 Fonctionnalités prévues

* CRUD complet pour articles, utilisateurs, sessions et stats
* Pagination des journaux et sessions
* Calcul des statistiques par session
* Sécurité : hashage mot de passe, validation des données, authentification JWT
* Prêt pour front React (monorepo possible)

---
