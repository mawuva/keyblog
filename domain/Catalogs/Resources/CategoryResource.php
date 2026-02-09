<?php

declare(strict_types=1);

namespace Domain\Catalogs\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'order' => $this->order,
            'icon_type' => $this->icon_type,
            'icon_value' => $this->icon_value,
            'status' => $this->whenLoaded('statuses', fn () => $this->statusToArray()),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'created_at_formatted' => $this->created_at_formatted,
        ];
    }
}
