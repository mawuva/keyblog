# KeyBlog — Documentation

> Application web Laravel 12 + React 19 / Inertia.js v2 avec authentification Keycloak SSO.

---

## Table des matières

### 🏗️ Architecture (Modèle C4)

- [**Vue d'ensemble — C4**](./architecture/overview.md) — Contexte système, conteneurs, composants et code selon le modèle C4.
- [**Composants Backend**](./architecture/components-backend.md) — C4 Niveau 3 : routing, middleware, controllers, domain layer, support layer.
- [**Composants Frontend**](./architecture/components-frontend.md) — C4 Niveau 3 : pages, layouts, composants, hooks, types.
- [**Stack Technique**](./architecture/tech-stack.md) — Liste complète des technologies, packages et outils (PHP, JS, infra).

### ⚙️ Backend

- [**Domain Layer**](./backend/domain.md) — Architecture DDD : domaines Catalogs, Roles, Users, Shared. Modèles, DTOs, Actions, Services, Enums, Resources.
- [**Système de Statuts**](./backend/status-system.md) — Statuts avec transitions contrôlées, couleurs automatiques, intégration Tailwind CSS. Contrat `StatusEnumContract`, trait `InteractsWithStatus`.
- [**Support Layer**](./backend/support-layer.md) — Modèles de base (UUID, utils), système de flash messages, fonctions globales helpers.

### 🎨 Frontend

- [**Frontend React / Inertia**](./frontend/README.md) — Architecture frontend : point d'entrée, résolution des pages, SSR, Vite, layouts, hooks, types, theming, Wayfinder.

### 🔐 Authentification

- [**Authentification**](./authentication/README.md) — Keycloak SSO (OAuth2/OIDC), Laravel Fortify (2FA, reset password), middleware d'authentification, données utilisateur partagées, configuration.

### 📝 Système CRUD

- [**CRUD Backend**](./crud/README.md) — `BaseCrudController` avec traits composables : actions CRUD, query builder, resource transformer, status change, soft deletes.
- [**CRUD Frontend**](./crud/frontend.md) — Composants React réutilisables : `DataTable`, `DataCard`, filtres, dialogs, hook `useQueryBuilder`.

### 🌍 Internationalisation (i18n)

- [**Système de traduction**](./i18n/README.md) — Traductions PHP synchronisées vers React, hook `useLang()`, routage localisé, singulier/pluriel, actions nommées.

### 🗄️ Base de données

- [**Base de données**](./database/README.md) — Migrations, schéma des tables, seeders (permissions, rôles), factories.

### ⚡ Configuration & Infrastructure

- [**Configuration**](./configuration/README.md) — Variables d'environnement, fichiers de config, routage détaillé, providers, scripts de développement, CI/CD, structure du projet.

---

## Démarrage rapide

### Prérequis

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM
- Serveur Keycloak (pour l'authentification SSO)

### Installation

```bash
# Cloner le projet
git clone <repo-url> keyblog
cd keyblog

# Installation complète (composer + npm + migrations + build)
composer run setup

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres (DB, Keycloak, etc.)

# Générer la clé
php artisan key:generate

# Exécuter les migrations et seeders
php artisan migrate --seed
```

### Développement

```bash
# Lancer le serveur de développement (Laravel + Queue + Vite)
composer run dev

# Ou avec SSR
composer run dev:ssr
```

L'application sera accessible sur `http://localhost:8000`.

### Tests

```bash
# Exécuter tous les tests
php artisan test --compact

# Linting PHP
composer run lint

# Linting + formatage frontend
npm run lint
npm run format

# Vérification des types TypeScript
npm run types
```

---

## Structure de la documentation

```
docs/
├── index.md                         # ← Vous êtes ici (table des matières)
├── architecture/
│   ├── overview.md                  # C4 : Contexte, Conteneurs, Composants, Code
│   ├── components-backend.md        # C4 Niveau 3 : Composants Backend
│   ├── components-frontend.md       # C4 Niveau 3 : Composants Frontend
│   └── tech-stack.md                # Stack technique complète
├── backend/
│   ├── domain.md                    # Domain Layer (DDD)
│   ├── status-system.md             # Système de statuts
│   └── support-layer.md             # Support Layer (models, flash, helpers)
├── frontend/
│   └── README.md                    # Architecture frontend React/Inertia
├── authentication/
│   └── README.md                    # Keycloak SSO + Fortify
├── crud/
│   ├── README.md                    # CRUD Backend (BaseCrudController)
│   └── frontend.md                  # CRUD Frontend (composants React)
├── i18n/
│   └── README.md                    # Système de traduction
├── database/
│   └── README.md                    # Migrations, seeders, schéma
└── configuration/
    └── README.md                    # Config, env, routing, CI/CD
```