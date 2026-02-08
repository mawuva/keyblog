<?php

declare(strict_types=1);

namespace App\Support\MediaLibrary\Enums;

enum MediaCollectionEnum: string
{
    case PRODUCT = 'product';

    public function label(): string
    {
        return match ($this) {
            self::PRODUCT         => "Product",
        };
    }
}
