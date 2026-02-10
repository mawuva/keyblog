<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

trait HasResourceTransformer
{
    /**
     * @return class-string<\Illuminate\Http\Resources\Json\JsonResource>|null
     */
    protected function resourceClass(): ?string
    {
        return null;
    }

    /**
     * @return array<string, mixed>|Model
     */
    protected function transformItem(Model $item): array|Model
    {
        $resourceClass = $this->resourceClass();

        if (! $resourceClass) {
            return $item;
        }

        return (new $resourceClass($item))->resolve();
    }

    /**
     * @return LengthAwarePaginator
     */
    protected function transformCollection(LengthAwarePaginator $items): LengthAwarePaginator
    {
        $resourceClass = $this->resourceClass();

        if (! $resourceClass) {
            return $items;
        }

        $items->through(fn (Model $item) => (new $resourceClass($item))->resolve());

        return $items;
    }
}
