<?php

declare(strict_types=1);

namespace Domain\Users\Concerns;

use Domain\Users\Enums\KeycloakRoleEnum;

trait HasKeycloakRoles
{
    /**
     * Check if user has specific Keycloak role
     */
    public function hasKeycloakRole(string $role): bool
    {
        return in_array($role, $this->keycloak_roles ?? []);
    }

    /**
     * Check if user has any of the specified Keycloak roles
     */
    public function hasAnyKeycloakRole(KeycloakRoleEnum ...$roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasKeycloakRole($role->value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if user is admin
     */
    public function isKeycloakAdmin(): bool
    {
        return $this->hasAnyKeycloakRole(KeycloakRoleEnum::ADMIN);
    }

    /**
     * Check if user is customer
     */
    public function isCustomer(): bool
    {
        return $this->hasAnyKeycloakRole(KeycloakRoleEnum::CUSTOMER);
    }

    /**
     * Check if user is member
     */
    public function isMember(): bool
    {
        return $this->hasAnyKeycloakRole(KeycloakRoleEnum::MEMBER);
    }

    /**
     * Check if user is in specific group
     */
    public function isInGroup(string $group): bool
    {
        return in_array($group, $this->keycloak_groups ?? []);
    }

    /**
     * Update login information
     */
    public function updateLoginInfo(?string $ip = null): void
    {
        $this->update([
            'last_login_at' => now(),
            'last_login_ip' => $ip ?? request()->ip(),
        ]);
    }
}
