<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'address'  => 'nullable|string',
            'gender'   => 'nullable|in:male,female,other',
            'age'      => 'nullable|integer|min:0',
            'password' => 'required|string|min:6|confirmed',
        ];
    }
}
