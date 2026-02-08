<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SocialiteController;

// Routes d'authentification Keycloak
Route::prefix('auth')->as('auth.')->group(function () {
    Route::get('login', [SocialiteController::class, 'redirect'])->name('login');
    Route::get('callback', [SocialiteController::class, 'callback'])->name('callback');
    Route::get('logout', [SocialiteController::class, 'logout'])->name('logout');
});

