<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use function request_user_data;

class KeycloakAuth
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifier si l'utilisateur est déjà authentifié Laravel
        if (Auth::check()) {
            request_user_data($request);

            return $next($request);
        }

        return redirect()->route('auth.redirect');
    }
}
