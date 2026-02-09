<?php

declare(strict_types=1);

namespace Domain\Shared\Status\Concerns\Models;

use Spatie\ModelStatus\HasStatuses;
use Domain\Shared\Status\Contracts\StatusEnumContract;
use Domain\Shared\Status\Exceptions\TransitionException;

trait InteractsWithStatus
{
    use HasStatuses;

    /**
     * Le model DOIT déclarer son enum
     *
     * @return class-string<StatusEnumContract>
     */
    abstract protected function statusEnum(): string;

    /**
     * Status courant sous forme d'enum
     */
    public function currentStatusEnum(): ?StatusEnumContract
    {
        $value = $this->status;

        if (! $value) {
            return null;
        }

        $enum = $this->statusEnum();

        return $enum::from($value);
    }

    /**
     * Initialisation automatique du status
     * 🔥 règle ton erreur "can not change status from '' to pending"
     */
    protected static function bootInteractsWithStatus(): void
    {
        static::creating(function ($model) {
            if (! $model->status) {
                $enum = $model->statusEnum();
                $model->setStatus($enum::initial()->value);
            }
        });
    }

    /**
     * Changement de status sécurisé
     */
    public function changeStatus(string|StatusEnumContract $to, ?string $reason = null): void
    {
        $enumClass = $this->statusEnum();
        $toEnum = is_string($to) ? $enumClass::from($to) : $to;

        $current = $this->currentStatusEnum() ?? $enumClass::initial();

        if (
            ! collect($current->allowedTransitions())
                ->contains(fn ($s) => $s->value === $toEnum->value)
        ) {
            throw TransitionException::invalidTransition(
                $current->value,
                $toEnum->value,
                collect($current->allowedTransitions())->pluck('value')->all(),
                class_basename($this)
            );
        }

        $this->setStatus($toEnum->value, $reason);
    }

    /**
     * BONUS (ton code, version propre)
     */
    public function availableStatuses(): array
    {
        $current = $this->currentStatusEnum()
            ?? ($this->statusEnum())::initial();

        return array_map(
            fn ($s) => $s->value,
            $current->allowedTransitions()
        );
    }
}
