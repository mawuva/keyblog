<?php

declare(strict_types=1);

return [
    'title' => 'Roles',
    'description' => 'Manage application roles and their permissions.',

    'columns' => [
        'name' => 'Name',
        'permissions_count' => 'Permissions',
        'created_at' => 'Created',
    ],

    'filters' => [
        'search' => 'Search by name...',
    ],

    'actions' => [
        'add' => 'Add a role',
        'edit' => 'Edit',
        'delete' => 'Delete',
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

    'delete' => [
        'title' => 'Confirm deletion',
        'description' => 'This action is irreversible. Are you sure you want to delete this role? Users assigned to this role will lose their permissions.',
        'cancel' => 'Cancel',
        'confirm' => 'Delete',
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

    'empty' => 'No roles found.',
];
