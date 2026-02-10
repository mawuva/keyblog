# C4 Niveau 3 — Composants Frontend

Ce document détaille les composants du frontend React 19 / Inertia.js v2 de KeyBlog.

---

## Diagramme des composants

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       FRONTEND REACT 19 / INERTIA v2                    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                          PAGES                                   │   │
│  │                                                                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│   │
│  │  │ Public   │  │ Auth     │  │ Admin    │  │ Settings         ││   │
│  │  │          │  │          │  │          │  │                  ││   │
│  │  │ home     │  │ login    │  │ dashboard│  │ profile          ││   │
│  │  │ about    │  │ register │  │ category/│  │ password         ││   │
│  │  │          │  │ forgot   │  │ role/    │  │ appearance       ││   │
│  │  │          │  │ reset    │  │ perm/    │  │ two-factor       ││   │
│  │  │          │  │ verify   │  │ login    │  │                  ││   │
│  │  │          │  │ 2fa      │  │          │  │                  ││   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         LAYOUTS                                  │   │
│  │                                                                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│   │
│  │  │ Public   │  │ Auth     │  │ Admin    │  │ App (Member)     ││   │
│  │  │ Layout   │  │ Layout   │  │ Layout   │  │ Layout           ││   │
│  │  │          │  │ (Simple) │  │ (Sidebar)│  │ (Sidebar)        ││   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                       COMPONENTS                                 │   │
│  │                                                                  │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐ │   │
│  │  │ CRUD   │ │ Forms  │ │Filters │ │Dialogs │ │ UI (shadcn)  │ │   │
│  │  │        │ │        │ │        │ │        │ │              │ │   │
│  │  │DataTable│ │FormField│ │Search │ │Delete  │ │Button,Card   │ │   │
│  │  │DataCard│ │FormInput│ │Status │ │Restore │ │Table,Dialog  │ │   │
│  │  │Paginate│ │FormSelect││Trashed│ │StatusCh│ │Select,Input  │ │   │
│  │  │Sort    │ │FormPass│ │        │ │        │ │Tooltip,...   │ │   │
│  │  │RowActs │ │FormText│ │        │ │        │ │              │ │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └──────────────┘ │   │
│  │                                                                  │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐ │   │
│  │  │Common  │ │Feedback│ │i18n    │ │Logo    │ │Navigation    │ │   │
│  │  │        │ │        │ │        │ │        │ │              │ │   │
│  │  │Breadcr.│ │Flash   │ │LangSwi.│ │AppLogo │ │CommandPalett│ │   │
│  │  │Heading │ │InputErr│ │        │ │        │ │              │ │   │
│  │  │StatusBa│ │AlertErr│ │        │ │        │ │              │ │   │
│  │  │TextLink│ │        │ │        │ │        │ │              │ │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └──────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                          HOOKS                                   │   │
│  │                                                                  │   │
│  │  useLang · useQueryBuilder · useAppearance · useCurrentUrl       │   │
│  │  useAdminNavGroups · useClipboard · useInitials · useMobile      │   │
│  │  useSearchHistory · useTwoFactorAuth · useGuestAppearance        │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      TYPES / LIB                                 │   │
│  │                                                                  │   │
│  │  types/ : SharedData, Auth, CRUD, Entities, Navigation, UI       │   │
│  │  lib/   : trans.ts (transAction), utils.ts (cn), navigation.ts   │   │
│  │  wayfinder/ : Routes typées générées automatiquement              │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Pages (`resources/js/pages/`)

### Pages publiques

| Page | Fichier | Description |
|------|---------|-------------|
| Accueil | `home.tsx` | Page d'accueil publique. |
| À propos | `about.tsx` | Page "À propos". |

### Pages d'authentification (`auth/`)

| Page | Fichier | Description |
|------|---------|-------------|
| Connexion | `login.tsx` | Formulaire de connexion Fortify. |
| Inscription | `register.tsx` | Formulaire d'inscription Fortify. |
| Mot de passe oublié | `forgot-password.tsx` | Demande de réinitialisation. |
| Réinitialisation | `reset-password.tsx` | Formulaire de réinitialisation. |
| Vérification email | `verify-email.tsx` | Page de vérification d'email. |
| Challenge 2FA | `two-factor-challenge.tsx` | Saisie du code 2FA (OTP ou recovery). |
| Confirmation mot de passe | `confirm-password.tsx` | Confirmation avant action sensible. |

### Pages admin (`admin/`)

