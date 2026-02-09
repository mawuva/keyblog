<?php

declare(strict_types=1);

return [
    'title' => 'Catégories',
    'description' => 'Gérez les catégories de votre catalogue.',

    'columns' => [
        'name' => 'Nom',
        'slug' => 'Slug',
        'order' => 'Ordre',
        'status' => 'Statut',
        'created_at' => 'Créé le',
    ],

    'filters' => [
        'search' => 'Rechercher par nom...',
        'all_statuses' => 'Tous les statuts',
    ],

    'actions' => [
        'add' => 'Ajouter une catégorie',
        'edit' => 'Modifier',
        'delete' => 'Supprimer',
    ],

    'create' => [
        'title' => 'Ajouter une catégorie',
        'breadcrumb' => 'Ajouter',
        'submit' => 'Créer la catégorie',
    ],

    'edit' => [
        'title' => 'Modifier la catégorie',
        'submit' => 'Mettre à jour',
    ],

    'delete' => [
        'title' => 'Confirmer la suppression',
        'description' => 'Cette action est irréversible. Voulez-vous vraiment supprimer cette catégorie ?',
        'cancel' => 'Annuler',
        'confirm' => 'Supprimer',
    ],

    'fields' => [
        'name' => 'Nom',
        'description' => 'Description',
        'order' => 'Ordre',
        'icon_type' => 'Type d\'icône',
        'icon_value' => 'Valeur de l\'icône',
    ],

    'empty' => 'Aucune catégorie trouvée.',
];
