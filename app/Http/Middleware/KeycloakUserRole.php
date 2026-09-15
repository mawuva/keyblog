<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KeycloakUserRole
{
    public function handle(Request $request, Closure $next, ?string $role = null)
    {
        // Vérifier que l'utilisateur est authentifié
        if (! Auth::check()) {
            return redirect()->route('auth.redirect');
        }

        request_user_data($request);

        // Si un rôle est spécifié, vérifier que l'utilisateur a ce rôle
        if ($role) {
            return $this->handleRoleCheck($request, $next, $role);
        }

        // Pas de restriction de rôle, continuer
        return $next($request);
    }

    protected function handleRoleCheck(Request $request, Closure $next, string $role)
    {
        $user = $request->user();

        // Vérifier le rôle selon le type
        if (! $this->userHasRole($user, $role)) {
            return $this->handleUnauthorized($request, $role);
        }

        return $next($request);
    }

    protected function userHasRole($user, string $role): bool
    {
        return match ($role) {
            'admin' => $user->canAccessAdmin(),
            'customer' => $user->isCustomer(),
            'member' => $user->isMember(),
            default => $user->hasKeycloakRole($role),
        };
    }

    protected function handleUnauthorized(Request $request, string $role)
    {
        flash_error(__('messages.errors.access_denied'));

        // Rediriger selon le contexte
        return match ($role) {
            'admin' => to_route('member.dashboard'),
            default => to_route('login'),
        };
    }
}
