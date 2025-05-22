<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Category\CategoryCollection;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 15);
        $filters = [
            'search' => $request->query('search'),
            'parent_category' => $request->query('parentCategory'),
            'root_only' => $request->query('rootOnly', false)
        ];

        $categories = $this->categoryService->getAllCategories($page, $perPage, $filters);

        return (new CategoryCollection($categories))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function show(string $id)
    {
        $category = $this->categoryService->getCategoryById($id);

        if (!$category) {
            return response()->json([
                'message' => 'category not found'
            ], 404);
        }

        return new CategoryResource($category);
    }

    public function store(CreateCategoryRequest $request)
    {
        $data = $request->validatedData();
        $category = $this->categoryService->createCategory($data);

        return (new CategoryResource($category))
            ->additional([
                'message' => 'category created successfully'
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateCategoryRequest $request, string $id)
    {
        $data = $request->validatedData();

        $category = $this->categoryService->updateCategory($id, $data);

        if (!$category) {
            return response()->json([
                'message' => 'category not found'
            ], 404);
        }

        return (new CategoryResource($category))
            ->additional([
                'message' => 'category updated successfully'
            ]);
    }

    public function destroy(string $id)
    {
        $result = $this->categoryService->deleteCategory($id);

        if (!$result) {
            return response()->json([
                'message' => 'category not found'
            ], 404);
        }

        return response()->json(null, 204);
    }

    public function getWithSubcategories(string $id)
    {
        $category = $this->categoryService->getCategoryWithSubcategories($id);

        if (!$category) {
            return response()->json([
                'message' => 'category not found'
            ], 404);
        }

        return new CategoryResource($category);
    }

    public function getWithProducts(string $id)
    {
        $category = $this->categoryService->getCategoryWithProducts($id);

        if (!$category) {
            return response()->json([
                'message' => 'category not found'
            ], 404);
        }

        return new CategoryResource($category);
    }

    public function hierarchy()
    {
        $hierarchy = $this->categoryService->getCategoryHierarchy();

        $transformedHierarchy = $this->transformHierarchy($hierarchy);

        return response()->json([
            'data' => [
                'hierarchy' => $transformedHierarchy
            ]
        ]);
    }

    private function transformHierarchy($categories)
    {
        return $categories->map(function ($category) {
            $resourceData = (new CategoryResource($category))->toArray(request());

            if (isset($category->subcategories) && $category->subcategories->count() > 0) {
                $resourceData['subcategories'] = $this->transformHierarchy($category->subcategories);
            }

            return $resourceData;
        })->all();
    }
}
