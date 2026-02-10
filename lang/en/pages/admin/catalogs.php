<?php

declare(strict_types=1);

return [
    'category' => [
        'title' => 'Categories',
        'description' => 'Manage your catalog categories.',

        'columns' => [
            'name' => 'Name',
            'slug' => 'Slug',
            'order' => 'Order',
            'status' => 'Status',
            'created_at' => 'Created at',
        ],

        'create' => [
            'title' => 'Add a category',
            'description' => 'Fill in the details for the new category.',
            'breadcrumb' => 'Add',
            'submit' => 'Create category',
        ],

        'edit' => [
            'title' => 'Edit category',
            'description' => 'Update the category details.',
            'submit' => 'Update',
        ],
    ],
];
