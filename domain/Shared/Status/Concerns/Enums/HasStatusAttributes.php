<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Concerns\Enums;

use Domain\Shared\Status\StatusPresentation;

trait HasStatusAttributes
{
    /**
     * Get the label for the status from translations.
     * Uses the translation key: common.status.{value}
     */
    public function label(): string
    {
        return __('common.status.'.$this->value);
    }

    /**
     * Get the color for the status.
     * Returns one of: 'success', 'danger', 'warning', 'info', 'gray', 'secondary'
     * Uses StatusPresentation::getColor() for default mapping.
     * Can be overridden in the enum to provide custom colors.
     */
    public function color(): string
    {
        return StatusPresentation::getColor($this->value)->value;
    }

    /**
     * Get the color classes for Tailwind CSS with dark mode support.
     * Returns classes based on the color() method.
     * Uses StatusPresentation::getColorClasses() for the mapping.
     */
    public function colorClass(): string
    {
        return StatusPresentation::getColorClasses($this->color());
    }

    /**
     * Métier
     */
    public function canTransitionTo(self $to): bool
    {
        return collect($this->allowedTransitions())
            ->contains(fn (self $s) => $s->value === $to->value);
    }

    /**
     * Helpers
     */
    public function allowedTransitionValues(): array
    {
        return array_map(
            fn (self $s) => $s->value,
            $this->allowedTransitions()
        );
    }

    public static function values(): array
    {
        return array_map(
            fn (self $case) => $case->value,
            self::cases()
        );
    }

    /**
     * Get all enum cases as an array with value, label, and color.
     *
     * @return array<int, array{value: string, label: string, color: string}>
     */
    public static function toArray(): array
    {
        $result = [];

        foreach (static::cases() as $case) {
            $result[] = [
                'value' => $case->value,
                'label' => $case->label(),
                'color' => $case->color(),
            ];
        }

        return $result;
    }
}
