<?php

namespace Domain\Users\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Domain\Users\Concerns\HasKeycloakRoles;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Support\Models\Concerns\HasModelUtils;
use App\Support\Models\Concerns\HasUuidManager;
use YMigVal\LaravelModelCache\HasCachedQueries;
use YMigVal\LaravelModelCache\ModelRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
        HasKeycloakRoles,
        HasRoles;

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
        'keycloak_groups',
        'keycloak_roles',
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
            'keycloak_groups' => 'array',
            'keycloak_roles' => 'array',
            'last_login_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }
}
