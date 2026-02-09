<?php

namespace Database\Seeders;

use Domain\Roles\Enums\AppRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing role-permission assignments
        DB::table('role_has_permissions')->delete();

        // Define role permissions mapping using AppRole enum
        $rolePermissions = $this->getRolePermissionsMapping();

        foreach ($rolePermissions as $roleName => $permissions) {
            $role = Role::where('name', $roleName)->first();
            
            if (!$role) {
                $this->command->error("Role '{$roleName}' not found!");
                continue;
            }

            foreach ($permissions as $permissionName) {
                $permission = Permission::where('name', $permissionName)->first();
                
                if ($permission && $role) {
                    $role->givePermissionTo($permission);
                } else {
                    if (!$permission) {
                        $this->command->warn("Permission '{$permissionName}' not found for role '{$roleName}'");
                    }
                    if (!$role) {
                        $this->command->warn("Role '{$roleName}' not found");
                    }
                }
            }
        }

        $this->command->info('Role permissions assigned successfully!');
    }

    /**
     * Get the role permissions mapping using AppRole enum.
     */
    private function getRolePermissionsMapping(): array
    {
        return [
            // Super Admin - All permissions
            AppRole::SUPER_ADMIN->value => ['*'],

            // Admin - Most permissions except system-level
            AppRole::ADMIN->value => [
                // User management
                'users.*',
                
                // Content management
                'posts.*',
                'categories.*',
                'tags.*',
                'comments.*',
                'media.*',
                
                // Admin access
                'admin.manage',
                'admin.view',
                'settings.*',
                'analytics.view',
                'analytics.read',
                'analytics.manage',
                'logs.view',
                'logs.read',
                
                // Role management (but not system)
                'roles.*',
                'permissions.read',
                'permissions.view',
                'permissions.manage',
            ],

            // Manager - Limited management access
            AppRole::MANAGER->value => [
                // User management (limited)
                'users.read',
                'users.view',
                'users.list',
                'users.update.own',
                'users.delete.own',
                
                // Content management
                'posts.*',
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                'comments.*',
                'media.*',
                
                // Basic admin access
                'admin.view',
                'analytics.view',
                'analytics.read',
            ],

            // Editor - Content management with full rights
            AppRole::EDITOR->value => [
                // Content full access
                'posts.*',
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                'comments.*',
                'media.*',
                
                // Limited user access
                'users.read',
                'users.view',
                'users.list',
                
                // Basic admin access
                'admin.view',
                'analytics.view',
                'analytics.read',
            ],

            // Moderator - Content moderation
            AppRole::MODERATOR->value => [
                // Content moderation
                'posts.read',
                'posts.view',
                'posts.list',
                'posts.update',
                'posts.delete',
                'posts.force_delete',
                'posts.restore',
                'posts.manage',
                'comments.*',
                
                // Categories and tags (read-only)
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                
                // Media (read-only)
                'media.read',
                'media.view',
                'media.list',
                
                // Users (read-only)
                'users.read',
                'users.view',
                'users.list',
            ],

            // Author - Create and edit own content
            AppRole::AUTHOR->value => [
                // Own content management
                'posts.create',
                'posts.read',
                'posts.view',
                'posts.list',
                'posts.update.own',
                'posts.delete.own',
                'posts.force_delete.own',
                'posts.restore.own',
                
                // Categories and tags (read-only)
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                
                // Media management
                'media.create',
                'media.read',
                'media.view',
                'media.list',
                'media.update.own',
                'media.delete.own',
                'media.force_delete.own',
                'media.restore.own',
                
                // Comments on own posts
                'comments.create',
                'comments.read',
                'comments.view',
                'comments.list',
                'comments.update.own',
                'comments.delete.own',
                'comments.force_delete.own',
                'comments.restore.own',
            ],

            // User - Basic authenticated access
            AppRole::USER->value => [
                // Basic content access
                'posts.read',
                'posts.view',
                'posts.list',
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                'comments.create',
                'comments.read',
                'comments.view',
                'comments.list',
                'comments.update.own',
                'comments.delete.own',
                'comments.force_delete.own',
                'comments.restore.own',
                
                // Media (own uploads)
                'media.create',
                'media.read',
                'media.view',
                'media.list',
                'media.update.own',
                'media.delete.own',
                'media.force_delete.own',
                'media.restore.own',
                
                // Profile access
                'users.read',
                'users.view',
                'users.update.own',
            ],

            // Guest - Public read-only access
            AppRole::GUEST->value => [
                // Public content access
                'posts.read',
                'posts.view',
                'posts.list',
                'categories.read',
                'categories.view',
                'categories.list',
                'tags.read',
                'tags.view',
                'tags.list',
                'comments.read',
                'comments.view',
                'comments.list',
            ],
        ];
    }
}
