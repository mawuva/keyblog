<?php

declare(strict_types=1);

namespace Domain\Shared\Media\Actions;

use Illuminate\Support\Facades\Log;
use RahulHaque\Filepond\Facades\Filepond;
use Spatie\MediaLibrary\HasMedia;

class AttachFilepondMedia
{
    /**
     * Traite les fichiers FilePond et les ajoute à Spatie Media Library.
     *
     * @param  HasMedia  $model  Le modèle qui implémente HasMedia
     * @param  array<string>|null  $filepondIds  Le tableau d'IDs FilePond
     * @param  string  $mediaCollection  Le nom de la collection de média
     * @return void
     */
    public static function execute(
        HasMedia $model,
        ?array $filepondIds,
        string $mediaCollection
    ): void {
        if (empty($filepondIds) || ! is_array($filepondIds)) {
            return;
        }

        Log::info('Fichiers FilePond reçus:', [
            'ids' => $filepondIds,
            'count' => count($filepondIds),
            'collection' => $mediaCollection,
        ]);

        // Récupérer les fichiers temporaires directement sans les déplacer
        // Spatie Media Library gérera le stockage via CustomPathGenerator
        foreach ($filepondIds as $index => $fileId) {
            try {
                $file = Filepond::field($fileId)->getFile();

                if (! $file || ! $file->isValid()) {
                    Log::warning("Fichier FilePond invalide ou introuvable:", [
                        'fileId' => $fileId,
                        'index' => $index,
                    ]);
                    continue;
                }

                Log::info("Traitement du fichier {$index}:", [
                    'fileId' => $fileId,
                    'filename' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                ]);

                // Spatie Media Library va copier le fichier vers son propre système de stockage
                // via CustomPathGenerator, sans créer de dossier intermédiaire
                $model->addMedia($file->getRealPath())
                    ->usingName($file->getClientOriginalName())
                    ->usingFileName($file->hashName())
                    ->toMediaCollection($mediaCollection);

                Log::info("Fichier {$index} ajouté avec succès à Media Library");
            } catch (\Exception $e) {
                Log::error("Erreur lors de l'ajout du fichier {$index} à Media Library:", [
                    'error' => $e->getMessage(),
                    'fileId' => $fileId,
                    'trace' => $e->getTraceAsString(),
                ]);
            }
        }
    }
}
