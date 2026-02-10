# Architecture Overview — Modèle C4

Ce document décrit l'architecture de **KeyBlog** selon le modèle C4 (Context, Containers, Components, Code).

KeyBlog est une application web de type blog/CMS construite avec **Laravel 12** (backend) et **React 19 / Inertia.js v2** (frontend), utilisant **Keycloak** comme fournisseur d'identité (IdP) pour l'authentification SSO.

---

## Sommaire

- [Niveau 1 — Contexte Système](#niveau-1--contexte-système)
- [Niveau 2 — Conteneurs](#niveau-2--conteneurs)
- [Niveau 3 — Composants](#niveau-3--composants)
- [Niveau 4 — Code](#niveau-4--code)

---

## Niveau 1 — Contexte Système

Le diagramme de contexte montre les acteurs externes et les systèmes avec lesquels KeyBlog interagit.

```
┌─────────────────────────────────────────────────────────────┐
│                    KEYBLOG SYSTEM                            │
│                                                             │
│  Application web Laravel 12 + React 19 / Inertia.js v2     │
│  Blog/CMS avec gestion de rôles, catégories et contenu     │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Visiteur    │  │  Membre      │  │  Administrateur  │
│  (Public)    │  │  (Member)    │  │  (Admin)         │
│              │  │              │  │                  │
│ Consulte les │  │ Accède à son │  │ Gère catégories, │
│ pages pub.   │  │ dashboard    │  │ rôles, perms,   │
└──────────────┘  └──────────────┘  │ utilisateurs    │
                                    └──────────────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   KEYCLOAK       │
                  │   (IdP / SSO)    │
                  │                  │
                  │ Authentification │
                  │ OAuth2/OIDC      │
                  │ Gestion JWT      │
                  └──────────────────┘
```

### Acteurs

| Acteur | Description |
|--------|-------------|
| **Visiteur** | Utilisateur non authentifié. Accède aux pages publiques (accueil, à propos). |
| **Membre** | Utilisateur authentifié via Keycloak avec le rôle `member`. Accède à son dashboard membre. |
| **Administrateur** | Utilisateur authentifié via Keycloak avec le rôle `admin`. Gère les catégories, rôles, permissions et le contenu. |

### Systèmes externes

| Système | Description |
|---------|-------------|
| **Keycloak** | Serveur d'identité (IdP) fournissant l'authentification SSO via OAuth2/OpenID Connect. Gère les utilisateurs, rôles et groupes. |

---

## Niveau 2 — Conteneurs

Le diagramme de conteneurs montre les principaux composants techniques déployés.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         KEYBLOG APPLICATION                         │
│                                                                     │
│  ┌─────────────────────────────┐  ┌──────────────────────────────┐ │
│  │     FRONTEND (SPA)          │  │      BACKEND (API)           │ │
│  │                             │  │                              │ │
│  │  React 19                   │  │  Laravel 12                  │ │
│  │  Inertia.js v2              │◄─┤  PHP 8.3                    │ │
│  │  TypeScript                 │  │  Inertia Server-Side         │ │
│  │  Tailwind CSS v4            │  │  Fortify (Auth locale)       │ │
│  │  Radix UI / shadcn/ui       │  │  Socialite (Keycloak SSO)   │ │
│  │  Lucide Icons               │  │  Spatie Packages             │ │
│  │  Vite 7                     │  │  Domain-Driven Design        │ │
│  └─────────────────────────────┘  └──────────────┬───────────────┘ │
│                                                   │                 │
│                                   ┌───────────────▼───────────────┐ │
│                                   │       BASE DE DONNÉES         │ │
│                                   │                               │ │
│                                   │  SQLite / MySQL / PostgreSQL  │ │
│                                   │  Migrations Laravel           │ │
│                                   │  Eloquent ORM                 │ │
│                                   └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   KEYCLOAK       │
                  │   Server         │
                  │   (External)     │
                  └──────────────────┘
```

### Conteneurs

| Conteneur | Technologie | Rôle |
|-----------|-------------|------|
| **Frontend SPA** | React 19, Inertia.js v2, TypeScript, Tailwind CSS v4, Vite 7 | Interface utilisateur client-side rendue via Inertia. Pages React servies par Laravel. |
| **Backend API** | Laravel 12, PHP 8.3, Fortify, Socialite | Logique métier, routage, authentification, API Inertia. Architecture Domain-Driven. |
| **Base de données** | SQLite/MySQL/PostgreSQL | Stockage persistant des données (utilisateurs, catégories, rôles, permissions, statuts). |
| **Keycloak** | Keycloak Server (externe) | Fournisseur d'identité SSO. Authentification OAuth2/OIDC, gestion des JWT tokens. |
| **Vite Dev Server** | Vite 7 + plugins | Serveur de développement avec HMR, compilation TypeScript, Tailwind CSS, React Compiler. |

---

## Niveau 3 — Composants

Voir les documents détaillés :

- [Composants Backend](./components-backend.md)
- [Composants Frontend](./components-frontend.md)

---

## Niveau 4 — Code

Voir les documents détaillés par domaine :

- [Domain Layer](../backend/domain.md)
- [CRUD System](../crud/README.md)
- [Système de Statuts](../backend/status-system.md)
- [Authentification Keycloak](../authentication/README.md)
