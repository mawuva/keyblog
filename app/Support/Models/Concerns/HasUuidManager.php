<?php

namespace App\Support\Models\Concerns;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuidManager
{
    use HasUuids;

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array
     */
    public function uniqueIds()
    {
        return ['_id'];
    }

    /**
     * Generate a new UUID for the model.
     *
     * @return string
     */
    public function newUniqueId()
    {
        return (string) Str::uuid();
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return '_id';
    }

    /**
     * Get the value of the model's route key.
     *
     * @return mixed
     */
    public function getRouteKey()
    {
        return $this->getAttribute($this->getRouteKeyName());
    }

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?: $this->getRouteKeyName(), $value)->first();
    }

    /**
     * Summary of scopeFindByUuid
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $uuid
     * @return Model|null
     */
    public function scopeFindByUuid(Builder $query, string $uuid): ?Model
    {
        return $query ->where('_id', $uuid) ->first();
    }

    /**
     * Summary of scopeWhereUuid
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $uuid
     * @return Builder
     */
    public function scopeWhereUuid(Builder $query, string $uuid): Builder
    {
        return $query ->where('_id', $uuid);
    }

    /**
     * Ignore the uuid(_idà).
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $uuid
     * @return void
     */
    public function scopeIgnoreUuid($query, $uuid): void
    {
        $query->where('_id', '<>', $uuid);
    }
}
