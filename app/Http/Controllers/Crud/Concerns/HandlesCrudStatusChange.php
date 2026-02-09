<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud\Concerns;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Domain\Shared\Status\Exceptions\TransitionException;

trait HandlesCrudStatusChange
{
    public function changeStatus(Request $request, string $uuid): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string'],
        ]);

        $item = $this->modelClass()::whereUuid($uuid)->firstOrFail();

        try {
            $item->changeStatus($request->input('status'));
        } catch (TransitionException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        flash_success(__('messages.data.updated'));

        return to_route($this->getRoute('index'));
    }
}
