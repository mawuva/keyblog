<?php

declare(strict_types=1);

return [
    'title' => 'Permissions',
    'description' => 'Liste de toutes les permissions disponibles dans l\'application.',

    'columns' => [
        'name' => 'Nom',
        'created_at' => 'Créé le',
    ],

    'filters' => [
        'search' => 'Rechercher par nom...',
    ],

    'empty' => 'Aucune permission trouvée.',
];
