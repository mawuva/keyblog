<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract, TwoFactorLoginResponseContract
{
    /**
     * Send the authenticated user to the admin area or to the member area.
     */
    public function toResponse($request): Response
    {
        /** @var Request $request */
        $route = $request->user()?->canAccessAdmin()
            ? 'admin.dashboard'
            : 'member.dashboard';

        return $request->wantsJson()
            ? response()->json(['two_factor' => false, 'redirect' => route($route)])
            : redirect()->intended(route($route));
    }
}
