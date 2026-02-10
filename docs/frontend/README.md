# Frontend — React 19 / Inertia.js v2

Ce document détaille l'architecture frontend de KeyBlog, construite avec **React 19**, **Inertia.js v2**, **TypeScript** et **Tailwind CSS v4**.

---

## Sommaire

- [Point d'entrée](#point-dentrée)
- [Résolution des pages](#résolution-des-pages)
- [SSR (Server-Side Rendering)](#ssr-server-side-rendering)
- [Vite & Build](#vite--build)
- [Structure des dossiers](#structure-des-dossiers)
- [Layouts](#layouts)
- [Hooks personnalisés](#hooks-personnalisés)
- [Système de types](#système-de-types)
- [Theming & Apparence](#theming--apparence)
- [Wayfinder — Routes typées](#wayfinder--routes-typées)

---

## Point d'entrée

### `resources/js/app.tsx`

Point d'entrée client-side de l'application.

```tsx
createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: { color: '#4B5563' },
});

initializeTheme();
```

**Points clés** :
- Les pages sont résolues depuis `resources/js/pages/` par convention de nommage.
- React StrictMode est activé.
- Le thème (light/dark) est initialisé au chargement.
- La barre de progression Inertia est configurée.

### `resources/views/app.blade.php`

Template Blade racine qui sert de shell HTML :
- Détection du dark mode système via script inline (évite le flash).
- Chargement de la police "Instrument Sans" via Bunny Fonts.
- Directives `@viteReactRefresh`, `@vite`, `@inertiaHead`, `@inertia`.

---

## Résolution des pages

Les pages sont automatiquement résolues par Inertia depuis le chemin retourné par le contrôleur Laravel :

| Contrôleur retourne | Page React chargée |
|---------------------|-------------------|
| `inertia('admin/category/index', [...])` | `resources/js/pages/admin/category/index.tsx` |
| `inertia('auth/login', [...])` | `resources/js/pages/auth/login.tsx` |
| `inertia('settings/profile', [...])` | `resources/js/pages/settings/profile.tsx` |
| `inertia('home', [...])` | `resources/js/pages/home.tsx` |

---

## SSR (Server-Side Rendering)

### `resources/js/ssr.tsx`

Point d'entrée SSR pour le rendu côté serveur.

```tsx
createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        // ...
    }),
);
```

Lancement SSR : `php artisan inertia:start-ssr` (ou via `composer run dev:ssr`).

---

## Vite & Build

### Configuration (`vite.config.ts`)

```typescript
plugins: [
    laravel({
        input: ['resources/css/app.css', 'resources/js/app.tsx'],
        ssr: 'resources/js/ssr.tsx',
        refresh: true,
    }),
    react({
        babel: {
            plugins: ['babel-plugin-react-compiler'],
        },
    }),
    tailwindcss(),
    wayfinder({ formVariants: true }),
],
```

**Plugins** :
- **laravel-vite-plugin** — Intégration Laravel avec HMR et SSR.
- **@vitejs/plugin-react** — Support React avec **React Compiler** (optimisation automatique des re-renders).
- **@tailwindcss/vite** — Tailwind CSS v4 natif.
- **@laravel/vite-plugin-wayfinder** — Génération automatique des routes TypeScript.

### Scripts npm

| Script | Commande | Description |
|--------|----------|-------------|
| `dev` | `vite` | Serveur de développement avec HMR. |
| `build` | `vite build` | Build de production. |
| `build:ssr` | `vite build && vite build --ssr` | Build avec SSR. |
| `format` | `prettier --write resources/` | Formatage du code. |
| `lint` | `eslint . --fix` | Linting avec auto-fix. |
| `types` | `tsc --noEmit` | Vérification des types TypeScript. |

---

## Structure des dossiers

```
resources/js/
├── app.tsx                  # Point d'entrée client
├── ssr.tsx                  # Point d'entrée SSR
├── pages/                   # Pages Inertia (convention de nommage)
│   ├── home.tsx
│   ├── about.tsx
│   ├── admin/               # Pages d'administration
│   ├── auth/                # Pages d'authentification
│   ├── member/              # Pages de l'espace membre
│   └── settings/            # Pages de paramètres
├── layouts/                 # Layouts réutilisables
│   ├── app-layout.tsx       # Layout principal (membre)
│   ├── auth-layout.tsx      # Layout authentification
│   ├── admin/               # Layout admin avec sidebar
│   ├── app/                 # Layout app avec sidebar
│   ├── auth/                # Templates auth
│   ├── member/              # Layout membre
│   ├── public/              # Layout public
│   └── settings/            # Layout paramètres
├── components/              # Composants réutilisables
│   ├── crud/                # Composants CRUD (DataTable, etc.)
│   ├── forms/               # Composants de formulaire
│   ├── filters/             # Composants de filtrage
│   ├── dialogs/             # Dialogs de confirmation
│   ├── feedback/            # Flash messages, erreurs
│   ├── common/              # Breadcrumbs, Heading, StatusBadge
│   ├── ui/                  # shadcn/ui (30+ composants)
│   ├── appearance/          # Sélection de thème
│   ├── command-palette/     # Palette de commandes (Cmd+K)
│   ├── filepond/            # Upload de fichiers
│   ├── i18n/                # Sélection de langue
│   ├── logo/                # Logo de l'application
│   ├── navigation/          # Navigation
│   ├── public/              # Composants publics
│   ├── security/            # Composants 2FA
│   ├── user/                # Avatar, dropdown utilisateur
│   └── layout/              # Sidebar, header
├── hooks/                   # Hooks React personnalisés
├── types/                   # Types TypeScript
├── lib/                     # Utilitaires (trans, cn, navigation)
├── actions/                 # Actions Wayfinder (générées)
├── routes/                  # Routes Wayfinder (générées)
└── wayfinder/               # Configuration Wayfinder (générée)
```

---

## Layouts

Chaque section de l'application utilise un layout dédié :

| Layout | Composants | Description |
|--------|-----------|-------------|
| **AdminLayout** | Sidebar admin avec groupes de navigation, header, breadcrumbs | Pour les pages d'administration. |
| **AppLayout** | Sidebar app, header | Pour les utilisateurs authentifiés (membre). |
| **AuthLayout** | Layout simple centré | Pour les pages d'authentification (login, register, etc.). |
| **PublicLayout** | Header public, footer | Pour les pages publiques (home, about). |
| **SettingsLayout** | Navigation latérale des paramètres | Pour les pages de paramètres. |

### Pattern d'utilisation

Chaque page déclare son layout dans le composant :

```tsx
export default function CategoryIndex({ items }: Props) {
    return (
        <AdminLayout headTags={{ title: 'Categories' }} breadcrumbs={breadcrumbs}>
            {/* Contenu de la page */}
        </AdminLayout>
    );
}
```

---

## Hooks personnalisés

Voir [Documentation complète des hooks](../architecture/components-frontend.md#hooks-resourcesjshooks).

### Hooks principaux

| Hook | Usage |
|------|-------|
| `useLang()` | Accès aux traductions (trans, transChoice, transFrom, etc.). |
| `useQueryBuilder()` | Construction d'URLs avec filtres, tri, pagination pour Spatie Query Builder. |
| `useAppearance()` | Gestion du thème (light/dark/system). |
| `useCurrentUrl()` | Accès à l'URL courante et ses paramètres. |
| `useAdminNavGroups()` | Groupes de navigation admin. |
| `useTwoFactorAuth()` | Gestion de l'état 2FA. |

---

## Système de types

### `SharedData`

Type principal des données partagées par Inertia (disponibles sur toutes les pages) :

```typescript
type SharedData = {
    name: string;                    // Nom de l'application
    auth: Auth;                      // Données d'authentification
    sidebarOpen: boolean;            // État de la sidebar
    flash?: { message?: string; level?: string } | null;
    locales?: Record<string, { native?: string; name?: string }>;
    currentLocale?: string;
    currentLocaleName?: string;
};
```

### Types d'entités

| Type | Fichier | Description |
|------|---------|-------------|
| `Category` | `types/entities/catalogs.ts` | Catégorie avec statut, slug, dates. |
| `Role` | `types/entities/roles.ts` | Rôle avec permissions. |
| `Permission` | `types/entities/roles.ts` | Permission. |
| `AppUser` | `types/entities/users.ts` | Utilisateur applicatif. |
| `UserData` | `types/auth.ts` | Données utilisateur Keycloak. |

---

## Theming & Apparence

### Système de thème

Le thème est géré via :
- **Cookie `appearance`** — Persistance côté serveur (light/dark/system).
- **Classe CSS `.dark`** — Appliquée sur `<html>` pour le dark mode.
- **Variables CSS oklch** — Définies dans `resources/css/app.css` pour `:root` et `.dark`.

### Variables CSS personnalisées

Le design system utilise des variables CSS sémantiques :

| Variable | Description |
|----------|-------------|
| `--background` / `--foreground` | Couleurs de base. |
| `--primary` / `--primary-foreground` | Couleur principale. |
| `--secondary` / `--secondary-foreground` | Couleur secondaire. |
| `--muted` / `--muted-foreground` | Couleur atténuée. |
| `--accent` / `--accent-foreground` | Couleur d'accent. |
| `--destructive` / `--destructive-foreground` | Couleur destructive (rouge). |
| `--success` / `--success-foreground` | Couleur de succès (vert). |
| `--warning` / `--warning-foreground` | Couleur d'avertissement (orange). |
| `--info` / `--info-foreground` | Couleur d'information (bleu). |
| `--sidebar-*` | Variables spécifiques à la sidebar. |
| `--chart-1` à `--chart-5` | Couleurs pour les graphiques. |

---

## Wayfinder — Routes typées

**Wayfinder** génère automatiquement des fonctions TypeScript pour chaque route Laravel nommée.

### Utilisation

```tsx
import { dashboard } from '@/routes/admin';
import { index, destroy, changeStatus } from '@/routes/admin/category';

// Obtenir l'URL
const url = index().url;           // "/fr/admin/category"
const deleteUrl = destroy.url(id); // "/fr/admin/category/{id}"

// Navigation Inertia
router.get(index().url);
router.delete(destroy.url(id));
```

### Génération

Les routes sont générées automatiquement par le plugin Vite Wayfinder lors du `npm run dev` ou `npm run build`. Les fichiers générés sont dans `resources/js/routes/` et `resources/js/actions/`.
