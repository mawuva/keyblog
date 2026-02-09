<?php

declare(strict_types=1);

return [
    'title' => 'Rôles',
    'description' => 'Gérer les rôles de l\'application et leurs permissions.',

    'columns' => [
        'name' => 'Nom',
        'permissions_count' => 'Permissions',
        'created_at' => 'Créé le',
    ],

    'filters' => [
        'search' => 'Rechercher par nom...',
    ],

    'actions' => [
        'add' => 'Ajouter un rôle',
        'edit' => 'Modifier',
        'delete' => 'Supprimer',
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

    'delete' => [
        'title' => 'Confirmer la suppression',
        'description' => 'Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce rôle ? Les utilisateurs assignés à ce rôle perdront leurs permissions.',
        'cancel' => 'Annuler',
        'confirm' => 'Supprimer',
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

    'empty' => 'Aucun rôle trouvé.',
];
