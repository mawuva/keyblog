<?php

declare(strict_types=1);

namespace App\Support\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

abstract class SoftDeletableModel extends BaseModel
{
    use SoftDeletes;
}
