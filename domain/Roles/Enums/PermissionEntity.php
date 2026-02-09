<?php

namespace Domain\Roles\Enums;

enum PermissionEntity: string
{
    // Users management
    case USERS = 'users';
    
    // Blog/Catalog entities
    case POSTS = 'posts';
    case CATEGORIES = 'categories';
    case TAGS = 'tags';
    case COMMENTS = 'comments';
    case MEDIA = 'media';
    
    // Admin entities
    case ADMIN = 'admin';
    case SETTINGS = 'settings';
    case ANALYTICS = 'analytics';
    case LOGS = 'logs';
    
    // System entities
    case ROLES = 'roles';
    case PERMISSIONS = 'permissions';
    case SYSTEM = 'system';

    /**
     * Get all available entities.
     */
    public static function all(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

    /**
     * Get user-related entities.
     */
    public static function userEntities(): array
    {
        return [
            self::USERS->value,
            self::POSTS->value,
            self::CATEGORIES->value,
            self::TAGS->value,
            self::COMMENTS->value,
            self::MEDIA->value,
        ];
    }

    /**
     * Get admin-related entities.
     */
    public static function adminEntities(): array
    {
        return [
            self::ADMIN->value,
            self::SETTINGS->value,
            self::ANALYTICS->value,
            self::LOGS->value,
            self::ROLES->value,
            self::PERMISSIONS->value,
            self::SYSTEM->value,
        ];
    }

    /**
     * Check if this is a system-level entity.
     */
    public function isSystem(): bool
    {
        return in_array($this, [
            self::ADMIN,
            self::SETTINGS,
            self::ANALYTICS,
            self::LOGS,
            self::ROLES,
            self::PERMISSIONS,
            self::SYSTEM,
        ]);
    }

    /**
     * Check if this is a content-related entity.
     */
    public function isContent(): bool
    {
        return in_array($this, [
            self::POSTS,
            self::CATEGORIES,
            self::TAGS,
            self::COMMENTS,
            self::MEDIA,
        ]);
    }
}
