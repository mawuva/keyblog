<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;

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

        Route::resource('category', CategoryController::class);
    });
});
