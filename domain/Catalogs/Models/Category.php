<?php

declare(strict_types=1);

namespace Domain\Catalogs\Models;

use Spatie\Sluggable\SlugOptions;
use Domain\Catalogs\Enums\CatalogEnum;
use Spatie\Translatable\HasTranslations;

class Category extends CatalogsBaseModel
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'order',
        'icon_type',
        'icon_value',
    ];

    public array $translatable = ['name', 'description'];

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