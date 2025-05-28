<?php

namespace App\Http\Requests\Contract;

use Illuminate\Foundation\Http\FormRequest;

class CreateContractRequest extends FormRequest
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
            'userId' => 'required|uuid|exists:users,id',
            'startDate' => 'required|date_format:Y-m-d|after_or_equal:today',
            'endDate' => 'required|date_format:Y-m-d|after:startDate',
            'monthlySalary' => 'required|integer|min:1',
            'shiftId' => 'required|uuid|exists:shifts,id',
            // 'pharmacyId' => 'nullable|uuid',
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        return [
            'user_id' => $validated['userId'],
            'start_date' => $validated['startDate'],
            'end_date' => $validated['endDate'],
            'monthly_salary' => $validated['monthlySalary'],
            'shift_id' => $validated['shiftId'],
            'pharmacy_id' => $validated['pharmacyId'] ?? null,
        ];
    }
}
