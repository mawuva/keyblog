<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PagesController;

Route::get('/', HomeController::class)->name('home');

require __DIR__.'/keycloak.php';
require __DIR__.'/member.php';
require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
