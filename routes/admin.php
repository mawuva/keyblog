<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'admin', 
    'as' => 'admin.'
], function () {

    Route::get('dashboard', DashboardController::class)
            ->name('dashboard');
});
