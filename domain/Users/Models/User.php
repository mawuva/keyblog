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
use Domain\Users\Enums\KeycloakRoleEnum;
use Domain\Users\Concerns\HasKeycloakRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, 
        Notifiable, 
        TwoFactorAuthenticatable,
        HasUuidManager,
        HasModelUtils,
        HasCachedQueries,
        ModelRelationships,
        HasKeycloakRoles;

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
}
