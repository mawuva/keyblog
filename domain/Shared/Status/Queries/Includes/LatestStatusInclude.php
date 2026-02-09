<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Queries\Includes;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Includes\IncludeInterface;

class LatestStatusInclude implements IncludeInterface
{
    public function __invoke(Builder $query, string $include): void
    {
        $query->with([
            'statuses' => function ($query): void {
                $query->latest()->limit(1);
            },
        ]);
    }
}
