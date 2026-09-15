<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        // Si l'utilisateur est déjà connecté et est admin, rediriger vers le dashboard
        if ($request->user()?->canAccessAdmin()) {
            return to_route('admin.dashboard');
        }

        return Inertia::render('admin/login');
    }
}
