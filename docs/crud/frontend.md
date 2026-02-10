# CRUD Frontend — Composants React

Ce document détaille les composants React réutilisables pour les interfaces CRUD de KeyBlog.

---

## Architecture

```
resources/js/
├── components/
│   ├── crud/                    # Composants CRUD réutilisables
│   │   ├── data-table.tsx       # Tableau de données générique
│   │   ├── data-card.tsx        # Vue en cartes (responsive)
│   │   ├── data-table-pagination.tsx
│   │   ├── data-table-filters.tsx
│   │   ├── data-table-search.tsx
│   │   ├── data-table-sort-header.tsx
│   │   ├── data-table-header.tsx
│   │   ├── data-table-filter-select.tsx
│   │   └── row-actions.tsx      # Menu d'actions par ligne
│   ├── filters/                 # Filtres réutilisables
│   │   ├── search-filter.tsx
│   │   ├── status-filter.tsx
│   │   └── trashed-filter.tsx
│   └── dialogs/                 # Dialogs de confirmation
│       ├── delete-dialog.tsx
│       ├── restore-dialog.tsx
│       └── status-change-dialog.tsx
├── hooks/
│   └── use-query-builder.ts     # Hook de construction de requêtes
└── types/
    └── crud.ts                  # Types TypeScript CRUD
```

---

## Types (`types/crud.ts`)

### `PaginatedData<T>`

Type générique pour les données paginées retournées par Laravel.

```typescript
type PaginatedData<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};
```

### `ColumnDef<T>`

Définition d'une colonne de tableau.

```typescript
type ColumnDef<T> = {
    key: keyof T | string;      // Clé de la propriété
    label: string;               // Label affiché
    sortable?: boolean;          // Colonne triable
    sortKey?: string;            // Clé de tri (si différente de key)
    render?: (item: T) => ReactNode;  // Rendu personnalisé
    className?: string;          // Classes CSS
};
```

### `RowAction<T>`

Définition d'une action par ligne.

```typescript
type RowAction<T> = {
    label: string;
    icon?: ReactNode;
    href?: (item: T) => string;          // Navigation
    onClick?: (item: T) => void;         // Action
    variant?: 'default' | 'destructive';
    visible?: (item: T) => boolean;      // Condition de visibilité
};
```

### `FilterConfig`

Configuration des filtres (search ou select).

```typescript
type FilterConfig = SearchFilterConfig | SelectFilterConfig;
```

---

## Composants CRUD

### `DataTable<T>`

Tableau de données générique avec colonnes, tri et actions.

```tsx
<DataTable
    columns={columns}
    data={items.data}
    actions={actions}
    currentSort={currentSort}
    onSort={setSort}
    keyExtractor={(item) => item.id}
    emptyMessage="Aucun résultat trouvé."
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `ColumnDef<T>[]` | Définitions des colonnes. |
| `data` | `T[]` | Données à afficher. |
| `actions` | `RowAction<T>[]` | Actions par ligne (optionnel). |
| `currentSort` | `string` | Tri courant (ex: `name`, `-created_at`). |
| `onSort` | `(column: string) => void` | Callback de tri. |
| `keyExtractor` | `(item: T) => string` | Extraction de la clé unique. |
| `emptyMessage` | `string` | Message quand aucun résultat. |

### `DataCard<T>`

Vue alternative en cartes, responsive (grille 1/2/3 colonnes).

```tsx
<DataCard
    columns={columns}
    data={items.data}
    actions={actions}
    keyExtractor={(item) => item.id}
/>
```

La première colonne est utilisée comme titre de la carte, les suivantes comme détails.

### `DataTablePagination`

Pagination avec navigation complète.

```tsx
<DataTablePagination data={items} />
```

Affiche : "Showing X to Y of Z results" + boutons premier/précédent/suivant/dernier.

### `DataTableFilters`

Barre de filtres avec recherche et bouton de reset.

```tsx
<DataTableFilters
    searchValue={currentSearch}
    onSearch={setSearch}
    searchPlaceholder="Rechercher..."
    onReset={resetFilters}
    hasActiveFilters={hasActiveFilters}
    resetLabel="Réinitialiser"
