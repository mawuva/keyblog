<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Enums;

enum StatusColor: string
{
    case SUCCESS = 'success';
    case DANGER = 'danger';
    case WARNING = 'warning';
    case INFO = 'info';
    case GRAY = 'gray';
    case SECONDARY = 'secondary';
    case PURPLE = 'purple';
    case INDIGO = 'indigo';
    case PINK = 'pink';

    /**
     * Get the Tailwind CSS color classes for this color.
     */
    public function getClasses(string $variant = 'solid'): string
    {
        return match ($this) {
            self::SUCCESS => $this->getGreenClasses($variant),
            self::DANGER => $this->getRedClasses($variant),
            self::WARNING => $this->getYellowClasses($variant),
            self::INFO => $this->getBlueClasses($variant),
            self::GRAY, self::SECONDARY => $this->getGrayClasses($variant),
            self::PURPLE => $this->getPurpleClasses($variant),
            self::INDIGO => $this->getIndigoClasses($variant),
            self::PINK => $this->getPinkClasses($variant),
        };
    }

    private function getGreenClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'outline' => 'border border-green-200 text-green-800 dark:border-green-700 dark:text-green-200',
            'ghost' => 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20',
            default => 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        };
    }

    private function getRedClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'outline' => 'border border-red-200 text-red-800 dark:border-red-700 dark:text-red-200',
            'ghost' => 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
            default => 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
    }

    private function getYellowClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'outline' => 'border border-yellow-200 text-yellow-800 dark:border-yellow-700 dark:text-yellow-200',
            'ghost' => 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
            default => 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        };
    }

    private function getBlueClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'outline' => 'border border-blue-200 text-blue-800 dark:border-blue-700 dark:text-blue-200',
            'ghost' => 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
            default => 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        };
    }

    private function getGrayClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
            'outline' => 'border border-gray-200 text-gray-800 dark:border-gray-600 dark:text-gray-200',
            'ghost' => 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/20',
            default => 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        };
    }

    private function getPurpleClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'outline' => 'border border-purple-200 text-purple-800 dark:border-purple-700 dark:text-purple-200',
            'ghost' => 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20',
            default => 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        };
    }

    private function getIndigoClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
            'outline' => 'border border-indigo-200 text-indigo-800 dark:border-indigo-700 dark:text-indigo-200',
            'ghost' => 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
            default => 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
        };
    }

    private function getPinkClasses(string $variant): string
    {
        return match ($variant) {
            'solid' => 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
            'outline' => 'border border-pink-200 text-pink-800 dark:border-pink-700 dark:text-pink-200',
            'ghost' => 'text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20',
            default => 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        };
    }

    /**
     * Get all available colors.
     */
    public static function getAll(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
