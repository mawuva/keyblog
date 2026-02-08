<?php

declare(strict_types=1);

namespace App\Support\Models;

use YmigVal\LaravelModelCache\HasCachedQueries;
use YMigVal\LaravelModelCache\ModelRelationships;

abstract class CachedSoftDeletableModel extends SoftDeletableModel
{
    use HasCachedQueries, ModelRelationships;
}
