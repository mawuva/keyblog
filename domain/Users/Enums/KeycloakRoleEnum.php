<?php

declare(strict_types=1);

namespace Domain\Users\Enums;

enum KeycloakRoleEnum: string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
    case MEMBER = 'member';
}
