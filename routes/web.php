<?php

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PagesController;

Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
], function () {
    Route::get('/', HomeController::class)->name('home');
    Route::get('/about', [PagesController::class, 'about'])->name('about');

    require __DIR__.'/keycloak.php';
    require __DIR__.'/member.php';
    require __DIR__.'/admin.php';
    require __DIR__.'/settings.php';
});

// Locale switcher route (outside the group to work without locale prefix)
Route::get('locale/{locale}', [\App\Http\Controllers\LocaleController::class, 'switch'])
    ->name('locale.switch');
