<?php

namespace Database\Seeders;

use Domain\Roles\Enums\PermissionAction;
use Domain\Roles\Enums\PermissionEntity;
use Domain\Roles\Enums\PermissionScope;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing permissions
        Permission::query()->delete();

        // Define permission combinations for each entity
        $permissionMap = $this->getPermissionMap();

        foreach ($permissionMap as $entity => $actions) {
            foreach ($actions as $action) {
                // Create basic permission (entity.action)
                $permissionName = "{$entity}.{$action}";
                $this->createPermission($permissionName, $entity, $action);

                // Create scoped permissions for certain actions
                if ($this->shouldHaveScope($action)) {
                    foreach (PermissionScope::cases() as $scope) {
                        // Skip 'all' scope as it's covered by wildcard
                        if ($scope === PermissionScope::ALL) {
                            continue;
                        }
                        
                        $scopedPermissionName = "{$entity}.{$action}.{$scope->value}";
                        $this->createPermission($scopedPermissionName, $entity, $action, $scope->value);
                    }
                }
            }
        }

        // Create wildcard permissions for each entity
        foreach (PermissionEntity::cases() as $entity) {
            $wildcardName = "{$entity->value}.*";
            $this->createPermission($wildcardName, $entity->value, '*');
        }

        $this->command->info('Permissions seeded successfully!');
    }

    /**
     * Get the permission map for each entity.
     */
    private function getPermissionMap(): array
    {
        return [
            // Users permissions
            PermissionEntity::USERS->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Posts permissions
            PermissionEntity::POSTS->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Categories permissions
            PermissionEntity::CATEGORIES->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Tags permissions
            PermissionEntity::TAGS->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Comments permissions
            PermissionEntity::COMMENTS->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Media permissions
            PermissionEntity::MEDIA->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Admin permissions
            PermissionEntity::ADMIN->value => [
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
            ],

            // Settings permissions
            PermissionEntity::SETTINGS->value => [
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Analytics permissions
            PermissionEntity::ANALYTICS->value => [
                PermissionAction::VIEW->value,
                PermissionAction::READ->value,
                PermissionAction::MANAGE->value,
            ],

            // Logs permissions
            PermissionEntity::LOGS->value => [
                PermissionAction::VIEW->value,
                PermissionAction::READ->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
            ],

            // Roles permissions
            PermissionEntity::ROLES->value => [
                PermissionAction::CREATE->value,
                PermissionAction::READ->value,
                PermissionAction::UPDATE->value,
                PermissionAction::DELETE->value,
                PermissionAction::FORCE_DELETE->value,
                PermissionAction::RESTORE->value,
                PermissionAction::MANAGE->value,
                PermissionAction::VIEW->value,
                PermissionAction::LIST->value,
            ],

            // Permissions permissions
            PermissionEntity::PERMISSIONS->value => [
                PermissionAction::READ->value,
                PermissionAction::VIEW->value,
                PermissionAction::MANAGE->value,
            ],

            // System permissions
            PermissionEntity::SYSTEM->value => [
                PermissionAction::MANAGE->value,
            ],
        ];
    }

    /**
     * Check if an action should have scope variations.
     */
    private function shouldHaveScope(string $action): bool
    {
        return in_array($action, [
            PermissionAction::UPDATE->value,
            PermissionAction::DELETE->value,
            PermissionAction::VIEW->value,
            PermissionAction::READ->value,
        ]);
    }

    /**
     * Create a permission with optional guard.
     */
    private function createPermission(string $name, string $entity, string $action, ?string $scope = null): void
    {
        Permission::firstOrCreate([
            'name' => $name,
            'guard_name' => 'web',
        ], [
            'name' => $name,
            'guard_name' => 'web',
        ]);
    }
}
