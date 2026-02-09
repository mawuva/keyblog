<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Crud\BaseCrudController;
use Domain\Roles\Data\RoleData;
use Domain\Roles\Resources\PermissionResource;
use Domain\Roles\Resources\RoleResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\AllowedFilter;

class RoleController extends BaseCrudController
{
    protected array $with = ['permissions'];

    protected function modelClass(): string
    {
        return Role::class;
    }

    protected function dataClass(): string
    {
        return RoleData::class;
    }

    protected function resourceClass(): ?string
    {
        return RoleResource::class;
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
            ->withCount('permissions')
            ->paginate($this->perPage)
            ->withQueryString();

        return inertia($this->getView('index'), [
            'items' => $this->transformCollection($items),
        ]);
    }

    public function create(): Response
    {
        return inertia($this->getView('create'), [
            'permissions' => $this->getGroupedPermissions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = RoleData::from($request);

        $role = Role::create([
            'name' => $data->name,
            'guard_name' => 'web',
        ]);

        if (!empty($data->permissions)) {
            $permissions = Permission::whereIn('id', $data->permissions)->get();
            $role->syncPermissions($permissions);
        }

        flash_success(__('messages.data.created'));

        return to_route($this->getRoute('index'));
    }

    public function edit(string $id): Response
    {
        $item = Role::with('permissions')->findOrFail($id);

        return inertia($this->getView('edit'), [
            'item' => $this->transformItem($item),
            'permissions' => $this->getGroupedPermissions(),
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $role = Role::findOrFail($id);
        $data = RoleData::from($request);

        $role->update([
            'name' => $data->name,
        ]);

        $permissions = Permission::whereIn('id', $data->permissions)->get();
        $role->syncPermissions($permissions);

        flash_success(__('messages.data.updated'));

        return to_route($this->getRoute('index'));
    }

    public function destroy(string $id): RedirectResponse
    {
        Role::findOrFail($id)->delete();

        flash_success(__('messages.data.deleted'));

        return to_route($this->getRoute('index'));
    }

    /**
     * @return array<string, mixed>
     */
    protected function formData(?Model $item = null): array
    {
        return [
            'permissions' => $this->getGroupedPermissions(),
        ];
    }

    /**
     * Get permissions grouped by entity.
     *
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function getGroupedPermissions(): array
    {
        $permissions = Permission::orderBy('name')->get();

        $grouped = [];
        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $entity = $parts[0] ?? 'other';

            if (!isset($grouped[$entity])) {
                $grouped[$entity] = [];
            }

            $grouped[$entity][] = (new PermissionResource($permission))->resolve();
        }

        ksort($grouped);

        return $grouped;
    }
}
