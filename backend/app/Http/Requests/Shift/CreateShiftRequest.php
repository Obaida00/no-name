<?php

namespace App\Http\Requests\Shift;

use Illuminate\Foundation\Http\FormRequest;

class CreateShiftRequest extends FormRequest
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
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'daysOfWeek' => 'required|array|min:1',
            'daysOfWeek.*' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        return [
            'start' => $validated['start'],
            'end' => $validated['end'],
            'days_of_week' => $validated['daysOfWeek'],
        ];
    }
}
