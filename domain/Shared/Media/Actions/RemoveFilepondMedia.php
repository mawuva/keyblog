<?php

declare(strict_types=1);

namespace Domain\Shared\Media\Actions;

use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class RemoveFilepondMedia
{
    /**
     * Supprime des médias de Spatie Media Library.
     *
     * @param  HasMedia  $model  Le modèle qui implémente HasMedia
     * @param  array<string|int>  $mediaIds  Le tableau d'IDs de média à supprimer
     * @param  string  $mediaCollection  Le nom de la collection de média
     * @return void
     */
    public static function execute(
        HasMedia $model,
        array $mediaIds,
        string $mediaCollection
    ): void {
        if (empty($mediaIds) || ! is_array($mediaIds)) {
            return;
        }

        Log::info('Suppression de médias:', [
            'ids' => $mediaIds,
            'count' => count($mediaIds),
            'collection' => $mediaCollection,
        ]);

        $model
            ->getMedia($mediaCollection)
            ->whereIn('id', $mediaIds)
            ->each(function (Media $media) {
                try {
                    Log::info("Suppression du média:", [
                        'id' => $media->id,
                        'name' => $media->name,
                        'file_name' => $media->file_name,
                    ]);

                    $media->delete();

                    Log::info("Média supprimé avec succès");
                } catch (\Exception $e) {
                    Log::error("Erreur lors de la suppression du média:", [
                        'error' => $e->getMessage(),
                        'media_id' => $media->id,
                        'trace' => $e->getTraceAsString(),
                    ]);
                }
            });
    }
}
