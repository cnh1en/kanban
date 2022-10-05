<?php

namespace App\Http\Resources;

use App\Models\Section;
use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
{


    /**
     * Transform the resource into an array.
     * @param $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'icon' => $this->icon,
            'title' => $this->title,
            'description' => $this->description,
            'position' => $this->position,
            'favourite' => $this->favourite,
            'favouritePosition' => $this->favourite_position,
            'sections' => SectionResource::collection($this->whenLoaded('sections')),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks'))
        ];
    }
}
