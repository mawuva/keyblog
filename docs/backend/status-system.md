# Système de Statuts

Le système de statuts de KeyBlog est un composant partagé (`Domain\Shared\Status`) qui fournit une gestion de statuts avec **transitions contrôlées**, **couleurs automatiques** et **intégration Tailwind CSS**.

Il s'appuie sur le package `spatie/laravel-model-status` et l'enrichit avec un système de transitions typé par enums.

---

## Architecture

```
domain/Shared/Status/
├── Concerns/
│   ├── Enums/
│   │   └── HasStatusAttributes.php    # Trait pour les enums de statut
│   └── Models/
│       └── InteractsWithStatus.php    # Trait pour les modèles Eloquent
├── Contracts/
│   └── StatusEnumContract.php         # Interface que chaque enum de statut doit implémenter
├── Enums/
│   └── StatusColor.php                # Enum des couleurs de statut
├── Exceptions/
│   └── TransitionException.php        # Exception pour les transitions invalides
├── Queries/
│   ├── Filters/
│   │   └── StatusFilter.php           # Filtre Spatie Query Builder pour les statuts
│   └── Includes/
│       └── LatestStatusInclude.php    # Include Spatie Query Builder pour le dernier statut
└── StatusPresentation.php             # Mapping statut → couleur + classes CSS
```

---

## Contrat : `StatusEnumContract`

Chaque enum de statut doit implémenter cette interface :

```php
interface StatusEnumContract extends \BackedEnum
{
    public static function initial(): self;        // Statut initial obligatoire
    public function allowedTransitions(): array;    // Transitions autorisées depuis ce statut
    public function label(): string;                // Label traduit
    public function color(): string;                // Couleur du statut
}
```

---

## Créer un enum de statut

### Exemple : `CatalogEnum`

```php
enum CatalogEnum: string implements StatusEnumContract
{
    use HasStatusAttributes;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public static function initial(): self
    {
        return self::ACTIVE;
    }

    public function allowedTransitions(): array
    {
        return match ($this) {
            self::ACTIVE => [self::INACTIVE],
            self::INACTIVE => [self::ACTIVE],
            default => [],
        };
    }
}
```

### Ce que fournit `HasStatusAttributes`

Le trait `HasStatusAttributes` implémente automatiquement :

| Méthode | Description |
|---------|-------------|
| `label()` | Retourne `__('common.status.{value}')` — la traduction du statut. |
| `color()` | Retourne la couleur via `StatusPresentation::getColor()`. |
| `colorClass()` | Retourne les classes Tailwind CSS via `StatusPresentation::getColorClasses()`. |
| `canTransitionTo(self)` | Vérifie si la transition est autorisée. |
| `allowedTransitionValues()` | Retourne les valeurs des transitions autorisées. |
| `values()` | Retourne toutes les valeurs de l'enum. |
| `toArray()` | Retourne tous les cas sous forme `[{value, label, color}]`. |

---

## Ajouter le statut à un modèle

### 1. Le modèle doit utiliser le trait `InteractsWithStatus`

```php
class Category extends CatalogsBaseModel
{
    use HasTranslations;

    protected function statusEnum(): string
    {
        return CatalogEnum::class;
    }
}
```

### 2. Ce que fournit `InteractsWithStatus`

| Méthode | Description |
|---------|-------------|
| `currentStatusEnum()` | Retourne le statut courant sous forme d'enum. |
| `changeStatus(string\|StatusEnumContract, ?string)` | Change le statut avec validation des transitions. Lance `TransitionException` si invalide. |
| `statusToArray()` | Retourne `{value, label, color}` pour le frontend. |
| `availableStatuses()` | Retourne les valeurs des transitions possibles depuis le statut courant. |

### 3. Initialisation automatique

Le trait `InteractsWithStatus` initialise automatiquement le statut lors de la création du modèle via l'événement `created` :

```php
static::created(function ($model) {
    if (! $model->status) {
        $enum = $model->statusEnum();
        $model->setStatus($enum::initial()->value);
    }
});
```

---

## Transitions

Les transitions sont validées automatiquement. Si une transition invalide est tentée, une `TransitionException` est lancée :

```php
// ✅ Transition valide
$category->changeStatus('inactive');

// ❌ TransitionException : Cannot transition from 'inactive' to 'inactive'
$category->changeStatus('inactive');
```

---

## Couleurs (`StatusPresentation`)

Le mapping statut → couleur est centralisé dans `StatusPresentation::getColor()` :

| Statut | Couleur |
|--------|---------|
| `active`, `published`, `confirmed`, `approved`, `completed`, `accepted` | `SUCCESS` (vert) |
| `inactive` | `SECONDARY` (gris clair) |
| `suspended`, `pending`, `locked` | `WARNING` (orange) |
| `draft`, `in_progress`, `negotiating`, `sent`, `under_review` | `INFO` (bleu) |
| `cancelled`, `refused`, `rejected`, `deleted` | `DANGER` (rouge) |
| `expired`, `archived` | `GRAY` (gris) |
| `premium` | `PURPLE` |
| `system` | `INDIGO` |
| `promotional` | `PINK` |

L'enum `StatusColor` fournit les classes Tailwind CSS pour chaque couleur en variantes `solid` et `outline`.

---

## Utilisation côté frontend

Le statut est sérialisé via `CategoryResource` :

```php
'status' => $this->whenLoaded('statuses', fn () => $this->statusToArray()),
```

Résultat JSON :

```json
{
    "value": "active",
    "label": "Actif",
    "color": "success"
}
```

Côté React, le composant `StatusBadge` affiche le badge coloré :

```tsx
<StatusBadge status={item.status} />
```

---

## Filtrage par statut

Le `StatusFilter` (Spatie Query Builder) permet de filtrer les modèles par statut :

```php
AllowedFilter::custom('status', new StatusFilter())
```

Côté frontend, le composant `StatusFilter` affiche un select avec les options de statut.
