<?php

declare(strict_types=1);

namespace App\Support\Models;

use App\Support\Models\Concerns\HasModelUtils;
use App\Support\Models\Concerns\HasUuidManager;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    use HasUuidManager, HasModelUtils;
}
