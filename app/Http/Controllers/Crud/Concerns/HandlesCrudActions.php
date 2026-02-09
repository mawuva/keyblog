<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

trait HandlesCrudActions
{
    public function index(Request $request): Response
    {
        $items = $this->buildQuery()
            ->paginate($this->perPage)
            ->withQueryString();

        return inertia($this->getView('index'), [
            'items' => $this->transformCollection($items),
            ...$this->formData(),
        ]);
    }

    public function create(): Response
    {
        return inertia($this->getView('create'), $this->formData());
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->dataClass()::from($request)->toArray();

        $this->modelClass()::create($data);

        flash_success(__('messages.data.created'));

        return to_route($this->getRoute('index'));
    }

    public function show(string $uuid): Response
    {
        $item = $this->modelClass()::whereUuid($uuid)->firstOrFail();

        return inertia($this->getView('show'), [
            'item' => $this->transformItem($item),
        ]);
    }

    public function edit(string $uuid): Response
    {
        $item = $this->modelClass()::whereUuid($uuid)->firstOrFail();

        return inertia($this->getView('edit'), [
            'item' => $this->transformItem($item),
            ...$this->formData($item),
        ]);
    }

    public function update(Request $request, string $uuid): RedirectResponse
    {
        $item = $this->modelClass()::whereUuid($uuid)->firstOrFail();

        $data = $this->dataClass()::from($request)->toArray();

        $item->update($data);

        flash_success(__('messages.data.updated'));

        return to_route($this->getRoute('index'));
    }

    public function destroy(string $uuid): RedirectResponse
    {
        $this->modelClass()::whereUuid($uuid)->delete();

        flash_success(__('messages.data.deleted'));

        return to_route($this->getRoute('index'));
    }

    /**
     * @return array<string, mixed>
     */
    protected function formData(?Model $item = null): array
    {
        return [];
    }
}
