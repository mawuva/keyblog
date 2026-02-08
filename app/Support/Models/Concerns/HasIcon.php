<?php

declare(strict_types=1);

namespace App\Support\Models\Concerns;

use App\Support\Enums\IconType;
use App\Support\Helpers\IconRenderer;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasIcon
{
    /**
     * Get the icon type as an enum
     */
    protected function iconType(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? IconType::tryFrom($value) : null,
            set: fn (?IconType $value) => $value?->value,
        );
    }

    /**
     * Get the rendered icon HTML
     */
    public function getIconHtmlAttribute(): ?string
    {
        if (! $this->icon_type || ! $this->icon_value) {
            return null;
        }

        return IconRenderer::render($this->icon_type, $this->icon_value);
    }

    /**
     * Check if the model has an icon
     */
    public function hasIcon(): bool
    {
        return ! empty($this->icon_type) && ! empty($this->icon_value);
    }

    /**
     * Get the icon type enum
     */
    public function getIconTypeEnum(): ?IconType
    {
        return $this->icon_type;
    }
}
