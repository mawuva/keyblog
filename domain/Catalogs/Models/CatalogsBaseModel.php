<?php

declare(strict_types=1);

namespace Domain\Catalogs\Models;

use Spatie\Sluggable\HasSlug;
use App\Support\Models\CachedSoftDeletableModel;
use Domain\Shared\Status\Concerns\Models\InteractsWithStatus;

abstract class CatalogsBaseModel extends CachedSoftDeletableModel
{
    use HasSlug, InteractsWithStatus;
}
