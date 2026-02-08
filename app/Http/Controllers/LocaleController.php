<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LocaleController extends Controller
{
    /**
     * Switch the application locale.
     *
     * @param  string  $locale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function switch(Request $request, string $locale)
    {
        // Validate that the locale is supported
        $supportedLocales = LaravelLocalization::getSupportedLocales();
        
        if (!isset($supportedLocales[$locale])) {
            abort(404, 'Locale not supported');
        }

        // Store the locale in session
        session(['locale' => $locale]);

        // Get the intended URL or redirect to home
        $intended = $request->input('intended') ?: route('home');

        // Redirect to the localized URL
        return redirect(LaravelLocalization::getLocalizedURL($locale, $intended));
    }

    /**
     * Get the current locale information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function current()
    {
        return response()->json([
            'current' => LaravelLocalization::getCurrentLocale(),
            'name' => LaravelLocalization::getCurrentLocaleName(),
            'supported' => LaravelLocalization::getSupportedLocales(),
        ]);
    }
}
