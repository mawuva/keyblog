<?php

declare(strict_types=1);

namespace Domain\Users\Concerns;

use Domain\Users\Enums\KeycloakRoleEnum;

trait HasKeycloakRoles
{
    /**
     * Check if user has specific role
     */
    public function hasRole(string $role): bool
    {
        return in_array($role, $this->roles ?? []);
    }

    /**
     * Check if user has any of the specified roles
     */
    public function hasAnyRole(KeycloakRoleEnum ...$roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role->value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->hasAnyRole(KeycloakRoleEnum::ADMIN);
    }

    /**
     * Check if user is customer
     */
    public function isCustomer(): bool
    {
        return $this->hasAnyRole(KeycloakRoleEnum::CUSTOMER);
    }

    /**
     * Check if user is member
     */
    public function isMember(): bool
    {
        return $this->hasAnyRole(KeycloakRoleEnum::MEMBER);
    }

    /**
     * Check if user is in specific group
     */
    public function isInGroup(string $group): bool
    {
        return in_array($group, $this->groups ?? []);
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
