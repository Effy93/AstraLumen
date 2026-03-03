# AstraLumen – Backend

Backend Node.js / Express pour AstraLumen, avec architecture **3‑couches + MVC + services**.

---

## 📂 Structure du projet

```
server/
│
├─ src/
│   ├─ app.ts            <-- point d'entrée (Instance Express server)
│   ├─ db.ts             <-- connexion MySQL (POOL)
│   ├─ models/           <-- entités / interfaces TS
│	    └─ IArticle.ts
│	    └─ ISession.ts
│	    └─ IStatMood.ts
│	    └─ IUser.ts
│   ├─ repositories/     <-- requêtes SQL (logique CRUD)
│	    └─ ArticleRepository.ts
│	    └─ UserRepository.ts
│   ├─ controllers/      <-- Contrôle et gestion des codes status
│	    └─ article.controller.ts
│   └─ route.ts          <-- endpoints Express
│
├─ package.json
├─ tsconfig.json
└─ .env
```

---

## ⚡ Installation

```bash
git clone <repo-url>
cd server
npm install
cp .env.example .env      # Ajouter tes variables d'environnement
npm run dev               # Lancer le serveur en dev
```

---

## 🚀 Lancer le serveur

```bash
npm run dev       # Serveur en développement (nodemon)
npm run build     # Compiler TypeScript
npm start         # Lancer serveur compilé
```

Le serveur écoute sur le port défini dans `.env` ou 4001 par défaut.

---

## 📌 Points clés de l’architecture

* **Models** → structure des données / types TS (`IArticle`, `IUser`, etc.)
* **Repositories** → CRUD BDD (requêtes SQL / ORM)
* **Services** → logique métier : pagination, stats, hashage mot de passe, règles spécifiques
* **Controllers** → gestion des requêtes HTTP et codes statut (`200`, `201`, `404`, `500`)
* **Routes** → endpoints Express (`/articles`, `/users/:id`)
* **Middlewares** → auth, validation, logging, gestion des erreurs
* **Utils** → fonctions réutilisables : tokens, formatage, helpers

**Exemple Logging :** enregistre les requêtes utilisateur pour détecter attaques, bugs ou ralentissements (optionnel en dev).

---

## 📌 Fonctionnalités prévues

* CRUD complet pour articles, utilisateurs, sessions et stats
* Pagination des journaux et sessions
* Calcul des statistiques par session
* Sécurité : hashage mot de passe, validation des données, authentification JWT
* Architecture prête pour front React (mono‑repo possible)

---

## 🛠️ Notes

* Les **services** sont optionnels si aucune règle métier complexe n’existe encore.
* Les **middlewares** permettent de centraliser sécurité, validation et gestion des erreurs.
* Les **utils** contiennent tout ce qui est réutilisable dans le projet, sans dépendance à Express ou BDD.

---

Si tu veux, je peux te faire une **version encore plus courte et “readable” pour quelqu’un qui découvre le projet**, style 1‑2 minutes de lecture avec tout ce qu’il faut savoir.

Veux‑tu que je fasse ça ?
