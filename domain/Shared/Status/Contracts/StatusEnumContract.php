<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Contracts;

interface StatusEnumContract extends \BackedEnum
{
    /**
     * Statut initial obligatoire
     */
    public static function initial(): self;

    /**
     * @return self[]
     */
    public function allowedTransitions(): array;

    public function label(): string;

    public function color(): string;
}
