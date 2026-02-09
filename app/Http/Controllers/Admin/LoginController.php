<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        // Si l'utilisateur est déjà connecté et est admin, rediriger vers le dashboard
        if ($request->user() && $request->get('user_data')?->canAccessAdmin()) {
            return to_route('admin.dashboard');
        }
        
        return Inertia::render('admin/login');
    }
}
