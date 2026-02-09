<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Crud\BaseCrudController;
use Domain\Roles\Data\RoleData;
use Domain\Roles\Resources\PermissionResource;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\QueryBuilder\AllowedFilter;

class PermissionController extends BaseCrudController
{
    protected int $perPage = 25;

    protected function modelClass(): string
    {
        return Permission::class;
    }

    protected function dataClass(): string
    {
        return RoleData::class;
    }

    protected function resourceClass(): ?string
    {
        return PermissionResource::class;
    }

    protected function allowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
        ];
    }

    protected function allowedSorts(): array
    {
        return ['name', 'created_at'];
    }

    public function index(Request $request): Response
    {
        $items = $this->buildQuery()
            ->paginate($this->perPage)
            ->withQueryString();

        return inertia($this->getView('index'), [
            'items' => $this->transformCollection($items),
        ]);
    }
}
