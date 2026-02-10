# Configuration & Infrastructure

Ce document détaille la configuration, le routage, les variables d'environnement et l'infrastructure de KeyBlog.

---

## Sommaire

- [Variables d'environnement](#variables-denvironnement)
- [Fichiers de configuration](#fichiers-de-configuration)
- [Routage](#routage)
- [Providers](#providers)
- [Scripts de développement](#scripts-de-développement)
- [CI/CD](#cicd)
- [Structure du projet](#structure-du-projet)

---

## Variables d'environnement

### Application

| Variable | Description | Exemple |
|----------|-------------|---------|
| `APP_NAME` | Nom de l'application. | `KeyBlog` |
| `APP_ENV` | Environnement (`local`, `production`). | `local` |
| `APP_KEY` | Clé de chiffrement (générée via `php artisan key:generate`). | `base64:...` |
| `APP_DEBUG` | Mode debug. | `true` |
| `APP_URL` | URL de base de l'application. | `http://localhost:8000` |

### Base de données

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DB_CONNECTION` | Driver de base de données. | `sqlite`, `mysql`, `pgsql` |
| `DB_HOST` | Hôte de la base de données. | `127.0.0.1` |
| `DB_PORT` | Port. | `3306` |
| `DB_DATABASE` | Nom de la base. | `keyblog` |
| `DB_USERNAME` | Utilisateur. | `root` |
| `DB_PASSWORD` | Mot de passe. | — |

### Keycloak

| Variable | Description | Exemple |
|----------|-------------|---------|
| `KEYCLOAK_CLIENT_ID` | Client ID OAuth2. | `keyblog-client` |
| `KEYCLOAK_CLIENT_SECRET` | Client Secret. | `your-secret` |
| `KEYCLOAK_REDIRECT_URI` | URL de callback. | `http://localhost:8000/auth/callback` |
| `KEYCLOAK_BASE_URL` | URL du serveur Keycloak. | `http://localhost:8080` |
| `KEYCLOAK_REALM` | Nom du realm. | `keyblog-realm` |
| `KEYCLOAK_ADMIN_CLIENT_ID` | Client ID admin. | `admin-cli` |
| `KEYCLOAK_ADMIN_USERNAME` | Utilisateur admin Keycloak. | `admin` |
| `KEYCLOAK_ADMIN_PASSWORD` | Mot de passe admin Keycloak. | `admin` |

### Autres

| Variable | Description |
|----------|-------------|
| `MAIL_*` | Configuration email (SMTP, Mailgun, etc.). |
| `CACHE_STORE` | Driver de cache (`file`, `redis`, `database`). |
| `SESSION_DRIVER` | Driver de session (`file`, `database`, `redis`). |
| `QUEUE_CONNECTION` | Driver de file d'attente (`sync`, `database`, `redis`). |

---

## Fichiers de configuration

### `config/` — Fichiers principaux

| Fichier | Description |
|---------|-------------|
| `app.php` | Configuration générale de l'application (nom, timezone, locale, providers). |
| `auth.php` | Guards et providers d'authentification. |
| `cache.php` | Configuration du cache. |
| `constants.php` | Constantes applicatives (ex: `default_password`). |
| `database.php` | Connexions base de données. |
| `filesystems.php` | Disques de stockage (local, public, S3). |
| `fortify.php` | Configuration Laravel Fortify (features activées, guards, etc.). |
| `inertia.php` | Configuration Inertia.js (SSR, testing). |
| `laravellocalization.php` | Configuration de la localisation (locales supportées, préfixes). |
| `logging.php` | Canaux de logs. |
| `mail.php` | Configuration email. |
| `media-library.php` | Configuration Spatie Media Library. |
| `model-cache.php` | Configuration du cache de modèles. |
| `permission.php` | Configuration Spatie Permission. |
| `queue.php` | Configuration des files d'attente. |
| `services.php` | Services tiers (Keycloak, Postmark, AWS, etc.). |
| `session.php` | Configuration des sessions. |

### `bootstrap/app.php`

Point de configuration central de Laravel 12 :

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Cookies non chiffrés
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // Middleware web globaux
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Alias de middleware
        $middleware->alias([
            'localize'             => LaravelLocalizationRoutes::class,
            'localizationRedirect' => LaravelLocalizationRedirectFilter::class,
            'localeSessionRedirect'=> LocaleSessionRedirect::class,
            'localeCookieRedirect' => LocaleCookieRedirect::class,
            'localeViewPath'       => LaravelLocalizationViewPath::class,
            'keycloak.auth'        => KeycloakAuth::class,
            'keycloak.role'        => KeycloakUserRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
```

### `bootstrap/providers.php`

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
];
```

---

## Routage

### Architecture des routes

Toutes les routes web sont encapsulées dans un groupe de localisation :

```
/{locale}/                          → Pages publiques (home, about)
/{locale}/auth/                     → Authentification Keycloak
/{locale}/admin/                    → Administration (protégé keycloak.auth + keycloak.role:admin)
/{locale}/member/                   → Espace membre (protégé keycloak.role:member)
/{locale}/settings/                 → Paramètres utilisateur (protégé auth)
/locale/{locale}                    → Changement de langue (hors groupe localisé)
/api/locale/current                 → API locale courante
/up                                 → Health check
```

### Détail des fichiers de routes

| Fichier | Préfixe | Middleware | Routes |
|---------|---------|------------|--------|
| `web.php` | `/{locale}` | `localeSessionRedirect`, `localizationRedirect`, `localeViewPath` | Home, About + inclusion des autres fichiers. |
| `keycloak.php` | `/auth` | — | `GET login`, `GET callback`, `GET logout`. |
| `admin.php` | `/admin` | `keycloak.auth`, `keycloak.role:admin` | Dashboard, Category CRUD (10 routes), Permissions (index), Roles CRUD (6 routes). |
| `member.php` | `/member` | `keycloak.role:member` | Dashboard. |
| `settings.php` | `/settings` | `auth`, `verified` | Profile (GET, PATCH, DELETE), Password (GET, PUT), Appearance (GET), 2FA (GET). |
| `api.php` | `/api` | — | `GET locale/current`. |
| `console.php` | — | — | Commandes Artisan personnalisées. |

### Routes admin détaillées

#### Catégories (`admin.category.*`)

| Route | Méthode | URI | Action |
|-------|---------|-----|--------|
| `admin.category.index` | GET | `/admin/category` | Liste paginée. |
| `admin.category.create` | GET | `/admin/category/create` | Formulaire de création. |
| `admin.category.store` | POST | `/admin/category` | Création. |
| `admin.category.show` | GET | `/admin/category/{category}` | Détail. |
| `admin.category.edit` | GET | `/admin/category/{category}/edit` | Formulaire d'édition. |
| `admin.category.update` | PUT | `/admin/category/{category}` | Mise à jour. |
| `admin.category.destroy` | DELETE | `/admin/category/{category}` | Suppression (soft). |
| `admin.category.change-status` | PATCH | `/admin/category/{category}/status` | Changement de statut. |
| `admin.category.restore` | POST | `/admin/category/{category}/restore` | Restauration. |
| `admin.category.force-delete` | DELETE | `/admin/category/{category}/force-delete` | Suppression définitive. |

#### Rôles (`admin.role.*`)

| Route | Méthode | URI | Action |
|-------|---------|-----|--------|
| `admin.role.index` | GET | `/admin/roles` | Liste. |
| `admin.role.create` | GET | `/admin/roles/create` | Formulaire de création. |
| `admin.role.store` | POST | `/admin/roles` | Création. |
| `admin.role.edit` | GET | `/admin/roles/{role}/edit` | Formulaire d'édition. |
| `admin.role.update` | PUT | `/admin/roles/{role}` | Mise à jour. |
| `admin.role.destroy` | DELETE | `/admin/roles/{role}` | Suppression. |

#### Permissions (`admin.permission.*`)

| Route | Méthode | URI | Action |
|-------|---------|-----|--------|
| `admin.permission.index` | GET | `/admin/permissions` | Liste (lecture seule). |

---

## Providers

### `AppServiceProvider`

| Fonctionnalité | Description |
|----------------|-------------|
| `CarbonImmutable` | Utilisation de dates immutables. |
| `DB::prohibitDestructiveCommands()` | Protection contre les commandes destructives en production. |
| `Password::defaults()` | Règles de mot de passe strictes en production (12 chars, mixedCase, letters, numbers, symbols, uncompromised). |
| Socialite Keycloak | Enregistrement du driver Socialite pour Keycloak. |

### `FortifyServiceProvider`

| Fonctionnalité | Description |
|----------------|-------------|
| Actions | `CreateNewUser`, `ResetUserPassword`. |
| Vues Inertia | Login, Register, ForgotPassword, ResetPassword, VerifyEmail, 2FA Challenge, ConfirmPassword. |
| Rate Limiting | `login` (5/min par email+IP), `two-factor` (5/min par session). |

---

## Scripts de développement

### Composer

| Script | Commande | Description |
|--------|----------|-------------|
| `composer run setup` | `composer install` + `key:generate` + `migrate` + `npm install` + `npm run build` | Installation complète. |
| `composer run dev` | `php artisan serve` + `queue:listen` + `npm run dev` (concurrently) | Développement local (3 processus). |
| `composer run dev:ssr` | Build SSR + `serve` + `queue:listen` + `pail` + `inertia:start-ssr` | Développement avec SSR (4 processus). |
| `composer run lint` | `pint --parallel` | Formatage PHP. |
| `composer run test` | `config:clear` + `pint --test` + `php artisan test` | Tests complets. |

### NPM

| Script | Commande | Description |
|--------|----------|-------------|
| `npm run dev` | `vite` | Serveur de développement avec HMR. |
| `npm run build` | `vite build` | Build de production. |
| `npm run build:ssr` | `vite build && vite build --ssr` | Build avec SSR. |
| `npm run format` | `prettier --write resources/` | Formatage du code frontend. |
| `npm run lint` | `eslint . --fix` | Linting avec auto-fix. |
| `npm run types` | `tsc --noEmit` | Vérification des types TypeScript. |

---

## CI/CD

### GitHub Actions

#### Lint (`.github/workflows/lint.yml`)

Exécute le linting PHP (Pint) et frontend (ESLint, Prettier) sur chaque push/PR.

#### Tests (`.github/workflows/tests.yml`)

Exécute les tests Pest sur chaque push/PR.

---

## Structure du projet

```
keyblog/
├── app/                    # Code applicatif Laravel
│   ├── Http/               # Controllers, Middleware, Requests
│   ├── Providers/          # Service Providers
│   └── Support/            # Helpers, Models de base, Flash, Enums
├── bootstrap/              # Configuration Laravel 12 (app.php, providers.php)
├── config/                 # Fichiers de configuration
├── database/               # Migrations, Seeders, Factories
├── domain/                 # Domain Layer (DDD)
│   ├── Catalogs/           # Domaine des catalogues
│   ├── Roles/              # Domaine des rôles/permissions
│   ├── Shared/             # Composants partagés (Status, Media)
│   └── Users/              # Domaine des utilisateurs
├── lang/                   # Traductions (en/, fr/, en.json, fr.json)
├── public/                 # Assets publics (favicon, etc.)
├── resources/              # Frontend
│   ├── css/                # Tailwind CSS (app.css)
│   ├── js/                 # React/TypeScript (pages, components, hooks, types)
│   └── views/              # Blade templates (app.blade.php)
├── routes/                 # Définitions des routes
├── storage/                # Fichiers générés (logs, cache, sessions)
├── tests/                  # Tests Pest
│   ├── Feature/            # Tests fonctionnels
│   └── Unit/               # Tests unitaires
├── .github/workflows/      # CI/CD GitHub Actions
├── composer.json            # Dépendances PHP
├── package.json             # Dépendances Node.js
├── vite.config.ts           # Configuration Vite
├── tsconfig.json            # Configuration TypeScript
├── eslint.config.js         # Configuration ESLint
├── pint.json                # Configuration Laravel Pint
└── phpunit.xml              # Configuration PHPUnit/Pest
```

### Namespaces PSR-4

| Namespace | Dossier | Description |
|-----------|---------|-------------|
| `App\` | `app/` | Code applicatif. |
| `Domain\` | `domain/` | Couche domaine (DDD). |
| `Database\Factories\` | `database/factories/` | Factories Eloquent. |
| `Database\Seeders\` | `database/seeders/` | Seeders. |
| `Tests\` | `tests/` | Tests. |
