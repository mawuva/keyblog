# Authentification

KeyBlog utilise un système d'authentification hybride combinant **Keycloak** (SSO via OAuth2/OIDC) et **Laravel Fortify** (authentification locale).

---

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Keycloak SSO](#keycloak-sso)
- [Laravel Fortify](#laravel-fortify)
- [Middleware d'authentification](#middleware-dauthentification)
- [Données utilisateur partagées](#données-utilisateur-partagées)
- [Configuration](#configuration)

---

## Vue d'ensemble

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Visiteur    │     │  Keycloak    │     │  Laravel     │
│  (Browser)   │     │  Server      │     │  Backend     │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │  1. GET /auth/login                     │
       │────────────────────────────────────────>│
       │                    │                    │
       │  2. Redirect to Keycloak                │
       │<────────────────────────────────────────│
       │                    │                    │
       │  3. Login on Keycloak                   │
       │───────────────────>│                    │
       │                    │                    │
       │  4. Redirect with code                  │
       │<───────────────────│                    │
       │                    │                    │
       │  5. GET /auth/callback?code=...         │
       │────────────────────────────────────────>│
       │                    │                    │
       │                    │  6. Exchange code   │
       │                    │<───────────────────│
       │                    │                    │
       │                    │  7. JWT Token       │
       │                    │───────────────────>│
       │                    │                    │
       │                    │     8. Decode JWT   │
       │                    │     9. Save/Update  │
       │                    │        User         │
       │                    │    10. Auth::login   │
       │                    │                    │
       │  11. Redirect to dashboard              │
       │<────────────────────────────────────────│
```

### Deux systèmes d'authentification

| Système | Usage | Routes |
|---------|-------|--------|
| **Keycloak SSO** | Authentification principale. Login/logout via Keycloak. Rôles et groupes synchronisés. | `/auth/login`, `/auth/callback`, `/auth/logout` |
| **Laravel Fortify** | Authentification locale (login, register, reset password, 2FA). Utilisé comme fallback ou pour les fonctionnalités avancées. | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/two-factor-challenge` |

---

## Keycloak SSO

### Flux d'authentification

1. **Redirection** — L'utilisateur clique sur "Se connecter". `SocialiteController::redirect()` redirige vers Keycloak via `KeycloakService::getLoginUrl()`.

2. **Callback** — Après authentification sur Keycloak, l'utilisateur est redirigé vers `/auth/callback`. `SocialiteController::callback()` :
   - Récupère l'utilisateur Socialite via `Socialite::driver('keycloak')->user()`.
   - Mappe les données via `KeycloakService::mapSocialiteUser()` → `KeycloakUserData`.
   - Stocke le token Keycloak en session.
   - Crée ou met à jour l'utilisateur local via `SaveUserFromKeycloak::execute()`.
   - Connecte l'utilisateur via `Auth::login($user, true)`.
   - Redirige vers le dashboard admin ou membre selon le rôle.

3. **Logout** — `SocialiteController::logout()` :
   - Déconnecte l'utilisateur Laravel (`Auth::logout()`).
   - Invalide la session.
   - Supprime le token Keycloak de la session.
   - Redirige vers l'URL de logout Keycloak (logout global SSO).

### `KeycloakService`

Service central pour l'intégration Keycloak.

| Méthode | Description |
|---------|-------------|
| `getToken()` | Obtient un token admin via le grant `password` sur le realm `master`. |
| `createUser(CreatesUserData)` | Crée un utilisateur dans Keycloak via l'API Admin. |
| `decodeJwt(string)` | Décode un token JWT (base64 du payload). |
| `extractUserInfoFromToken(string)` | Extrait les infos utilisateur d'un JWT → `KeycloakTokenData`. |
| `mapSocialiteUser(SocialiteUser)` | Mappe un utilisateur Socialite → `KeycloakUserData` avec rôles et groupes. |
| `getLoginUrl()` | Génère l'URL de redirection vers Keycloak via Socialite. |
| `getLogoutUrl()` | Génère l'URL de logout Keycloak avec redirect_uri. |

### `SaveUserFromKeycloak`

Action qui synchronise l'utilisateur Keycloak avec la base locale :

```php
$user = User::updateOrCreate(
    ['keycloak_id' => $data->keycloak_id],
    [
        'email'           => $data->email,
        'password'        => config("constants.default_password"),
        'name'            => $data->name,
        'keycloak_groups' => $data->groups,
        'keycloak_roles'  => $data->realm_roles,
    ]
);
$user->updateLoginInfo();
```

### Rôles Keycloak

Les rôles sont extraits du JWT token (`realm_access.roles`) et stockés dans `keycloak_roles` (JSON).

| Rôle | Enum | Accès |
|------|------|-------|
| `admin` | `KeycloakRoleEnum::ADMIN` | Dashboard admin, CRUD complet. |
| `member` | `KeycloakRoleEnum::MEMBER` | Dashboard membre. |
| `customer` | `KeycloakRoleEnum::CUSTOMER` | Espace client. |

---

## Laravel Fortify

Fortify est configuré dans `FortifyServiceProvider` et fournit :

### Actions

| Action | Classe | Description |
|--------|--------|-------------|
| Création d'utilisateur | `Domain\Users\Actions\CreateNewUser` | Crée un nouvel utilisateur. |
| Réinitialisation mot de passe | `Domain\Users\Actions\ResetUserPassword` | Réinitialise le mot de passe. |

### Vues Inertia

Toutes les vues Fortify sont rendues via Inertia :

| Vue | Page React | Description |
|-----|-----------|-------------|
| Login | `auth/login` | Formulaire de connexion. |
| Register | `auth/register` | Formulaire d'inscription. |
| Forgot Password | `auth/forgot-password` | Demande de réinitialisation. |
| Reset Password | `auth/reset-password` | Formulaire de réinitialisation. |
| Verify Email | `auth/verify-email` | Vérification d'email. |
| 2FA Challenge | `auth/two-factor-challenge` | Saisie du code 2FA. |
| Confirm Password | `auth/confirm-password` | Confirmation de mot de passe. |

### Rate Limiting

| Limiter | Limite | Description |
|---------|--------|-------------|
| `login` | 5/minute par email+IP | Protection contre le brute force. |
| `two-factor` | 5/minute par session | Protection du challenge 2FA. |

### Authentification à deux facteurs (2FA)

La 2FA est gérée via `Laravel\Fortify\TwoFactorAuthenticatable` sur le modèle `User`.

Pages de gestion : `settings/two-factor.tsx` avec le hook `useTwoFactorAuth`.

---

## Middleware d'authentification

### `KeycloakAuth` (`keycloak.auth`)

Vérifie que l'utilisateur est authentifié via Laravel Auth. Si non, redirige vers la route `auth.redirect` (Keycloak login).

```php
public function handle(Request $request, Closure $next)
{
    if (Auth::check()) {
        request_user_data($request);
        return $next($request);
    }
    return redirect()->route('auth.redirect');
}
```

### `KeycloakUserRole` (`keycloak.role:{role}`)

Vérifie que l'utilisateur possède le rôle Keycloak requis.

| Rôle | Vérification | Redirection si refusé |
|------|-------------|----------------------|
| `admin` | `$user->isKeycloakAdmin()` | `member.dashboard` |
| `customer` | `$user->isCustomer()` | `login` |
| `member` | `$user->isMember()` | `login` |
| Autre | `$user->hasKeycloakRole($role)` | `login` |

---

## Données utilisateur partagées

### `AuthenticatedUserData`

DTO partagé avec le frontend via Inertia (dans `HandleInertiaRequests`).

```php
'auth' => [
    'user' => $this->getUserData($request),
],
```

Données partagées :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | `string` | ID interne. |
| `uuid` | `string` | UUID public (`_id`). |
| `keycloakId` | `string` | ID Keycloak. |
| `name` | `string` | Nom. |
| `email` | `string` | Email. |
| `roles` | `string[]` | Rôles Keycloak. |
| `groups` | `string[]` | Groupes Keycloak. |
| `isAdmin` | `boolean` | Est administrateur. |
| `isActive` | `boolean` | Compte actif. |
| `lastLoginAt` | `string?` | Dernière connexion. |
| `lastLoginIp` | `string?` | IP de dernière connexion. |
| `createdAt` | `string?` | Date de création. |

### Mise en cache par requête

Les données utilisateur sont mises en cache dans `$request->attributes` via `request_user_data()` pour éviter les recalculs multiples dans la même requête.

---

## Configuration

### Variables d'environnement Keycloak

```env
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_REDIRECT_URI=http://localhost:8000/auth/callback
KEYCLOAK_BASE_URL=http://localhost:8080
KEYCLOAK_REALM=your-realm
KEYCLOAK_ADMIN_CLIENT_ID=admin-cli
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin
```

### Configuration (`config/services.php`)

```php
'keycloak' => [
    'client_id'        => env('KEYCLOAK_CLIENT_ID'),
    'client_secret'    => env('KEYCLOAK_CLIENT_SECRET'),
    'redirect'         => env('KEYCLOAK_REDIRECT_URI'),
    'base_url'         => env('KEYCLOAK_BASE_URL'),
    'realms'           => env('KEYCLOAK_REALM'),
    'admin_client_id'  => env('KEYCLOAK_ADMIN_CLIENT_ID'),
    'admin_username'   => env('KEYCLOAK_ADMIN_USERNAME'),
    'admin_password'   => env('KEYCLOAK_ADMIN_PASSWORD'),
],
```
