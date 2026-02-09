<?php

declare(strict_types=1);

return [
    'title' => 'Permissions',
    'description' => 'List of all available permissions in the application.',

    'columns' => [
        'name' => 'Name',
        'created_at' => 'Created',
    ],

    'filters' => [
        'search' => 'Search by name...',
    ],

    'empty' => 'No permissions found.',
];
