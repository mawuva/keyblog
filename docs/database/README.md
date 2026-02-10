# Base de Données

Ce document détaille la structure de la base de données de KeyBlog, ses migrations, seeders et factories.

---

## Sommaire

- [Migrations](#migrations)
- [Schéma des tables](#schéma-des-tables)
- [Seeders](#seeders)
- [Factories](#factories)

---

## Migrations

Les migrations sont exécutées dans l'ordre chronologique :

| Migration | Description |
|-----------|-------------|
| `0001_01_01_000000_create_users_table` | Tables `users`, `password_reset_tokens`, `sessions`. |
| `0001_01_01_000001_create_cache_table` | Tables `cache`, `cache_locks`. |
| `0001_01_01_000002_create_jobs_table` | Tables `jobs`, `job_batches`, `failed_jobs`. |
| `2025_08_14_170933_add_two_factor_columns_to_users_table` | Colonnes 2FA sur `users` (`two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`). |
| `2026_02_08_044821_add_uuids_to_previous_tables` | Ajout de la colonne UUID `_id` aux tables existantes. |
| `2026_02_08_044832_add_fields_to_users_table` | Champs Keycloak sur `users` (`keycloak_id`, `keycloak_groups`, `keycloak_roles`, `last_login_at`, `last_login_ip`, `is_active`). |
| `2026_02_09_040247_create_statuses_table` | Table `statuses` (Spatie Model Status). |
| `2026_02_09_040414_create_categories_table` | Table `categories`. |
| `2026_02_09_155309_create_permission_tables` | Tables Spatie Permission (`permissions`, `roles`, `model_has_permissions`, `model_has_roles`, `role_has_permissions`). |
| `2026_02_09_205533_create_fileponds_table` | Table `fileponds` (Laravel FilePond). |
| `2026_02_09_205621_create_media_table` | Table `media` (Spatie Media Library). |
| `2026_02_10_100558_alter_categories_name_and_description_to_json` | Conversion de `name` et `description` en JSON (pour Spatie Translatable). |

---

## Schéma des tables

### `users`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `bigint` (PK) | ID auto-incrémenté. |
| `_id` | `uuid` (unique) | UUID public (route model binding). |
| `name` | `string` | Nom de l'utilisateur. |
| `email` | `string` (unique) | Email. |
| `email_verified_at` | `timestamp?` | Date de vérification email. |
| `password` | `string` | Mot de passe hashé. |
| `two_factor_secret` | `text?` | Secret 2FA (chiffré). |
| `two_factor_recovery_codes` | `text?` | Codes de récupération 2FA (chiffrés). |
| `two_factor_confirmed_at` | `timestamp?` | Date de confirmation 2FA. |
| `keycloak_id` | `string?` (unique) | Identifiant Keycloak. |
| `keycloak_groups` | `json?` | Groupes Keycloak. |
| `keycloak_roles` | `json?` | Rôles Keycloak. |
| `last_login_at` | `timestamp?` | Dernière connexion. |
| `last_login_ip` | `string?` | IP de dernière connexion. |
| `is_active` | `boolean` | Compte actif (défaut: `true`). |
| `remember_token` | `string?` | Token "Se souvenir de moi". |
| `created_at` | `timestamp` | Date de création. |
| `updated_at` | `timestamp` | Date de mise à jour. |

### `categories`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `bigint` (PK) | ID auto-incrémenté. |
| `_id` | `uuid` (unique) | UUID public. |
| `name` | `json` | Nom (translatable : `{"en": "...", "fr": "..."}`). |
| `slug` | `string` (unique) | Slug auto-généré. |
| `description` | `json?` | Description (translatable). |
| `order` | `integer` | Ordre d'affichage (défaut: `0`). |
| `icon_type` | `string?` | Type d'icône. |
| `icon_value` | `string?` | Valeur de l'icône. |
| `deleted_at` | `timestamp?` | Soft delete. |
| `created_at` | `timestamp` | Date de création. |
| `updated_at` | `timestamp` | Date de mise à jour. |

### `statuses` (Spatie Model Status)

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `bigint` (PK) | ID. |
| `name` | `string` | Valeur du statut (ex: `active`, `inactive`). |
| `reason` | `string?` | Raison du changement. |
| `model_type` | `string` | Type du modèle (polymorphique). |
| `model_id` | `bigint` | ID du modèle. |
| `created_at` | `timestamp` | Date du changement de statut. |
| `updated_at` | `timestamp` | Date de mise à jour. |

### Tables Spatie Permission

#### `permissions`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `bigint` (PK) | ID. |
| `name` | `string` | Nom de la permission (ex: `categories.create`). |
| `guard_name` | `string` | Guard (`web`). |
| `created_at` | `timestamp` | Date de création. |
| `updated_at` | `timestamp` | Date de mise à jour. |

#### `roles`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `bigint` (PK) | ID. |
| `name` | `string` | Nom du rôle (ex: `super-admin`, `admin`). |
| `guard_name` | `string` | Guard (`web`). |
| `created_at` | `timestamp` | Date de création. |
| `updated_at` | `timestamp` | Date de mise à jour. |

#### Tables pivot

- **`model_has_permissions`** — Permissions directes sur un modèle.
- **`model_has_roles`** — Rôles assignés à un modèle.
- **`role_has_permissions`** — Permissions assignées à un rôle.

### `media` (Spatie Media Library)

Table pour les fichiers médias associés aux modèles via la relation polymorphique.

### `fileponds`

Table pour le stockage temporaire des fichiers uploadés via FilePond.

### Tables système

- **`cache`** / **`cache_locks`** — Cache applicatif.
- **`jobs`** / **`job_batches`** / **`failed_jobs`** — File d'attente.
- **`sessions`** — Sessions utilisateur.
- **`password_reset_tokens`** — Tokens de réinitialisation de mot de passe.

---

## Seeders

L'ordre d'exécution est important car les rôles dépendent des permissions :

```
DatabaseSeeder
├── 1. PermissionSeeder      # Crée toutes les permissions
├── 2. RoleSeeder            # Crée les rôles depuis AppRole enum
├── 3. RolePermissionSeeder  # Assigne les permissions aux rôles
└── 4. UserFactory           # Crée un utilisateur de test
```

### `PermissionSeeder`

Crée les permissions selon un mapping entité → actions défini par les enums :

**Entités** (`PermissionEntity`) : `users`, `posts`, `categories`, `tags`, `comments`, `media`, `admin`, `settings`, `analytics`, `logs`, `roles`, `permissions`, `system`.

**Actions** (`PermissionAction`) : `create`, `read`, `update`, `delete`, `force_delete`, `restore`, `manage`, `view`, `list`.

**Format des permissions** :
- Base : `{entity}.{action}` (ex: `categories.create`)
- Scopée : `{entity}.{action}.{scope}` (ex: `categories.update.own`)
- Wildcard : `{entity}.*` (ex: `categories.*`)

**Scopes** (`PermissionScope`) : `own`, `team`, `all`.

Les actions `update`, `delete`, `view`, `read` ont des variantes scopées.

### `RoleSeeder`

Crée les rôles depuis l'enum `AppRole` avec hiérarchie de niveaux.

### `RolePermissionSeeder`

Assigne les permissions aux rôles selon un mapping détaillé. Chaque rôle reçoit un ensemble spécifique de permissions.

---

## Factories

### `UserFactory`

Factory pour le modèle `User` avec :
- `name` — Nom fictif (Faker).
- `email` — Email unique fictif.
- `email_verified_at` — Vérifié par défaut.
- `password` — Mot de passe hashé.
- `keycloak_id` — UUID fictif.
- `is_active` — Actif par défaut.

**État `unverified`** : Email non vérifié (`email_verified_at: null`).

---

## Commandes utiles

```bash
# Exécuter les migrations
php artisan migrate

# Exécuter les seeders
php artisan db:seed

# Réinitialiser et re-seeder
php artisan migrate:fresh --seed

# Créer une nouvelle migration
php artisan make:migration create_xxx_table

# Créer un nouveau seeder
php artisan make:seeder XxxSeeder
```
