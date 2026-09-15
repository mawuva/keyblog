<?php

declare(strict_types=1);

use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRedirectFilter;
use Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    Permission::findOrCreate('admin.access');

    $this->withoutMiddleware([
        LocaleSessionRedirect::class,
        LaravelLocalizationRedirectFilter::class,
    ]);
});

test('a user with the admin.access permission can access the admin area', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('admin.access');

    expect($user->canAccessAdmin())->toBeTrue();

    $this->actingAs($user)
        ->get(route('admin.login'))
        ->assertRedirect(route('admin.dashboard'));
});

test('a user without the admin.access permission is sent back to the member area', function () {
    $user = User::factory()->create();

    expect($user->canAccessAdmin())->toBeFalse();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('member.dashboard'));
});

test('logging in redirects to the admin area when the user has the admin.access permission', function () {
    $user = User::factory()->create(['password' => Hash::make('password')]);
    $user->givePermissionTo('admin.access');

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('admin.dashboard'));
});

test('logging in redirects to the member area without the admin.access permission', function () {
    $user = User::factory()->create(['password' => Hash::make('password')]);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('member.dashboard'));
});

test('a keycloak admin can still access the admin area', function () {
    $user = User::factory()->create(['keycloak_roles' => ['admin']]);

    expect($user->canAccessAdmin())->toBeTrue();
});
