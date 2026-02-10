# C4 Niveau 3 — Composants Backend

Ce document détaille les composants du backend Laravel 12 de KeyBlog.

---

## Diagramme des composants

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKEND LARAVEL 12                             │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  ROUTING     │  │  MIDDLEWARE   │  │  CONTROLLERS │  │  PROVIDERS │ │
│  │              │  │              │  │              │  │            │ │
│  │ web.php      │  │ Keycloak     │  │ Admin/       │  │ App        │ │
│  │ admin.php    │  │ Auth         │  │ Auth/        │  │ Fortify    │ │
│  │ keycloak.php │  │ Inertia      │  │ Crud/        │  │            │ │
│  │ member.php   │  │ Appearance   │  │ Settings/    │  │            │ │
│  │ settings.php │  │ Locale       │  │ Public/      │  │            │ │
│  │ api.php      │  │              │  │ Member/      │  │            │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                 │                 │                 │        │
│         ▼                 ▼                 ▼                 ▼        │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │                        DOMAIN LAYER                                ││
│  │                                                                    ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  ││
│  │  │ Users    │  │ Catalogs │  │ Roles    │  │ Shared           │  ││
│  │  │          │  │          │  │          │  │                  │  ││
│  │  │ Models   │  │ Models   │  │ Data     │  │ Status System    │  ││
│  │  │ Actions  │  │ Data     │  │ Enums    │  │ Media Actions    │  ││
│  │  │ Services │  │ Enums    │  │ Resources│  │                  │  ││
│  │  │ Data     │  │ Resources│  │          │  │                  │  ││
│  │  │ Concerns │  │          │  │          │  │                  │  ││
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘  ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │                        SUPPORT LAYER                               ││
│  │                                                                    ││
│  │  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ││
│  │  │ Models       │  │ Flash    │  │ Enums    │  │ MediaLibrary │  ││
│  │  │ BaseModel    │  │ System   │  │          │  │              │  ││
│  │  │ UUID Manager │  │          │  │          │  │              │  ││
│  │  │ Model Utils  │  │          │  │          │  │              │  ││
│  │  └──────────────┘  └──────────┘  └──────────┘  └──────────────┘  ││
│  └────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Composants détaillés

### 1. Routing (`routes/`)

Le routage est organisé en fichiers séparés par contexte, tous encapsulés dans un groupe de localisation (`LaravelLocalization`).

| Fichier | Préfixe | Middleware | Description |
|---------|---------|------------|-------------|
| `web.php` | `/{locale}` | `localeSessionRedirect`, `localizationRedirect`, `localeViewPath` | Point d'entrée principal. Inclut tous les autres fichiers de routes. |
| `admin.php` | `/admin` | `keycloak.auth`, `keycloak.role:admin` | Routes d'administration (CRUD catégories, rôles, permissions). |
| `keycloak.php` | `/auth` | — | Routes d'authentification Keycloak (login, callback, logout). |
| `member.php` | `/member` | `keycloak.role:member` | Routes de l'espace membre. |
| `settings.php` | `/settings` | `auth`, `verified` | Routes de paramètres utilisateur (profil, mot de passe, 2FA, apparence). |
| `api.php` | `/api` | — | API REST (locale courante). |

### 2. Middleware (`app/Http/Middleware/`)

| Middleware | Alias | Description |
|------------|-------|-------------|
| `HandleInertiaRequests` | — (web global) | Partage les données globales avec Inertia : utilisateur authentifié, flash messages, locales, sidebar state. Synchronise les fichiers de traduction. |
| `HandleAppearance` | — (web global) | Partage la préférence d'apparence (light/dark/system) via cookie. |
| `KeycloakAuth` | `keycloak.auth` | Vérifie que l'utilisateur est authentifié via Laravel Auth. Redirige vers Keycloak sinon. |
| `KeycloakUserRole` | `keycloak.role:{role}` | Vérifie que l'utilisateur possède le rôle Keycloak requis (admin, member, customer). |

