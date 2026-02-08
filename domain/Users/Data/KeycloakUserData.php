<?php

declare(strict_types=1);

namespace Domain\Users\Data;

use Spatie\LaravelData\Data;

class KeycloakUserData extends Data
{
    public function __construct(
        public string $keycloak_id,
        public string $email,
        public string $name,
        public string $username,
        public array $groups = [],
        public array $realm_roles = [],
        public array $client_roles = [],
        public array $scopes = [],
    ) {}
}
