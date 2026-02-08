<?php

declare(strict_types=1);

namespace App\Support\Models;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

trait HasDropdownOptions
{
    /**
     * Get catalog items with caching.
     *
     * @param array<string> $fields
     * @param string $orderBy
     * @param string $direction
     * @param int $cacheMinutes
     * @return EloquentCollection<int, static>
     */
    public static function catalogItems(
        array $fields,
        string $orderBy = 'name',
        string $direction = 'asc',
        int $cacheMinutes = 60,
        ?string $status = 'active'
    ): EloquentCollection {
        $model = new static();
        $cacheKey = sprintf(
            '%s:catalog:%s:%s:%s:%s',
            $model->getTable(),
            implode(',', $fields),
            $orderBy,
            $direction,
            $status ?? 'all'
        );

        return Cache::remember($cacheKey, now()->addMinutes($cacheMinutes), function () use ($fields, $orderBy, $direction, $status) {
            $query = static::select(...$fields);

            // Filter by status if the model uses Spatie ModelStatus and status is provided
            if ($status !== null && in_array(\Spatie\ModelStatus\HasStatuses::class, class_uses_recursive(static::class), true)) {
                $query->currentStatus($status);
            }

            return $query->orderBy($orderBy, $direction)->get();
        });
    }

    /**
     * Get catalog items formatted for select dropdowns.
     *
     * @param string $valueField
     * @param string $labelField
     * @param string $orderBy
     * @param string $direction
     * @param int $cacheMinutes
     * @param string|null $status Filter by status (only if model uses Spatie ModelStatus)
     * @return Collection<int, array{value: mixed, label: string}>
     */
    public static function forSelect(
        string $valueField = 'id',
        string $labelField = 'name',
        string $orderBy = 'name',
        string $direction = 'asc',
        int $cacheMinutes = 60,
        ?string $status = 'active'
    ): Collection {
        $items = self::catalogItems(
            [$valueField, $labelField],
            $orderBy,
            $direction,
            $cacheMinutes,
            $status
        );

        return $items->map(function (Model $item) use ($valueField, $labelField) {
            return [
                'value' => $item->{$valueField},
                'label' => $item->{$labelField},
            ];
        });
    }

    /**
     * Get catalog items formatted for select dropdowns, excluding specific values.
     *
     * @param array<int|string> $excludeValues Values to exclude
     * @param string $excludeField Field to check for exclusion (defaults to valueField)
     * @param string $valueField
     * @param string $labelField
     * @param string $orderBy
     * @param string $direction
     * @param int $cacheMinutes
     * @return Collection<int, array{value: mixed, label: string}>
     */
    public static function forSelectExcluding(
        array $excludeValues,
        ?string $excludeField = null,
        string $valueField = 'id',
        string $labelField = 'name',
        string $orderBy = 'name',
        string $direction = 'asc',
        int $cacheMinutes = 60
    ): Collection {
        $excludeField = $excludeField ?? $valueField;
        
        $items = self::catalogItems(
            [$valueField, $labelField, $excludeField],
            $orderBy,
            $direction,
            $cacheMinutes
        );

        return $items
            ->reject(function (Model $item) use ($excludeField, $excludeValues) {
                return in_array($item->{$excludeField}, $excludeValues, true);
            })
            ->map(function (Model $item) use ($valueField, $labelField) {
                return [
                    'value' => $item->{$valueField},
                    'label' => $item->{$labelField},
                ];
            });
    }

    /**
     * Get catalog items formatted for select dropdowns, excluding items where a field equals a value.
     *
     * @param string $field Field to check
     * @param mixed $value Value to exclude
     * @param string $valueField
     * @param string $labelField
     * @param string $orderBy
     * @param string $direction
     * @param int $cacheMinutes
     * @return Collection<int, array{value: mixed, label: string}>
     */
    public static function forSelectWhereNot(
        string $field,
        mixed $value,
        string $valueField = 'id',
        string $labelField = 'name',
        string $orderBy = 'name',
        string $direction = 'asc',
        int $cacheMinutes = 60
    ): Collection {
        $fields = array_unique([$valueField, $labelField, $field]);
        
        $items = self::catalogItems(
            $fields,
            $orderBy,
            $direction,
            $cacheMinutes
        );

        return $items
            ->reject(function (Model $item) use ($field, $value) {
                return $item->{$field} === $value;
            })
            ->map(function (Model $item) use ($valueField, $labelField) {
                return [
                    'value' => $item->{$valueField},
                    'label' => $item->{$labelField},
                ];
            });
    }

    /**
     * Get catalog items formatted for select dropdowns, excluding items based on a condition.
     *
     * @param callable(Model): bool $excludeCondition Closure that returns true to exclude the item
     * @param string $valueField
     * @param string $labelField
     * @param string $orderBy
     * @param string $direction
     * @param int $cacheMinutes
     * @return Collection<int, array{value: mixed, label: string}>
     */
    public static function forSelectWhere(
        callable $excludeCondition,
        string $valueField = 'id',
        string $labelField = 'name',
        string $orderBy = 'name',
        string $direction = 'asc',
        int $cacheMinutes = 60
    ): Collection {
        // Select all fields to allow flexible conditions
        $items = static::select('*')
            ->orderBy($orderBy, $direction)
            ->get();

        $items = $items->reject($excludeCondition);

        return $items->map(function (Model $item) use ($valueField, $labelField) {
            return [
                'value' => $item->{$valueField},
                'label' => $item->{$labelField},
            ];
        });
    }
}

