<?php

declare(strict_types=1);

namespace Domain\Shared\Status;

use Domain\Shared\Status\Enums\StatusColor;

final class StatusPresentation
{
    /**
     * Get the default color for a status value.
     */
    public static function getColor(string $statusValue): StatusColor
    {
        return match ($statusValue) {
            'active' => StatusColor::SUCCESS,
            'inactive' => StatusColor::SECONDARY,
            'suspended' => StatusColor::WARNING,
            'draft' => StatusColor::INFO,
            'published' => StatusColor::SUCCESS,
            'pending' => StatusColor::WARNING,
            'confirmed' => StatusColor::SUCCESS,
            'approved' => StatusColor::SUCCESS,
            'in_progress' => StatusColor::INFO,
            'negotiating' => StatusColor::INFO,
            'cancelled' => StatusColor::DANGER,
            'completed' => StatusColor::SUCCESS,
            'refused' => StatusColor::DANGER,
            'sent' => StatusColor::INFO,
            'accepted' => StatusColor::SUCCESS,
            'rejected' => StatusColor::DANGER,
            'expired' => StatusColor::GRAY,
            'archived' => StatusColor::GRAY,
            'deleted' => StatusColor::DANGER,
            'locked' => StatusColor::WARNING,
            'under_review' => StatusColor::INFO,
            'premium' => StatusColor::PURPLE,
            'system' => StatusColor::INDIGO,
            'promotional' => StatusColor::PINK,
            default => StatusColor::GRAY,
        };
    }

    /**
     * Get the Tailwind CSS color classes for a status value.
     */
    public static function getColorClasses(string $statusValue, string $variant = 'solid'): string
    {
        $color = self::getColor($statusValue);
        return $color->getClasses($variant);
    }

    /**
     * Get the Tailwind CSS color classes for a color value.
     */
    public static function getColorClassesFromColor(StatusColor $color, string $variant = 'solid'): string
    {
        return $color->getClasses($variant);
    }

    /**
     * Check if a color is valid.
     */
    public static function isValidColor(string $color): bool
    {
        return in_array($color, StatusColor::getAll(), true);
    }

    /**
     * Check if a status value is valid.
     */
    public static function isValidStatus(string $statusValue): bool
    {
        $validStatuses = [
            'active', 'inactive', 'suspended', 'draft', 'published',
            'pending', 'confirmed', 'approved', 'in_progress', 'negotiating',
            'cancelled', 'completed', 'refused', 'sent', 'accepted', 'rejected',
            'expired', 'archived', 'deleted', 'locked', 'under_review',
            'premium', 'system', 'promotional'
        ];
        
        return in_array($statusValue, $validStatuses, true);
    }

    /**
     * Get all available status values.
     */
    public static function getAllStatuses(): array
    {
        return [
            'active', 'inactive', 'suspended', 'draft', 'published',
            'pending', 'confirmed', 'approved', 'in_progress', 'negotiating',
            'cancelled', 'completed', 'refused', 'sent', 'accepted', 'rejected',
            'expired', 'archived', 'deleted', 'locked', 'under_review',
            'premium', 'system', 'promotional'
        ];
    }

    /**
     * Get color classes with custom theme support.
     */
    public static function getThemedColorClasses(string $statusValue, array $theme = [], string $variant = 'solid'): string
    {
        $color = self::getColor($statusValue);
        
        // If custom theme is provided, use it; otherwise use default classes
        if (isset($theme[$color->value][$variant])) {
            return $theme[$color->value][$variant];
        }
        
        return $color->getClasses($variant);
    }
}
