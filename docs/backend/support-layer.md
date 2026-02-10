# Support Layer

La couche Support (`app/Support/`) contient les composants transversaux réutilisables par toute l'application. Elle ne contient pas de logique métier mais fournit des outils techniques.

---

## Structure

```
app/Support/
├── Enums/                          # Enums applicatifs
├── Flash/                          # Système de flash messages
│   ├── Flash.php                   # Service principal
│   └── Message.php                 # Value object Message
├── MediaLibrary/                   # Configuration Spatie Media Library
├── Models/                         # Modèles de base et traits
│   ├── BaseModel.php               # Modèle abstrait de base
│   ├── CachedSoftDeletableModel.php # Modèle avec soft deletes + cache
│   ├── SoftDeletableModel.php      # Modèle avec soft deletes
│   └── Concerns/                   # Traits pour les modèles
│       ├── HasUuidManager.php      # Gestion des UUID (_id)
│       ├── HasModelUtils.php       # Attributs formatés
│       ├── HasDropdownOptions.php  # Options de dropdown
│       ├── HasIcon.php             # Gestion des icônes
│       └── HasSlugRedirects.php    # Redirections par slug
└── helpers.php                     # Fonctions globales
```

---

## Modèles de base

### Hiérarchie d'héritage

```
Illuminate\Database\Eloquent\Model
└── BaseModel (HasUuidManager, HasModelUtils)
    ├── SoftDeletableModel (+SoftDeletes)
    └── CachedSoftDeletableModel (+SoftDeletes, +HasCachedQueries, +ModelRelationships)
        └── CatalogsBaseModel (+HasSlug, +InteractsWithStatus)
            └── Category (+HasTranslations)
```

### `BaseModel`

Modèle abstrait de base qui inclut :
- **`HasUuidManager`** — Gestion des UUID publics via la colonne `_id`.
- **`HasModelUtils`** — Attributs formatés (`created_at_formatted`, `updated_at_formatted`).

### `HasUuidManager`

Trait central pour la gestion des identifiants publics UUID.

| Fonctionnalité | Description |
|----------------|-------------|
| **Colonne UUID** | `_id` — Colonne UUID auto-générée. |
| **Route Model Binding** | Les modèles sont résolus par `_id` (pas par `id`). |
| **Scopes** | `scopeWhereUuid($uuid)`, `scopeFindByUuid($uuid)`, `scopeIgnoreUuid($uuid)`. |

Cela signifie que les URLs utilisent les UUID : `/admin/category/{uuid}` au lieu de `/admin/category/{id}`.

### `HasModelUtils`

Fournit des attributs Eloquent formatés :

| Attribut | Format | Description |
|----------|--------|-------------|
| `created_at_formatted` | `j M Y à H:i d` | Date de création formatée en français. |
| `updated_at_formatted` | `j M Y à H:i d` | Date de mise à jour formatée en français. |

---

## Système de Flash Messages

### `Flash`

Service injectable qui gère les messages flash via la session Laravel.

```php
// Utilisation via les helpers globaux
flash_success('Data created successfully.');
flash_error('An error occurred.');
flash_warning('Warning message.');
flash_info('Info message.');

// Ou directement
flash()->success('Message');
```

### `Message`

Value object contenant :
- `message` — Le texte du message.
- `level` — Le niveau (`info`, `success`, `warning`, `error`).

### Intégration Inertia

Les flash messages sont partagés avec le frontend via `HandleInertiaRequests` :

```php
'flash' => flash()->getMessage()?->toArray() ?? null,
```

Côté React, le composant `FlashToaster` les affiche via Sonner (toast notifications).

---

## Fonctions globales (`helpers.php`)

Le fichier `helpers.php` est chargé automatiquement via `composer.json` (`autoload.files`).

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `__ucfirst()` | `__ucfirst(string $key, array $replace = [], ?string $locale = null): string` | Traduit et capitalise la première lettre. |
| `flash()` | `flash(): Flash` | Retourne l'instance du service Flash. |
| `flash_info()` | `flash_info(string $message): void` | Flash un message info. |
| `flash_success()` | `flash_success(string $message): void` | Flash un message success. |
| `flash_warning()` | `flash_warning(string $message): void` | Flash un message warning. |
| `flash_error()` | `flash_error(string $message): void` | Flash un message error. |
| `notiflash()` | `notiflash(string $level, string $message): void` | Flash un message avec un niveau dynamique. |
| `request_user_data()` | `request_user_data(Request $request): ?AuthenticatedUserData` | Récupère ou construit les données utilisateur authentifié depuis la request. Met en cache dans `$request->attributes`. |
