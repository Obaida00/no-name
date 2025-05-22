<?php

namespace App\Http\Resources\Category;

use App\Http\Resources\Product\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'description' => $this->description,
            'parentCategory' => $this->parent_category,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'subcategoriesCount' => $this->subcategories()->count(),
        ];

        if ($this->relationLoaded('subcategories')) {
            $data['subcategories'] = CategoryResource::collection($this->subcategories);
        }

        if ($this->relationLoaded('products')) {
            $data['products'] = ProductResource::collection($this->products);
        }

        if ($this->relationLoaded('parentCategory')) {
            $data['parentCategoryDetails'] = new CategoryResource($this->parentCategory);
        }

        return $data;
    }
}
