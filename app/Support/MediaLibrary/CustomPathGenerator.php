<?php

declare(strict_types=1);

namespace App\Support\MediaLibrary;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGeneratorFactory;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class CustomPathGenerator extends PathGeneratorFactory implements PathGenerator
{
    /**
     * @param Media $media
     * @return string
     */
    public function getPath(Media $media): string
    {
        return $this->generateSecurePath($media) . '/';
    }

    /**
     * @param Media $media
     * @return string
     */
    public function getPathForConversions(Media $media): string
    {
        return $this->generateSecurePath($media) . '/conversions/';
    }

    /**
     * @param Media $media
     * @return string
     */
    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->generateSecurePath($media) . '/responsive-images/';
    }

    /**
     * Generate a secure, hashed path for media files.
     * 
     * @param Media $media
     * @return string
     */
    private function generateSecurePath(Media $media): string
    {
        $config = config('media-library.path_generator_config');
        $security = config('media-library.security');
        
        // Get secret key from config
        $secretKey = $config['secret_key'];
        $hashAlgorithm = $config['hash_algorithm'];
        $pathLength = $config['path_length'];
        $useNestedStructure = $config['use_nested_structure'];
        $modelMapping = $config['model_mapping'];
        
        // Create unique identifier
        $uniqueId = $this->createUniqueIdentifier($media, $modelMapping);
        
        // Generate secure hash
        $hash = hash($hashAlgorithm, $uniqueId . $secretKey);
        
        // Create path structure
        if ($useNestedStructure) {
            return $this->createNestedPath($hash, $pathLength, $modelMapping, $media);
        }
        
        return $this->createFlatPath($hash, $pathLength);
    }

    /**
     * Create a unique identifier for the media file.
     * 
     * @param Media $media
     * @param array $modelMapping
     * @return string
     */
    private function createUniqueIdentifier(Media $media, array $modelMapping): string
    {
        $modelCode = $modelMapping[$media->model_type] ?? 'x';
        return $modelCode . '|' . $media->model_id . '|' . $media->id . '|' . $media->collection_name;
    }

    /**
     * Create a nested directory structure for better organization.
     * 
     * @param string $hash
     * @param int $pathLength
     * @param array $modelMapping
     * @param Media $media
     * @return string
     */
    private function createNestedPath(string $hash, int $pathLength, array $modelMapping, Media $media): string
    {
        $modelCode = $modelMapping[$media->model_type] ?? 'x';
        $shortHash = substr($hash, 0, $pathLength);
        
        // Create nested structure: media/model/level1/level2/level3
        $level1 = substr($shortHash, 0, 2);
        $level2 = substr($shortHash, 2, 2);
        $level3 = substr($shortHash, 4, 4);
        
        return "media/{$modelCode}/{$level1}/{$level2}/{$level3}";
    }

    /**
     * Create a flat directory structure.
     * 
     * @param string $hash
     * @param int $pathLength
     * @return string
     */
    private function createFlatPath(string $hash, int $pathLength): string
    {
        $shortHash = substr($hash, 0, $pathLength);
        return "media/{$shortHash}";
    }

    /**
     * Validate file extension for security.
     * 
     * @param string $filename
     * @return bool
     */
    private function isValidFileExtension(string $filename): bool
    {
        $forbiddenExtensions = config('media-library.security.forbidden_extensions', []);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        
        return !in_array($extension, $forbiddenExtensions);
    }
}
