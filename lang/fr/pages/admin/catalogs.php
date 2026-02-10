<?php

declare(strict_types=1);

return [
    'category' => [
        'title' => 'Catégories',
        'description' => 'Gérez les catégories de votre catalogue.',

        'columns' => [
            'name' => 'Nom',
            'slug' => 'Slug',
            'order' => 'Ordre',
            'status' => 'Statut',
            'created_at' => 'Créé le',
        ],

        'create' => [
            'title' => 'Ajouter une catégorie',
            'description' => 'Remplissez les informations de la nouvelle catégorie.',
            'breadcrumb' => 'Ajouter',
            'submit' => 'Créer la catégorie',
        ],

        'edit' => [
            'title' => 'Modifier la catégorie',
            'description' => 'Modifiez les informations de la catégorie.',
            'submit' => 'Mettre à jour',
        ],
    ],
];
