<?php

declare(strict_types=1);

return [
    'role' => [
        'title' => 'Roles',
        'description' => 'Manage application roles and their permissions.',

        'columns' => [
            'name' => 'Name',
            'permissions_count' => 'Permissions',
            'created_at' => 'Created',
        ],

        'create' => [
            'title' => 'Add a role',
            'breadcrumb' => 'Add',
            'submit' => 'Create role',
        ],

        'edit' => [
            'title' => 'Edit role',
            'breadcrumb' => 'Edit',
            'submit' => 'Update',
        ],

        'fields' => [
            'name' => 'Name',
            'permissions' => 'Permissions',
        ],

        'permissions_section' => [
            'title' => 'Permissions',
            'description' => 'Select the permissions for this role.',
            'select_all' => 'Select all',
            'deselect_all' => 'Deselect all',
            'selected' => ':count selected',
        ],
    ],

    'permission' => [
        'title' => 'Permissions',
        'description' => 'List of all available permissions in the application.',

        'columns' => [
            'name' => 'Name',
            'created_at' => 'Created',
        ],
    ],
];
