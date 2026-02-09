<?php

namespace Database\Seeders;

use Domain\Roles\Enums\AppRole;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing roles
        Role::query()->delete();

        // Create roles from enum
        foreach (AppRole::cases() as $role) {
            Role::firstOrCreate([
                'name' => $role->value,
                'guard_name' => 'web',
            ], [
                'name' => $role->value,
                'guard_name' => 'web',
            ]);
        }

        $this->command->info('Roles seeded successfully!');
        $this->command->info('Created roles: ' . implode(', ', AppRole::all()));
    }

    /**
     * Get role hierarchy level from enum.
     */
    public static function getRoleLevel(string $roleName): int
    {
        $role = AppRole::tryFrom($roleName);
        return $role?->level() ?? 0;
    }

    /**
     * Check if a role has higher or equal level than another role.
     */
    public static function hasRoleLevelOrHigher(string $userRole, string $requiredRole): bool
    {
        $userRoleEnum = AppRole::tryFrom($userRole);
        $requiredRoleEnum = AppRole::tryFrom($requiredRole);
        
        if (!$userRoleEnum || !$requiredRoleEnum) {
            return false;
        }

        return $userRoleEnum->hasLevelOrHigher($requiredRoleEnum);
    }
}
