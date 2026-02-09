<?php

declare(strict_types=1);

return [
    'title' => 'Categories',
    'description' => 'Manage your catalog categories.',

    'columns' => [
        'name' => 'Name',
        'slug' => 'Slug',
        'order' => 'Order',
        'status' => 'Status',
        'created_at' => 'Created at',
    ],

    'filters' => [
        'search' => 'Search by name...',
        'all_statuses' => 'All statuses',
    ],

    'actions' => [
        'add' => 'Add a category',
        'edit' => 'Edit',
        'delete' => 'Delete',
    ],

    'create' => [
        'title' => 'Add a category',
        'breadcrumb' => 'Add',
        'submit' => 'Create category',
    ],

    'edit' => [
        'title' => 'Edit category',
        'submit' => 'Update',
    ],

    'delete' => [
        'title' => 'Confirm deletion',
        'description' => 'This action is irreversible. Are you sure you want to delete this category?',
        'cancel' => 'Cancel',
        'confirm' => 'Delete',
    ],

    'fields' => [
        'name' => 'Name',
        'description' => 'Description',
        'order' => 'Order',
        'icon_type' => 'Icon type',
        'icon_value' => 'Icon value',
    ],

    'empty' => 'No categories found.',
];
