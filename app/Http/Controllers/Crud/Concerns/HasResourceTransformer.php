<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

trait HasResourceTransformer
{
    /**
     * @return class-string<JsonResource>|null
     */
    protected function resourceClass(): ?string
    {
        return null;
    }

    /**
     * @return JsonResource|Model
     */
    protected function transformItem(Model $item): JsonResource|Model
    {
        $resourceClass = $this->resourceClass();

        if (! $resourceClass) {
            return $item;
        }

        return new $resourceClass($item);
    }

    /**
     * @return JsonResource|LengthAwarePaginator
     */
    protected function transformCollection(LengthAwarePaginator $items): JsonResource|LengthAwarePaginator
    {
        $resourceClass = $this->resourceClass();

        if (! $resourceClass) {
            return $items;
        }

        return $resourceClass::collection($items);
    }
}
