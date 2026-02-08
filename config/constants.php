<?php

declare(strict_types=1);

return [
    "default_password" => "password",

    "pagination" => 10,

    "currency" => "FCFA",

    /*
    |--------------------------------------------------------------------------
    | Serial configuration
    |--------------------------------------------------------------------------
    */

    "serial" => [
        // Longueur du numéro incrémental
        'number_length' => 4,

        // Séparateur
        'separator' => '-',

        // Format date
        'month_length' => 2,
        'year_length' => 2,
    ],
];