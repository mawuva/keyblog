# Domain Layer

Le projet KeyBlog adopte une architecture **Domain-Driven** avec une séparation claire entre la couche applicative (`app/`) et la couche domaine (`domain/`). Le namespace `Domain\` est enregistré via PSR-4 dans `composer.json`.

---

## Structure

```
domain/
├── Catalogs/          # Domaine des catalogues (catégories)
│   ├── Data/          # DTOs (Spatie Laravel Data)
│   ├── Enums/         # Enums de statut
│   ├── Models/        # Modèles Eloquent
│   └── Resources/     # API Resources
│
├── Roles/             # Domaine des rôles et permissions
│   ├── Data/          # DTOs
│   ├── Enums/         # Enums (AppRole, PermissionAction, PermissionEntity, PermissionScope)
│   └── Resources/     # API Resources
│
├── Shared/            # Composants partagés entre domaines
│   ├── Media/         # Gestion des médias
│   │   └── Actions/   # AttachFilepondMedia, AttachMediaToModel, RemoveFilepondMedia
│   └── Status/        # Système de statuts
│       ├── Concerns/  # Traits (Enums/HasStatusAttributes, Models/InteractsWithStatus)
│       ├── Contracts/  # StatusEnumContract
│       ├── Enums/     # StatusColor
│       ├── Exceptions/ # TransitionException
│       ├── Queries/   # Filters/StatusFilter, Includes/LatestStatusInclude
│       └── StatusPresentation.php
│
└── Users/             # Domaine des utilisateurs
    ├── Actions/       # CreateNewUser, ResetUserPassword, SaveUserFromKeycloak
    ├── Concerns/      # HasKeycloakRoles, PasswordValidationRules, ProfileValidationRules
    ├── Data/          # AuthenticatedUserData, CreatesUserData, KeycloakTokenData, KeycloakUserData
    ├── Enums/         # KeycloakRoleEnum
    ├── Models/        # User
    └── Services/      # KeycloakService
