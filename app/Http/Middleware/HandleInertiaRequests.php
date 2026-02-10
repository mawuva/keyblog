<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        syncLangFiles([
            'actions',
            'auth',
            'common',
            'passwords',
            'validation',
            'messages',
            'navigation',
            'pages/auth',
            'pages/admin/catalogs',
            'pages/admin/roles',
        ]);
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'flash' => flash()->getMessage()?->toArray() ?? null,
            'auth' => [
                'user' => $this->getUserData($request),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locales' => LaravelLocalization::getSupportedLocales(),
            'currentLocale' => LaravelLocalization::getCurrentLocale(),
            'currentLocaleName' => LaravelLocalization::getCurrentLocaleName(),
        ];
    }

    
    /**
     * Get user data for sharing with Inertia
     */
    protected function getUserData(Request $request): ?array
    {
        $userData = request_user_data($request);
        
        // Retourner null si pas d'utilisateur
        if (!$userData) {
            return null;
        }
        
        // Utiliser la méthode toArray() de UserData
        return $userData->toArray();
    }
}
