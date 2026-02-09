<?php

namespace Domain\Roles\Enums;

enum PermissionScope: string
{
    case ALL = 'all';
    case OWN = 'own';
    case TEAM = 'team';
    case DEPARTMENT = 'department';

    /**
     * Get all available scopes.
     */
    public static function all(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

    /**
     * Check if this scope is restrictive (limited access).
     */
    public function isRestrictive(): bool
    {
        return in_array($this, [
            self::OWN,
            self::TEAM,
            self::DEPARTMENT,
        ]);
    }

    /**
     * Check if this scope grants full access.
     */
    public function isFullAccess(): bool
    {
        return $this === self::ALL;
    }

    /**
     * Get the priority order for scope checking (higher = more restrictive).
     */
    public function priority(): int
    {
        return match($this) {
            self::ALL => 0,
            self::DEPARTMENT => 1,
            self::TEAM => 2,
            self::OWN => 3,
        };
    }
}
