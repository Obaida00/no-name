<?php

namespace App\Http\Requests\Contract;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContractRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => 'sometimes|required|uuid|exists:users,id',
            'startDate' => 'sometimes|required|date_format:Y-m-d|after_or_equal:today',
            'endDate' => 'sometimes|required|date_format:Y-m-d|after:startDate',
            'monthlySalary' => 'sometimes|required|integer|min:1',
            'shiftId' => 'sometimes|required|uuid|exists:shifts,id',
            // 'pharmacyId' => 'nullable|uuid',
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        $data = [];
        foreach ($validated as $key => $value) {
            $dbKey = match ($key) {
                'userId' => 'user_id',
                'startDate' => 'start_date',
                'endDate' => 'end_date',
                'monthlySalary' => 'monthly_salary',
                'shiftId' => 'shift_id',
                'pharmacyId' => 'pharmacy_id',
                default => $key
            };
            $data[$dbKey] = $value;
        }

        return $data;
    }
}