| Page | Fichier | Description |
|------|---------|-------------|
| Dashboard | `dashboard.tsx` | Tableau de bord administrateur. |
| Login admin | `login.tsx` | Page de connexion admin (redirection Keycloak). |
| Catégories (index) | `category/index.tsx` | Liste paginée avec filtres, tri, actions CRUD, dialogs. |
| Catégories (create) | `category/create.tsx` | Formulaire de création de catégorie. |
| Catégories (edit) | `category/edit.tsx` | Formulaire d'édition de catégorie. |
| Catégories (form dialog) | `category/category-form-dialog.tsx` | Dialog modal pour créer/éditer une catégorie. |
| Rôles (index) | `role/index.tsx` | Liste des rôles avec permissions count. |
| Rôles (create) | `role/create.tsx` | Formulaire de création de rôle avec permissions groupées. |
| Rôles (edit) | `role/edit.tsx` | Formulaire d'édition de rôle. |
| Permissions (index) | `permission/index.tsx` | Liste des permissions (lecture seule). |

### Pages membre (`member/`)

| Page | Fichier | Description |
|------|---------|-------------|
| Dashboard | `dashboard.tsx` | Tableau de bord membre. |

### Pages paramètres (`settings/`)

| Page | Fichier | Description |
|------|---------|-------------|
| Profil | `profile.tsx` | Édition du profil (nom, email) + suppression de compte. |
| Mot de passe | `password.tsx` | Changement de mot de passe. |
| Apparence | `appearance.tsx` | Choix du thème (light/dark/system). |
| 2FA | `two-factor.tsx` | Activation/désactivation de l'authentification à deux facteurs. |

---

## Layouts (`resources/js/layouts/`)

| Layout | Fichier | Utilisation |
|--------|---------|-------------|
| **AppLayout** | `app-layout.tsx` → `app/app-sidebar-layout.tsx` | Layout principal avec sidebar pour les utilisateurs authentifiés. |
| **AdminLayout** | `admin/admin-layout.tsx` | Layout admin avec sidebar de navigation admin. |
| **AuthLayout** | `auth-layout.tsx` → `auth/auth-simple-layout.tsx` | Layout simple centré pour les pages d'authentification. |
| **PublicLayout** | `public/public-layout.tsx` | Layout pour les pages publiques. |
| **MemberLayout** | `member/member-layout.tsx` | Layout pour l'espace membre. |
| **SettingsLayout** | `settings/settings-layout.tsx` | Layout pour les pages de paramètres. |

---

## Composants (`resources/js/components/`)

### CRUD (`crud/`)

Composants réutilisables pour les interfaces CRUD. Voir [Documentation CRUD Frontend](../crud/frontend.md).

| Composant | Description |
|-----------|-------------|
| `DataTable` | Tableau de données générique avec colonnes, tri, actions par ligne. |
| `DataCard` | Vue en cartes (responsive) alternative au tableau. |
| `DataTablePagination` | Pagination avec navigation (premier, précédent, suivant, dernier). |
| `DataTableFilters` | Barre de filtres avec recherche et reset. |
| `DataTableSearch` | Champ de recherche avec debounce. |
| `DataTableSortHeader` | En-tête de colonne triable (asc/desc/none). |
| `DataTableHeader` | En-tête du tableau. |
| `DataTableFilterSelect` | Filtre par sélection. |
| `RowActions` | Menu d'actions par ligne (dropdown). |

### Forms (`forms/`)

| Composant | Description |
|-----------|-------------|
| `FormField` | Wrapper de champ avec label, erreur et aide. |
| `FormInput` | Champ de saisie texte. |
| `FormPassword` | Champ de mot de passe avec toggle de visibilité. |
| `FormSelect` | Sélecteur avec options. |
| `FormTextarea` | Zone de texte. |
| `FormCheckbox` | Case à cocher. |
| `FormSubmitButton` | Bouton de soumission avec état de chargement. |
| `FormLabelWithHelp` | Label avec tooltip d'aide. |

### Filters (`filters/`)

| Composant | Description |
|-----------|-------------|
| `SearchFilter` | Filtre de recherche textuelle. |
| `StatusFilter` | Filtre par statut (select). |
| `TrashedFilter` | Filtre pour les éléments supprimés (soft delete). |

### Dialogs (`dialogs/`)

| Composant | Description |
|-----------|-------------|
| `DeleteDialog` | Dialog de confirmation de suppression. |
| `RestoreDialog` | Dialog de confirmation de restauration. |
| `StatusChangeDialog` | Dialog de changement de statut avec sélection. |

### Feedback (`feedback/`)

| Composant | Description |
|-----------|-------------|
| `FlashToaster` | Affichage des flash messages via Sonner (toast). |
| `InputError` | Affichage des erreurs de validation sous un champ. |
| `AlertError` | Alerte d'erreur générale. |