```

---

## Domaine Catalogs

### Modèles

#### `CatalogsBaseModel`

Classe abstraite de base pour tous les modèles du domaine Catalogs.

```php
abstract class CatalogsBaseModel extends CachedSoftDeletableModel
{
    use HasSlug, InteractsWithStatus;
}
```

**Hérite de** : `CachedSoftDeletableModel` (soft deletes + cache)
**Traits** : `HasSlug` (Spatie Sluggable), `InteractsWithStatus` (système de statuts)

#### `Category`

Modèle de catégorie avec traductions et statuts.

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom (translatable). |
| `slug` | `string` | Slug auto-généré depuis `name`. |
| `description` | `string?` | Description (translatable). |
| `order` | `integer` | Ordre d'affichage. |
| `icon_type` | `string?` | Type d'icône. |
| `icon_value` | `string?` | Valeur de l'icône. |

**Traits** : `HasTranslations` (Spatie Translatable)
**Champs traduisibles** : `name`, `description`
**Enum de statut** : `CatalogEnum` (active, inactive)

### Data (DTO)

#### `CategoryData`

```php
class CategoryData extends Data
{
    public function __construct(
        public string $name,
        public ?string $description = null,
        public int $order = 0,
        public ?string $icon_type = null,
        public ?string $icon_value = null,
    ) {}
}
```

**Validation** : `name` requis (max 255), `description` nullable, `order` integer, `icon_type` (max 20), `icon_value` (max 255).

### Enums

#### `CatalogEnum`

```php
enum CatalogEnum: string implements StatusEnumContract
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
```

**Statut initial** : `ACTIVE`
**Transitions** : `ACTIVE ↔ INACTIVE`

### Resources

#### `CategoryResource`

Transforme un modèle `Category` pour le frontend :

| Champ | Source |
|-------|--------|
| `id` | `$this->_id` (UUID) |
| `name` | `$this->name` (traduit automatiquement) |
| `slug` | `$this->slug` |
| `description` | `$this->description` |
| `order` | `$this->order` |
| `status` | `$this->statusToArray()` (quand `statuses` est chargé) |
| `created_at_formatted` | Attribut formaté |
| `deleted_at` | Pour soft deletes |

---

## Domaine Roles

### Data (DTO)

#### `RoleData`

```php
class RoleData extends Data
{
    public function __construct(
        public string $name,
        /** @var array<int> */
        public array $permissions = [],
    ) {}
}
```

**Validation** : `name` requis (max 255), `permissions` array d'IDs existants.

### Enums

#### `AppRole`

Enum des rôles applicatifs avec hiérarchie de niveaux.

| Rôle | Valeur | Niveau | Catégorie | Description |
|------|--------|--------|-----------|-------------|
| `SUPER_ADMIN` | `super_admin` | 100 | Admin | Full system access with all permissions. |
| `ADMIN` | `admin` | 80 | Admin | Administrative access with management permissions. |
| `MANAGER` | `manager` | 60 | Admin | Management access for specific areas. |
| `EDITOR` | `editor` | 50 | Content | Content editing and publishing permissions. |
| `MODERATOR` | `moderator` | 45 | Content | Content moderation and approval permissions. |
| `AUTHOR` | `author` | 40 | Content | Content creation and editing permissions. |
| `USER` | `user` | 20 | Basic | Basic authenticated user permissions. |
| `GUEST` | `guest` | 10 | Basic | Public read-only permissions. |

**Méthodes utilitaires** : `isAdmin()`, `isContentRole()`, `isBasicUser()`, `level()`, `hasLevelOrHigher()`, `displayName()`, `description()`.

#### `PermissionAction`

| Action | Valeur | Catégorie |
|--------|--------|-----------|
| `CREATE` | `create` | CRUD |
| `READ` | `read` | CRUD |
| `UPDATE` | `update` | CRUD |
| `DELETE` | `delete` | CRUD |
| `FORCE_DELETE` | `force_delete` | Soft Delete |
| `RESTORE` | `restore` | Soft Delete |
| `MANAGE` | `manage` | Management |
| `VIEW` | `view` | Management |
| `LIST` | `list` | Management |

#### `PermissionEntity`

| Entité | Valeur | Catégorie |
|--------|--------|-----------|
| `USERS` | `users` | Content |
| `POSTS` | `posts` | Content |
| `CATEGORIES` | `categories` | Content |
| `TAGS` | `tags` | Content |
| `COMMENTS` | `comments` | Content |
| `MEDIA` | `media` | Content |
| `ADMIN` | `admin` | System |
| `SETTINGS` | `settings` | System |
| `ANALYTICS` | `analytics` | System |
| `LOGS` | `logs` | System |
| `ROLES` | `roles` | System |
| `PERMISSIONS` | `permissions` | System |
| `SYSTEM` | `system` | System |

#### `PermissionScope`

| Scope | Valeur | Priorité | Description |
|-------|--------|----------|-------------|
| `ALL` | `all` | 0 | Accès complet (couvert par wildcard). |
| `DEPARTMENT` | `department` | 1 | Accès au département. |
| `TEAM` | `team` | 2 | Accès à l'équipe. |
| `OWN` | `own` | 3 | Accès à ses propres ressources uniquement. |

**Format des permissions** : `{entity}.{action}` (base), `{entity}.{action}.{scope}` (scopée), `{entity}.*` (wildcard).

### Resources

#### `RoleResource`

Transforme un rôle Spatie Permission pour le frontend :

| Champ | Source |
|-------|--------|
| `id` | `$this->id` |
| `name` | `$this->name` |
| `permissions` | `PermissionResource::collection(...)` (quand chargé) |
| `permissions_count` | `$this->whenCounted('permissions')` |
| `created_at` | `$this->created_at` |
| `updated_at` | `$this->updated_at` |

#### `PermissionResource`

Transforme une permission Spatie Permission pour le frontend :

| Champ | Source |
|-------|--------|
| `id` | `$this->id` |
| `name` | `$this->name` |
| `created_at` | `$this->created_at` |
| `updated_at` | `$this->updated_at` |

---

## Domaine Users

### Modèle `User`

Modèle utilisateur principal, étend `Authenticatable`.

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom de l'utilisateur. |
| `email` | `string` | Email. |
| `password` | `string` | Mot de passe (hashé). |
| `keycloak_id` | `string` | Identifiant Keycloak. |
| `keycloak_groups` | `array` | Groupes Keycloak (cast JSON). |
| `keycloak_roles` | `array` | Rôles Keycloak (cast JSON). |
| `last_login_at` | `datetime` | Dernière connexion. |
| `last_login_ip` | `string` | IP de dernière connexion. |
| `is_active` | `boolean` | Compte actif. |

**Traits** :
- `HasFactory` — Factories pour les tests.
- `Notifiable` — Notifications Laravel.
- `TwoFactorAuthenticatable` — 2FA via Fortify.
- `HasUuidManager` — UUID (`_id`) comme identifiant public.
- `HasModelUtils` — Attributs formatés.
- `HasCachedQueries` — Cache des requêtes.
- `ModelRelationships` — Relations cachées.
- `HasKeycloakRoles` — Vérification des rôles Keycloak.
- `HasRoles` — Rôles Spatie Permission.

### Actions

| Action | Description |
|--------|-------------|
| `CreateNewUser` | Crée un nouvel utilisateur (Fortify). |
| `ResetUserPassword` | Réinitialise le mot de passe (Fortify). |
| `SaveUserFromKeycloak` | Crée ou met à jour un utilisateur depuis les données Keycloak (`updateOrCreate` sur `keycloak_id`). |

### Services

#### `KeycloakService`

Service central pour l'intégration Keycloak. Voir [Documentation Authentification](../authentication/README.md).

| Méthode | Description |
|---------|-------------|
| `getToken()` | Obtient un token admin Keycloak. |
| `createUser(CreatesUserData)` | Crée un utilisateur dans Keycloak. |
| `decodeJwt(string)` | Décode un token JWT. |
| `extractUserInfoFromToken(string)` | Extrait les infos utilisateur d'un JWT → `KeycloakTokenData`. |
| `mapSocialiteUser(SocialiteUser)` | Mappe un utilisateur Socialite → `KeycloakUserData`. |
| `getLoginUrl()` | URL de redirection vers Keycloak. |
| `getLogoutUrl()` | URL de logout Keycloak. |

### Data (DTOs)

| DTO | Description |
|-----|-------------|
| `AuthenticatedUserData` | Données de l'utilisateur authentifié partagées avec le frontend via Inertia. Construit depuis `User` ou un payload Keycloak. |
| `KeycloakUserData` | Données utilisateur extraites de Keycloak (keycloak_id, email, name, username, groups, realm_roles, client_roles, scopes). |
| `KeycloakTokenData` | Données extraites d'un token JWT Keycloak (token_id, username, email, name, groups, realm_roles, client_roles, scopes). |
| `CreatesUserData` | Données pour la création d'un utilisateur dans Keycloak (email, first_name, last_name, password). |

### Concerns

#### `HasKeycloakRoles`

Trait ajouté au modèle `User` pour la gestion des rôles Keycloak.

| Méthode | Description |
|---------|-------------|
| `hasKeycloakRole(string)` | Vérifie un rôle Keycloak spécifique. |
| `hasAnyKeycloakRole(KeycloakRoleEnum...)` | Vérifie si l'utilisateur a au moins un des rôles. |
| `isKeycloakAdmin()` | Vérifie le rôle admin. |
| `isCustomer()` | Vérifie le rôle customer. |
| `isMember()` | Vérifie le rôle member. |
| `isInGroup(string)` | Vérifie l'appartenance à un groupe. |
| `updateLoginInfo(?string)` | Met à jour `last_login_at` et `last_login_ip`. |

### Enums

#### `KeycloakRoleEnum`

```php
enum KeycloakRoleEnum: string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
    case MEMBER = 'member';
}
```

---

## Domaine Shared

### Système de Statuts

Voir [Documentation Système de Statuts](./status-system.md).

### Media Actions

| Action | Description |
|--------|-------------|
| `AttachFilepondMedia` | Attache un fichier uploadé via FilePond à un modèle. |
| `AttachMediaToModel` | Attache un média à un modèle via Spatie Media Library. |
| `RemoveFilepondMedia` | Supprime un fichier FilePond. |
