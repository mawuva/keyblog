<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Domain\Users\Services\KeycloakService;
use Domain\Users\Actions\SaveUserFromKeycloak;

class SocialiteController extends Controller
{
    protected $keycloakService;

    public function __construct(KeycloakService $keycloakService)
    {
        $this->keycloakService = $keycloakService;
    }
    
    /**
     * Redirection vers Keycloak
     */
    public function redirect()
    {
        return redirect($this->keycloakService->getLoginUrl());
    }

    /**
     * Callback Keycloak
     */
    public function callback()
    {
        $kcUser = Socialite::driver('keycloak')->user();

        $userData = $this->keycloakService->mapSocialiteUser($kcUser);

        session(['keycloak_token' => $kcUser->token]);

        $user = SaveUserFromKeycloak::execute($userData);

        Auth::login($user, true);

        if ($user->isKeycloakAdmin()) {
            return to_route('admin.dashboard');
        }

        return to_route('member.dashboard');
    }

    /**
     * Logout Laravel + Keycloak (global)
     */
    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        $logoutUrl = $this->keycloakService->getLogoutUrl();
            
        // Nettoyer la session
        request()->session()->forget('keycloak_token');
        
        return redirect($logoutUrl);
    }
}
