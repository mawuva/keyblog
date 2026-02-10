# KeyBlog

Application web de type blog/CMS construite avec **Laravel 12** et **React 19 / Inertia.js v2**, utilisant **Keycloak** comme fournisseur d'identité (SSO OAuth2/OIDC).

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| **Backend** | PHP 8.3, Laravel 12, Fortify, Socialite, Spatie (Data, Permission, Query Builder, Media Library, Model Status, Sluggable, Translatable) |
| **Frontend** | React 19, Inertia.js v2, TypeScript, Tailwind CSS v4, Radix UI / shadcn/ui, Lucide Icons, Vite 7 |
| **Auth** | Keycloak (SSO OAuth2/OIDC), Laravel Fortify (2FA, reset password) |
| **i18n** | mcamara/laravel-localization, erag/lang-sync-inertia (FR / EN) |
| **Tests** | Pest 4, PHPUnit 12 |
| **CI/CD** | GitHub Actions (lint + tests) |

## Architecture

Le projet suit une architecture **Domain-Driven Design** avec séparation claire :

```
keyblog/
├── app/                 # Couche applicative (Controllers, Middleware, Support)
├── domain/              # Couche domaine (DDD)
│   ├── Catalogs/        # Catégories (translatable, sluggable, statuts)
│   ├── Roles/           # Rôles & permissions (Spatie Permission)
│   ├── Shared/          # Composants partagés (Status, Media)
│   └── Users/           # Utilisateurs & intégration Keycloak
├── resources/js/        # Frontend React / Inertia
│   ├── pages/           # Pages (admin, auth, member, settings, public)
│   ├── components/      # Composants réutilisables (CRUD, forms, UI)
│   ├── hooks/           # Hooks personnalisés (useLang, useQueryBuilder, ...)
│   ├── layouts/         # Layouts (admin, auth, public, member, settings)
│   └── types/           # Types TypeScript
├── lang/                # Traductions (en/, fr/)
├── routes/              # Routes (web, admin, keycloak, member, settings, api)
└── docs/                # Documentation complète
```

## Prérequis

- **PHP** >= 8.2
- **Composer** >= 2
- **Node.js** >= 18
- **NPM** >= 9
- **Keycloak** (serveur d'identité pour le SSO)

## Installation

```bash
# Cloner le projet
git clone <repo-url> keyblog
cd keyblog

# Installation complète (composer + npm + migrations + build)
composer run setup
```

Ou manuellement :

```bash
# Dépendances PHP
composer install

# Environnement
cp .env.example .env
php artisan key:generate

# Configurer .env (base de données, Keycloak, etc.)

# Base de données
php artisan migrate --seed

# Dépendances frontend
npm install
npm run build
```

### Configuration Keycloak

Ajouter dans `.env` :

```env
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_REDIRECT_URI=http://localhost:8000/auth/callback
KEYCLOAK_BASE_URL=http://localhost:8080
KEYCLOAK_REALM=your-realm
KEYCLOAK_ADMIN_CLIENT_ID=admin-cli
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin
```

## Développement

```bash
# Lancer les 3 processus (server + queue + vite) en parallèle
composer run dev
```

L'application sera accessible sur **http://localhost:8000**.

```bash
# Avec SSR (Server-Side Rendering)
composer run dev:ssr
```

### Commandes utiles

```bash
# Linting PHP (Pint)
composer run lint

# Linting + formatage frontend
npm run lint
npm run format

# Vérification des types TypeScript
npm run types

# Tests
php artisan test --compact

# Migrations
php artisan migrate --seed
```

## Fonctionnalités

### Authentification
- **SSO Keycloak** — Login/logout via OAuth2/OIDC, synchronisation des rôles et groupes.
- **Laravel Fortify** — Login local, inscription, reset password, vérification email.
- **2FA** — Authentification à deux facteurs (TOTP + codes de récupération).
- **Rôles Keycloak** — `admin`, `member`, `customer` avec redirection automatique.

### Administration
- **Dashboard** admin protégé par rôle Keycloak.
- **CRUD Catégories** — Liste paginée, filtres (nom, statut, corbeille), tri, création/édition via dialog, changement de statut, soft delete, restauration, suppression définitive.
- **Gestion des rôles** — CRUD avec assignation de permissions groupées par entité.
- **Permissions** — Liste en lecture seule, générées par seeders (13 entités × 9 actions × scopes).

### Système CRUD générique
- `BaseCrudController` avec traits composables (actions, query builder, resource transformer, status change, soft deletes).
- Composants React réutilisables : `DataTable`, `DataCard`, `DataTableFilters`, `DataTablePagination`, dialogs de confirmation.
- Hook `useQueryBuilder` compatible Spatie Query Builder.

### Système de statuts
- Transitions contrôlées par enum (`StatusEnumContract`).
- Couleurs automatiques (Tailwind CSS) avec support dark mode.
- Composant `StatusBadge` côté frontend.

### Internationalisation
- **Français** et **Anglais** supportés.
- Routage localisé (`/fr/...`, `/en/...`).
- Traductions PHP synchronisées vers React via `syncLangFiles()`.
- Hook `useLang()` avec `trans()`, `transChoice()`, `transFrom()`, actions nommées.

### Frontend
- **React 19** avec React Compiler (optimisation automatique).
- **Inertia.js v2** — SPA sans API, SSR supporté.
- **Tailwind CSS v4** avec design system (variables CSS oklch, dark mode).
- **shadcn/ui** — 30+ composants Radix UI.
- **Wayfinder** — Routes Laravel typées en TypeScript.
- **Command Palette** (Cmd+K) avec historique de recherche.
- **FilePond** pour l'upload de fichiers.

## Documentation

La documentation complète est disponible dans le dossier [`docs/`](./docs/index.md) :

- [Architecture C4](./docs/architecture/overview.md)
- [Stack technique](./docs/architecture/tech-stack.md)
- [Domain Layer](./docs/backend/domain.md)
- [Système de statuts](./docs/backend/status-system.md)
- [Support Layer](./docs/backend/support-layer.md)
- [Frontend React / Inertia](./docs/frontend/README.md)
- [Authentification Keycloak](./docs/authentication/README.md)
- [Système CRUD](./docs/crud/README.md)
- [Internationalisation](./docs/i18n/README.md)
- [Base de données](./docs/database/README.md)
- [Configuration & Infrastructure](./docs/configuration/README.md)

## Tests

```bash
# Tous les tests
php artisan test --compact

# Tests avec filtre
php artisan test --filter=CategoryTest

# Lint PHP
composer run test:lint
```

## Licence

MIT
