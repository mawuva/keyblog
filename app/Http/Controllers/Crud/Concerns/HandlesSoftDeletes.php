<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Illuminate\Http\RedirectResponse;

trait HandlesSoftDeletes
{
    public function restore(string $uuid): RedirectResponse
    {
        $this->modelClass()::onlyTrashed()->whereUuid($uuid)->firstOrFail()->restore();

        flash_success(__('messages.data.restored'));

        return to_route($this->getRoute('index'));
    }

    public function forceDelete(string $uuid): RedirectResponse
    {
        $this->modelClass()::onlyTrashed()->whereUuid($uuid)->firstOrFail()->forceDelete();

        flash_success(__('messages.data.deleted_permanently'));

        return to_route($this->getRoute('index'));
    }
}
