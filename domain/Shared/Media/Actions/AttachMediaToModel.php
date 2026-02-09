<?php

declare(strict_types=1);

namespace Domain\Shared\Media\Actions;

use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AttachMediaToModel
{
    /**
     * Attach temporary uploaded files to a model
     *
     * @param  HasMedia  $model  The model that implements HasMedia
     * @param  array<string>  $fileIds  Array of temporary file IDs
     * @param  string  $collectionName  The media collection name
     * @return array<Media> Array of attached media
     */
    public static function execute(
        HasMedia $model,
        array $fileIds,
        string $collectionName
    ): array {
        $attachedMedia = [];

        foreach ($fileIds as $fileId) {
            $tempPath = 'temp/'.$fileId;

            if (! Storage::disk('public')->exists($tempPath)) {
                continue;
            }

            $fullPath = Storage::disk('public')->path($tempPath);

            $media = $model
                ->addMedia($fullPath)
                ->toMediaCollection($collectionName);

            // Supprimer le fichier temporaire après l'attachement
            Storage::disk('public')->delete($tempPath);

            $attachedMedia[] = $media;
        }

        return $attachedMedia;
    }

    /**
     * Remove media from a model
     *
     * @param  HasMedia  $model  The model that implements HasMedia
     * @param  array<string|int>  $mediaIds  Array of media IDs to remove
     * @param  string  $collectionName  The media collection name
     */
    public static function remove(
        HasMedia $model,
        array $mediaIds,
        string $collectionName
    ): void {
        $model
            ->getMedia($collectionName)
            ->whereIn('id', $mediaIds)
            ->each(fn (Media $media) => $media->delete());
    }
}
