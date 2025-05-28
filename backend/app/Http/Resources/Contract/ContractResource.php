<?php

namespace App\Http\Resources\Contract;

use App\Http\Resources\UserResource;
use App\Http\Resources\Shift\ShiftResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
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
            'userId' => $this->user_id,
            'startDate' => date_format($this->start_date, "Y-m-d"),
            'endDate' => date_format($this->end_date, "Y-m-d"),
            'monthlySalary' => $this->monthly_salary,
            'shiftId' => $this->shift_id,
            'pharmacyId' => $this->pharmacy_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'isActive' => $this->isActive(),
            'isExpired' => $this->isExpired(),
            'isFuture' => $this->isFuture(),
            'durationInDays' => $this->getDurationInDays(),
            'durationInMonths' => $this->getDurationInMonths(),
            'remainingDays' => $this->getRemainingDays(),
        ];

        if ($this->relationLoaded('user')) {
            $data['user'] = new UserResource($this->user);
        }

        if ($this->relationLoaded('shift')) {
            $data['shift'] = new ShiftResource($this->shift);
        }

        // if ($this->relationLoaded('pharmacy')) {
        //     $data['pharmacy'] = new PharmacyResource($this->pharmacy);
        // }

        return $data;
    }
}
