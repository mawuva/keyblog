<?php

namespace Domain\Roles\Enums;

enum AppRole: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case EDITOR = 'editor';
    case AUTHOR = 'author';
    case MODERATOR = 'moderator';
    case USER = 'user';
    case GUEST = 'guest';

    /**
     * Get all available roles.
     */
    public static function all(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

    /**
     * Get admin-level roles.
     */
    public static function adminRoles(): array
    {
        return [
            self::SUPER_ADMIN->value,
            self::ADMIN->value,
            self::MANAGER->value,
        ];
    }

    /**
     * Get content management roles.
     */
    public static function contentRoles(): array
    {
        return [
            self::EDITOR->value,
            self::AUTHOR->value,
            self::MODERATOR->value,
        ];
    }

    /**
     * Get basic user roles.
     */
    public static function userRoles(): array
    {
        return [
            self::USER->value,
            self::GUEST->value,
        ];
    }

    /**
     * Check if this is an admin-level role.
     */
    public function isAdmin(): bool
    {
        return in_array($this, [
            self::SUPER_ADMIN,
            self::ADMIN,
            self::MANAGER,
        ]);
    }

    /**
     * Check if this is a content management role.
     */
    public function isContentRole(): bool
    {
        return in_array($this, [
            self::EDITOR,
            self::AUTHOR,
            self::MODERATOR,
        ]);
    }

    /**
     * Check if this is a basic user role.
     */
    public function isBasicUser(): bool
    {
        return in_array($this, [
            self::USER,
            self::GUEST,
        ]);
    }

    /**
     * Get the hierarchy level for role comparison.
     */
    public function level(): int
    {
        return match($this) {
            self::SUPER_ADMIN => 100,
            self::ADMIN => 80,
            self::MANAGER => 60,
            self::EDITOR => 50,
            self::MODERATOR => 45,
            self::AUTHOR => 40,
            self::USER => 20,
            self::GUEST => 10,
        };
    }

    /**
     * Check if this role has higher or equal level than another role.
     */
    public function hasLevelOrHigher(self $otherRole): bool
    {
        return $this->level() >= $otherRole->level();
    }

    /**
     * Get display name for the role.
     */
    public function displayName(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Super Administrator',
            self::ADMIN => 'Administrator',
            self::MANAGER => 'Manager',
            self::EDITOR => 'Editor',
            self::AUTHOR => 'Author',
            self::MODERATOR => 'Moderator',
            self::USER => 'User',
            self::GUEST => 'Guest',
        };
    }

    /**
     * Get description for the role.
     */
    public function description(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Full system access with all permissions',
            self::ADMIN => 'Administrative access with management permissions',
            self::MANAGER => 'Management access for specific areas',
            self::EDITOR => 'Content editing and publishing permissions',
            self::AUTHOR => 'Content creation and editing permissions',
            self::MODERATOR => 'Content moderation and approval permissions',
            self::USER => 'Basic authenticated user permissions',
            self::GUEST => 'Public read-only permissions',
        };
    }
}
