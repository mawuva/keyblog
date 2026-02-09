<?php

declare(strict_types=1);

namespace Domain\Catalogs\Models;

use Spatie\Sluggable\SlugOptions;
use Domain\Catalogs\Enums\CatalogEnum;

class Category extends CatalogsBaseModel
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'order',
        'icon_type',
        'icon_value',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    protected function statusEnum(): string
    {
        return CatalogEnum::class;
    }
}