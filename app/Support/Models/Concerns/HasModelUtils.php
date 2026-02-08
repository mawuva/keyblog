<?php

namespace App\Support\Models\Concerns;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

trait HasModelUtils
{
    /**
     * Get the created at formatted.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function createdAtFormatted(): Attribute
    {
        Carbon::setlocale("fr");

        return Attribute::make(
            get: static fn ($value, $attributes) => Carbon::parse($attributes['created_at'])->translatedFormat('j M Y à H:i d'),
        );
    }

    /**
     * Get the updated at formatted.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function updatedAtFormatted(): Attribute
    {
        Carbon::setlocale("fr");

        return Attribute::make(
            get: static fn ($value, $attributes) => Carbon::parse($attributes['updated_at'])->translatedFormat('j M Y à H:i d'),
        );
    }

    /**
     * Ignore the id.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $id
     * @return void
     */
    public function scopeIgnoreId($query, $id): void
    {
        $query->where('id', '<>', $id);
    }
}
