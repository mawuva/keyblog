<?php

declare(strict_types=1);

return [
    'role' => [
        'title' => 'Rôles',
        'description' => 'Gérer les rôles de l\'application et leurs permissions.',

        'columns' => [
            'name' => 'Nom',
            'permissions_count' => 'Permissions',
            'created_at' => 'Créé le',
        ],

        'create' => [
            'title' => 'Ajouter un rôle',
            'breadcrumb' => 'Ajouter',
            'submit' => 'Créer le rôle',
        ],

        'edit' => [
            'title' => 'Modifier le rôle',
            'breadcrumb' => 'Modifier',
            'submit' => 'Mettre à jour',
        ],

        'fields' => [
            'name' => 'Nom',
            'permissions' => 'Permissions',
        ],

        'permissions_section' => [
            'title' => 'Permissions',
            'description' => 'Sélectionnez les permissions pour ce rôle.',
            'select_all' => 'Tout sélectionner',
            'deselect_all' => 'Tout désélectionner',
            'selected' => ':count sélectionnée(s)',
        ],
    ],

    'permission' => [
        'title' => 'Permissions',
        'description' => 'Liste de toutes les permissions disponibles dans l\'application.',

        'columns' => [
            'name' => 'Nom',
            'created_at' => 'Créé le',
        ],
    ],
];
