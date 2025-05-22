<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/social/login', [AuthController::class, 'handleSocialLogin']);
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Category Routes
Route::middleware("auth:api")->prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    Route::get('/{id}/subcategories', [CategoryController::class, 'getWithSubcategories']);
    Route::get('/{id}/products', [CategoryController::class, 'getWithProducts']);
    Route::get('/hierarchy/all', [CategoryController::class, 'hierarchy']);
});

// Product Routes
Route::middleware("auth:api")->prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
    Route::get('/{id}/category', [ProductController::class, 'getWithCategory']);
    Route::get('/expired/all', [ProductController::class, 'getExpired']);
    Route::get('/expiring-soon/all', [ProductController::class, 'getExpiringSoon']);
    Route::post('/search', [ProductController::class, 'search']);
    Route::post('/stocks/update', [ProductController::class, 'updateStocks']);
});
