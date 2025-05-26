<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    public function getAllCategories(int $page = 1, int $perPage = 15, array $filters = [])
    {
        $query = Category::query();

        if (isset($filters['search']) && !empty($filters['search'])) {
            $query->where('name', 'like', "%{$filters['search']}%")
                ->orWhere('description', 'like', "%{$filters['search']}%");
        }

        if (isset($filters['parent_category'])) {
            $query->where('parent_category', $filters['parent_category']);
        }

        if (isset($filters['root_only']) && $filters['root_only']) {
            $query->whereNull('parent_category');
        }

        return $query->paginate(perPage: $perPage, page: $page);
    }

    public function getCategoryById(string $id)
    {
        return Category::find($id);
    }

    public function createCategory(array $data)
    {
        return Category::create($data);
    }

    public function updateCategory(string $id, array $data)
    {
        $category = $this->getCategoryById($id);

        if (!$category) {
            return null;
        }

        $category->update($data);
        return $category;
    }

    public function deleteCategory(string $id)
    {
        $category = $this->getCategoryById($id);

        if (!$category) {
            return false;
        }

        return $category->delete();
    }

    public function getCategoryWithSubcategories(string $id)
    {
        return Category::with('subcategories')->find($id);
    }

    public function getCategoryWithProducts(string $id)
    {
        return Category::with('products')->find($id);
    }


    public function getCategoryHierarchy(?string $parentId = null)
    {
        $query = Category::query();

        if ($parentId) {
            $query->where('parent_category', $parentId);
        } else {
            $query->whereNull('parent_category');
        }

        $categories = $query->get();

        foreach ($categories as $category) {
            $category->subcategories = $this->getCategoryHierarchy($category->id);
        }

        return $categories;
    }
}
