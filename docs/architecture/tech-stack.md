# Stack Technique

Ce document liste l'ensemble des technologies, packages et outils utilisés dans KeyBlog.

---

## Backend (PHP / Laravel)

### Framework & Runtime

| Technologie | Version | Description |
|-------------|---------|-------------|
| **PHP** | ^8.2 | Langage serveur. |
| **Laravel** | ^12.0 | Framework PHP principal. |
| **Laravel Fortify** | ^1.30 | Authentification backend (login, register, 2FA, reset password). |
| **Laravel Socialite** | ^5.24 | Authentification OAuth2 avec providers externes. |
| **Laravel Tinker** | ^2.10.1 | REPL interactif pour Laravel. |
| **Laravel Wayfinder** | ^0.1.9 | Génération de routes TypeScript typées. |
| **Inertia.js Laravel** | ^2.0 | Adaptateur serveur Inertia.js pour Laravel. |

### Packages Spatie

| Package | Version | Description |
|---------|---------|-------------|
| **spatie/laravel-data** | ^4.19 | Data Transfer Objects (DTO) avec validation intégrée. |
| **spatie/laravel-permission** | ^6.24 | Gestion des rôles et permissions. |
| **spatie/laravel-query-builder** | ^6.4 | Construction de requêtes avec filtres, tri et includes depuis les query params. |
| **spatie/laravel-medialibrary** | ^11.18 | Gestion des fichiers médias associés aux modèles. |
| **spatie/laravel-model-status** | ^1.18 | Système de statuts pour les modèles Eloquent. |
| **spatie/laravel-sluggable** | ^3.7 | Génération automatique de slugs. |
| **spatie/laravel-translatable** | ^6.12 | Champs traduisibles sur les modèles Eloquent. |

### Localisation & i18n

| Package | Version | Description |
|---------|---------|-------------|
| **mcamara/laravel-localization** | ^2.3 | Routage localisé avec préfixe de langue dans l'URL. |
| **laravel-lang/common** | ^6.7 | Traductions Laravel dans de nombreuses langues. |
| **erag/laravel-lang-sync-inertia** | * | Synchronisation des fichiers de traduction PHP vers le frontend Inertia. |

### Autres packages

| Package | Version | Description |
|---------|---------|-------------|
| **socialiteproviders/keycloak** | ^5.3 | Provider Socialite pour Keycloak. |
| **rahulhaque/laravel-filepond** | ^12.0 | Intégration FilePond pour l'upload de fichiers. |
| **ymigval/laravel-model-cache** | ^1.1 | Cache automatique des requêtes Eloquent. |

### Outils de développement

| Package | Version | Description |
|---------|---------|-------------|
| **Laravel Pint** | ^1.24 | Formateur de code PHP (basé sur PHP-CS-Fixer). |
| **Laravel Sail** | ^1.41 | Environnement Docker pour le développement. |
| **Laravel Pail** | ^1.2.2 | Tail des logs en temps réel. |
| **Laravel Boost** | ^2.1 | MCP server avec outils de développement. |
| **Pest** | ^4.3 | Framework de tests PHP. |
| **PHPUnit** | ^12 | Framework de tests (via Pest). |
| **Barryvdh Debugbar** | ^4.0 | Barre de débogage. |
| **Faker** | ^1.23 | Génération de données fictives. |
| **Mockery** | ^1.6 | Mocking pour les tests. |

---

## Frontend (TypeScript / React)

### Framework & Build

| Technologie | Version | Description |
|-------------|---------|-------------|
| **React** | ^19.2.0 | Bibliothèque UI. |
| **React DOM** | ^19.2.0 | Rendu DOM React. |
| **TypeScript** | ^5.7.2 | Typage statique JavaScript. |
| **Vite** | ^7.0.4 | Bundler et serveur de développement. |
| **laravel-vite-plugin** | ^2.0 | Plugin Vite pour Laravel. |
| **@vitejs/plugin-react** | ^5.0.0 | Plugin Vite pour React. |
| **babel-plugin-react-compiler** | ^1.0.0 | React Compiler (optimisation automatique). |

### Inertia.js

