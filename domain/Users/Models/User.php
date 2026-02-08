<?php

namespace Domain\Users\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Support\Models\Concerns\HasModelUtils;
use App\Support\Models\Concerns\HasUuidManager;
use YMigVal\LaravelModelCache\HasCachedQueries;
use YMigVal\LaravelModelCache\ModelRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Domain\Users\Enums\KeycloakRole;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, 
        Notifiable, 
        TwoFactorAuthenticatable,
        HasUuidManager,
        HasModelUtils,
        HasCachedQueries,
        ModelRelationships;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'keycloak_id',
        'groups',
        'roles',
        'last_login_at',
        'last_login_ip',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'groups' => 'array',
            'roles' => 'array',
            'last_login_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Check if user has specific role
     */
    public function hasRole(string $role): bool
    {
        return in_array($role, $this->roles ?? []);
    }

    public function hasAnyRole(KeycloakRole ...$roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role->value)) {
                return true;
            }
        }

        return false;
    }

    public function isAdmin(): bool
    {
        return $this->hasAnyRole(KeycloakRole::ADMIN);
    }

    public function isCustomer(): bool
    {
        return $this->hasAnyRole(KeycloakRole::CUSTOMER);
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
