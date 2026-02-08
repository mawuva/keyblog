<?php

declare(strict_types=1);

use App\Http\Controllers\Member\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'member', 
    'as' => 'member.'
], function () {

    Route::get('dashboard', DashboardController::class)
            ->name('dashboard');
});
