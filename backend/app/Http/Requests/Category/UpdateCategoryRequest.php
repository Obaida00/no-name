<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'parentCategory' => 'nullable|uuid|exists:categories,id',
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        $data = [];
        foreach ($validated as $key => $value) {
            $dbKey = $key === 'parentCategory' ? 'parent_category' : $key;
            $data[$dbKey] = $value;
        }

        return $data;
    }
}
