<?php

namespace Domain\Roles\Enums;

enum PermissionAction: string
{
    // CRUD Actions
    case CREATE = 'create';
    case READ = 'read';
    case UPDATE = 'update';
    case DELETE = 'delete';

    // Soft Delete Actions
    case FORCE_DELETE = 'force_delete';
    case RESTORE = 'restore';

    // Management Actions
    case MANAGE = 'manage';
    case VIEW = 'view';
    case LIST = 'list';
    case ACCESS = 'access';

    /**
     * Get all available actions.
     */
    public static function all(): array
    {
        return array_map(fn ($case) => $case->value, self::cases());
    }

    /**
     * Check if the action is a CRUD operation.
     */
    public function isCrud(): bool
    {
        return in_array($this, [
            self::CREATE,
            self::READ,
            self::UPDATE,
            self::DELETE,
        ]);
    }

    /**
     * Check if the action is a soft delete operation.
     */
    public function isSoftDelete(): bool
    {
        return in_array($this, [
            self::FORCE_DELETE,
            self::RESTORE,
        ]);
    }

    /**
     * Check if the action is a management operation.
     */
    public function isManagement(): bool
    {
        return in_array($this, [
            self::MANAGE,
        ]);
    }
}
