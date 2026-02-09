<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use Domain\Users\Data\KeycloakUserData;
use Domain\Users\Models\User;

class SaveUserFromKeycloak
{
    public static function execute(KeycloakUserData $data): User
    {
        $user = User::updateOrCreate(
            ['keycloak_id' => $data->keycloak_id],
            [
                'email'  => $data->email,
                'password'  => config("constants.default_password"),
                'name'   => $data->name,
                'keycloak_groups' => $data->groups,
                'keycloak_roles'  => $data->realm_roles,
            ]
        );

        // Mettre à jour les infos de connexion
        $user->updateLoginInfo();

        return $user;
    }
}
