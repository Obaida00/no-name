<?php

namespace App\Http\Requests;

use App\Models\Pharmacy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePharmacyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $pharmacyId = $this->route('id');

        $pharmacy = Pharmacy::find($pharmacyId);

        return $pharmacy && $pharmacy->owner_user_id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'owner_user_id' => 'sometimes|exists:users,id',
        ];
    }
    public function validatedData(): array
    {
        return $this->validated();
    }
}
