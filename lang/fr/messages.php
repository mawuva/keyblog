<?php

declare(strict_types=1);

return [
    'greeting' => 'Hello!',
    'welcome' => 'Bienvenue, :name !',
    
    'data' => [
        'created' => 'Donnée(s) créée(s) avec succès.',
        'saved' => 'Donnée(s) enregistrée(s) avec succès.',
        'updated' => 'Donnée(s) mise(s) à jour avec succès.',
        'edited' => 'Donnée(s) modifiée(s) avec succès.',
        'changed' => 'Donnée(s) changée(s) avec succès.',
        'deleted' => 'Donnée(s) supprimée(s) avec succès.',
        'destroyed' => 'Donnée(s) supprimée(s) avec succès.',
        'restored' => 'Donnée(s) restaurée(s) avec succès.',
        'deleted_permanently' => 'Donnée(s) supprimée(s) définitivement avec succès.',
        'removed' => 'Donnée(s) supprimée(s) définitivement avec succès.',
        'uploaded' => 'Fichier(s) téléchargé(s) avec succès.',
    ],

    // Authentication messages
    'auth' => [
        'required' => 'Vous devez être connecté pour effectuer cette action.',
        'welcome' => 'Bienvenue !',
        'welcome_admin' => 'Bienvenue admin !',
        'logout' => 'Déconnecté',
        'login_required' => 'Vous devez être connecté pour accéder à cette page.',
    ],

    'errors' => [
        'general' => 'Une erreur est survenue.',
        'not_found' => 'La ressource demandée n\'a pas été trouvée.',
        'not_authorized' => 'Vous n\'êtes pas autorisé à accéder à cette ressource.',
        'not_authenticated' => 'Vous n\'êtes pas authentifié.',
        'not_verified' => 'Votre email n\'a pas été vérifié.',
        'not_confirmed' => 'Votre compte n\'a pas été confirmé.',
        'not_active' => 'Votre compte n\'est pas actif.',
        'not_valid' => 'La ressource demandée n\'est pas valide.',
        'not_valid_format' => 'Le format de la ressource demandée n\'est pas valide.',
        'no_files_selected' => 'Aucun fichier n\'a été sélectionné.',
        'auth_failed' => 'Erreur d\'authentification Keycloak',
        'access_denied' => 'Accès non autorisé',
    ],

    'confirm' => [
        'delete' => [
            'title' => 'Confirmer la suppression',
            'description' => 'Cette action est irréversible. Voulez-vous vraiment supprimer cet élément ?',
        ],
        'force_delete' => [
            'title' => 'Suppression définitive',
            'description' => 'Cet élément sera supprimé définitivement et ne pourra plus être restauré.',
        ],
        'restore' => [
            'title' => 'Confirmer la restauration',
            'description' => 'Voulez-vous vraiment restaurer cet élément ?',
        ],
        'status_change' => [
            'title' => 'Changer le statut',
            'description' => 'Sélectionnez le nouveau statut.',
        ],
        'delete_image' => 'Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.',
    ],
];