| Package | Version | Description |
|---------|---------|-------------|
| **@inertiajs/react** | ^2.3.7 | Adaptateur client Inertia.js pour React. |
| **@laravel/vite-plugin-wayfinder** | ^0.1.3 | Plugin Vite pour Wayfinder (routes typées). |

### Styling

| Package | Version | Description |
|---------|---------|-------------|
| **Tailwind CSS** | ^4.0.0 | Framework CSS utility-first (v4). |
| **@tailwindcss/vite** | ^4.1.11 | Plugin Vite pour Tailwind CSS v4. |
| **tw-animate-css** | ^1.4.0 | Animations CSS pour Tailwind. |
| **tailwind-merge** | ^3.0.1 | Fusion intelligente de classes Tailwind. |
| **clsx** | ^2.1.1 | Utilitaire de construction de classes conditionnelles. |
| **class-variance-authority** | ^0.7.1 | Gestion de variantes de composants. |

### Composants UI (Radix UI / shadcn/ui)

| Package | Version | Description |
|---------|---------|-------------|
| **radix-ui** | ^1.4.3 | Primitives UI accessibles. |
| **@radix-ui/react-avatar** | ^1.1.3 | Composant Avatar. |
| **@radix-ui/react-checkbox** | ^1.1.4 | Composant Checkbox. |
| **@radix-ui/react-collapsible** | ^1.1.3 | Composant Collapsible. |
| **@radix-ui/react-dialog** | ^1.1.6 | Composant Dialog/Modal. |
| **@radix-ui/react-dropdown-menu** | ^2.1.6 | Composant Dropdown Menu. |
| **@radix-ui/react-label** | ^2.1.2 | Composant Label. |
| **@radix-ui/react-navigation-menu** | ^1.2.5 | Composant Navigation Menu. |
| **@radix-ui/react-select** | ^2.1.6 | Composant Select. |
| **@radix-ui/react-separator** | ^1.1.2 | Composant Separator. |
| **@radix-ui/react-slot** | ^1.2.3 | Composant Slot (composition). |
| **@radix-ui/react-toggle** | ^1.1.2 | Composant Toggle. |
| **@radix-ui/react-toggle-group** | ^1.1.2 | Composant Toggle Group. |
| **@radix-ui/react-tooltip** | ^1.1.8 | Composant Tooltip. |
| **@headlessui/react** | ^2.2.0 | Composants UI headless. |

### Autres packages frontend

| Package | Version | Description |
|---------|---------|-------------|
| **lucide-react** | ^0.475.0 | Icônes SVG (fork de Feather Icons). |
| **sonner** | ^2.0.7 | Notifications toast. |
| **cmdk** | ^1.1.1 | Command palette (Cmd+K). |
| **next-themes** | ^0.4.6 | Gestion du thème (light/dark/system). |
| **input-otp** | ^1.4.2 | Champ OTP pour la 2FA. |
| **filepond** | ^4.32.11 | Upload de fichiers. |
| **react-filepond** | ^7.1.3 | Wrapper React pour FilePond. |
| **@vortechron/query-builder-ts** | ^1.2.0 | Construction de query strings pour Spatie Query Builder. |
| **@erag/lang-sync-inertia** | ^1.4.12 | Synchronisation des traductions côté client. |

### Outils de développement frontend

| Package | Version | Description |
|---------|---------|-------------|
| **ESLint** | ^9.17.0 | Linter JavaScript/TypeScript. |
| **Prettier** | ^3.4.2 | Formateur de code. |
| **prettier-plugin-tailwindcss** | ^0.6.11 | Tri automatique des classes Tailwind. |
| **eslint-config-prettier** | ^10.0.1 | Désactive les règles ESLint en conflit avec Prettier. |
| **typescript-eslint** | ^8.23.0 | Support TypeScript pour ESLint. |

---

## Infrastructure & DevOps

| Outil | Description |
|-------|-------------|
| **Keycloak** | Serveur d'identité (IdP) pour l'authentification SSO OAuth2/OIDC. |
| **Laravel Sail** | Environnement Docker pour le développement local. |
| **GitHub Actions** | CI/CD : lint (`.github/workflows/lint.yml`) et tests (`.github/workflows/tests.yml`). |
| **Concurrently** | Exécution parallèle des processus de développement (server, queue, vite). |
