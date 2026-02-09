<?php

declare(strict_types=1);

namespace Domain\Roles\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class RoleData extends Data
{
    public function __construct(
        public string $name,
        /** @var array<int> */
        public array $permissions = [],
    ) {}

    public static function rules(ValidationContext $context = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'permissions' => ['array'],
            'permissions.*' => ['integer', 'exists:permissions,id'],
        ];
    }
}
