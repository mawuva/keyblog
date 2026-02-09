<?php

declare(strict_types=1);

namespace Domain\Users\Data;

use Spatie\LaravelData\Data;
use Domain\Users\Models\User;
use Domain\Users\Enums\KeycloakRoleEnum;

class AuthenticatedUserData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $uuid,
        public readonly string $keycloakId,
        public readonly string $name,
        public readonly string $email,
        public readonly array $roles,
        public readonly array $groups,
        public readonly bool $isAdmin,
        public readonly bool $isActive,
        public readonly ?string $lastLoginAt,
        public readonly ?string $lastLoginIp,
        public readonly ?string $createdAt,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: (string) $user->id,
            uuid: $user->_id ?? '',
            keycloakId: $user->keycloak_id ?? '',
            name: $user->name,
            email: $user->email,
            roles: $user->keycloak_roles ?? [],
            groups: $user->keycloak_groups ?? [],
            isAdmin: $user->hasKeycloakRole(KeycloakRoleEnum::ADMIN->value) || $user->isInGroup(KeycloakRoleEnum::ADMIN->value),
            isActive: $user->is_active ?? true,
            lastLoginAt: $user->last_login_at?->format('Y-m-d H:i:s'),
            lastLoginIp: $user->last_login_ip,
            createdAt: $user->created_at->format('Y-m-d H:i:s'),
        );
    }

    public static function fromKeycloakPayload(array $payload): self
    {
        return new self(
            id: '', // Sera rempli après création du modèle
            uuid: '', // Sera rempli après création du modèle
            keycloakId: $payload['keycloak_id'] ?? '',
            name: $payload['name'] ?? '',
            email: $payload['email'] ?? '',
            roles: $payload['realm_roles'] ?? [],
            groups: $payload['groups'] ?? [],
            isAdmin: self::isAdminFromKeycloakPayload($payload),
            isActive: true,
            lastLoginAt: now()->format('Y-m-d H:i:s'),
            lastLoginIp: request()->ip(),
            createdAt: now()->format('Y-m-d H:i:s'),
        );
    }

    private static function isAdminFromKeycloakPayload(array $payload): bool
    {
        return in_array(KeycloakRoleEnum::ADMIN->value, $payload['realm_roles'] ?? [], true)
            || in_array(KeycloakRoleEnum::ADMIN->value, $payload['groups'] ?? [], true);
    }

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->roles);
    }

    public function isInGroup(string $group): bool
    {
        return in_array($group, $this->groups);
    }

    public function canAccessAdmin(): bool
    {
        return $this->isAdmin;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'keycloakId' => $this->keycloakId,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->roles,
            'groups' => $this->groups,
            'isAdmin' => $this->isAdmin,
            'isActive' => $this->isActive,
            'lastLoginAt' => $this->lastLoginAt,
            'lastLoginIp' => $this->lastLoginIp,
            'createdAt' => $this->createdAt,
        ];
    }
}
