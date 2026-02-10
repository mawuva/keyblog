<?php

declare(strict_types=1);

return [
    'greeting' => 'Hello!',
    'welcome' => 'Welcome, :name!',
    
    'data' => [
        'created' => 'Data created successfully.',
        'saved' => 'Data saved successfully.',
        'updated' => 'Data updated successfully.',
        'edited' => 'Data edited successfully.',
        'changed' => 'Data changed successfully.',
        'deleted' => 'Data deleted successfully.',
        'destroyed' => 'Data destroyed successfully.',
        'restored' => 'Data restored successfully.',
        'deleted_permanently' => 'Data permanently deleted successfully.',
        'removed' => 'Data removed successfully.',
        'uploaded' => 'File(s) uploaded successfully.',
    ],

    // Authentication messages
    'auth' => [
        'required' => 'You must be logged in to perform this action.',
        'welcome' => 'Welcome!',
        'welcome_admin' => 'Welcome admin!',
        'logout' => 'Logged out',
        'login_required' => 'You must be logged in to access this page.',
    ],

    'errors' => [
        'general' => 'An error occurred.',
        'not_found' => 'The requested resource was not found.',
        'not_authorized' => 'You are not authorized to access this resource.',
        'not_authenticated' => 'You are not authenticated.',
        'not_verified' => 'Your email has not been verified.',
        'not_confirmed' => 'Your account has not been confirmed.',
        'not_active' => 'Your account is not active.',
        'not_valid' => 'The requested resource is not valid.',
        'not_valid_format' => 'The format of the requested resource is not valid.',
        'no_files_selected' => 'No files have been selected.',
        'auth_failed' => 'Keycloak authentication error',
        'access_denied' => 'Access denied',
    ],

    'confirm' => [
        'delete' => [
            'title' => 'Confirm deletion',
            'description' => 'This action is irreversible. Are you sure you want to delete this item?',
        ],
        'force_delete' => [
            'title' => 'Permanent deletion',
            'description' => 'This item will be permanently deleted and cannot be restored.',
        ],
        'restore' => [
            'title' => 'Confirm restoration',
            'description' => 'Are you sure you want to restore this item?',
        ],
        'status_change' => [
            'title' => 'Change status',
            'description' => 'Select the new status.',
        ],
        'delete_image' => 'Are you sure you want to delete this image? This action is irreversible.',
    ],
];