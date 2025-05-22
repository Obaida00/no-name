<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getAllProducts(int $page = 1, int $perPage = 15, array $filters = [])
    {
        $query = Product::query();

        if (isset($filters['search']) && !empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (isset($filters['category_id'])) {
            $query->byCategory($filters['category_id']);
        }

        if (isset($filters['expiration_status'])) {
            if ($filters['expiration_status'] === 'expired') {
                $query->expired();
            } elseif ($filters['expiration_status'] === 'expiring_soon') {
                $months = $filters['months'] ?? 3;
                $query->expiringSoon($months);
            }
        }

        if (isset($filters['sort_by_expiration']) && $filters['sort_by_expiration']) {
            $query->orderBy('exp_date', 'asc');
        }

        return $query->paginate(perPage: $perPage, page: $page);
    }

    public function getProductById(string $id)
    {
        return Product::find($id);
    }

    public function createProduct(array $data)
    {
        return Product::create($data);
    }

    public function updateProduct(string $id, array $data)
    {
        $product = $this->getProductById($id);

        if (!$product) {
            return null;
        }

        $product->update($data);
        return $product;
    }

    public function deleteProduct(string $id)
    {
        $product = $this->getProductById($id);

        if (!$product) {
            return false;
        }

        return $product->delete();
    }

    public function getExpiredProducts(int $page = 1, int $perPage = 15)
    {
        $query = Product::expired();

        return $query->paginate(perPage: $perPage, page: $page);
    }

    public function getExpiringSoonProducts(int $page = 1, int $perPage = 15, int $months = 3)
    {
        $query = Product::expiringSoon($months);

        return $query->paginate(perPage: $perPage, page: $page);
    }


    public function updateStocks(array $stockUpdates)
    {
        $results = [
            'success' => [],
            'failed' => []
        ];

        DB::beginTransaction();

        try {
            foreach ($stockUpdates as $update) {
                if (!isset($update['productId']) || !isset($update['quantity'])) {
                    $results['failed'][] = [
                        'productId' => $update['productId'] ?? 'unknown',
                        'reason' => 'Missing required fields'
                    ];
                    continue;
                }

                $product = $this->getProductById($update['productId']);

                if (!$product) {
                    $results['failed'][] = [
                        'productId' => $update['productId'],
                        'reason' => 'Product not found'
                    ];
                    continue;
                }

                $newQuantity = $product->quantity + $update['quantity'];

                if ($newQuantity < 0) {
                    $results['failed'][] = [
                        'productId' => $update['productId'],
                        'reason' => 'Insufficient stock'
                    ];
                    continue;
                }

                $product->quantity = $newQuantity;
                $product->save();

                $results['success'][] = [
                    'productId' => $update['productId'],
                    'productName' => $product->name,
                    'oldQuantity' => $product->quantity - $update['quantity'],
                    'newQuantity' => $product->quantity
                ];
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $results;
    }

    public function searchProducts(int $page = 1, int $perPage = 15, string $term)
    {
        $query = Product::search($term);

        return $query->paginate(perPage: $perPage, page: $page);
    }
}
