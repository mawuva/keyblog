<?php

namespace App\Http\Controllers\Public;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function about()
    {
        return Inertia::render('about');
    }
}
