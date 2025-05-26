<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Category\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'activeIngredient' => $this->active_ingredient,
            'description' => $this->description,
            'shape' => $this->shape,
            'expDate' => $this->exp_date,
            'categoryId' => $this->category_id,
            'quantity' => $this->quantity,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];

        if ($this->relationLoaded('category')) {
            $data['category'] = new CategoryResource($this->category);
        }

        return $data;
    }
}
