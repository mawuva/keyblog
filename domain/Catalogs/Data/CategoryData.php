<?php

declare(strict_types=1);

namespace Domain\Catalogs\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class CategoryData extends Data
{
    public function __construct(
        public string $name,
        public ?string $description = null,
        public int $order = 0,
        public ?string $icon_type = null,
        public ?string $icon_value = null,
    ) {}

    public static function rules(ValidationContext $context = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'order' => ['integer', 'default:0'],
            'icon_type' => ['nullable', 'string', 'max:20'],
            'icon_value' => ['nullable', 'string', 'max:255'],
        ];
    }
}
