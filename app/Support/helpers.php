<?php

declare(strict_types=1);

use App\Support\Flash\Flash;

if (! function_exists('__ucfirst')) {
    /**
     * Translate the given message and capitalize the first letter.
     *
     * @param  string  $key
     * @param  array  $replace
     * @param  string|null  $locale
     * @return string
     */
    function __ucfirst(string $key, array $replace = [], ?string $locale = null): string
    {
        return \Illuminate\Support\Str::ucfirst(__($key, $replace, $locale));
    }
}

if (! function_exists('flash')) {
    /**
     * Get the flash instance.
     */
    function flash(): Flash
    {
        return app(Flash::class);
    }
}

if (! function_exists('flash_info')) {
    /**
     * Flash an info message.
     */
    function flash_info(string $message): void
    {
        flash()->info($message);
    }
}

if (! function_exists('flash_success')) {
    /**
     * Flash a success message.
     */
    function flash_success(string $message): void
    {
        flash()->success($message);
    }
}

if (! function_exists('flash_warning')) {
    /**
     * Flash a warning message.
     */
    function flash_warning(string $message): void
    {
        flash()->warning($message);
    }
}

if (! function_exists('flash_error')) {
    /**
     * Flash an error message.
     */
    function flash_error(string $message): void
    {
        flash()->error($message);
    }
}

if (! function_exists('notiflash')) {
    /**
     * Flash a message.
     */
    function notiflash(string $level, string $message): void
    {
        flash()->{$level}($message);
    }
}

if (! function_exists('request_user_data')) {
    function request_user_data(\Illuminate\Http\Request $request): ?\Domain\Users\Data\AuthenticatedUserData
    {
        $userData = $request->attributes->get('user_data');

        if ($userData) {
            return $userData;
        }

        $user = $request->user();

        if (! $user) {
            return null;
        }

        $userData = \Domain\Users\Data\AuthenticatedUserData::fromModel($user);
        $request->attributes->set('user_data', $userData);

        return $userData;
    }
}
