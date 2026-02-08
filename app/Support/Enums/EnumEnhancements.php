<?php

declare(strict_types=1);

namespace App\Support\Enums;

trait EnumEnhancements
{
    /**
     * Get the names of the enum EnumEnhancements as an array.
     *
     * @return array<int, string>
     */
    public static function names(): array
    {
        return array_map(fn($case) => $case->name, self::cases());
    }

    /**
     * Get the values of the enum EnumEnhancements as an array.
     *
     * @return array<int, mixed>
     */
    public static function values(): array
    {
        return array_map(
            fn($case) => $case->value ?? $case->name, self::cases()
        );
    }

    /**
     * Get an associative array with enum EnumEnhancements as keys and names as values.
     *
     * @return array<string, string>
     */
    public static function array(): array
    {
        return array_combine(
            array_map(fn($case) => (string) ($case->value ?? $case->name), self::cases()),
            array_map(fn($case) => $case->name, self::cases())
        );
    }

    /**
     * Get an associative array with enum EnumEnhancements as keys and labels as values.
     *
     * @return array<string, string>
     */
    public static function valueLabelArray(): array
    {
        return array_combine(
            array_map(fn($case) => $case->value ?? $case->name, self::cases()),
            array_map(fn($case) => $case->label(), self::cases())
        );
    }

    /**
     * Get an associative array with enum EnumEnhancements as keys and values as values.
     *
     * @return array<string, mixed>
     */
    public static function nameValueArray(): array
    {
        return array_combine(
            array_map(fn($case) => $case->name, self::cases()),
            array_map(fn($case) => $case->value ?? $case->name, self::cases())
        );
    }

    /**
     * Check if a value exists in the enum.
     *
     * @param mixed $value
     * @return bool
     */
    public static function hasValue(mixed $value): bool
    {
        return self::fromValue($value) !== null;
    }

    /**
     * Get enum EnumEnhancements by value.
     *
     * @param mixed $value
     * @return static|null
     */
    public static function fromValue(mixed $value): ?static
    {
        foreach (self::cases() as $case) {
            if (($case->value ?? $case->name) === $value) {
                return $case;
            }
        }
        return null;
    }

    /**
     * Returns enum EnumEnhancements as a comma-separated string.
     *
     * @param string $separator
     * @return string
     */
    public static function valueList(string $separator = ', '): string
    {
        return implode($separator, self::values());
    }

    /**
     * Get the label for the enum EnumEnhancements (alias for label method).
     *
     * @return string
     */
    public function getLabel(): string
    {
        return method_exists($this, 'label') ? $this->label() : $this->name;
    }

    /**
     * Get the color class EnumEnhancements the enum EnumEnhancements (alias for color method).
     *
     * @return string
     */
    public function getColorClass(): string
    {
        if (!method_exists($this, 'color')) {
            return 'bg-gray-100 text-gray-800';
        }

        return match($this->color()) {
            'success' => 'bg-green-100 text-green-800',
            'danger' => 'bg-red-100 text-red-800',
            'warning' => 'bg-yellow-100 text-yellow-800',
            'info' => 'bg-blue-100 text-blue-800',
            'gray' => 'bg-gray-100 text-gray-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