Middleware de localisation (mcamara/laravel-localization) :

| Middleware | Alias | Description |
|------------|-------|-------------|
| `LaravelLocalizationRoutes` | `localize` | Gestion des routes localisées. |
| `LaravelLocalizationRedirectFilter` | `localizationRedirect` | Redirection automatique vers la locale. |
| `LocaleSessionRedirect` | `localeSessionRedirect` | Redirection basée sur la session. |
| `LocaleCookieRedirect` | `localeCookieRedirect` | Redirection basée sur le cookie. |

### 3. Controllers (`app/Http/Controllers/`)

| Namespace | Controllers | Description |
|-----------|-------------|-------------|
| `Admin/` | `CategoryController`, `RoleController`, `PermissionController`, `DashboardController`, `LoginController` | Administration : CRUD complet avec filtres, tri, pagination, statuts, soft deletes. |
| `Auth/` | `SocialiteController` | Authentification Keycloak via Socialite (redirect, callback, logout). |
| `Crud/` | `BaseCrudController` + 6 traits | Framework CRUD générique réutilisable. Voir [Documentation CRUD](../crud/README.md). |
| `Settings/` | `ProfileController`, `PasswordController`, `TwoFactorAuthenticationController` | Gestion du profil, mot de passe et 2FA. |
| `Public/` | `HomeController`, `PagesController` | Pages publiques (accueil, à propos). |
| `Member/` | `DashboardController` | Dashboard de l'espace membre. |
| — | `LocaleController` | Changement de langue (switch + API current). |

### 4. Providers (`app/Providers/`)

| Provider | Description |
|----------|-------------|
| `AppServiceProvider` | Configuration des défauts (CarbonImmutable, règles de mot de passe, protection destructive en production). Enregistrement du driver Socialite Keycloak. |
| `FortifyServiceProvider` | Configuration de Fortify : actions (CreateNewUser, ResetUserPassword), vues Inertia (login, register, reset-password, verify-email, 2FA), rate limiting. |

### 5. Domain Layer (`domain/`)

Voir [Documentation Domain Layer](../backend/domain.md) pour le détail complet.

| Domaine | Contenu | Description |
|---------|---------|-------------|
| `Users/` | Models, Actions, Services, Data, Concerns, Enums | Gestion des utilisateurs, intégration Keycloak, rôles Keycloak. |
| `Catalogs/` | Models, Data, Enums, Resources | Gestion des catégories (translatable, sluggable, status). |
| `Roles/` | Data, Enums, Resources | Gestion des rôles et permissions (Spatie Permission). |
| `Shared/` | Status, Media | Composants partagés : système de statuts avec transitions, gestion des médias. |

### 6. Support Layer (`app/Support/`)

| Composant | Description |
|-----------|-------------|
| `Models/BaseModel` | Modèle de base avec UUID (`_id`) et utilitaires. |
| `Models/CachedSoftDeletableModel` | Modèle avec soft deletes et cache. |
| `Models/Concerns/HasUuidManager` | Trait pour la gestion des UUID (`_id`), route model binding, scopes. |
| `Models/Concerns/HasModelUtils` | Trait pour les attributs formatés (`created_at_formatted`, `updated_at_formatted`). |
| `Models/Concerns/HasIcon` | Trait pour la gestion des icônes. |
| `Models/Concerns/HasDropdownOptions` | Trait pour les options de dropdown. |
| `Models/Concerns/HasSlugRedirects` | Trait pour les redirections par slug. |
| `Flash/Flash` | Système de flash messages (info, success, warning, error) via session. |
| `Flash/Message` | Value object pour les messages flash. |
| `helpers.php` | Fonctions globales : `flash()`, `flash_success()`, `flash_error()`, `__ucfirst()`, `request_user_data()`. |
| `Enums/` | Enums de support applicatif. |
| `MediaLibrary/` | Configuration Spatie Media Library. |
