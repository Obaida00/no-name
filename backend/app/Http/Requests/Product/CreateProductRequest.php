<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'activeIngredient' => 'required|string|max:255',
            'description' => 'nullable|string',
            'shape' => 'required|string|max:255',
            'expDate' => 'required|date|after:today',
            'categoryId' => 'required|uuid|exists:categories,id',
            'quantity' => 'sometimes|integer|min:0'
        ];
    }

    public function validatedData(): array
    {
        $validated = $this->validated();

        $data = [];
        foreach ($validated as $key => $value) {
            switch ($key) {
                case 'activeIngredient':
                    $data['active_ingredient'] = $value;
                    break;
                case 'expDate':
                    $data['exp_date'] = $value;
                    break;
                case 'categoryId':
                    $data['category_id'] = $value;
                    break;
                default:
                    $data[$key] = $value;
                    break;
            }
        }

        return $data;
    }
}
