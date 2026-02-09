<?php

declare(strict_types=1);

namespace Domain\Catalogs\Enums;

use Domain\Shared\Status\Contracts\StatusEnumContract;
use Domain\Shared\Status\Concerns\Enums\HasStatusAttributes;

enum CatalogEnum: string implements StatusEnumContract
{
    use HasStatusAttributes;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public static function initial(): self
    {
        return self::ACTIVE;
    }

    public function allowedTransitions(): array
    {
        return match ($this) {
            self::ACTIVE => [
                self::INACTIVE,
            ],
            self::INACTIVE => [
                self::ACTIVE,
            ],
            default => [],
        };
    }
}
