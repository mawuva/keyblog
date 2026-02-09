<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Queries\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class StatusFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        $query->currentStatus($value);
    }
}
