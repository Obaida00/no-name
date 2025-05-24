<?php

namespace App\Http\Requests\Shift;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShiftRequest extends FormRequest
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
            'start' => 'sometimes|required|date_format:H:i',
            'end' => 'sometimes|required|date_format:H:i|after:start',
            'daysOfWeek' => 'sometimes|required|array|min:1',
            'daysOfWeek.*' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        $data = [];
        foreach ($validated as $key => $value) {
            $dbKey = $key === 'daysOfWeek' ? 'days_of_week' : $key;
            $data[$dbKey] = $value;
        }

        return $data;
    }
}
