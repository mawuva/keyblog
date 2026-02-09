<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

trait HasCrudRoutes
{
    protected string $routePrefix = 'admin';

    protected function resourceName(): string
    {
        return class_basename($this->modelClass());
    }

    protected function getView(string $action): string
    {
        return $this->routePrefix . '/' . strtolower($this->resourceName()) . '/' . $action;
    }

    protected function getRoute(string $action): string
    {
        return $this->routePrefix . '.' . strtolower($this->resourceName()) . '.' . $action;
    }
}
