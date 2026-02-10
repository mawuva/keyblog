# Système d'Internationalisation (i18n)

KeyBlog dispose d'un système de traduction complet couvrant le backend PHP et le frontend React, avec support du **français** et de l'**anglais**.

---

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Backend — Traductions PHP](#backend--traductions-php)
- [Frontend — Synchronisation et utilisation](#frontend--synchronisation-et-utilisation)
- [Routage localisé](#routage-localisé)
- [Ajouter une nouvelle langue](#ajouter-une-nouvelle-langue)
- [Ajouter de nouvelles traductions](#ajouter-de-nouvelles-traductions)

---

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUX DE TRADUCTION                            │
│                                                                 │
│  lang/fr/actions.php ──┐                                        │
│  lang/fr/common.php  ──┤                                        │
│  lang/fr/messages.php ─┤   syncLangFiles()    ┌──────────────┐ │
│  lang/fr/navigation.php┤──────────────────────>│  Inertia     │ │
│  lang/fr/pages/...   ──┤   (HandleInertia     │  Shared Data │ │
│  lang/en/...         ──┘    Requests)          │  { lang: {} }│ │
│                                                └──────┬───────┘ │
│                                                       │         │
│                                                       ▼         │
│                                              ┌──────────────┐   │
│                                              │  useLang()   │   │
│                                              │  Hook React  │   │
│                                              │              │   │
│                                              │  trans()     │   │
│                                              │  __()        │   │
│                                              │  transFrom() │   │
│                                              │  transChoice()│  │
│                                              └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Packages utilisés

| Package | Rôle |
|---------|------|
| `mcamara/laravel-localization` | Routage localisé avec préfixe de langue dans l'URL (`/fr/...`, `/en/...`). |
| `laravel-lang/common` | Traductions Laravel officielles dans de nombreuses langues. |
| `erag/laravel-lang-sync-inertia` | Synchronisation des fichiers de traduction PHP vers le frontend Inertia via `syncLangFiles()`. |
| `@erag/lang-sync-inertia` | Package npm compagnon côté client. |

---

## Backend — Traductions PHP

### Structure des fichiers

```
lang/
├── en/                          # Traductions anglaises
│   ├── actions.php              # Labels d'actions (Add, Edit, Delete, etc.)
│   ├── auth.php                 # Messages d'authentification
│   ├── common.php               # Traductions communes (pagination, filtres, entités)
│   ├── messages.php             # Messages flash et confirmations
│   ├── navigation.php           # Labels de navigation
│   ├── passwords.php            # Messages de mot de passe
│   ├── validation.php           # Messages de validation
│   └── pages/                   # Traductions spécifiques aux pages
│       ├── auth.php             # Pages d'authentification
│       └── admin/
│           ├── catalogs.php     # Pages admin catégories
│           └── roles.php        # Pages admin rôles
├── fr/                          # Traductions françaises (même structure)
│   ├── actions.php
│   ├── auth.php
│   ├── common.php
│   ├── messages.php
│   ├── navigation.php
│   ├── passwords.php
│   ├── validation.php
│   └── pages/
│       ├── auth.php
│       └── admin/
│           ├── catalogs.php
│           └── roles.php
├── en.json                      # Traductions JSON (Laravel)
└── fr.json                      # Traductions JSON (Laravel)
```

### Fichiers de traduction détaillés

#### `actions.php` — Actions

Labels d'actions réutilisables dans toute l'application.

```php
return [
    'add'    => 'Add',        // fr: 'Ajouter'
    'edit'   => 'Edit',       // fr: 'Modifier'
    'delete' => 'Delete',     // fr: 'Supprimer'
    'save'   => 'Save',       // fr: 'Enregistrer'
    'cancel' => 'Cancel',     // fr: 'Annuler'
    // ... 80+ actions

    'named' => [
        'add'    => 'Add :name',        // fr: 'Ajouter :name'
        'edit'   => 'Edit :name',       // fr: 'Modifier :name'
        'delete' => 'Delete :name',     // fr: 'Supprimer :name'
        'create' => 'Create :name',     // fr: 'Créer :name'
        // ... actions nommées avec placeholder :name
    ],
];
```

#### `common.php` — Traductions communes

```php
return [
    'copyright'  => '© :year :app. All rights reserved.',
    'pagination' => [ /* showing, to, of, results, per_page, ... */ ],
    'filters'    => [ /* search, all_statuses, with_trashed, ... */ ],
    'empty'      => 'No :entity found.',
    'entity'     => [
        'category'   => 'category|categories',     // Singulier|Pluriel
        'role'       => 'role|roles',
        'permission' => 'permission|permissions',
        'user'       => 'user|users',
    ],
];
```

#### `messages.php` — Messages

```php
return [
    'data' => [
        'created'             => 'Data created successfully.',
        'updated'             => 'Data updated successfully.',
        'deleted'             => 'Data deleted successfully.',
        'restored'            => 'Data restored successfully.',
        'deleted_permanently' => 'Data permanently deleted successfully.',
    ],
    'confirm' => [
        'delete'        => ['title' => '...', 'description' => '...'],
        'force_delete'  => ['title' => '...', 'description' => '...'],
        'restore'       => ['title' => '...', 'description' => '...'],
        'status_change' => ['title' => '...', 'description' => '...'],
    ],
    'errors' => [ /* general, not_found, access_denied, ... */ ],
];
```

#### `navigation.php` — Navigation

```php
return [
    'nav'             => [ /* home, about, dashboard, profile, ... */ ],
    'user_dropdown'   => [ /* dashboard, profile, settings, logout */ ],
    'lang_switcher'   => [ /* change_language */ ],
    'theme_toggle'    => [ /* toggle_theme, light, dark, system */ ],
    'auth'            => [ /* sign_in, sign_up, sign_out, my_account */ ],
    'breadcrumbs'     => [ /* home, dashboard, admin, member */ ],
    'command_palette' => [ /* title, description, placeholder, ... */ ],
    'admin' => [
        'nav'    => [ /* dashboard, categories, roles, permissions, ... */ ],
        'groups' => [ /* main, rights_management, catalog_management, system */ ],
    ],
];
```

---

## Frontend — Synchronisation et utilisation

### Synchronisation (`syncLangFiles`)

Les fichiers de traduction PHP sont synchronisés vers le frontend via `HandleInertiaRequests::share()` :

```php
syncLangFiles([
    'actions',
    'auth',
    'common',
    'passwords',
    'validation',
    'messages',
    'navigation',
    'pages/auth',
    'pages/admin/catalogs',
    'pages/admin/roles',
]);
```

Cette fonction (fournie par `erag/laravel-lang-sync-inertia`) charge les fichiers PHP de la locale courante et les injecte dans les props Inertia sous la clé `lang`.

### Hook `useLang()`

Hook React principal pour accéder aux traductions.

```tsx
const { trans, __, transFrom, transChoice, transAttr, transMsg, transCommon, transAct, transNavigation } = useLang();
```

| Fonction | Signature | Description | Exemple |
|----------|-----------|-------------|---------|
| `trans()` | `trans(key, replaces?)` | Traduction de base. | `trans('actions.add')` → `"Add"` |
| `__()` | `__(key, replaces?)` | Alias de `trans()`. | `__('actions.edit')` → `"Edit"` |
| `transFrom()` | `transFrom(namespace, key, replaces?)` | Traduction depuis un namespace. | `transFrom('pages/admin/catalogs', 'category.title')` |
| `transChoice()` | `transChoice(key, count?, replaces?)` | Traduction avec singulier/pluriel. | `transChoice('common.entity.category', 2)` → `"categories"` |
| `transAttr()` | `transAttr(key)` | Attribut de validation capitalisé. | `transAttr('name')` → `"Name"` |
| `transMsg()` | `transMsg(key, replaces?)` | Raccourci pour `messages.{key}`. | `transMsg('data.created')` |
| `transCommon()` | `transCommon(key, replaces?)` | Raccourci pour `common.{key}`. | `transCommon('filters.search')` |
| `transAct()` | `transAct(key)` | Raccourci pour `actions.{key}`. | `transAct('delete')` → `"Delete"` |
| `transNavigation()` | `transNavigation(key)` | Raccourci pour `navigation.{key}`. | `transNavigation('nav.home')` |
| `__capitalize()` | `__capitalize(key, replaces?)` | Traduit et capitalise. | `__capitalize('actions.add')` → `"Add"` |

### Placeholders

Deux syntaxes de remplacement sont supportées :

```tsx
// Syntaxe Laravel :name
trans('messages.welcome', { name: 'John' })  // "Welcome, John!"

// Syntaxe {name}
trans('common.copyright', { year: 2025, app: 'KeyBlog' })
```

### Singulier / Pluriel (`transChoice`)

Les traductions avec `|` supportent le singulier/pluriel :

```php
// PHP
'category' => 'category|categories',
```

```tsx
// React
transChoice('common.entity.category', 1)  // "category"
transChoice('common.entity.category', 2)  // "categories"
```

### Actions nommées (`transAction`)

La fonction utilitaire `transAction()` (dans `lib/trans.ts`) combine une action avec une entité :

```tsx
import { transAction } from '@/lib/trans';

// "Add Category" (en) / "Ajouter Catégorie" (fr)
transAction(trans, transChoice, 'add', 'category');

// "Delete Categories" (en) / "Supprimer Catégories" (fr)
transAction(trans, transChoice, 'delete', 'category', 2);
```

---

## Routage localisé

### Configuration

Le routage localisé est géré par `mcamara/laravel-localization`. Toutes les routes web sont préfixées par la locale :

```
/fr/                    → Page d'accueil (français)
/en/                    → Page d'accueil (anglais)
/fr/admin/dashboard     → Dashboard admin (français)
/en/admin/dashboard     → Dashboard admin (anglais)
```

### Middleware

Les middleware de localisation sont appliqués au groupe de routes principal dans `web.php` :

```php
Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
], function () {
    // Toutes les routes...
});
```

### Changement de langue

Route dédiée (hors du groupe localisé) :

```
GET /locale/{locale}    → LocaleController::switch()
```

API pour la locale courante :

```
GET /api/locale/current → LocaleController::current()
```

### Données partagées avec Inertia

Les informations de locale sont partagées via `HandleInertiaRequests` :

```php
'locales'           => LaravelLocalization::getSupportedLocales(),
'currentLocale'     => LaravelLocalization::getCurrentLocale(),
'currentLocaleName' => LaravelLocalization::getCurrentLocaleName(),
```

---

## Ajouter une nouvelle langue

1. Créer le dossier `lang/{locale}/` avec tous les fichiers de traduction.
2. Créer le fichier `lang/{locale}.json` pour les traductions JSON.
3. Configurer la locale dans `config/laravellocalization.php`.
4. Les traductions seront automatiquement synchronisées avec le frontend.

## Ajouter de nouvelles traductions

1. Ajouter les clés dans les fichiers PHP (`lang/en/...` et `lang/fr/...`).
2. Si le fichier doit être synchronisé avec le frontend, l'ajouter dans `syncLangFiles()` dans `HandleInertiaRequests`.
3. Utiliser `useLang()` côté React pour accéder aux nouvelles traductions.
