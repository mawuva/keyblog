<?php

declare(strict_types=1);

namespace Domain\Users\Data;

use Spatie\LaravelData\Data;

class CreatesUserData extends Data
{
    public function __construct(
        public string $last_name,
        public string $first_name,
        public string $email,
        public string $password,
    ) {}
}
