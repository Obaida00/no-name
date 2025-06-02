<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->user->id,
            'address' => 'nullable|string',
            'gender' => 'required|in:male,female,other',
            'age' => 'required|integer|min:1',
            'password' => 'nullable|string|min:6',

        ];
    }
}
