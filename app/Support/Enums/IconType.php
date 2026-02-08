<?php

declare(strict_types=1);

namespace App\Support\Enums;

enum IconType: string
{
    case LUCIDE = 'lucide';
    case IMAGE = 'image';
    case EMOJI = 'emoji';
    case SVG = 'svg';

    public function label(): string
    {
        return match ($this) {
            self::LUCIDE => 'Lucide Icon',
            self::IMAGE => 'Image',
            self::EMOJI => 'Emoji',
            self::SVG => 'SVG',
        };
    }
}