>
    <StatusFilter ... />
    <TrashedFilter ... />
</DataTableFilters>
```

### `DataTableSortHeader`

En-tête de colonne triable avec indicateur de direction.

### `RowActions`

Menu dropdown d'actions par ligne. Filtre automatiquement les actions selon `visible()`.

---

## Filtres

### `SearchFilter`

Champ de recherche textuelle avec debounce.

### `StatusFilter`

Select pour filtrer par statut. Reçoit les options depuis le backend (`statusOptions`).

```tsx
<StatusFilter
    value={currentFilters.status}
    onChange={(v) => setFilter('status', v)}
    options={statusOptions}
    allLabel="Tous les statuts"
/>
```

### `TrashedFilter`

Select pour filtrer les éléments supprimés (soft delete).

```tsx
<TrashedFilter
    value={currentFilters.trashed}
    onChange={(v) => setFilter('trashed', v)}
    allLabel="Sans corbeille"
    withTrashedLabel="Avec corbeille"
    onlyTrashedLabel="Corbeille uniquement"
/>
```

---

## Dialogs

### `DeleteDialog`

Dialog de confirmation de suppression. Envoie une requête DELETE à l'URL fournie.

```tsx
<DeleteDialog
    open={!!deleteTarget}
    onClose={() => setDeleteTarget(null)}
    deleteUrl={destroy.url(deleteTarget.id)}
    title="Confirmer la suppression"
    description="Cette action est irréversible."
/>
```

### `RestoreDialog`

Dialog de confirmation de restauration. Envoie une requête POST.

### `StatusChangeDialog`

Dialog de changement de statut avec sélection du nouveau statut. Envoie une requête PATCH.

```tsx
<StatusChangeDialog
    open={!!statusTarget}
    onClose={() => setStatusTarget(null)}
    changeStatusUrl={changeStatus.url(statusTarget.id)}
    statusOptions={statusOptions}
    currentStatus={statusTarget?.status?.value}
/>
```

---

## Hook `useQueryBuilder`

Hook central pour la gestion des filtres, tri et pagination côté frontend.

```typescript
const {
    currentUrl,
    navigate,
    setFilter,
    setSearch,
    setSort,
    setPage,
    resetFilters,
    currentSort,
    currentFilters,
    currentSearch,
} = useQueryBuilder(baseUrl, currentParams, searchFilterName);
```

| Retour | Description |
|--------|-------------|
| `setSearch(value)` | Définit la recherche et reset la page à 1. |
| `setFilter(name, value)` | Définit un filtre et reset la page à 1. |
| `setSort(column)` | Cycle le tri : `asc` → `desc` → `none`. |
| `setPage(page)` | Change la page. |
| `resetFilters()` | Réinitialise tous les filtres. |

Le hook utilise `@vortechron/query-builder-ts` pour construire des URLs compatibles avec Spatie Query Builder :

```
/admin/category?filter[name]=test&filter[status]=active&sort=-created_at&page=2
```

---

## Exemple complet : Page d'index

Voir `resources/js/pages/admin/category/index.tsx` pour un exemple complet d'utilisation de tous ces composants ensemble :

1. **Extraction des paramètres** depuis l'URL courante.
2. **Configuration des colonnes** avec `ColumnDef<Category>[]`.
3. **Configuration des actions** avec `RowAction<Category>[]` (edit, switch status, delete, restore, force delete).
4. **Rendu** avec `DataTableFilters`, `DataTable`, `DataTablePagination`.
5. **Dialogs** pour les actions destructives (delete, restore, status change).
6. **Traductions** via `useLang()` et `transAction()`.
7. **Routes typées** via Wayfinder (`@/routes/admin/category`).
