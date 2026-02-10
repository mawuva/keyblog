# Système CRUD

KeyBlog dispose d'un **framework CRUD générique** côté backend et d'un ensemble de **composants React réutilisables** côté frontend, permettant de créer rapidement des interfaces d'administration complètes.

---

## Sommaire

- [Backend — BaseCrudController](#backend--basecrudcontroller)
- [Frontend — Composants CRUD](./frontend.md)

---

## Backend — BaseCrudController

### Architecture

```
app/Http/Controllers/Crud/
├── BaseCrudController.php              # Classe abstraite de base
└── Concerns/
    ├── HandlesCrudActions.php           # Actions CRUD standard (index, create, store, show, edit, update, destroy)
    ├── HandlesCrudStatusChange.php      # Changement de statut
    ├── HandlesSoftDeletes.php           # Restauration et suppression définitive
    ├── HasCrudRoutes.php                # Résolution automatique des noms de routes et vues
    ├── HasQueryBuilder.php              # Construction de requêtes avec Spatie Query Builder
    └── HasResourceTransformer.php       # Transformation des données via API Resources
```

### `BaseCrudController`

Classe abstraite que chaque contrôleur CRUD doit étendre.

```php
abstract class BaseCrudController extends Controller
{
    use HandlesCrudActions, HasCrudRoutes, HasQueryBuilder, HasResourceTransformer;

    abstract protected function modelClass(): string;   // Ex: Category::class
    abstract protected function dataClass(): string;     // Ex: CategoryData::class
}
```

### Traits inclus par défaut

#### `HandlesCrudActions`

Fournit les 7 actions CRUD standard :

| Action | Méthode HTTP | Description |
|--------|-------------|-------------|
| `index()` | GET | Liste paginée avec filtres et tri. |
| `create()` | GET | Formulaire de création (page Inertia). |
| `store()` | POST | Création via `DataClass::from($request)`. |
| `show($uuid)` | GET | Détail d'un élément. |
| `edit($uuid)` | GET | Formulaire d'édition (page Inertia). |
| `update($uuid)` | PUT | Mise à jour via `DataClass::from($request)`. |
| `destroy($uuid)` | DELETE | Suppression (soft delete si activé). |

**Point clé** : Les éléments sont identifiés par UUID (`_id`), pas par ID auto-incrémenté.

La méthode `formData(?Model $item = null): array` peut être surchargée pour passer des données supplémentaires aux formulaires (ex: options de statut, permissions groupées).

#### `HasCrudRoutes`

Résout automatiquement les noms de routes et vues Inertia à partir du nom du modèle.

| Méthode | Exemple (CategoryController) | Résultat |
|---------|------------------------------|----------|
| `getView('index')` | — | `admin/category/index` |
| `getView('create')` | — | `admin/category/create` |
| `getRoute('index')` | — | `admin.category.index` |
| `getRoute('store')` | — | `admin.category.store` |

Le préfixe par défaut est `admin`. Il peut être surchargé via `$routePrefix`.

#### `HasQueryBuilder`

Intègre Spatie Query Builder pour la construction de requêtes.

| Propriété/Méthode | Défaut | Description |
|--------------------|--------|-------------|
| `$with` | `[]` | Relations à eager-load. |
| `$perPage` | `15` | Nombre d'éléments par page. |
| `allowedFilters()` | `[AllowedFilter::trashed()]` | Filtres autorisés. |
| `allowedSorts()` | `[]` | Tris autorisés. |
| `allowedIncludes()` | `[]` | Includes autorisés. |
| `buildQuery()` | — | Construit la requête avec tous les paramètres. Tri par défaut : `-created_at`. |

#### `HasResourceTransformer`

Transforme les données via des API Resources optionnelles.

| Méthode | Description |
|---------|-------------|
| `resourceClass()` | Retourne la classe Resource (ou `null` pour retourner le modèle brut). |
| `transformItem(Model)` | Transforme un seul élément. |
| `transformCollection(LengthAwarePaginator)` | Transforme une collection paginée. |

### Traits optionnels

#### `HandlesCrudStatusChange`

Ajoute l'action `changeStatus($uuid)` pour changer le statut d'un élément avec validation des transitions.

```php
class CategoryController extends BaseCrudController
{
    use HandlesCrudStatusChange;
    // ...
}
```

Route correspondante : `PATCH /{model}/{uuid}/status`

#### `HandlesSoftDeletes`

Ajoute les actions `restore($uuid)` et `forceDelete($uuid)`.

```php
class CategoryController extends BaseCrudController
{
    use HandlesSoftDeletes;
    // ...
}
```

Routes correspondantes :
- `POST /{model}/{uuid}/restore`
- `DELETE /{model}/{uuid}/force-delete`

---

## Exemple complet : `CategoryController`

```php
class CategoryController extends BaseCrudController
{
    use HandlesCrudStatusChange, HandlesSoftDeletes;

    protected array $with = ['statuses'];

    protected function modelClass(): string
    {
        return Category::class;
    }

    protected function dataClass(): string
    {
        return CategoryData::class;
    }

    protected function resourceClass(): ?string
    {
        return CategoryResource::class;
    }

    protected function allowedFilters(): array
    {
        return [
            ...parent::allowedFilters(),
            AllowedFilter::partial('name'),
            AllowedFilter::custom('status', new StatusFilter()),
        ];
    }

    protected function allowedSorts(): array
    {
        return ['name', 'order', 'created_at'];
    }

    protected function allowedIncludes(): array
    {
        return [
            AllowedInclude::custom('latestStatus', new LatestStatusInclude()),
        ];
    }

    protected function formData(?Model $item = null): array
    {
        return [
            'statusOptions' => CatalogEnum::toArray(),
        ];
    }
}
```

---

## Créer un nouveau CRUD

### Étapes

1. **Créer le modèle** dans `domain/{Domain}/Models/` (étendre `BaseModel` ou `CachedSoftDeletableModel`).
2. **Créer le DTO** dans `domain/{Domain}/Data/` (étendre `Spatie\LaravelData\Data`).
3. **Créer la Resource** (optionnel) dans `domain/{Domain}/Resources/`.
4. **Créer le contrôleur** dans `app/Http/Controllers/Admin/` (étendre `BaseCrudController`).
5. **Définir les routes** dans `routes/admin.php`.
6. **Créer les pages React** dans `resources/js/pages/admin/{model}/`.
7. **Ajouter les traductions** dans `lang/{locale}/pages/admin/{domain}.php`.
