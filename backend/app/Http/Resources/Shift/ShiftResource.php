<?php

namespace App\Http\Resources\Shift;

use App\Http\Resources\Contract\ContractResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'start' => $this->start,
            'end' => $this->end,
            'daysOfWeek' => $this->days_of_week,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'contractsCount' => $this->contracts()->count(),
        ];

        if ($this->relationLoaded('contracts')) {
            $data['contracts'] = ContractResource::collection($this->contracts);
        }

        return $data;
    }
}
