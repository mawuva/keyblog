<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Crud\BaseCrudController;
use App\Http\Controllers\Crud\Concerns\HandlesCrudStatusChange;
use App\Http\Controllers\Crud\Concerns\HandlesSoftDeletes;
use Domain\Catalogs\Data\CategoryData;
use Domain\Catalogs\Enums\CatalogEnum;
use Domain\Catalogs\Models\Category;
use Domain\Catalogs\Resources\CategoryResource;
use Domain\Shared\Status\Queries\Filters\StatusFilter;
use Domain\Shared\Status\Queries\Includes\LatestStatusInclude;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;

class CategoryController extends BaseCrudController
{
    use HandlesCrudStatusChange, HandlesSoftDeletes;

    protected array $with = ['statuses'];

    protected function modelClass(): string
    {
        return Category::class;
    }

    protected function dataClass(): string
    {
        return CategoryData::class;
    }

    protected function resourceClass(): ?string
    {
        return CategoryResource::class;
    }

    protected function allowedFilters(): array
    {
        return [
            ...parent::allowedFilters(),
            AllowedFilter::partial('name'),
            AllowedFilter::custom('status', new StatusFilter()),
        ];
    }

    protected function allowedSorts(): array
    {
        return ['name', 'order', 'created_at'];
    }

    protected function allowedIncludes(): array
    {
        return [
            AllowedInclude::custom('latestStatus', new LatestStatusInclude()),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function formData(?Model $item = null): array
    {
        return [
            'statusOptions' => CatalogEnum::toArray(),
        ];
    }
}
