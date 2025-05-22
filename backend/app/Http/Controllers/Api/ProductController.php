<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Http\Requests\Product\UpdateStocksRequest;
use App\Http\Resources\Product\ProductResource;
use App\Http\Resources\Product\ProductCollection;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 15);
        $filters = [
            'search' => $request->query('search'),
            'category_id' => $request->query('categoryId'),
            'expiration_status' => $request->query('expirationStatus'),
            'months' => $request->query('months', 3),
            'sort_by_expiration' => $request->query('sortByExpiration', false)
        ];

        $products = $this->productService->getAllProducts($page, $perPage, $filters);

        return (new ProductCollection($products))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function show(string $id)
    {
        $product = $this->productService->getProductById($id);

        if (!$product) {
            return response()->json([
                'message' => 'product not found'
            ], 404);
        }

        return new ProductResource($product);
    }

    public function store(CreateProductRequest $request)
    {
        $data = $request->validatedData();
        $product = $this->productService->createProduct($data);

        return (new ProductResource($product))
            ->additional([
                'message' => 'product created successfully'
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateProductRequest $request, string $id)
    {
        $data = $request->validatedData();

        $product = $this->productService->updateProduct($id, $data);

        if (!$product) {
            return response()->json([
                'message' => 'product not found'
            ], 404);
        }

        return (new ProductResource($product))
            ->additional([
                'message' => 'product updated successfully'
            ]);
    }

    public function destroy(string $id)
    {
        $result = $this->productService->deleteProduct($id);

        if (!$result) {
            return response()->json([
                'message' => 'product not found'
            ], 404);
        }

        return response()->json(null, 204);
    }

    public function getExpired(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 15);
        $products = $this->productService->getExpiredProducts($page, $perPage);

        return (new ProductCollection($products))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }
    public function getExpiringSoon(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 15);
        $months = $request->query('months', 3);
        $products = $this->productService->getExpiringSoonProducts($page, $perPage, $months);

        return (new ProductCollection($products))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
                'expirationWindow' => $months
            ]);
    }

    public function search(SearchProductRequest $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 15);
        $searchTerm = $request->getSearchTerm();

        $products = $this->productService->searchProducts($page, $perPage, $searchTerm);

        return (new ProductCollection($products))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
                'searchTerm' => $searchTerm
            ]);
    }

    public function updateStocks(UpdateStocksRequest $request)
    {
        $results = $this->productService->updateStocks($request->getStocks());

        return response()->json([
            'message' => 'products stocks updated successfully',
            'data' => $results
        ]);
    }
}
