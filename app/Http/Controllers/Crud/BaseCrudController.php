<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crud;

use Spatie\LaravelData\Data;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\Crud\Concerns\HasCrudRoutes;
use App\Http\Controllers\Crud\Concerns\HasQueryBuilder;
use App\Http\Controllers\Crud\Concerns\HasResourceTransformer;
use App\Http\Controllers\Crud\Concerns\HandlesCrudActions;

abstract class BaseCrudController extends Controller
{
    use HandlesCrudActions, HasCrudRoutes, HasQueryBuilder, HasResourceTransformer;

    /** @var class-string<Model> */
    abstract protected function modelClass(): string;

    /** @var class-string<Data> */
    abstract protected function dataClass(): string;
}
