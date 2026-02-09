<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;

Route::group([
    'prefix' => 'admin', 
    'as' => 'admin.',
], function () {
    
    // Route racine admin -> redirige vers login
    Route::get('/', function () {
        return to_route('admin.login');
    });
    
    // Page de login admin (publique)
    Route::get('login', LoginController::class)
        ->name('login');

    // Routes admin protégées
    Route::middleware(['keycloak.auth', 'keycloak.role:admin'])->group(function () {
        Route::get('dashboard', DashboardController::class)
            ->name('dashboard');

        Route::controller(CategoryController::class)
            ->prefix('category')
            ->as('category.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{category}', 'show')->name('show');
                Route::get('/{category}/edit', 'edit')->name('edit');
                Route::put('/{category}', 'update')->name('update');
                Route::delete('/{category}', 'destroy')->name('destroy');
                Route::patch('/{category}/status', 'changeStatus')->name('change-status');
            });

        // Permissions (index only)
        Route::get('permissions', [PermissionController::class, 'index'])
            ->name('permission.index');

        // Roles (CRUD without show)
        Route::controller(RoleController::class)
            ->prefix('roles')
            ->as('role.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{role}/edit', 'edit')->name('edit');
                Route::put('/{role}', 'update')->name('update');
                Route::delete('/{role}', 'destroy')->name('destroy');
            });
    });
});