### Common (`common/`)

| Composant | Description |
|-----------|-------------|
| `Breadcrumbs` | Fil d'Ariane. |
| `Heading` | Titre de page avec description. |
| `StatusBadge` | Badge coloré pour afficher un statut. |
| `TextLink` | Lien texte stylisé. |

### UI (`ui/`) — shadcn/ui

30+ composants Radix UI / shadcn/ui : `Button`, `Card`, `Dialog`, `DropdownMenu`, `Input`, `Label`, `Select`, `Table`, `Tooltip`, `Avatar`, `Checkbox`, `Separator`, `Toggle`, `NavigationMenu`, `Collapsible`, `Slot`, etc.

### Autres

| Dossier | Description |
|---------|-------------|
| `appearance/` | Composants de sélection de thème (light/dark/system). |
| `command-palette/` | Palette de commandes (Cmd+K) avec historique de recherche. |
| `filepond/` | Intégration FilePond pour l'upload de fichiers. |
| `i18n/` | Composant de sélection de langue. |
| `logo/` | Composants de logo de l'application. |
| `navigation/` | Composants de navigation. |
| `public/` | Composants spécifiques aux pages publiques. |
| `security/` | Composants liés à la sécurité (2FA). |
| `user/` | Composants liés à l'utilisateur (avatar, dropdown). |
| `layout/` | Composants de mise en page (sidebar, header). |

---

## Hooks (`resources/js/hooks/`)

| Hook | Description |
|------|-------------|
| `useLang` | Accès aux traductions. Fournit `trans()`, `__()`, `transFrom()`, `transChoice()`, `transAttr()`, `transMsg()`, `transCommon()`, `transAct()`, `transNavigation()`. |
| `useQueryBuilder` | Construction d'URLs avec filtres, tri et pagination via `@vortechron/query-builder-ts`. |
| `useAppearance` | Gestion du thème (light/dark/system) avec persistance cookie. |
| `useGuestAppearance` | Apparence pour les visiteurs non authentifiés. |
| `useCurrentUrl` | Accès à l'URL courante et ses paramètres. |
| `useAdminNavGroups` | Groupes de navigation admin (main, rights management, catalog management). |
| `useClipboard` | Copie dans le presse-papiers. |
| `useInitials` | Extraction des initiales d'un nom. |
| `useMobile` | Détection du mode mobile. |
| `useMobileNavigation` | État de la navigation mobile. |
| `useSearchHistory` | Historique de recherche pour la command palette. |
| `useTwoFactorAuth` | Gestion de l'état 2FA (activation, codes de récupération). |

---

## Types (`resources/js/types/`)

| Fichier | Types exportés | Description |
|---------|----------------|-------------|
| `index.ts` | `SharedData` | Type principal des données partagées Inertia (auth, flash, locales, sidebar). |
| `auth.ts` | `User`, `UserData`, `Auth`, `TwoFactorSetupData`, `TwoFactorSecretKey` | Types d'authentification. |
| `crud.ts` | `PaginatedData<T>`, `ColumnDef<T>`, `RowAction<T>`, `StatusData`, `FilterConfig` | Types CRUD génériques. |
| `head.ts` | `HeadTags` | Types pour les meta tags. |
| `navigation.ts` | `NavItem`, `BreadcrumbItem` | Types de navigation. |
| `ui.ts` | Types UI | Types pour les composants UI. |
| `entities/catalogs.ts` | `Category` | Type de l'entité catégorie. |
| `entities/roles.ts` | `Permission`, `Role`, `GroupedPermissions` | Types des entités rôles/permissions. |
| `entities/users.ts` | `AppUser` | Type de l'entité utilisateur. |

---

## Librairies utilitaires (`resources/js/lib/`)

| Fichier | Exports | Description |
|---------|---------|-------------|
| `trans.ts` | `transAction()` | Construit un label d'action nommée (ex: "Ajouter Catégorie"). |
| `utils.ts` | `cn()` | Utilitaire de fusion de classes CSS (clsx + tailwind-merge). |
| `navigation.ts` | — | Utilitaires de navigation. |

---

## Wayfinder (`resources/js/wayfinder/`, `resources/js/routes/`, `resources/js/actions/`)

**Wayfinder** est un plugin Laravel/Vite qui génère automatiquement des fonctions TypeScript typées pour les routes Laravel.

- Les routes sont accessibles via `@/routes/admin`, `@/routes/admin/category`, etc.
- Chaque route expose `.url` et `.method` pour une utilisation type-safe côté frontend.
- Exemple : `import { index, destroy } from '@/routes/admin/category';`
