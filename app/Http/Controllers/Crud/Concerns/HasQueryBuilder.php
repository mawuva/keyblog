<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Spatie\QueryBuilder\QueryBuilder;

trait HasQueryBuilder
{
    protected array $with = [];

    protected int $perPage = 15;

    protected function allowedFilters(): array
    {
        return [
            \Spatie\QueryBuilder\AllowedFilter::trashed(),
        ];
    }

    protected function allowedSorts(): array
    {
        return [];
    }

    protected function allowedIncludes(): array
    {
        return [];
    }

    protected function buildQuery(): QueryBuilder
    {
        return QueryBuilder::for($this->modelClass())
            ->allowedFilters($this->allowedFilters())
            ->allowedSorts($this->allowedSorts())
            ->allowedIncludes($this->allowedIncludes())
            ->defaultSort('-created_at')
            ->with($this->with);
    }
}
