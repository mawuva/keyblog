<?php

namespace App\Support\Models\Concerns;

use Illuminate\Support\Facades\Cache;

trait HasSlugRedirects
{
    /**
     * Store old slug for redirection when slug changes
     */
    protected static function bootHasSlugRedirects()
    {
        static::updating(function ($model) {
            if ($model->isDirty('slug')) {
                $oldSlug = $model->getOriginal('slug');
                $newSlug = $model->slug;
                
                if ($oldSlug && $oldSlug !== $newSlug) {
                    // Store redirect mapping
                    Cache::put("slug_redirect:{$model->getTable()}:{$oldSlug}", $newSlug, now()->addYear());
                }
            }
        });
    }

    /**
     * Get redirect URL for old slug
     */
    public static function getRedirectForSlug(string $slug): ?string
    {
        return Cache::get("slug_redirect:" . (new static)->getTable() . ":{$slug}");
    }

    /**
     * Clear all redirects for this model
     */
    public static function clearSlugRedirects(): void
    {
        $table = (new static)->getTable();
        $keys = Cache::getRedis()->keys("slug_redirect:{$table}:*");
        
        if (!empty($keys)) {
            Cache::getRedis()->del($keys);
        }
    }
}
