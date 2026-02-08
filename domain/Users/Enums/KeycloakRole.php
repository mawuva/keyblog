<?php

declare(strict_types=1);

namespace Domain\Users\Enums;

enum KeycloakRole: string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
}
