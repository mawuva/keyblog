<?php

declare(strict_types=1);

namespace Domain\Users\Data;

use Spatie\LaravelData\Data;

class KeycloakTokenData extends Data
{
    public function __construct(
        public string $token_id,
        public ?string $username,
        public ?string $email,
        public ?string $name,
        public array $groups = [],
        public array $realm_roles = [],
        public array $client_roles = [],
        public array $scopes = [],
    ) {}
}
